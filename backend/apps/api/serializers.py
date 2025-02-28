from rest_framework import serializers
from . models import *




class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model =  TodoList
        fields = ['id','task','status']