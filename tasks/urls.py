from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from users.views import UserViewSet
from .views import TasksViewSet


router = DefaultRouter()

# router.register(r'users', UserViewSet, basename='user')
# router.register(r'projects',ProjectViewSet, basename='projects')
router.register('tasks',TasksViewSet,)

urlpatterns = [
    # function or page urls
    path('admin/', admin.site.urls),    
    path('',include(router.urls)), 
]