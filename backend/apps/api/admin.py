from django.contrib import admin
from .models import TodoList

# Register your models here.

class TodoListAdmin(admin.ModelAdmin):
    fields= ['name','status',]

admin.site.register(TodoList,TodoListAdmin)