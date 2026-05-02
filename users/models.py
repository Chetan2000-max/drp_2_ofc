from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Users(AbstractUser):
    # email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, blank=True, unique=True)
    role = models.CharField(max_length=30, 
                            choices = [
                                ("Admin","admin"),
                                ("Manager","manager"),
                                ("User","user")
                                ],default="user")
    
    def __str__(self):
        return self.username