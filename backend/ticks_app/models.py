from django.db import models
from user_app.models import User

class Ticked_Route(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tick')
    uuid = models.CharField(max_length=255)
    mountain_id=models.CharField(blank=True,null=True)

    name = models.CharField(max_length=255, null=True)
    grade = models.CharField(max_length=255, null=True)
    areaName = models.CharField(max_length=255, null=True)
    date_ticked = models.DateTimeField(blank=False, null=False)
    style=models.CharField(null=True, blank=True)
    notes=models.CharField(null=True,blank=True)
    rating=models.IntegerField(blank=True, null=True)
    type=models.CharField(null=True, blank=True)
    lat=models.CharField(null=True, blank=True)
    long=models.CharField(null=True, blank=False)
    

    
    def __str__(self):
        return f"{self.name} was {self.style} on {self.date_ticked}"