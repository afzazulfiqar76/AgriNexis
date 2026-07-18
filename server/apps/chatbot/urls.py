"""Thin Django URL include that delegates to ai-services/chatbot."""

from django.urls import include, path

urlpatterns = [
    path('', include('chatbot.urls')),
]
