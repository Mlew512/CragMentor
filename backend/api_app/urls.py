from django.urls import path
from .views import OpenBetaView

urlpatterns = [
    path('', OpenBetaView.as_view(), name="beta"), 
]