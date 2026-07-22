from django.shortcuts import render
from .serializers import UserRegisterSerializer
from .models import Users
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions_new import IsAdminUserRole
import requests

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# create your views here 

@method_decorator(csrf_exempt, name='dispatch')
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
            if not user or not user.is_authenticated:
                return Users.objects.none()
            if getattr(user, "role", None) == 'admin':
                return Users.objects.all()
            print(user)
            print(user.id)
            return Users.objects.filter(id=user.id)

            
@csrf_exempt
@api_view(['POST']) 
def api_login(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user:

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "role": user.role,
            "is_active": user.is_active
        })

    return Response(
        {"error": "Invalid Credentials"},
        status=401
    )
    
    
# @csrf_exempt
# @api_view(['POST'])
# def api_login(request):

#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = authenticate(
#         username=username,
#         password=password
#     )

#     if user:

#         # Call external API here
#         url = "http://127.0.0.1:8000/api/login/"

#         payload = {
#             "username": username
#         }

#         api_response = requests.post(url, json=payload)

#         external_data = api_response.json()

#         refresh = RefreshToken.for_user(user)

#         return Response({
#             "access": str(refresh.access_token),
#             "refresh": str(refresh),
#             "username": user.username,
#             "role": user.role,
#             "external_data": external_data
#         })

#     return Response(
#         {"error": "Invalid Credentials"},
#         status=401
#     )