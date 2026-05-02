from django.shortcuts import render
from .serializers import UserRegisterSerializer
from .models import Users
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions_new import IsAdminUserRole


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status


# create your views here 

class UserViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
    
    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        elif self.action == "list":
            return [IsAdminUserRole()]
        return [IsAuthenticated()]
    
    
    
    def get_queryset(self):
            user = self.request.user
            if user.role =='admin':
                return Users.objects.all()
            return Users.objects.filter(id=user.id)

            
            
@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')   # ✅ use request.data
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            "message": "Login successful",
            "username": user.username
        })
    else:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )