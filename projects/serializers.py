from .models import Projects
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated


# class ProjectSerializer(serializers.ModelSerializer):
#     owner = serializers.CharField(source = 'owner.username', read_only=True)
    
#     class Meta:
#         model = Projects
#         fields = '__all__'
#         extra_fields = ['id','username','password','name']
        
        
class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(
        source='owner.username',
        read_only=True
    )

    class Meta:
        model = Projects
        fields = ['id', 'name', 'owner', 'createdAt']