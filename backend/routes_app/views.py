from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from .models import Route
from .serializers import RouteSerializer
from pyramid_app.models import Pyramid
from pyramid_app.serializers import PyramidSerializer


class RouteAPIView(APIView):
    @parser_classes([JSONParser])
    def post(self, request):
        # Get the ID of the target Pyramid from the request data
        pyramid_id = request.data.get("pyramid_id", None)

        if pyramid_id is None:
            return Response({"error": "Please provide a valid 'pyramid_id' parameter."}, status=HTTP_400_BAD_REQUEST)

        # Serialize the route data
        serializer = RouteSerializer(data=request.data)

        if serializer.is_valid():
            # Save the serialized data as a new Route instance
            route = serializer.save()

            # Get the specified Pyramid instance and add the route's ID to its list of IDs
            try:
                pyramid = Pyramid.objects.get(id=pyramid_id)
                pyramid.routes.add(route)
                
                # Optionally, you can serialize the Pyramid and return its data in the response
                pyramid_serializer = PyramidSerializer(pyramid)
                return Response(pyramid_serializer.data, status=HTTP_201_CREATED)

            except Pyramid.DoesNotExist:
                return Response({"error": f"Pyramid with id {pyramid_id} does not exist."}, status=HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        # Get ID of the Route (not UUID, but the ID of the specific instance of route associate with pyramid)
        route_id = request.data.get("id", None)
        route = get_object_or_404(Route, id=route_id)

        # Toggle the completed status
        route.completed = not route.completed
        route.save()

        return Response("Route completed/unfinished", status=HTTP_200_OK)

    def get(self, request):
        # If route_id is provided, get a single route by ID
        route_id = request.data.get("id", None)
        print(route_id)
        if route_id is not None:
            route = get_object_or_404(Route, id=route_id)
            serializer = RouteSerializer(route)
            return Response(serializer.data, status=HTTP_200_OK)
        else:
            # Handle the case where route_id is not provided
            return Response({"error": "Please provide a valid 'id' parameter."}, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        # Get ID of the Route to be deleted
        route_id = request.data.get("id", None)

        if route_id is not None:
            route = get_object_or_404(Route, id=route_id)
            route.delete()
            return Response("Route deleted", status=HTTP_204_NO_CONTENT)
        else:
            # Handle the case where route_id is not provided
            return Response({"error": "Please provide a valid 'id' parameter."}, status=HTTP_400_BAD_REQUEST)