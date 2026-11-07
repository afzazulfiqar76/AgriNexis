from django.db import models


class FarmType(models.TextChoices):
    ROOFTOP = 'ROOFTOP', 'Rooftop'
    BALCONY = 'BALCONY', 'Balcony'
    INDOOR = 'INDOOR', 'Indoor'
    COMMUNITY = 'COMMUNITY', 'Community'


class FarmStatus(models.TextChoices):
    ACTIVE = 'ACTIVE', 'Active'
    INACTIVE = 'INACTIVE', 'Inactive'
