from django.urls import path
from .views import TickRoute

urlpatterns = [
    path('', TickRoute.as_view(), name="tickroute")
]
