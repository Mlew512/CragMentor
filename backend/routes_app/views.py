from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
)
from models import Route


# Create your views here.
class TickRoute(APIView):
    def put(self, request):
        # Get ID of the Route (not UIID, but the ID of the specific instance of route associate with pyramid)
        route_id = request.data.get("id", None)
        route = Route.objects.get(id=route_id)

        route.completed = True
        route.save()

        return Response("Route ticked", status=HTTP_200_OK)
