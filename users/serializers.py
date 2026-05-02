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



class UserRegisterSerializer(serializers.ModelSerializer):
    # role = serializers.CharField(source = 'user.role')
    class Meta:
        model = Users
                # fields = '__all__'
        fields = ['username','email','password','role']

        







        
    def create(self, validated_data):
        user = Users.objects.create_user(**validated_data)
        role =  validated_data.pop('role')
        user.is_active = False
        user.save()
            
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
            
            
        activation_link = f"http://127.0.0.1:8000/api/activate/{uid}/{token}/"
            
        send_mail(
            "activatate your account",
            f"click_here:{activation_link}",
            "chets123@gmail.com",
            [user.email]
        )

        return user
