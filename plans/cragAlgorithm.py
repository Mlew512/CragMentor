from math import radians, sin, cos, sqrt, atan2
from sklearn.preprocessing import MinMaxScaler
import crags_data #example crag data returned from api

class ClimbingArea:
    def __init__(self, crags_data, goal_grade):
        self.crags_data = crags_data
        self.grade_weights = {f'V{goal_grade}': 1, f'V{goal_grade-1}': 2, f'V{goal_grade-2}': 3}
        self.crags = self.crags_data["data"]["cragsNear"][0]["crags"]

    def haversine_distance(self, lat1, lon1, lat2, lon2):
        R = 6371.0  # Radius of the Earth in kilometers
        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)
        a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = R * c
        distance = round(distance)
        return distance

    def calculate_weighted_sum(self, crag):
        return sum(
            grade["count"] * self.grade_weights.get(grade["label"], 0)
            for grade in crag["aggregate"]["byGrade"]
            if "V4" <= grade["label"] <= "V7"
        )

    def calculate_crag_scores(self, user_lat, user_lon):
        crag_scores = []
        for crag in self.crags:
            distance = self.haversine_distance(
                user_lat, user_lon, crag["metadata"]["lat"], crag["metadata"]["lng"]
            )
            weighted_sum = self.calculate_weighted_sum(crag)
            crag_scores.append({"areaName": crag["areaName"], "distance": distance, "score": weighted_sum})

        # Sort crags by score in descending order
        sorted_crags = sorted(crag_scores, key=lambda x: x["score"], reverse=True)
        return sorted_crags

    def normalize_scores(self, crag_scores):
        scores = [crag["score"] for crag in crag_scores]
        distances = [crag["distance"] for crag in crag_scores]

        scaler = MinMaxScaler()
        normalized_scores = scaler.fit_transform([[score] for score in scores])
        normalized_distances = scaler.fit_transform([[distance] for distance in distances])

        for i, crag in enumerate(crag_scores):
            crag["normalized_score"] = round(float(normalized_scores[i]),3)
            crag["normalized_distance"] = round(float(normalized_distances[i]),3)

        return crag_scores

# Example usage in api view
user_latitude = 34.65398
user_longitude = -85.39029
# crag data and goal grade
climbing_area = ClimbingArea(crags_data.craggy, 5)
# user imputed location
distance_results = climbing_area.calculate_crag_scores(user_latitude, user_longitude)

normalized_results = climbing_area.normalize_scores(distance_results)

for crag in normalized_results:
    if "normalized_score" in crag and "normalized_distance" in crag:
        if crag["normalized_score"] >0:
            print(f"{crag['areaName']}: distance_score = {crag['normalized_distance']}, crag_score = {crag['normalized_score']}")
    else:
        print(f"Missing normalization data for {crag['areaName']}")
