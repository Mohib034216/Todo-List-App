import random
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, EmailValidator 
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


# Create your models here.

phone_validator = RegexValidator(
    regex=r'^\d{11}$',
    message="Phone number must be exactly 11 digits."
)
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser,PermissionsMixin):
    phone  = models.CharField(max_length=11,validators=[phone_validator])
    email = models.EmailField(unique=True,max_length=155)
    username = models.CharField(max_length=100,unique=True)
    is_staff = models.BooleanField(default=False)
    is_active =models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  
    user_registere_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

    objects = UserManager()

    USERNAME_FIELD =  "email"
    


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=166)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.full_name


class OTP(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    count_attempt = models.IntegerField(default=0)



    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=10)

    def generate_otp(self):
        self.code = str(random.randint(10000,999999))
        self.created_at = timezone.now()
        self.is_verfied = False
        self.count_attempt = 0
        self.save() 

    def verifing_otp(self,code):
        if not is_expired():
            if self.code == code:
                return True
        else:
            return "OTP is Expired!"



class Task(models.Model):
    STATUS_CHOICES = (
        ("PENDING","pending"),
        ("FINISHED","finished"),
     )

    user  = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    status = models.CharField(default='PENDING',max_length=50,choices=STATUS_CHOICES)
    task = models.CharField(max_length=250)
    updated_at = models.DateField(auto_now=True)
    created_at = models.DateField(auto_now_add=True)