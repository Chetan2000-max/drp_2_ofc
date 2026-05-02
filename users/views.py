from django.shortcuts import render
from .serializers import UserRegisterSerializer
from .models import Users
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny


# create your views here 

class UserViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [IsAuthenticated]
    

# def pro_update(self):
    