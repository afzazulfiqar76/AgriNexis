import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from PIL import Image
from io import BytesIO
from rest_framework.test import APIClient

from apps.users.models import User


def make_image(name='leaf.jpg', image_format='JPEG'):
    buffer = BytesIO()
    Image.new('RGB', (224, 224), 'green').save(buffer, format=image_format)
    return SimpleUploadedFile(name, buffer.getvalue(), content_type=f'image/{image_format.lower()}')


class AiDoctorApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='doctor@example.com', password='Test-password-123', full_name='Doctor Tester')
        self.client.force_authenticate(self.user)
        temp_media = tempfile.TemporaryDirectory()
        self.addCleanup(temp_media.cleanup)
        media_override = override_settings(MEDIA_ROOT=temp_media.name)
        media_override.enable()
        self.addCleanup(media_override.disable)

    def test_missing_image(self):
        response = self.client.post('/api/ai-doctor/predict/', {}, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_invalid_image(self):
        invalid = SimpleUploadedFile('invalid.jpg', b'not an image', content_type='image/jpeg')
        response = self.client.post('/api/ai-doctor/predict/', {'image': invalid}, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_model_not_configured(self):
        from apps.ai_doctor.services.prediction import PlantDiseasePredictionService
        PlantDiseasePredictionService._model = None
        PlantDiseasePredictionService._labels = None
        response = self.client.post(
            '/api/ai-doctor/predict/',
            {'image': make_image(), 'plant_name': 'Tomato'},
            format='multipart',
        )
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.data['error_code'], 'MODEL_NOT_CONFIGURED')

    def test_history_requires_authentication(self):
        anonymous = APIClient()
        response = anonymous.get('/api/ai-doctor/history/')
        self.assertEqual(response.status_code, 401)

    def test_invalid_plant_rejected(self):
        response = self.client.post(
            '/api/ai-doctor/predict/',
            {'image': make_image(), 'plant_name': 'Mint'},
            format='multipart',
        )
        self.assertIn(response.status_code, (400, 503))
