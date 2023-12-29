# crag_service.py
import requests

class CragService:
    @staticmethod
    def get_crag_data(location, maxDistance):
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


    # @staticmethod
    # def get_climbs_from_crag(uuid):
    #     # Your existing get_climbs_from_crag method

    # @staticmethod
    # def build_the_triangle(crag_list, goal_grade):
    #     # Your existing build_the_triangle method

    # @staticmethod
    # def find_unique_climb_by_grade(crag_list, target_grade, used_climbs):
    #     # Your existing find_unique_climb_by_grade method
