from .models import Favorite_Route
from rest_framework import serializers

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite_Route 
        exclude = ['user']

 








