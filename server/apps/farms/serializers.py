from rest_framework import serializers

from apps.farms.models import Farm


class FarmSerializer(serializers.ModelSerializer):
    # Extra read-only fields so the frontend does not need a second request
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)
    farm_type_display = serializers.CharField(
        source='get_farm_type_display',
        read_only=True,
    )

    class Meta:
        model = Farm
        fields = (
            'id',
            'name',
            'farm_type',
            'farm_type_display',
            'location',
            'plant_count',
            'health_score',
            'status',
            'owner',
            'owner_name',
            'created_at',
            'updated_at',
        )
        # The owner always comes from the logged-in user, never from the request body
        read_only_fields = ('id', 'owner', 'created_at', 'updated_at')

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Farm name is required.')

        # One user should not end up with two farms that have the same name
        owner = self.instance.owner if self.instance else self.context['request'].user
        same_name = Farm.objects.filter(owner=owner, name__iexact=value)
        if self.instance is not None:
            same_name = same_name.exclude(pk=self.instance.pk)
        if same_name.exists():
            raise serializers.ValidationError('You already have a farm with this name.')
        return value
