from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from .serializers import FavoriteSerializer
from .models import Favorite_Route
from user_app.models import User

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_204_NO_CONTENT


# Create your views here.
class All_Favorites(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        favorites = FavoriteSerializer(Favorite_Route.objects.filter(user = request.user), many=True) 
        return Response(favorites.data) 



class An_Favorite(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id): 
        favorites = Favorite_Route.objects.filter(user = request.user).order_by('created_date')
        serialized_favorites = FavoriteSerializer(favorites, many=True).data

        return Response(serialized_favorites.data)

    def delete(self, request, id):
        print(id)
        favorite = Favorite_Route.objects.get(uuid = id, user=request.user)

        if favorite:
            favorite.delete()
            return Response(f"{id} Porperty Deleted",status=HTTP_204_NO_CONTENT)
        else:
            return Response(f"Property not found",status=HTTP_400_BAD_REQUEST)



class Create_Favorite(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        print(request.data)

        ser_fav = FavoriteSerializer(data=request.data)
        if ser_fav.is_valid():
            ser_fav.save(user=request.user)
            return Response(f"{ser_fav.data['name']} Favorited {ser_fav.data['id']}", status=HTTP_201_CREATED)
        return Response(ser_fav.errors, status=HTTP_400_BAD_REQUEST)


