from django.db import transaction
from django.shortcuts import get_object_or_404
from PIL import Image, UnidentifiedImageError
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import PredictionHistory
from .serializers import PredictionHistorySerializer, PredictionUploadSerializer
from .services.prediction import (
    ModelLoadingError,
    ModelNotConfiguredError,
    PlantDiseasePredictionService,
    PredictionError,
)
from .services.remedies import SUPPORTED_PLANTS, get_disease_information

MAX_IMAGE_SIZE = 10 * 1024 * 1024
ALLOWED_IMAGE_FORMATS = {'JPEG', 'PNG'}


class PredictionView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = PredictionUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.validated_data['image']

        if getattr(image, 'size', 0) > MAX_IMAGE_SIZE:
            raise ValidationError({'image': 'Image must be 10 MB or smaller.'})

        try:
            image.seek(0)
            with Image.open(image) as opened:
                opened.verify()
                image_format = opened.format
            image.seek(0)
        except (OSError, SyntaxError, UnidentifiedImageError, ValueError, Image.DecompressionBombError):
            raise ValidationError({'image': 'Upload a valid, non-corrupted JPG or PNG image.'})

        if image_format not in ALLOWED_IMAGE_FORMATS:
            raise ValidationError({'image': 'Only JPG and PNG image formats are supported.'})

        supplied_plant = serializer.validated_data.get('plant_name', '').strip()
        if supplied_plant:
            if supplied_plant not in SUPPORTED_PLANTS:
                return Response(
                    {
                        'success': False,
                        'error_code': 'UNSUPPORTED_PLANT',
                        'message': 'Choose one of: Coriander, Tomato, Green Chillies, Rose, or Marigold.',
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        try:
            result = PlantDiseasePredictionService.predict(image)
        except ModelNotConfiguredError as exc:
            return Response(
                {
                    'success': False,
                    'error_code': 'MODEL_NOT_CONFIGURED',
                    'message': str(exc),
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        except (ModelLoadingError, PredictionError) as exc:
            return Response(
                {
                    'success': False,
                    'error_code': 'PREDICTION_UNAVAILABLE',
                    'message': str(exc),
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        if supplied_plant:
            result['plant_name'] = supplied_plant

        remedy = get_disease_information(result['disease_name'])
        treatment = remedy['treatment']
        prevention = remedy['prevention']
        warning = ''
        if result['confidence_level'] == 'Low':
            warning = 'Low confidence: please upload a clearer, well-lit image of the affected leaf.'

        try:
            with transaction.atomic():
                record = PredictionHistory.objects.create(
                    user=request.user,
                    image=image,
                    plant_name=result['plant_name'],
                    predicted_disease=result['disease_name'],
                    confidence_score=result['confidence_score'],
                    confidence_level=result['confidence_level'],
                    treatment=treatment,
                    prevention=prevention,
                    warning=warning,
                )
        except Exception:
            return Response(
                {
                    'success': False,
                    'error_code': 'DATABASE_ERROR',
                    'message': 'The prediction could not be saved. Please try again.',
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                'success': True,
                'id': record.id,
                'plant_name': record.plant_name,
                'disease_name': record.predicted_disease,
                'confidence_score': record.confidence_score,
                'confidence_level': record.confidence_level,
                'treatment': treatment,
                'prevention': prevention,
                'warning': warning,
                'message': 'Analysis completed successfully',
                'image_url': PredictionHistorySerializer(record, context={'request': request}).data['image_url'],
            },
            status=status.HTTP_200_OK,
        )


class HistoryListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        records = PredictionHistory.objects.filter(user=request.user)
        return Response(PredictionHistorySerializer(records, many=True, context={'request': request}).data)


class HistoryDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        record = get_object_or_404(PredictionHistory, pk=id, user=request.user)
        return Response(PredictionHistorySerializer(record, context={'request': request}).data)


class DiseaseInformationView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        from .models import DiseaseInformation

        records = DiseaseInformation.objects.filter(is_active=True)
        return Response(
            {
                'supported_plants': list(SUPPORTED_PLANTS),
                'diseases': [
                    {
                        'plant_name': item.plant_name,
                        'disease_name': item.disease_name,
                        'symptoms': item.symptoms,
                        'treatment': item.treatment,
                        'prevention': item.prevention,
                    }
                    for item in records
                ],
            }
        )
