# crag_service.py
import requests
from .queries import *
import math


class CragService:
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
    def get_climbs_from_crag(uuid):
        # GraphQL query to get boulder information based on area_id
        variables = {
            "uuid": uuid,
        }

        try:
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": climbs_in_crag_query, "variables": variables},
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
                    # "lat": climb["metadata"]["lat"],
                    # "long": climb["metadata"]["lng"],
                    # "area": climb["parent"]["area_name"],
                    # "media": climb["media"]["media"][0]["mediaUrl"]
                }

        # If no unique climb with the target grade is found, return a default climb
        return {"name": "No Unique Climb Found", "grade": f'V{target_grade}', "uuid": None}

    @staticmethod
    def find_unique_climb_by_grade_yds_scale(crag_list, target_grade:str, used_climbs):
        for climb in crag_list: 
            if (
                climb["grades"]["yds"] == target_grade
                and climb["uuid"] not in used_climbs
                and climb["type"]["sport"]
            ):
                return {
                    "name": climb["name"],
                    "grade": climb["grades"]["yds"],
                    "uuid": climb["uuid"]
                }

        # If no unique climb with the target grade is found, return a default climb
        return {"name": "No Unique Climb Found", "grade": target_grade, "uuid": None}

    @staticmethod
    def build_the_triangle(crag_list, goal_grade):
        # Initialize the response dictionary
        response = {"pyramid": {}}

        if goal_grade.startswith("5."):
            # goal climb
            goal_climb = CragService.find_unique_climb_by_grade_yds_scale(
                crag_list,
                goal_grade,
                [climb["uuid"] for climb in response["pyramid"].values()],
            )
            response["pyramid"]["goal_climb"] = goal_climb

            
             # Add two runner-up climbs one grade lower
            for i in range(1, 3):
                # if > 10.4 n = .2
                n=1
                if CragService.grade_to_numeric(goal_grade) > 10.2:
                     n=0.2
                runner_up_grade = CragService.numeric_to_grade(CragService.grade_to_numeric(goal_grade) - n)
                print(runner_up_grade)
                runner_up_climb = CragService.find_unique_climb_by_grade_yds_scale(
                    crag_list,
                    runner_up_grade,
                    [climb["uuid"] for climb in response["pyramid"].values()],
                )
                response["pyramid"]["runner_up_{}".format(i)] = runner_up_climb

            # Add four runner-up climbs two grades lower
            for i in range(3, 7):
                runner_up_grade = CragService.numeric_to_grade(CragService.grade_to_numeric(goal_grade) - 2)
                runner_up_climb = CragService.find_unique_climb_by_grade_yds_scale(
                    crag_list,
                    runner_up_grade,
                    [climb["uuid"] for climb in response["pyramid"].values()],
                )
                response["pyramid"]["runner_up_{}".format(i)] = runner_up_climb

        
        else:   
        # Add the goal climb to the top of the pyramid
            goal_climb = CragService.find_unique_climb_by_grade_v_scale(
                crag_list,
                goal_grade,
                [climb["uuid"] for climb in response["pyramid"].values()],
            )
            response["pyramid"]["goal_climb"] = goal_climb

            # Add two runner-up climbs one grade lower
            for i in range(1, 3):
                runner_up_grade = goal_grade - 1
                runner_up_climb = CragService.find_unique_climb_by_grade_v_scale(
                    crag_list,
                    runner_up_grade,
                    [climb["uuid"] for climb in response["pyramid"].values()],
                )
                response["pyramid"]["runner_up_{}".format(i)] = runner_up_climb

            # Add four runner-up climbs two grades lower
            for i in range(3, 7):
                runner_up_grade = goal_grade - 2
                runner_up_climb = CragService.find_unique_climb_by_grade_v_scale(
                    crag_list,
                    runner_up_grade,
                    [climb["uuid"] for climb in response["pyramid"].values()],
                )
                response["pyramid"]["runner_up_{}".format(i)] = runner_up_climb

        return response

    @staticmethod
    def get_crag_box(topLeftLat, topLeftLng, bottomRightLat, bottomRightLng, zoom):

        if zoom < 8:
            query =crag_box_query
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
            query = get_area_search.replace('"a"',f'"{search}"')
            response = requests.post(
                "https://api.openbeta.io/",
                json={"query": query, "variables": variables},
                timeout=20,
            )
            print(response.raw)
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
        parts= grade.split(".")
        # get the numeric part of 5.11 = 11.0
        numeric_part = float(parts[1][0:2])
        letter_part = parts[1][-1] if len(parts[1]) > 2 else None
        letter_values = {'a': 0.2,"-":0.3, 'b': 0.4, 'c': 0.6, "+":0.7, 'd': 0.8}
        numeric_grade = numeric_part + letter_values.get(letter_part, 0.0)

        return numeric_grade

    @staticmethod
    def numeric_to_grade(numeric_grade):
        integer_part= int(numeric_grade)
        decimal_part = numeric_grade-integer_part

        letter_values = {'a': 0.2,"-":0.3, 'b': 0.4, 'c': 0.6, "+":0.7, 'd': 0.8}
        letter_part = letter_values.get(decimal_part, '')

        return f'5.{integer_part}{letter_part}'