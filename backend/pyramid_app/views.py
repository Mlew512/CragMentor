from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Pyramid
from .serializers import PyramidSerializer
from rest_framework import generics

class PyramidView(APIView):
    def get(self, request, *args, **kwargs):
        pyramids = Pyramid.objects.all()
        serializer = PyramidSerializer(pyramids, many=True)
        return Response(serializer.data)

class PyramidDetailView(APIView):
    def get_object(self, pyramid_id):
        try:
            return Pyramid.objects.get(pk=pyramid_id)
        except Pyramid.DoesNotExist:
            return None

    def get(self, request, pyramid_id, *args, **kwargs):
        pyramid_instance = self.get_object(pyramid_id)
        if not pyramid_instance:
            return Response({"error": "Pyramid not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PyramidSerializer(pyramid_instance)
        return Response(serializer.data)

    def put(self, request, pyramid_id, *args, **kwargs):
        pyramid_instance = self.get_object(pyramid_id)
        if not pyramid_instance:
            return Response({"error": "Pyramid not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PyramidSerializer(pyramid_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPyramidsView(generics.ListAPIView):
    serializer_class = PyramidSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Pyramid.objects.filter(user_id=user_id)