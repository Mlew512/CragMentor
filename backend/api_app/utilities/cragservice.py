# crag_service.py
import requests
from .queries import *
import math


class CragService:
    YDS_GRADE_INDEX_MAP = {
        "5.0": 0,
        "5.1": 1,
        "5.2": 2,
        "5.3": 3,
        "5.4": 4,
        "5.5": 5,
        "5.6": 6,
        "5.7": 7,
        "5.8": 8,
        "5.9": 9,
        "5.10a": 10,
        "5.10b": 11,
        "5.10c": 12,
        "5.10d": 13,
        "5.11a": 14,
        "5.11b": 15,
        "5.11c": 16,
        "5.11d": 17,
        "5.12a": 18,
        "5.12b": 19,
        "5.12c": 20,
        "5.12d": 21,
        "5.13a": 22,
        "5.13b": 23,
        "5.13c": 24,
        "5.13d": 25,
        "5.14a": 26,
        "5.14b": 27,
        "5.14c": 28,
        "5.14d": 29,
        "5.15a": 30,
        "5.15b": 31,
        "5.15c": 32,
        "5.15d": 33,
    }

    V_GRADE_INDEX_MAP = {
        0 : 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
    }

    @staticmethod
    def get_crag_data(location, maxDistance):
        variables = {
            "location": location,
            "maxDistance": maxDistance,  # distance
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": crag_in_area_query, "variables": variables},
                timeout=20,
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

    @staticmethod
    def get_climbs_from_crag(uuids):
        # GraphQL query to get area information based on area_id
        
        built_query= CragService.generate_query(uuids)


        variables = {
            "uuids": uuids,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": built_query},
                timeout=20,
            )

            response.raise_for_status()

            data = response.json()
            # print(response.json())
            return data.get("data")
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return None
        except ValueError as ve:
            # Handle JSON decoding error
            return None

    @staticmethod
    def find_unique_climb_by_grade_v_scale(crag_list, target_grade, used_climbs):
        # print(used_climbs)
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
                    "area": climb["areaName"],
                    "lat": climb["metadata"]["lat"],
                    "lng": climb["metadata"]["lng"],
                    # "media": climb["media"],
                }

        # If no unique climb with the target grade is found, return a default climb
        return {
            "name": "No Unique Climb Found",
            "grade": f"V{target_grade}",
            "uuid": None,
        }

    @staticmethod
    def find_unique_climb_by_grade_yds_scale(crag_list, target_grade: str, used_climbs):
        for climb in crag_list:
            if (
                climb["grades"]["yds"] == target_grade
                and climb["uuid"] not in used_climbs
                and climb["type"]["sport"]
            ):
                return {
                    "name": climb["name"],
                    "grade": climb["grades"]["yds"],
                    "uuid": climb["uuid"],
                    "area": climb["areaName"],
                    "lat": climb["metadata"]["lat"],
                    "lng": climb["metadata"]["lng"],
                    "type": "sport",
                    # "media": climb.media["mediaUrl"],
                }

        # If no unique climb with the target grade is found, return a default climb
        return {"name": "No Unique Climb Found", "grade": target_grade, "uuid": None}

    @staticmethod
    def build_the_triangle(crag_list, goal_grade):
        # Initialize the response dictionary
        response = {"pyramid": {}}

        grade_to_index_map = (
            CragService.YDS_GRADE_INDEX_MAP
            if isinstance(goal_grade, str) and goal_grade.startswith("5.")
            else CragService.V_GRADE_INDEX_MAP
        )
        unique_climb_finder = (
            CragService.find_unique_climb_by_grade_yds_scale
            if isinstance(goal_grade, str) and goal_grade.startswith("5.")
            else CragService.find_unique_climb_by_grade_v_scale
            )

        def add_runner_up_climbs(num_of_climbs, grade_index_map, subtract_value, start_index):
            for i in range(1, num_of_climbs + 1):
                goal_index = grade_index_map[goal_grade]
                runner_up_index = max(0, goal_index - subtract_value)
                runner_up_grade = list(grade_index_map.keys())[list(grade_index_map.values())[runner_up_index]]
                runner_up_climb = unique_climb_finder(
                    crag_list,
                    runner_up_grade,
                    [climb["uuid"] for climb in response["pyramid"].values()],
                )
                response["pyramid"]["runner_up_{}".format(start_index+i-1)] = runner_up_climb

        goal_climb = unique_climb_finder(
            crag_list,
            goal_grade,
            [climb["uuid"] for climb in response["pyramid"].values()],
        )
        response["pyramid"]["goal_climb"] = goal_climb

        add_runner_up_climbs(2, grade_to_index_map, 1, 1)

        add_runner_up_climbs(4, grade_to_index_map, 2, 3)

        return response

    @staticmethod
    def get_crag_box(topLeftLat, topLeftLng, bottomRightLat, bottomRightLng, zoom):
        if zoom < 8:
            query = crag_box_query
        else:
            query = crag_box_query_2
        # print(query)

        variables = {
            "bbox": [topLeftLng, topLeftLat, bottomRightLng, bottomRightLat],
            "zoom": -10,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": query, "variables": variables},
                timeout=20,
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

    @staticmethod
    def get_climb_data(uuid):
        variables = {
            "uuid": uuid,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": get_climb_by_id_query, "variables": variables},
                timeout=20,
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

    @staticmethod
    def search_areas(search):
        variables = {
            "match": search,
        }

        try:
            query = get_area_search.replace('"a"', f'"{search}"')
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": query, "variables": variables},
                timeout=20,
            )
            # print(response.raw)
            response.raise_for_status()

            data = response.json()
            return data.get("data")
        except requests.exceptions.RequestException as e:
            # Handle request-related exceptions
            return f"Request error: {e}"
        except ValueError as ve:
            # Handle JSON decoding error
            return f"JSON decoding error: {ve}"

    @staticmethod
    def grade_to_numeric(grade):
        parts = grade.split(".")
        numeric_part = float(parts[1][0:2])
        letter_part = parts[1][-1] if len(parts[1]) > 2 else ""
        letter_values = {
            "a": 0.1,
            "-": 0.2,
            "b": 0.3,
            "B": 0.4,
            "": 0.5,
            "C": 0.6,
            "c": 0.7,
            "+": 0.8,
            "d": 0.9,
        }
        numeric_grade = numeric_part + letter_values.get(letter_part, 0.0)

        return numeric_grade

    @staticmethod
    def numeric_to_grade(numeric_grade):
        integer_part = int(numeric_grade)
        decimal_part = round(numeric_grade - integer_part, 1)

        letter_values = {
            "a": 0.1,
            "-": 0.2,
            "b": 0.3,
            "B": 0.4,
            "": 0.5,
            "C": 0.6,
            "c": 0.7,
            "+": 0.8,
            "d": 0.9,
        }

        matching_values = [
            key
            for key, value in letter_values.items()
            if math.isclose(value, decimal_part)
        ]

        if matching_values:
            letter_part = matching_values[0]
        else:
            letter_part = ""

        return f"5.{integer_part}{letter_part}"


    @staticmethod
    def generate_query(uuids):
        query_string = "query MyQuery {\n"

        for index, uuid in enumerate(uuids, start=1):
            alias = f"a{index}"
            query_string += f"  {alias}: area(uuid: \"{uuid}\") {{\n"
            query_string += "    uuid\n"
            query_string += "    climbs {\n"
            query_string += "      name\n"
            query_string += "      uuid\n"
            query_string += "      media {\n"
            query_string += "        mediaUrl\n"
            query_string += "      }\n"
            query_string += "      grades {\n"
            query_string += "        vscale\n"
            query_string += "        yds\n"
            query_string += "      }\n"
            query_string += "      type {\n"
            query_string += "        sport\n"
            query_string += "        trad\n"
            query_string += "        bouldering\n"
            query_string += "      }\n"
            query_string += "      metadata {\n"
            query_string += "        lat\n"
            query_string += "        lng\n"
            query_string += "      }\n"
            query_string += "    }\n"
            query_string += "    totalClimbs\n"
            query_string += "    areaName\n"  
            query_string += "  }\n"

        query_string += "}"
        return query_string