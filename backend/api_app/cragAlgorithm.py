from math import radians, sin, cos, sqrt, atan2
from sklearn.preprocessing import MinMaxScaler, RobustScaler
import math
from .utilities.cragservice import CragService
# from . import crags_data


# sport climbing and bouldering 
class ClimbingArea:
    def __init__(self, crags_data, goal_grade):
        self.crags_data = crags_data
        self.grade_weights= {}
        
        # sport climbing
        if type(goal_grade) != int:
        # if goal_grade.startswith("5."):
            goal_grade_numeric = CragService.grade_to_numeric(goal_grade)
            # If grade is above 5.10c
            if goal_grade_numeric >= 10.4:
                # increment by letter grades
                self.grade_weights[goal_grade]=1
                self.grade_weights[CragService.numeric_to_grade(goal_grade_numeric-0.1)]=1.5
                self.grade_weights[CragService.numeric_to_grade(goal_grade_numeric-0.2)]=2
                self.grade_weights[CragService.numeric_to_grade(goal_grade_numeric-0.3)]=2.5
                self.grade_weights[CragService.numeric_to_grade(goal_grade_numeric-0.4)]=3
                

            if goal_grade_numeric <=10.4 and goal_grade_numeric >10.0:
                self.grade_weights[goal_grade]=1
                # increment by one letter grade until 9-10a
                self.grade_weights[CragService.numeric_to_grade(goal_grade_numeric-0.1)]=1.5
                self.grade_weights[CragService.numeric_to_grade(goal_grade_numeric-0.2)]=2
                self.grade_weights[CragService.numeric_to_grade(goal_grade_numeric-0.3)]=2.5
                self.grade_weights[CragService.numeric_to_grade(math.floor(goal_grade_numeric-1))]=3

            # if goal climbing grade is below 5.10a (increment by one number grade each time)
            if goal_grade_numeric <= 10.2:
                self.grade_weights[goal_grade]=1
                # increment by one letter grade
                self.grade_weights[CragService.numeric_to_grade(math.floor(goal_grade_numeric-1))]=2
                self.grade_weights[CragService.numeric_to_grade(math.floor(goal_grade_numeric-2))]=3
        # bouldering
        else:
            self.grade_weights = {
                goal_grade: 1,
                goal_grade-.25: 1.25,
                goal_grade-0.5:1.5,
                goal_grade-.75: 1.75,
                goal_grade-1: 2,
                goal_grade-1.25: 2.25,
                goal_grade-1.5:2.5,
                goal_grade-1.75: 2.75,
                goal_grade-2: 3,
                goal_grade-2.25: 3.25,
                goal_grade-2.5:3.5,
            }

        if not isinstance(self.crags_data, str):
            self.crags = self.crags_data["cragsNear"][0]["crags"]
            # print(self.crags)
        else:
            self.crags= []
            # print(self.crags)
        


    def haversine_distance(self, lat1, lon1, lat2, lon2):
        R = 6371.0  # Radius of the Earth in kilometers
        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)
        a = (
            sin(dlat / 2) ** 2
            + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
        )
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = R * c
        distance = round(distance)
        return distance

    def calculate_weighted_sum(self, crag, goal_grade):
        # if goal_grade.startswith("5."):
        if type(goal_grade) != int:
            return sum(
            grade["count"] * self.grade_weights.get(grade["label"])
            for grade in crag["aggregate"]["byGrade"]
            if grade["label"] in self.grade_weights
        )
        else:
            goal_grade_range = range(goal_grade - 2, goal_grade + 1)
        
        return sum(
            grade["count"] * self.grade_weights.get(self.parse_grade_label(grade["label"]), 0)
            for grade in crag["aggregate"]["byGrade"]
            if self.is_grade_in_range(grade["label"], goal_grade_range)
        )

    def is_grade_in_range(self, grade_label, goal_grade_range):
        grade_value = self.parse_grade_label(grade_label)
        
        return grade_value in goal_grade_range

# 
    def parse_grade_label(self, grade_label):
        if grade_label.startswith("5."):
            return grade_label

        if grade_label[-1] == "-" and grade_label[0]=="V":
            # grades like V7-
            return int(grade_label[1:-1]) - 0.25

        elif '-' in grade_label:
            # for slash grades V6-7 
            parts = grade_label[1:].split('-')
            if len(parts) == 2 and parts[0].isdigit() and (parts[1].isdigit() or parts[1] == ''):
                start = int(parts[0])
                end = int(parts[1]) if parts[1].isdigit() else start
                return end - 0.5
        elif grade_label.startswith('V') and grade_label[1:].isdigit():
            # normal grade label'V1 or V11'
            return int(grade_label[1:])

        elif grade_label.startswith('V') and grade_label[1:-1].isdigit() and grade_label[-1] == '+':
            # Handle the case where the label is 'V3+'
            return int(grade_label[1:-1]) + 0.25
        # debugging 
        # raise ValueError("Invalid grade label format: {}".format(grade_label))


    def calculate_crag_scores(self, user_lat, user_lon, goal_grade):
        crag_scores = []
        
        if self.crags:
            for crag in self.crags:
                distance = self.haversine_distance(
                    user_lat, user_lon, crag["metadata"]["lat"], crag["metadata"]["lng"]
                )
                weighted_sum = self.calculate_weighted_sum(crag, goal_grade)
                if weighted_sum != 0:
                    crag_scores.append(
                        {
                            "areaName": crag["areaName"],
                            "distance": distance,
                            "score": weighted_sum,
                            "uuid": crag['metadata']['areaId'],
                        }
                    )
            return crag_scores
        else:
            return []

    def normalize_scores(self, crag_scores):
        # Validate input
        if not crag_scores or not all(isinstance(crag, dict) for crag in crag_scores):
            raise ValueError("Invalid input for normalize_scores")

        scores = [crag["score"] for crag in crag_scores]
        distances = [crag["distance"] for crag in crag_scores]

        # Check if input arrays have the correct shape
        if len(scores) < 2 or len(distances) < 2:
            raise ValueError("Insufficient data for normalization")

        try:
            # Normalizing scores using RobustScaler
            normalized_scores = RobustScaler().fit_transform([[score] for score in scores])
            normalized_distances = RobustScaler().fit_transform([[distance] for distance in distances])
        except ValueError as e:
            # print(f"Error during normalization: {e}")
            return []

        for i, crag in enumerate(crag_scores):
            crag["normalized_score"] = round(float(normalized_scores[i][0]), 3)
            crag["normalized_distance"] = 1 + round(float(normalized_distances[i][0]), 3)

            if crag["normalized_score"] != 0 and crag["normalized_distance"] != 0:
                crag["overall_score"] = round(
                    (crag["normalized_score"] / crag["normalized_distance"]), 3
                )
            else:
                crag["overall_score"] = 0

        # Sorting crags based on overall score
        sorted_crags = sorted(crag_scores, key=lambda x: x["overall_score"], reverse=True)
        return sorted_crags