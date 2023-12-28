from django.urls import path
from .views import OpenBetaView, GetArea

urlpatterns = [
    path('', OpenBetaView.as_view(), name="beta"),
    path('area', GetArea.as_view(), name="area"),
]