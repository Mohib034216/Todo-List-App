from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.authtoken.models import Token
# from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, OTPVerificationSerializer, CustomLoginSerializer,TaskSerializer, TaskDetailSerializer, TaskListSerializer
from .models import CustomUser, OTP, Task
from .utils import send_simple_email

# Create your views here.


class TaskViewList(APIView):
    def get(self,request):
        task = Task.objects.filter(user=request.user)
        serializer = TaskListSerializer(task, many=True)
        return Response({"task":serializer.data})

    def post(self,request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            todo = serializer.save(user=request.user)
        return Response(TaskListSerializer(todo).data)
    

class TaskViewDetail(APIView):

    def get(self, request, email):
        pass
        # task = Task.objects.filter(user__email=email)
        # serializer = TaskListSerializer(task, many=True)
        # return Response({"task":serializer.data})

    def delete(self,request,pk):
        # todo = get_object_or_404(Todo, pk=pk, user=request.user)
        task = get_object_or_404(Task,pk=pk,user=request.user)
        task_id = task.id
        task.delete()
        return Response(task_id)

    def put(self, request, pk):
        # print(request.data)
        task = get_object_or_404(Task,pk=pk,user=request.user)
        serializer = TaskDetailSerializer(task,data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(TaskListSerializer(task).data)
        return Response(serializer.errors)


class LoginView(APIView):
    def post(self, request):
        serializer = CustomLoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors)
        # serializer.is_valid(raise_exception=True)
        
        user =  serializer.validated_data['user']

        # # JWT Token for user 
        refresh_token = RefreshToken.for_user(user)
        access_token = str(refresh_token.access_token)

        # # JSON data Response
        return Response({
            "refresh":str(refresh_token),
            "access":access_token,
            "user_id":user.id,
            "user_email":user.email
        })



class RegisterationView(APIView):
    def post(self,request):
        data = request.data
        print(data)
        try:
            user = CustomUser.objects.get(email=data['email'])
        
            if user:
                return Response({"message":"Email already Registered!"})
        except CustomUser.DoesNotExist:
            
            serializer = RegisterSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                
                # Sending OTP via Email
                user = CustomUser.objects.get(email=data['email'])
                user_otp = OTP.objects.get(user=user)
                subject = "Your OTP Code for Verification"
                message = ("Dear User,\n\n"
                    f"Your One-Time Password (OTP) is: {user_otp.code}\n\n"
                    "Please enter this code to complete your verification.\n\n"
                    "This OTP is valid for 10 minutes.\n\n"
                    "If you did not request this, please ignore this email.\n\n"
                    "Thank you for signing up.\n")
                recipient_list = [data.get('email')]
                send_simple_email(subject, message, recipient_list)
                
                return Response({"email":user.email,"message":"Verify Email OTP Send"})
        return Response({"message":"Some is wrong!"})


class VerifyEmail(APIView):
    def post(self,request):
        serializer = OTPVerificationSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message":"OTP Verifies Successfully."})
        return Response({"message":"Invalid OTP","error":serializer.errors})
        

