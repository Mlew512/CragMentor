from django.urls import path
from .views import All_Ticks, A_Tick, Create_Tick

urlpatterns = [
    path('', All_Ticks.as_view(), name='Ticks'),
    path("tick", Create_Tick.as_view(), name="post_Tick"),
    path("tick/<str:id>", A_Tick.as_view(), name="get_delete_Tick"),
]