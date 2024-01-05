# serializers.py
from rest_framework import serializers
from .models import Pyramid
from routes_app.serializers import RouteSerializer

class PyramidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pyramid
        fields = ['id', 'user', 'routes', 'date_generated', 'location', 'latitude', 'longitude', 'goal_grade']

class PyramidDetailSerializer(serializers.ModelSerializer):
    routes = RouteSerializer(many=True, read_only=True)

    class Meta:
        model = Pyramid
        fields = '__all__'