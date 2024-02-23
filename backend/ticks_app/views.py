# Create your views here.
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from .serializers import TickSerializer 
from .models import Ticked_Route
from user_app.models import User

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_204_NO_CONTENT


# Create your views here.
class All_Ticks(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        ticks = TickSerializer(Ticked_Route.objects.filter(user = request.user), many=True) 
        return Response(ticks.data) 



class A_Tick(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id): 
        tick = Ticked_Route.objects.filter(user = request.user).order_by('date_ticked')
        serialized_tick = TickSerializer(tick, many=True).data

        return Response(serialized_tick.data)

    def delete(self, request, id):
        print(id)
        tick = Ticked_Route.objects.get(id = id, user=request.user)

        if tick:
            tick.delete()
            return Response(f"{id} tick Deleted",status=HTTP_204_NO_CONTENT)
        else:
            return Response(f"tick not found",status=HTTP_400_BAD_REQUEST)



class Create_Tick(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if request.data['grades']['yds']:
            what_grade = request.data['grades']['yds']
        else:
            what_grade = request.data['grades']['vscale']
      
        print(request.data)
        
        scrub_data={
            "name":request.data['name'],
            "uuid":request.data['uuid'],
            "grade":what_grade,
            "style":"redpoint",
        }
        
        ser_tick = TickSerializer(data=scrub_data)
        if ser_tick.is_valid():
            ser_tick.save(user=request.user)
            return Response(f"Ticked {ser_tick.data['uuid']}{ser_tick.data['grade']}", status=HTTP_201_CREATED)
        return Response(ser_tick.errors, status=HTTP_400_BAD_REQUEST)

