from django.urls import path
from .views import TodoListView, TodoListDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', TodoListView.as_view(),name="todo"),
    path('task/<int:pk>/', TodoListDetailView.as_view(),name="tododetail"),
    path('token/', TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/Refresh/', TokenRefreshView.as_view(),name='token_refresh'),


]
