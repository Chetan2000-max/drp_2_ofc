from .models import Projects
from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source = 'owner.username', read_only=True)
    # permission_classes = [isAuthenticated]
    
    class Meta:
        model = Projects
        fields = '__all__'
        extra_fields = ['id','username','password']
        
        