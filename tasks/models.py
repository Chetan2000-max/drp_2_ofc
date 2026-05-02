from django.db import models
from django.conf import settings
# from .models import Projects
from projects.models import Projects


Users = settings.AUTH_USER_MODEL

class Tasks(models.Model):
    Status_Choices = [
        ('todo', 'Todo'),
        ('progress', 'Progress'),
        ('done','Done')
    ]
    
    title = models.CharField(max_length=100, blank=True)
    projects = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name="pro")
    assigned_to = models.ForeignKey(Users, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, choices=Status_Choices, default='todo')
    
    def __str__(self):
        return self.title
    