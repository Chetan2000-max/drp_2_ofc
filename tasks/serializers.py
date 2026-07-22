from .models import Tasks
from rest_framework import serializers
# from django.conf import settings
 
class TaskSerializer(serializers.ModelSerializer):
    # owner = serializers.CharField(source = 'owner.username', read_only=True)

    class Meta:
        model = Tasks
        fields = '__all__'
        read_only_fields = ['assigned_to']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.CharField(
        source='assigned_to.username',
        read_only=True
    )

    class Meta:
        model = Tasks
        fields = '__all__'