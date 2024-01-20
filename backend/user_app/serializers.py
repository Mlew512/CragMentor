from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "current_level",
            "goal",
            "lat",
            "long",
            "distance_willing_to_travel",
        ]
