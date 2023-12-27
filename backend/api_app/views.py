from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from api_app.cragAlgorithm import ClimbingArea


class OpenBetaView(APIView):
    def post(self, request, *args, **kwargs):
        goal_grade = request.data.get("goal_grade", None)
        location = request.data.get("location", None)
        maxDistance = request.data.get("maxDistance", None)

        if goal_grade is None or location is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = self.get_crag_data(location, maxDistance)

        # print(crag_data)
        # return Response(crag_data)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        # Use the ClimbingArea class to calculate and normalize crag scores
        climbing_area = ClimbingArea(crag_data, goal_grade)
        crag_scores = climbing_area.calculate_crag_scores(
            location["lat"], location["lng"], goal_grade
        )
        normalized_scores = climbing_area.normalize_scores(crag_scores)

        # will need to map through crags to get boulders/routes needed
        # loop through top 5 crags

        return Response({"crag_scores": normalized_scores})

    def get_crag_data(self, location, maxDistance):
        query = """
        query getCragsInArea ($location: Point!, $maxDistance: Int!) {
            cragsNear(
                includeCrags: true
                lnglat: $location
                maxDistance: $maxDistance
            ) {
                crags {
                    areaName
                    totalClimbs
                    aggregate {
                        byGrade {
                            count
                            label
                        }
                    }
                    metadata {
                        lat
                        lng
                        areaId
                    }
                }
            }
        }
        """

        variables = {
            "location": location,
            "maxDistance": maxDistance,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": query, "variables": variables},
                timeout=10, 
            )

            response.raise_for_status()

            data = response.json()
            print(data.get("data"))
            return data.get("data")
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return f"Request error: {e}"
        except ValueError as ve:
            # Handle JSON decoding error
            return f"JSON decoding error: {ve}"

    # def get_climbs_from_crags(self, area_id):
    #     # GraphQL query to get boulder information based on area_id

    #     query = """
    #         query getClimbsInCrag {
    #         area(uuid: "931188a6-94bb-54df-9e9c-234f0c2b4b2b") {
    #             areaName
    #             climbs {
    #             name
    #             uuid
    #             grades {
    #                 vscale
    #             }
    #             }
    #             uuid
    #             totalClimbs
    #         }
    #         }
    #         """

    #     variables = {
    #         "area_id": area_id,
    #     }

    #     try:
    #         response = requests.post(
    #             "https://api.openbeta.io/", json={"query": query, "variables": variables}, timeout=5
    #         )

    #         response.raise_for_status()

    #         data = response.json()
    #         return data.get("data")
    #     except requests.exceptions.RequestException as e:
    #         # Handle request-related exceptions
    #         return None
    #     except ValueError as ve:
    #         # Handle JSON decoding error
    #         return None