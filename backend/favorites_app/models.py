from django.db import models
from user_app.models import User

class Favorite_Route(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    data_id = models.IntegerField()



    TYPE_OPTIONS = [
        ("Route", "Route"),
        ("Area", "Area"),
    ]

    data_type = models.CharField(choices=TYPE_OPTIONS)
    name = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True, blank=False, null=False)

    
    def __str__(self):
        return f"{self.name}"
