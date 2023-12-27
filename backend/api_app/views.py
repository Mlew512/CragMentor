from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from cragAlgorithm import ClimbingArea  

class OpenBetaView(APIView):
    def post(self, request, *args, **kwargs):
        goal_grade = request.data.get("goal_grade", None)
        location = request.data.get("location", None)

        if goal_grade is None or location is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = self.get_crag_data(goal_grade, location)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        # Use the ClimbingArea class to calculate and normalize crag scores
        climbing_area = ClimbingArea(crag_data, goal_grade)
        crag_scores = climbing_area.calculate_crag_scores(location["lat"], location["lng"])
        normalized_scores = climbing_area.normalize_scores(crag_scores)

        # will need to map through crags to get boulders/routes needed

        return Response({"crag_scores": normalized_scores})

    def get_crag_data(self, goal_grade, location, maxDistance=2000):
        query = """
        query getCragsInArea ($goal_grade: Int!, $location: LatLngInput!) {
        cragsNear(
            includeCrags: true
            lnglat: $location
            maxDistance: $maxDistance
        ) {
            crags {
            areaName
            totalClimbs
            aggregate {
                byGrade(goalGrade: $goal_grade) {
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
            "goal_grade": goal_grade,
            "location": location,
            "maxDistance": maxDistance,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/", json={"query": query, "variables": variables}, timeout=5
            )

            response.raise_for_status()

            data = response.json()
            return data.get("data")
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return None
        except ValueError as ve:
            # Handle JSON decoding error
            return None
