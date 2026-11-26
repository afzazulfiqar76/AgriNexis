from django.urls import path

from .views import DiseaseInformationView, HistoryDetailView, HistoryListView, PredictionView

urlpatterns = [
    path('predict/', PredictionView.as_view(), name='ai-doctor-predict'),
    path('history/', HistoryListView.as_view(), name='ai-doctor-history'),
    path('history/<int:id>/', HistoryDetailView.as_view(), name='ai-doctor-history-detail'),
    path('diseases/', DiseaseInformationView.as_view(), name='ai-doctor-diseases'),
]
