from django.db import models

# Create your models here.


class TodoList(models.Model):
    STATUS_CHOICES = (
        ('pending','PENDING'),
        ('complete','COMPLETE'),
        )
    name  = models.CharField(max_length=50,)
    status  = models.CharField(max_length=10,choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 