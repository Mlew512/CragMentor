from django.urls import path
from .views import OpenBetaView

urlpatterns = [
    path('beta/', OpenBetaView.as_view(), name="openbeta"), 
]