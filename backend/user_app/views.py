from django.contrib.auth import authenticate
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = User.objects.filter(email=request.data["email"]).first()
        if not user:
            user = User.objects.create_user(**request.data)
        elif user:
            return Response(
                f"User {user.email} already exists", status=HTTP_400_BAD_REQUEST
            )
        token = Token.objects.create(user=user)
        return Response(
            {"id": user.id, "user": user.email, "token": token.key}, status=HTTP_201_CREATED
        )


class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"id": user.id, "user": user.email, "token": token.key}, status=HTTP_200_OK
            )
        return Response("User not found", HTTP_404_NOT_FOUND)


class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        user_serialized = UserSerializer(user)
        if user_serialized:
            return Response(user_serialized.data, HTTP_200_OK)
        return Response("User not found", HTTP_404_NOT_FOUND)

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

        user_serialized = UserSerializer(user, data=request.data, partial=True)

        if user_serialized.is_valid():
            user_serialized.save()
            return Response(user_serialized.data, status=HTTP_200_OK)
        return Response(user_serialized.errors, status=HTTP_400_BAD_REQUEST)

    