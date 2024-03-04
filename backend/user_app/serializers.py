from rest_framework import serializers
from .models import User
from routes_app.serializers import RouteSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "goal",
            "lat",
            "long",
            "distance_willing_to_travel",
            "location",
        ]
