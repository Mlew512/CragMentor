from math import radians, sin, cos, sqrt, atan2
from sklearn.preprocessing import MinMaxScaler, RobustScaler
from . import crags_data

class SportClimbingArea:
    def __init__(self, crags_data, goal_grade):
        self.crags_data = crags_data
        # if goal grad > 5.10c
        if goal_grade >= 510.6:
            self.grade_weights = {
                goal_grade: 1,
                goal_grade - 0.2: 1.25,
                goal_grade - 0.4: 1.5,
                goal_grade - 0.6: 1.25,
                
            }
        else:
            self.grade_weights = {
                goal_grade:1,
            }
        # print(self.crags_data)
        if not isinstance(self.crags_data, str):
            self.crags = self.crags_data["cragsNear"][0]["crags"]
            print(self.crags)
        else:
            self.crags= []
            print(self.crags)


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


