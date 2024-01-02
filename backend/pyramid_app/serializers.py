# serializers.py
from rest_framework import serializers
from .models import Pyramid

class PyramidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pyramid
        fields = ['id', 'user', 'routes', 'date_generated', 'latitude', 'longitude', 'goal_grade']
