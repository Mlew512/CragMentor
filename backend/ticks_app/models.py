from django.db import models
from user_app.models import User

class Ticked_Route(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tick')
    uuid = models.CharField(max_length=255)
    mountain_id=models.CharField(blank=True,null=True)

    name = models.CharField(max_length=255, null=True)
    areaName = models.CharField(max_length=255, null=True)
    date_ticked = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    style=models.CharField()
    

    
    def __str__(self):
        return f"{self.name} was {self.style} by {self.user} on {self.date_ticked}"