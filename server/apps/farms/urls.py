from rest_framework.routers import DefaultRouter

from apps.farms.views import FarmViewSet

router = DefaultRouter()
router.register('', FarmViewSet, basename='farm')

urlpatterns = router.urls
