from django.urls import path
from .views import RouteAPIView

urlpatterns = [
    path('', RouteAPIView.as_view(), name="route"),
    path('<int:route_id>/', RouteAPIView.as_view(), name="route"),
]
