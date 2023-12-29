from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
)
import requests
from api_app.cragAlgorithm import ClimbingArea
from routes_app.utilities import create_route


class OpenBetaView(APIView):
    def post(self, request, *args, **kwargs):
        goal_grade = request.data.get("goal_grade", None)
        location = request.data.get("location", None)
        maxDistance = request.data.get("maxDistance", None)

        if goal_grade is None or location is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = self.get_crag_data(location, maxDistance)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        # Use the ClimbingArea class to calculate and normalize crag scores
        climbing_area = ClimbingArea(crag_data, goal_grade)
        crag_scores = climbing_area.calculate_crag_scores(
            location["lat"], location["lng"], goal_grade
        )
        normalized_scores = climbing_area.normalize_scores(crag_scores)

        # will need to map through crags to get boulders/routes needed
        # loop through top 5 crags with get_climbs_by_crag
        # for crag in normalized_scores:
        #     print(crag["uuid"])
        climb_data = self.get_climbs_from_crag(normalized_scores[0]["uuid"])
        # print(climb_data["area"]["climbs"])
        pyramid_scheme = self.build_the_triangle(
            climb_data["area"]["climbs"], goal_grade
        )
        # some function to get 1 grade_goal climb, 2 grade_goal-1 routes, 4 grade_goal-2 routes
        # print(climb_data)
        # return Response({"my_pyramid": climb_data})
        return Response({"my_pyramid": pyramid_scheme})
        # return Response({"crag_scores": normalized_scores})

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
            # print(data.get("data"))
            return data.get("data")
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return f"Request error: {e}"
        except ValueError as ve:
            # Handle JSON decoding error
            return f"JSON decoding error: {ve}"

    def get_climbs_from_crag(self, uuid):
        # GraphQL query to get boulder information based on area_id

        query = """
            query getClimbsInCrag ($uuid: ID!){
            area(uuid: $uuid) {
                areaName
                climbs {
                name
                uuid
                grades {
                    vscale
                }
                }
                uuid
                totalClimbs
            }
            }
            """

        variables = {
            "uuid": uuid,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": query, "variables": variables},
                timeout=5,
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

    def build_the_triangle(self, crag_list, goal_grade):
        # Initialize the response dictionary
        response = {"pyramid": {}}

        # Add the goal climb to the top of the pyramid
        goal_climb = self.find_unique_climb_by_grade(
            crag_list,
            goal_grade,
            [climb["uuid"] for climb in response["pyramid"].values()],
        )
        response["pyramid"]["goal_climb"] = goal_climb

        # Add two runner-up climbs one grade lower
        for i in range(1, 3):
            runner_up_grade = goal_grade - 1
            runner_up_climb = self.find_unique_climb_by_grade(
                crag_list,
                runner_up_grade,
                [climb["uuid"] for climb in response["pyramid"].values()],
            )
            response["pyramid"]["runner_up_{}".format(i)] = runner_up_climb

        # Add four runner-up climbs two grades lower
        for i in range(3, 7):
            runner_up_grade = goal_grade - 2
            runner_up_climb = self.find_unique_climb_by_grade(
                crag_list,
                runner_up_grade,
                [climb["uuid"] for climb in response["pyramid"].values()],
            )
            response["pyramid"]["runner_up_{}".format(i)] = runner_up_climb

        return response

        used_ids = [climb["uuid"] for climb in response["pyramid"].values()]

    def find_unique_climb_by_grade(self, crag_list, target_grade, used_climbs):
        print(used_climbs)
        # Find the first climb in the crag_list with the target grade and not in used_climbs
        for climb in crag_list:
            # duplicating climbs
            if (
                climb["grades"]["vscale"] == f"V{target_grade}"
                and climb["uuid"] not in used_climbs
            ):
                print(climb)
                return {
                    "name": climb["name"],
                    "grade": climb["grades"]["vscale"],
                    "uuid": climb["uuid"],
                }

        # If no unique climb with the target grade is found, return a default climb
        return {
            "name": "No Unique Climb Found",
            "grade": target_grade,
            "uuid": None
        }


class GetArea(APIView):
    def post(self, request, *args, **kwargs):
        # get uuid of area from request
        uuid = request.data.get("uuid", None)

        # GraphQL query to get children of requested area
        query = """
            query GetArea($uuid: ID!) {
            area(uuid: $uuid) {
                areaName
                children {
                areaName
                metadata {
                    lng
                    lat
                    areaId
                }
                climbs {
                    name
                    uuid
                    grades {
                    vscale
                    yds
                    }
                    metadata {
                    lat
                    lng
                    climbId
                    }
                }
                }
            }
            }
            """

        variables = {
            "uuid": uuid,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/", json={"query": query, "variables": variables}, timeout=5
            )

            response.raise_for_status()

            data = response.json()
            return Response(data.get("data"), status=HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return None
        except ValueError as ve:
            # Handle JSON decoding error
            return None

         
class GetClimbView(APIView):
    def post(self, request, *args, **kwargs):
        uuid = request.data.get("uuid", None)
        pyramid_id = request.data.get("pyramid_id", None)

        if uuid is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get climb data
        climb_data = self.get_climb_data(uuid)

        if not climb_data:
            return Response({"error": "Failed to fetch climb data"}, status=500)
        
        if pyramid_id:
            create_route(climb_data, pyramid_id)
        
        return Response({"climb_data": climb_data})

    def get_climb_data(self, uuid):
        query = """
        query getClimbById ( $uuid: ID! ) {
            climb(uuid: $uuid) {
                name
                metadata {
                    climb_id
                    lat
                    lng
                    mp_id
                }
                grades {
                    vscale
                }
                content {
                    description
                    location
                }
                media {
                    mediaUrl
                }
                parent {
                    area_name
                    ancestors
                id
                }
            }
            }
        """

        variables = {
            "uuid": uuid,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": query, "variables": variables},
                timeout=10,
            )

            response.raise_for_status()

            data = response.json()
            return data.get("data")
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return f"Request error: {e}"
        except ValueError as ve:
            # Handle JSON decoding error
            return f"JSON decoding error: {ve}"

class CragsNear(APIView):
    def post(self, request, *args, **kwargs):
        location = request.data.get("location", None)
        maxDistance = request.data.get("maxDistance", None)

        if maxDistance is None or location is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = self.get_crag_data(location, maxDistance)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        return Response({"crags": crag_data})

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
            "maxDistance": maxDistance,#distance
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": query, "variables": variables},
                timeout=10,
            )

            response.raise_for_status()

            data = response.json()
            return data.get("data")
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return f"Request error: {e}"
        except ValueError as ve:
            # Handle JSON decoding error
            return f"JSON decoding error: {ve}"
