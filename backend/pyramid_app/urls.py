from django.urls import path
from .views import PyramidView, PyramidDetailView, UserPyramidsView

urlpatterns = [
    path('', PyramidView.as_view(), name='pyramid-list'),
    path('<int:pyramid_id>/', PyramidDetailView.as_view(), name='pyramid-detail'),
    path('user/<int:user_id>/', UserPyramidsView.as_view(), name='user-pyramids-list'),
]
