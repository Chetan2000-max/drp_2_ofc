from .models import Users
from rest_framework import serializers
from django.contrib.auth import get_user_model

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import requests 


Users = get_user_model()
token_generator = PasswordResetTokenGenerator()



# class UserRegisterSerializer(serializers.ModelSerializer):
#     # role = serializers.CharField(source = 'user.role')
#     class Meta:
#         model = Users
#                 # fields = '__all__'
#         fields = ['username','email','password','role']
#         extra_kwargs = {
#             "password":{"write_only":True}
#             }
        
#         def new_get(self, validated_data):
#             user = Users.objects.create(**validated_data)
#             user.set_password(validated_data['password'])   # hiding the passwords
#             user.save()
#             return user
        
      
        


class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ["username", "email", "password", "role", "is_active","mobile_number"]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):
        user = Users.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data.get("role", "user"),
            mobile_number=validated_data.get("mobile_number")
        )

        return user

    def profile_update(self, instace, validated_data):
        instace.username = validated_data.get("username", instace.username)
        instace.email = validated_data.get("email", instace.email)
        instace.mobilenumber = validated_data.get("mobile_number", instace.mobile_number)
    


        
    # def create(self, validated_data):
    #     user = Users.objects.create_user(**validated_data)
    #     role =  validated_data.pop('role')
    #     user.is_active = False
    #     user.save()
            
    #     uid = urlsafe_base64_encode(force_bytes(user.pk))
    #     token = token_generator.make_token(user)
            
            
    #     activation_link = f"http://127.0.0.1:8000/api/activate/{uid}/{token}/"
            
    #     send_mail(
    #         "activatate your account",
    #         f"click_here:{activation_link}",
    #         "chets123@gmail.com",
    #         [user.email]
    #     )

    #     return user
