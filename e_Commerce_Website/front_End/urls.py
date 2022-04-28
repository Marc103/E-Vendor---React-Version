
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('SignIn',index),
    path('SignUp', index),
    path('CheckOut',index)
]