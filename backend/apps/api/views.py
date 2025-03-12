from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TodoList
from django.contrib.auth.models import User
from  .serializers import TodoListSerializer, UserListSerializer
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


class TodoListDetailView(APIView):
    def get(self, request):
        Todolist = TodoList.objects.all()

    def put(self,request,pk):
        """ Update an existing task"""
        task = get_object_or_404(TodoList, id=pk)
        serializer = TodoListSerializer(task,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Task Sucessfully Updated","data":TodoListSerializer(serializer.data).data})
            # task.status = "complete"
            # task.save()
        return Response(TodoListSerializer(serializer.data).error)

    def delete(self, request, pk):
        """ Delete a task"""
        task = get_object_or_404(TodoList, id=pk)
        task.delete()
        return Response({"message":"Task Sucessfully Remove"})


class UserListView(APIView):
        
    def get(self, request):
        Userlist = User.objects.all()
        print(Userlist)
        serializer = UserListSerializer(Userlist,many=True)
        return Response({"message":"Fetched Data","data":serializer.data})

class UserDetailView(APIView):
    def post(self,request):
        return render({"message":"User Insertd"})