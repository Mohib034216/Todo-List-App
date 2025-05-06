from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView,
                                           )



urlpatterns = [

    path('task/',TaskViewList.as_view()),
    path('task/<int:pk>',TaskViewDetail.as_view()),
    path('user/',LoginView.as_view()),
    path('user/register/',RegisterationView.as_view()),
    path('user/otp-verify/',VerifyEmail.as_view()),
    path('user/token/',TokenObtainPairView.as_view()),
    path('user/token/refresh/',TokenRefreshView.as_view()),
    
]
 