from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

from django.contrib.postgres.fields import ArrayField



class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )

    # Add your additional fields here

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    
    goal = models.CharField(null=True)
    lat = models.FloatField(null=True)
    long = models.FloatField(null=True)
    distance_willing_to_travel = models.IntegerField(null=True)
    # add the ticklist here, should be a list of uuid's that the user has completed
    # ticks = ArrayField(models.CharField(max_length=100), blank=True)

    # Add related_name to avoid clashes with auth.User
    groups = models.ManyToManyField(
        "auth.Group",
        blank=True,
        related_name="user_groups",
        related_query_name="user_group",
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        blank=True,
        related_name="user_permissions",
        related_query_name="user_permission",
    )
