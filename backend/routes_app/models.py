from django.db import models
from pyramid_app.models import Pyramid


# Create your models here.
class Route(models.Model):
    # route_id is the uuid of the route on OpenBeta, which is contained in an array field of the pyramid model
    route_id = models.CharField(max_length=255)
    pyramid = models.ForeignKey(Pyramid, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    lat = models.FloatField()
    lng = models.FloatField()
    # Parent area for the route
    area = models.CharField()
    completed = models.BooleanField(default=False)
    grade = models.CharField(max_length=255)
    # Any media URL for the route from OpenBeta
    media = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"
