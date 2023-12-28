from django.urls import path
from .views import OpenBetaView, GetClimbView

urlpatterns = [
    path('', OpenBetaView.as_view(), name="beta"), 
    path('climb/', GetClimbView.as_view(), name="climb"),
]
