# models.py
from django.db import models
from django.contrib.auth.models import User
from routes_app.models import Route 
from django.core.validators import MaxValueValidator
from django.conf import settings



class Pyramid(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    routes = models.ManyToManyField(Route,blank=True)
    date_generated = models.DateTimeField(auto_now_add=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    location = models.CharField(default="unknown", null=True, blank=True)
    goal_grade = models.IntegerField(validators=[MaxValueValidator(17)])

    def __str__(self):
        return f"{self.user.username}'s Pyramid"
