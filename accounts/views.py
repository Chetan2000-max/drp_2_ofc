from django.shortcuts import render,redirect
from django.contrib.auth import login, logout
import requests
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
# from django.conf import settings
from django.contrib.auth.decorators import login_required
from projects.views import Projects
from tasks.views import Tasks

User = get_user_model()

# Create your views here.

def register_view(request):
    if request.method=='POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        
        
        if password != password2:
            messages.error(request, 'both passwords must be match/same')
            return render(request, 'register.html',{'form':request.POST})
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'user is already exists')
            return render(request, 'register.html',{'form':request.POST})
        
        try:
            user = User.objects.create_user(username=username, 
                                            password=password2, 
                                            email=email
                                            )
            user.save()
            messages.success(request, 'user successfully created!')
            return render(request,'register.html')
            
            
        except Exception as e:
            messages.error(request, 'something went wrong')
            print(e)
            return render(request,'register.html', {'form':request.POST})  
        
    return render(request, 'register.html', {'form':request.POST})


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, "u were successfully logged in !") 
            return redirect('dashboard')
        
        else:
            messages.error(request, 'not found man ur account!!!')
            return render(request, 'login.html')
        
    return render(request, 'login.html')


@login_required(login_url='login')
def dashboard_view(request):
    messages.success(request, "welcome to the dashboard")
    projects = Projects.objects.filter(owner=request.user)
    tasks = Tasks.objects.filter(assigned_to=request.user)
    
    return render(request, 'dashboard.html',{
        "projects":projects.count(),
        "tasks":tasks.count(),
        "completed":tasks.filter(status='Done').count()
    })
    
    
def logout_view(request):
    logout(request)
    messages.success(request, 'u were logged out sir')
    return redirect('login')

