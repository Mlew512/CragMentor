from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import User

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK
)

from .serializers import UserSerializer

class Master_Sign_up(APIView):
    def post(self, request):

        master_user = User.objects.create_user(**{"username":request.data["username"],"password":request.data["password"]})
        master_user.is_staff = True
        master_user.is_superuser = True
        
        try:
            master_user.save()
            token = Token.objects.create(user=master_user)
            return Response(
                {"master_username": master_user.username, "token": token.key}, status=HTTP_201_CREATED
            )
        except Exception as e:
            print(e)
            print('%s' % type(e))
            return Response(f"Error",status=HTTP_400_BAD_REQUEST)




class Sign_up(APIView):
    def post(self, request):
        # try:
            print(request.data)
            user = User.objects.create_user(**{"username":request.data["username"],"password":request.data["password"]})
            print(user)
            token = Token.objects.create(user=user)
            return Response(
                {"username": user.username, "token": token.key}, status=HTTP_201_CREATED
            )
        # except Exception as e:
        #     print(e)
        #     print('%s' % type(e))
        #     return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
class Log_in(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = None


        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "username": user.username})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(id=request.user.id)

        user_ser = UserSerializer(user)
        return Response(user_ser.data)


class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_200_OK)