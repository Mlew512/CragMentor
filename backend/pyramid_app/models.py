from django.core.validators import MaxValueValidator
from django.db import models
from django.contrib.auth.models import User
from routes_app.models import Route  

# Create your models here.
class Pyramid(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    routes = models.ManyToManyField(Route)
    date_generated = models.DateTimeField(auto_now_add=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    goal_grade = models.IntegerField(validators=[MaxValueValidator(17)])

    def __str__(self):
        return f"{self.user.username}'s Pyramid"
