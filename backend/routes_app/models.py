from django.db import models

# Create your models here.
class Route(models.Model):
    # route_id is the uuid of the route on OpenBeta, which is contained in an array field of the pyramid model
    route_id = models.CharField(max_length=255,null=True, default="notaclimb")
    name = models.CharField(max_length=255)
    lat = models.FloatField(null=True)
    lng = models.FloatField(null=True)
    # pyramid = models.(to=Pyramid, null=True, blank=True)
    # Parent area for the route
    area = models.CharField(null=True)
    completed = models.BooleanField(default=False)
    grade = models.CharField(max_length=255)
    # Any media URL for the route from OpenBeta
    media = models.CharField(max_length=255, null= True)

    def __str__(self):
        return f"{self.name}"
