from django.shortcuts import render
from .models import Projects
from .serializers import ProjectSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny



# Create your views here.

class ProjectViewSet(ModelViewSet):    
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        
        print("USER:", self.request.user)
        print("AUTH:", self.request.auth)
        print("ROLE:", self.request.user.role)
        return Projects.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        print("userrrrr",self.request.user)
        print("authentication successful", self.request.auth)
        
    
