from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_200_OK,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from .models import Route
from .serializers import RouteSerializer

# Create your views here.
class TickRoute(APIView):
    @parser_classes([JSONParser])
    def post(self, request):
        # Serialize the route data
        serializer = RouteSerializer(data=request.data)
        if serializer.is_valid():
            # Save the serialized data as a new Route instance
            serializer.save()
            return Response("Route created", status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        # Get ID of the Route (not UUID, but the ID of the specific instance of route associate with pyramid)
        route_id = request.data.get("id", None)
        route = Route.objects.get(id=route_id)

        # Toggle the completed status
        route.completed = not route.completed
        route.save()

        return Response("Route completed/unfinished", status=HTTP_200_OK)
