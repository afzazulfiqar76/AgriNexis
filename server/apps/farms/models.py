from django.conf import settings
from django.core.validators import MaxValueValidator
from django.db import models
from django.utils import timezone

from apps.farms.choices import FarmStatus, FarmType


class Farm(models.Model):
    """A single urban farm (rooftop, balcony, indoor...) owned by one user."""

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='farms',
    )
    name = models.CharField(max_length=120)
    farm_type = models.CharField(
        max_length=20,
        choices=FarmType.choices,
        default=FarmType.ROOFTOP,
    )
    location = models.CharField(max_length=255, blank=True)
    plant_count = models.PositiveIntegerField(default=0)
    # Percentage 0-100, shown as the "Health Score" bar on the dashboard
    health_score = models.PositiveSmallIntegerField(
        default=100,
        validators=[MaxValueValidator(100)],
    )
    status = models.CharField(
        max_length=20,
        choices=FarmStatus.choices,
        default=FarmStatus.ACTIVE,
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.owner.email})'
