from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "current_level",
            "goal",
            "location",
            "distance_willing_to_travel",
        ]
