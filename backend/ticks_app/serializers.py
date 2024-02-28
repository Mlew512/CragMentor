from .models import Ticked_Route
from rest_framework import serializers

class TickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticked_Route 
        exclude = ['user']
