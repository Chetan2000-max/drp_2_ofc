from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('reg/', views.register_view, name='register'),
    path('', views.login_view, name='login'),
    path('dash/', views.dashboard_view, name='dashboard'),
    path('logout/', views.logout_view, name='logout')
    
    
    
    # path('api/',include(router.urls)),
    # path('api/token/', TokenObtainPairView.as_view()),            DRF Views
    # path('api/token/refresh/', TokenRefreshView.as_view())        DRF Views
]
