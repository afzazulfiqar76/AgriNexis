from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from chatbot.ai_config import openai_api_key_configured
from chatbot.serializers import ChatRequestSerializer
from chatbot.service import generate_chat_response
from chatbot.utils import AIServiceError

MODEL_UNAVAILABLE_DETAIL = 'The model is currently unavailable. Please try again later.'


class ChatView(APIView):
    """POST /api/chat/ — AgriNexis Assistant. GET returns health (model readiness)."""

    authentication_classes: list = []
    permission_classes = [AllowAny]

    def get(self, request):
        # Online only when OpenAI is configured; route-up alone is not enough.
        if not openai_api_key_configured():
            return Response(
                {
                    'status': 'unavailable',
                    'service': 'agrinexis-chat',
                    'ai_ready': False,
                    'detail': MODEL_UNAVAILABLE_DETAIL,
                    'error_code': 'AI_UNAVAILABLE',
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return Response(
            {'status': 'ok', 'service': 'agrinexis-chat', 'ai_ready': True},
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        ser = ChatRequestSerializer(data=request.data)
        if not ser.is_valid():
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

        message = ser.validated_data['message']
        history = ser.validated_data.get('history') or []
        try:
            result = generate_chat_response(message, history=history)
        except AIServiceError as exc:
            payload = {'detail': exc.user_message}
            if exc.error_code:
                payload['error_code'] = exc.error_code
            return Response(payload, status=exc.status_code)

        return Response(
            {'response': result.text, 'intent': result.intent},
            status=status.HTTP_200_OK,
        )
