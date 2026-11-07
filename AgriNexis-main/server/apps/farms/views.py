from django.db.models import Avg, Count, Sum
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.farms.choices import FarmStatus, FarmType
from apps.farms.models import Farm
from apps.farms.serializers import FarmSerializer
from apps.users.models import UserRole

# Health score ranges used on the analytics page
HEALTH_GOOD_FROM = 80      # 80 - 100  -> "Excellent"
HEALTH_LOW_BELOW = 50      # 0 - 49    -> "Needs attention"  (50 - 79 is "Good")


def _last_months(count):
    """Return [(year, month), ...] for the last `count` months, oldest first."""
    today = timezone.localdate()
    year, month = today.year, today.month
    months = []
    for _ in range(count):
        months.append((year, month))
        month -= 1
        if month == 0:
            month = 12
            year -= 1
    return list(reversed(months))


class FarmViewSet(viewsets.ModelViewSet):
    """
    GET    /api/farms/             list my farms (admin: all farms)
    POST   /api/farms/             add a new farm            <- "Add New Farm" button
    GET    /api/farms/<id>/        one farm
    PATCH  /api/farms/<id>/        update a farm
    DELETE /api/farms/<id>/        delete a farm
    GET    /api/farms/summary/     numbers for the dashboard cards
    GET    /api/farms/analytics/   full report for my farms  <- "View Analytics" button
    """

    serializer_class = FarmSerializer

    def get_queryset(self):
        queryset = Farm.objects.select_related('owner')
        user = self.request.user
        if user.role == UserRole.ADMIN:
            return queryset
        # Normal users can only ever see their own farms
        return queryset.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        farms = Farm.objects.filter(owner=request.user, status=FarmStatus.ACTIVE)
        totals = farms.aggregate(
            active_farms=Count('id'),
            total_plants=Sum('plant_count'),
            average_health=Avg('health_score'),
        )
        return Response(
            {
                'active_farms': totals['active_farms'] or 0,
                'total_plants': totals['total_plants'] or 0,
                'average_health': round(totals['average_health'] or 0),
            }
        )

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        """
        Report for the logged-in user's own farms (admins also see only their own
        here, because this is the personal dashboard, not the admin panel).
        """
        farms = Farm.objects.filter(owner=request.user)

        # 1) Overall numbers
        totals = farms.aggregate(
            total_farms=Count('id'),
            total_plants=Sum('plant_count'),
            average_health=Avg('health_score'),
        )
        active_farms = farms.filter(status=FarmStatus.ACTIVE).count()
        total_farms = totals['total_farms'] or 0

        # 2) One row per farm type (rooftop, balcony...) - types with no farm show 0
        type_stats = {
            row['farm_type']: row
            for row in farms.values('farm_type').annotate(
                farms=Count('id'),
                plants=Sum('plant_count'),
                average_health=Avg('health_score'),
            )
        }
        by_type = []
        for value, label in FarmType.choices:
            row = type_stats.get(value)
            by_type.append(
                {
                    'farm_type': value,
                    'label': label,
                    'farms': row['farms'] if row else 0,
                    'plants': (row['plants'] or 0) if row else 0,
                    'average_health': round(row['average_health'] or 0) if row else 0,
                }
            )

        # 3) How many farms are healthy / ok / in trouble
        health_bands = {
            'excellent': farms.filter(health_score__gte=HEALTH_GOOD_FROM).count(),
            'good': farms.filter(
                health_score__gte=HEALTH_LOW_BELOW,
                health_score__lt=HEALTH_GOOD_FROM,
            ).count(),
            'needs_attention': farms.filter(health_score__lt=HEALTH_LOW_BELOW).count(),
        }

        # 4) Best farms and farms that need care
        def short(farm):
            return {
                'id': farm.id,
                'name': farm.name,
                'farm_type_display': farm.get_farm_type_display(),
                'location': farm.location,
                'plant_count': farm.plant_count,
                'health_score': farm.health_score,
            }

        top_farms = [
            short(farm) for farm in farms.order_by('-health_score', '-plant_count')[:5]
        ]
        needs_attention = [
            short(farm)
            for farm in farms.filter(health_score__lt=HEALTH_LOW_BELOW).order_by(
                'health_score'
            )[:5]
        ]

        # 5) Farms added per month (last 6 months).
        # Counted in Python on purpose: grouping by month inside MySQL needs the
        # MySQL time-zone tables, which are often missing on a Windows install.
        added_per_month = {key: 0 for key in _last_months(6)}
        for created in farms.values_list('created_at', flat=True):
            local = timezone.localtime(created)
            key = (local.year, local.month)
            if key in added_per_month:
                added_per_month[key] += 1
        monthly = [
            {'month': f'{year}-{month:02d}', 'label': _month_name(month), 'farms': count}
            for (year, month), count in added_per_month.items()
        ]

        return Response(
            {
                'totals': {
                    'total_farms': total_farms,
                    'active_farms': active_farms,
                    'inactive_farms': total_farms - active_farms,
                    'total_plants': totals['total_plants'] or 0,
                    'average_health': round(totals['average_health'] or 0),
                },
                'by_type': by_type,
                'health_bands': health_bands,
                'top_farms': top_farms,
                'needs_attention': needs_attention,
                'monthly': monthly,
            }
        )


def _month_name(month):
    names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return names[month - 1]
