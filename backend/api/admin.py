from django.contrib import admin
from .models import CustomUser,Task
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_superuser','is_active')
    ordering = ('email',)
    search_fields = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser')}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)


# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ['id','phone']

class TaskAdmin(admin.ModelAdmin):
    list_display = ['id','task','status']


# admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(Task,TaskAdmin)