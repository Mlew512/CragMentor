from django.urls import path
from .views import TickRoute

urlpatterns = [
    path('route', TickRoute.as_view(), name="tickroute")
]
