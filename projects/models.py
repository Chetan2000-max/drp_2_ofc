from django.db import models
from django.conf import settings


Users = settings.AUTH_USER_MODEL

class Projects(models.Model):
    name =  models.CharField(max_length=50, blank=True)
    owner = models.ForeignKey(Users, on_delete=models.CASCADE, related_name = 'projects')
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name    