from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from apps.users.models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ('email',)
    list_display = (
        'email',
        'full_name',
        'role',
        'is_verified',
        'is_active',
        'is_staff',
        'created_at',
    )
    list_filter = ('role', 'is_verified', 'is_active', 'is_staff')
    search_fields = ('email', 'full_name', 'phone_number')
    readonly_fields = ('created_at', 'updated_at', 'last_login')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Profile', {'fields': ('full_name', 'phone_number', 'profile_image', 'role')}),
        (
            'Status',
            {'fields': ('is_verified', 'is_active', 'is_staff', 'is_superuser')},
        ),
        ('Permissions', {'fields': ('groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'email',
                    'full_name',
                    'password1',
                    'password2',
                    'role',
                    'phone_number',
                ),
            },
        ),
    )
