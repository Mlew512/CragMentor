from django.core.validators import MaxValueValidator
from django.db import models
from django.conf import settings  # Import settings module
from routes_app.models import Route  

class Pyramid(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Use settings.AUTH_USER_MODEL
    routes = models.ManyToManyField(Route)
    date_generated = models.DateTimeField(auto_now_add=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    goal_grade = models.IntegerField(validators=[MaxValueValidator(17)])

    def __str__(self):
        return f"{self.user.username}'s Pyramid"
