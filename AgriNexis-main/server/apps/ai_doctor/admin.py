from django.contrib import admin

from .models import DiseaseInformation, PredictionHistory


@admin.register(PredictionHistory)
class PredictionHistoryAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user', 'plant_name', 'predicted_disease',
        'confidence_score', 'confidence_level', 'created_at',
    )
    list_filter = ('confidence_level', 'plant_name', 'created_at')
    search_fields = ('plant_name', 'predicted_disease', 'user__email')


@admin.register(DiseaseInformation)
class DiseaseInformationAdmin(admin.ModelAdmin):
    list_display = ('plant_name', 'disease_name', 'is_active')
    list_filter = ('plant_name', 'is_active')
    search_fields = ('plant_name', 'disease_name')
