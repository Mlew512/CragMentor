from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
)
import requests
from api_app.cragAlgorithm import ClimbingArea
from .utilities.cragservice import CragService
import random
from .utilities.queries import *


class OpenBetaView(APIView):
    def post(self, request, *args, **kwargs):
        goal_grade = request.data.get("goal_grade", None)
        location = request.data.get("location", None)
        maxDistance = request.data.get("maxDistance", None)

        if goal_grade is None or location is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = CragService.get_crag_data(location, maxDistance)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        climbing_area = ClimbingArea(crag_data, goal_grade)

        # calculate crag scorecation["lng"], goal_grade)

        # normalize crag score and location
        crag_scores = climbing_area.calculate_crag_scores(
            location["lat"], location["lng"], goal_grade
        )

        # normalize crag score and location
        normalized_scores = climbing_area.normalize_scores(crag_scores)

        # Get top crags, could only return  crags with score > 0 *** to make faster***
        top_crag_uuids = [crag["uuid"] for crag in normalized_scores]

        # Initialize an empty list to compile climb data from the top 5 crags
        compiled_crag_data = []

        # 1 api call method

        compiled_crag_data = CragService.get_climbs_from_crag(top_crag_uuids)
        compiled_climbs = []
        # Iterate through each area in the data
        for area_key, area_value in compiled_crag_data.items():
            # Extract climbs from the current area and add to the compiled list
            area_climbs = area_value.get("climbs", [])
            area_name = area_value.get(
                "areaName", ""
            ) 
            for climb in area_climbs:
                climb["areaName"] = area_name

            random.shuffle(area_climbs)
            compiled_climbs.extend(area_climbs)

        # Build one triangle using climbs from all crags
        combined_pyramid_scheme = CragService.build_the_triangle(
            compiled_climbs, goal_grade
        )

        return Response({"my_pyramid": combined_pyramid_scheme})


class GetArea(APIView):
    def post(self, request, *args, **kwargs):
        # get uuid of area from request
        uuid = request.data.get("uuid", None)

        variables = {
            "uuid": uuid,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": get_area_children, "variables": variables},
                timeout=10,
            )
            response.raise_for_status()

            data = response.json()
            return Response(data.get("data"), status=HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            # print(e)
            # Handle request-related exceptions
            return Response({"error": "Request error"}, status=500)
        except ValueError as ve:
            # Handle JSON decoding error
            return Response({"error": "JSON error"}, status=500)


class GetClimbView(APIView):
    def post(self, request, *args, **kwargs):
        uuid = request.data.get("uuid", None)
        # pyramid_id = request.data.get("pyramid_id", None)

        if uuid is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get climb data
        climb_data = CragService.get_climb_data(uuid)

        if not climb_data:
            return Response({"error": "Failed to fetch climb data"}, status=500)

        # if pyramid_id:
        #     create_route(climb_data, pyramid_id)

        return Response({"climb_data": climb_data})


class CragsNear(APIView):
    def post(self, request, *args, **kwargs):
        location = request.data.get("location", None)
        maxDistance = request.data.get("maxDistance", None)

        if maxDistance is None or location is None:
            return Response({"error": "Missing required parameters"}, status=400)

        crag_data = CragService.get_crag_data(location, maxDistance)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        return Response({"crags": crag_data})


class CragsBounds(APIView):
    def post(self, request, *args, **kwargs):
        topLeftLat = request.data.get("topLeftLat", None)
        topLeftLng = request.data.get("topLeftLng", None)
        bottomRightLat = request.data.get("bottomRightLat", None)
        bottomRightLng = request.data.get("bottomRightLng", None)
        zoom = request.data.get("zoom", 1)

        if (
            topLeftLat is None
            or topLeftLng is None
            or bottomRightLat is None
            or bottomRightLng is None
        ):
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = CragService.get_crag_box(
            topLeftLat, topLeftLng, bottomRightLat, bottomRightLng, zoom
        )

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        return Response({"crags": crag_data})


class BestCragView(APIView):
    def post(self, request, *args, **kwargs):
        goal_grade = request.data.get("goal_grade", None)
        location = request.data.get("location", None)
        maxDistance = request.data.get("maxDistance", None)

        if goal_grade is None or location is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = CragService.get_crag_data(location, maxDistance)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        # Use the ClimbingArea class to calculate and normalize crag scores
        climbing_area = ClimbingArea(crag_data, goal_grade)

        # calculate crag score
        crag_scores = climbing_area.calculate_crag_scores(
            location["lat"], location["lng"], goal_grade
        )

        # normalize crag score and location
        normalized_scores = climbing_area.normalize_scores(crag_scores)
        top_five = normalized_scores[:5]
        # print(top_five)

        return Response({"normalized_scores": top_five})


class Countries(APIView):
    def post(self, request, *args, **kwargs):
        # Make a GraphQL api request to get crag data
        crag_data = self.get_crag_data()

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        return Response({"crags": crag_data})

    def get_crag_data(self):
        variables = {}

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": get_countries_query, "variables": variables},
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


class AreaSearchByName(APIView):
    def post(self, request, *args, **kwargs):
        search = request.data.get("search", None)

        if search is None:
            return Response({"error": "Missing required parameters"}, status=400)

        # Make a GraphQL api request to get crag data
        crag_data = CragService.search_areas(search)

        if not crag_data:
            return Response({"error": "Failed to fetch crags data"}, status=500)

        return Response(crag_data)
