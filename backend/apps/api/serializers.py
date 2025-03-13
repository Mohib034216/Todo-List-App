from django.contrib.auth import authenticate
from rest_framework import serializers
from . models import *
from django.shortcuts import get_object_or_404





class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model =  TodoList
        fields = ['id','task','status']
         

    def create(self,validated_data):
        todo = TodoList.objects.create(**validated_data)
        return todo

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model =  User
        # fields = "__all__"
        exclude = ['username','password']
    
  
    def create(self,validated_data):
        print(validated_data)
    
        user = get_object_or_404(User,**validated_data)
        return user
        

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self,data):
        user = authenticate(**data)
        if user:
            return user 
        return serializer.ValidatorError("Invalid Credentials")

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email","password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
        )
        return user