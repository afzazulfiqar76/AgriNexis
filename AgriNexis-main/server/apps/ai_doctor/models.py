from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone


class DiseaseInformation(models.Model):
    plant_name = models.CharField(max_length=100)
    disease_name = models.CharField(max_length=200)
    symptoms = models.JSONField(default=list, blank=True)
    treatment = models.JSONField(default=list, blank=True)
    prevention = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('plant_name', 'disease_name')
        constraints = [
            models.UniqueConstraint(
                fields=('plant_name', 'disease_name'),
                name='unique_ai_doctor_disease',
            )
        ]

    def __str__(self):
        return f'{self.plant_name} - {self.disease_name}'


class PredictionHistory(models.Model):
    CONFIDENCE_HIGH = 'High'
    CONFIDENCE_MEDIUM = 'Medium'
    CONFIDENCE_LOW = 'Low'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ai_doctor_predictions',
    )
    image = models.ImageField(upload_to='ai-doctor/predictions/')
    plant_name = models.CharField(max_length=100, default='Unknown')
    predicted_disease = models.CharField(max_length=200)
    confidence_score = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    confidence_level = models.CharField(
        max_length=10,
        choices=(
            (CONFIDENCE_HIGH, 'High'),
            (CONFIDENCE_MEDIUM, 'Medium'),
            (CONFIDENCE_LOW, 'Low'),
        ),
    )
    treatment = models.JSONField(default=list, blank=True)
    prevention = models.JSONField(default=list, blank=True)
    warning = models.CharField(max_length=500, blank=True, default='')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('-created_at', '-id')

    def __str__(self):
        return f'{self.user.email}: {self.predicted_disease} ({self.confidence_score:.1f}%)'
