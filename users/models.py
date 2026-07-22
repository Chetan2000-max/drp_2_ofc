from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Users(AbstractUser):
    # email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    role = models.CharField(max_length=30, 
                            choices = [
                                ("admin","Admin"),
                                ("manager","Manager"),
                                ("user","User")
                                ],default="user")
    is_verified = models.BooleanField(default=False)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    

    def __str__(self):
        return self.username
