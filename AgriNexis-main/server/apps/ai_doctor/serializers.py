from rest_framework import serializers

from .models import PredictionHistory


class PredictionUploadSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)
    plant_name = serializers.CharField(required=False, allow_blank=True, max_length=100)


class PredictionHistorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PredictionHistory
        fields = (
            'id', 'image_url', 'plant_name', 'predicted_disease',
            'confidence_score', 'confidence_level', 'treatment', 'prevention',
            'warning', 'created_at',
        )
        read_only_fields = fields

    def get_image_url(self, obj):
        if not obj.image:
            return None
        request = self.context.get('request')
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class DiseaseInformationSerializer(serializers.Serializer):
    plant_name = serializers.CharField()
    disease_name = serializers.CharField()
    symptoms = serializers.ListField(child=serializers.CharField())
    treatment = serializers.ListField(child=serializers.CharField())
    prevention = serializers.ListField(child=serializers.CharField())
