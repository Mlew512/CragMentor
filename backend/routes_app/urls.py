from django.urls import path
from .views import RouteAPIView

urlpatterns = [
    path('', RouteAPIView.as_view(), name="route")
]
