from django.urls import path
from .views import OpenBetaView, GetArea, GetClimbView, CragsBounds,CragsNear, Countries

urlpatterns = [
    path('', OpenBetaView.as_view(), name="beta"),
    path('area/', GetArea.as_view(), name="area"),
    path('climb/', GetClimbView.as_view(), name="climb"),
    path('cragsnear/', CragsNear.as_view(), name="cragsnear"),
    path('climb-bounds/', CragsBounds.as_view(), name="climb_bounds"),
    path('countries/', Countries.as_view(), name="countries"),
]
