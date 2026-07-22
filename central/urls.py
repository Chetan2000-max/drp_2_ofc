"""
URL configuration for central project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from subscribe.views import PlanViewSet
from users.views import UserViewSet, api_login
from rest_framework.viewsets import ModelViewSet
from projects.views import ProjectViewSet
from tasks.views import TasksViewSet
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from accounts import views



router = DefaultRouter()

router.register(r'users', UserViewSet, basename='user')
router.register(r'projects',ProjectViewSet, basename='projects')
router.register(r'tasks', TasksViewSet, basename='tasks')
# router.register(r'plans', PlanViewSet, basename='plans')

urlpatterns = [
    # function or page urls
    path('admin/', admin.site.urls),
    path('',include('accounts.urls')),
    path('api/',include('tasks.urls')),
    # path('api/plans/',include('plans.urls')),
    path('api/new/',include(router.urls)),
    path('api/login/', api_login, name='login_api'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_api'),
        # path('login/', views.login_view, name='login'),        

]
