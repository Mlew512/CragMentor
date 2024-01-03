from django.db import models
from user_app.models import User

class Favorite_Route(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    uuid = models.CharField(max_length=255)

    name = models.CharField(max_length=255, null=True)
    areaName = models.CharField(max_length=255, null=True)
    date_created = models.DateTimeField(auto_now_add=True, blank=False, null=False)

    
    def __str__(self):
        return f"{self.name}"
