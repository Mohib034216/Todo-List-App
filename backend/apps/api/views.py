from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import TodoList
from django.contrib.auth.models import User
from  .serializers import TodoListSerializer, UserListSerializer, LoginSerializer, SignupSerializer
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
        
    def post(self, request):
        serialize = UserListSerializer(request)
        if serialize.is_valid():
            serialize.save()
            return Response({"message":"Fetched Data","data":UserListSerializer(serialize,many=True).data})
        
        # serializer = UserListSerializer(Userlist,many=True)
        return Response({"message":"Something went wrong"})


class UserDetailView(APIView):
    def get(self, request, pk):
        Userlist = User.objects.get(pk=pk)
        print(Userlist)
        serializer = UserListSerializer(Userlist,many=True)
        return Response({"message":"Fetched Data","data":serializer.data})

    def post(self,request):
        return render({"message":"User Insertd"})



class UserLogin(APIView):
    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user =  serializer.validated_data
            print(user)
            token, created = Token.objects.get_or_create(user=user)
            return  Response({"message":"Login successfully !",'token':token.key})
        return Response(serializer.errors)

class UserSignup(APIView):
    def post(self,request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user =  serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return  Response({"message":"Account successfully Created ",'token':token.key})
        return Response(serializer.errors)