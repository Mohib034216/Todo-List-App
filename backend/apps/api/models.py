from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class TodoList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    STATUS_CHOICES = (
        ('pending','PENDING'),
        ('complete','COMPLETE'),
        )
    task  = models.CharField(max_length=50,)
    status  = models.CharField(max_length=10,choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.task 