from django.urls import path
from .views import OpenBetaView, GetArea, GetClimbView

urlpatterns = [
    path('', OpenBetaView.as_view(), name="beta"),
    path('area/', GetArea.as_view(), name="area"),
    path('climb/', GetClimbView.as_view(), name="climb"),
]
