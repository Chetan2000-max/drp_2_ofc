from django.shortcuts import render
from .models import Tasks
from .serializers import TaskSerializer
from rest_framework.viewsets import ModelViewSet
import requests
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# Create your views here.

class TasksViewSet(ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
     
    filter_backends= [DjangoFilterBackend,SearchFilter,OrderingFilter]
    fielterset_fields = ['status','projects']
    search_fields = ['title']
    ordering_fields = ['id','title']
    
    
    def perform_create(self, serializer):
        serializer.save(assigned_to=self.request.user)
    
    




# class Backend:
#     name = "Sachin"
#     title = "bisleri_untold"
#     project = "bisleri_projects"
#     mobilenumber = 9876543210
    
#     def get_d(self, ):
#         data = {
#             "username":"soooraj",
#             "password":"soooraj890",
#             "email":"soooraj890@gmail.com",
#         }
        
#         url = requests.post("http://127.0.0.1:8000/api/tasks/",json=data)
#         print(url.json())