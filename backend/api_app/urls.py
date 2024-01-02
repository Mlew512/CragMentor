from django.urls import path
from .views import OpenBetaView, GetArea, GetClimbView, CragsBounds,CragsNear, BestCragView

urlpatterns = [
    path('', OpenBetaView.as_view(), name="beta"),
    path('area/', GetArea.as_view(), name="area"),
    path('climb/', GetClimbView.as_view(), name="climb"),
    path('cragsnear/', CragsNear.as_view(), name="cragsnear"),
    path('climb-bounds/', CragsBounds.as_view(), name="climb_bounds"),
    path('best-crag/', BestCragView.as_view(), name="best_crag"),
]