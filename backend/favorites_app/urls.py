from django.urls import path
from .views import All_Favorites, An_Favorite, Create_Favorite

urlpatterns = [
    path('', All_Favorites.as_view(), name='favorites'),
    path("favorite", Create_Favorite.as_view(), name="post_favorite"),
    path("favorite/<str:id>", An_Favorite.as_view(), name="get_delete_fav"),
]