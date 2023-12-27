from django.urls import path
from .views import Sign_up, Log_in, Log_out, Info,Master_Sign_up

urlpatterns = [
    path('master/signup/', Master_Sign_up.as_view(), name='master_signup'),
    path('signup/', Sign_up.as_view(), name='signup'),
    path("login/", Log_in.as_view(), name="login"),
    path("logout/", Log_out.as_view(), name="logout"),
    path("info/", Info.as_view(), name="info")
]