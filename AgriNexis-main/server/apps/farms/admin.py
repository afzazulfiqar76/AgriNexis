from django.contrib import admin

from apps.farms.models import Farm


@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'owner',
        'farm_type',
        'location',
        'plant_count',
        'health_score',
        'status',
        'created_at',
    )
    list_filter = ('farm_type', 'status')
    search_fields = ('name', 'location', 'owner__email', 'owner__full_name')
    readonly_fields = ('created_at', 'updated_at')
