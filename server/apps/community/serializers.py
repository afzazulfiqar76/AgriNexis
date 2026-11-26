from decimal import Decimal, ROUND_HALF_UP

from django.conf import settings
from django.db.models import Sum
from django.utils import timezone
from PIL import Image, UnidentifiedImageError
from rest_framework import serializers

from apps.community.models import (
    Challenge,
    ChallengeParticipation,
    ChallengeProgressEntry,
    Comment,
    Post,
)


MAX_POST_IMAGE_SIZE = 5 * 1024 * 1024
ALLOWED_POST_IMAGE_FORMATS = {'JPEG', 'PNG', 'WEBP'}


class CommunityImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if getattr(data, 'size', 0) > MAX_POST_IMAGE_SIZE:
            raise serializers.ValidationError('Image must be 5 MB or smaller.')
        return super().to_internal_value(data)

    def to_representation(self, value):
        if not value:
            return None

        image_url = value.url
        request = self.context.get('request')
        if request and not image_url.startswith(('http://', 'https://', '//')):
            return request.build_absolute_uri(f'/{image_url.lstrip("/")}')
        return image_url


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)

    class Meta:
        model = Comment
        fields = (
            'id',
            'post',
            'author',
            'author_name',
            'content',
            'created_at',
        )
        read_only_fields = ('id', 'post', 'author', 'author_name', 'created_at')

    def validate_content(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Comment content is required.')
        return value


class PostSerializer(serializers.ModelSerializer):
    content = serializers.CharField(required=False, allow_blank=True)
    image = CommunityImageField(required=False, allow_null=True)
    remove_image = serializers.BooleanField(write_only=True, required=False)
    like_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    is_liked_by_current_user = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            'id',
            'author',
            'author_name',
            'content',
            'image',
            'remove_image',
            'created_at',
            'updated_at',
            'like_count',
            'comment_count',
            'is_liked_by_current_user',
        )
        read_only_fields = (
            'id',
            'author',
            'author_name',
            'created_at',
            'updated_at',
            'like_count',
            'comment_count',
            'is_liked_by_current_user',
        )

    def validate_content(self, value):
        return value.strip()

    def validate_image(self, value):
        if value is None:
            return value

        try:
            value.seek(0)
            with Image.open(value) as image:
                image_format = image.format
                image.verify()
        except (
            OSError,
            SyntaxError,
            UnidentifiedImageError,
            ValueError,
            Image.DecompressionBombError,
        ) as error:
            raise serializers.ValidationError('Upload a valid image file.') from error
        finally:
            value.seek(0)

        if image_format not in ALLOWED_POST_IMAGE_FORMATS:
            raise serializers.ValidationError(
                'Supported image formats are JPEG, PNG, and WEBP.'
            )
        return value

    def validate(self, attrs):
        current_content = self.instance.content if self.instance else ''
        current_image = self.instance.image if self.instance else None
        content = attrs.get('content', current_content).strip()
        image = attrs.get('image', current_image)
        remove_image = attrs.get('remove_image', False)

        if remove_image and not self.instance:
            raise serializers.ValidationError(
                {'remove_image': 'An image can only be removed from an existing post.'}
            )
        if remove_image and 'image' in attrs and attrs['image'] is not None:
            raise serializers.ValidationError(
                {'remove_image': 'Upload a replacement image or remove the current image, not both.'}
            )
        if remove_image:
            image = None

        if not content and not image:
            raise serializers.ValidationError(
                {'content': 'Post content or an image is required.'}
            )
        attrs['content'] = content
        return attrs

    def create(self, validated_data):
        validated_data.pop('remove_image', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        remove_image = validated_data.pop('remove_image', False)
        old_image = instance.image
        if remove_image:
            validated_data['image'] = None

        post = super().update(instance, validated_data)
        if old_image and (
            not post.image or old_image.name != post.image.name
        ):
            old_image.storage.delete(old_image.name)
        return post

    def get_like_count(self, obj):
        annotated_count = getattr(obj, 'like_count', None)
        if annotated_count is not None:
            return annotated_count
        return obj.likes.count()

    def get_comment_count(self, obj):
        annotated_count = getattr(obj, 'comment_count', None)
        if annotated_count is not None:
            return annotated_count
        return obj.comments.count()

    def get_is_liked_by_current_user(self, obj):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if user is None or not user.is_authenticated:
            return False
        return obj.likes.filter(user=user).exists()


class ChallengeSerializer(serializers.ModelSerializer):
    is_joined = serializers.SerializerMethodField()
    joined_members_count = serializers.SerializerMethodField()

    class Meta:
        model = Challenge
        fields = (
            'id',
            'title',
            'description',
            'goal',
            'unit',
            'start_date',
            'end_date',
            'is_active',
            'is_joined',
            'joined_members_count',
        )
        read_only_fields = fields

    def get_is_joined(self, obj):
        if hasattr(obj, 'is_joined'):
            return obj.is_joined
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        return bool(
            user
            and user.is_authenticated
            and obj.participations.filter(user=user).exists()
        )

    def get_joined_members_count(self, obj):
        if hasattr(obj, 'joined_members_count'):
            return obj.joined_members_count
        return obj.participations.count()


class ChallengeProgressEntrySerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=Decimal('0.01'),
    )

    class Meta:
        model = ChallengeProgressEntry
        fields = ('id', 'amount', 'entry_date', 'created_at', 'updated_at')
        read_only_fields = ('id', 'entry_date', 'created_at', 'updated_at')

    def validate(self, attrs):
        entry_date = attrs.get(
            'entry_date',
            self.instance.entry_date if self.instance else None,
        )
        if entry_date is not None:
            self.validate_entry_date(entry_date)
        return attrs

    def validate_entry_date(self, value):
        participation = self.context['participation']
        challenge = participation.challenge
        joined_date = timezone.localtime(participation.joined_at).date()
        if value > timezone.localdate():
            raise serializers.ValidationError(
                'Entry date cannot be later than today.'
            )
        if value < challenge.start_date or value > challenge.end_date:
            raise serializers.ValidationError(
                'Entry date must be within the challenge period.'
            )
        if value < joined_date:
            raise serializers.ValidationError(
                'Entry date cannot be before you joined this challenge.'
            )
        return value


class ChallengeParticipationSerializer(serializers.ModelSerializer):
    participation_id = serializers.IntegerField(source='id', read_only=True)
    challenge = ChallengeSerializer(read_only=True)
    joined_date = serializers.SerializerMethodField()
    progress_total = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()
    entries = serializers.SerializerMethodField()
    entries_locked = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = ChallengeParticipation
        fields = (
            'participation_id',
            'challenge',
            'joined_at',
            'joined_date',
            'progress_total',
            'progress_percentage',
            'entries',
            'entries_locked',
            'status',
        )
        read_only_fields = fields

    def _progress_total(self, obj):
        if not hasattr(obj, '_challenge_progress_total'):
            joined_date = timezone.localtime(obj.joined_at).date()
            total = obj.progress_entries.filter(
                entry_date__gte=max(joined_date, obj.challenge.start_date),
                entry_date__lte=obj.challenge.end_date,
            ).aggregate(total=Sum('amount'))['total']
            obj._challenge_progress_total = total or Decimal('0.00')
        return obj._challenge_progress_total

    def get_joined_date(self, obj):
        return timezone.localtime(obj.joined_at).date()

    def get_progress_total(self, obj):
        return str(self._progress_total(obj))

    def get_progress_percentage(self, obj):
        total = self._progress_total(obj)
        percentage = (total * Decimal('100') / obj.challenge.goal).quantize(
            Decimal('0.01'),
            rounding=ROUND_HALF_UP,
        )
        return str(percentage)

    def get_entries(self, obj):
        joined_date = timezone.localtime(obj.joined_at).date()
        entries = [
            entry
            for entry in obj.progress_entries.all()
            if max(joined_date, obj.challenge.start_date)
            <= entry.entry_date
            <= obj.challenge.end_date
        ]
        return ChallengeProgressEntrySerializer(entries, many=True).data

    def get_entries_locked(self, obj):
        return timezone.localdate() > obj.challenge.end_date

    def get_status(self, obj):
        return (
            'ended'
            if timezone.localdate() > obj.challenge.end_date
            else 'active'
        )
