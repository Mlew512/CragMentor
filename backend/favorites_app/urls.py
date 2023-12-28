from django.urls import path
from .views import All_Favorites, An_Favorite

urlpatterns = [
    path('', All_Favorites.as_view(), name='favorites'),
    path("favorite/<int:id>", An_Favorite.as_view(), name="favorite"),
]