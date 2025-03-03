from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TodoList
from  .serializers import TodoListSerializer
# Create your views here.

class TodoListView(APIView):
    def get(self,request):
        Todolist = TodoList.objects.all()
        serializer  = TodoListSerializer(Todolist, many=True)
        return Response(serializer.data)

    def post(self , request):
        print(f"POST REQUEST CHALA{request.data['data']}")
        serializer = TodoListSerializer(data=request.data['data'])
        if serializer.is_valid(raise_exception=True):
            response = serializer.save()
        return Response(TodoListSerializer(response).data)


