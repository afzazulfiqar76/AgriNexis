from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import F, Q
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='community_posts',
    )
    content = models.TextField(blank=True, default='')
    image = models.ImageField(
        upload_to='community/posts/',
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Post by {self.author.email} ({self.pk})'


class Like(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='likes',
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='community_likes',
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('post', 'user'),
                name='unique_community_post_like',
            ),
        ]

    def __str__(self):
        return f'Like by {self.user.email} on post {self.post_id}'


class Comment(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments',
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='community_comments',
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at', 'id']

    def __str__(self):
        return f'Comment by {self.author.email} on post {self.post_id}'


class Challenge(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    goal = models.DecimalField(max_digits=12, decimal_places=2)
    unit = models.CharField(max_length=20, default='L')
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('start_date', 'id')
        constraints = [
            models.CheckConstraint(
                condition=Q(goal__gt=0),
                name='community_challenge_positive_goal',
            ),
            models.CheckConstraint(
                condition=Q(end_date__gte=F('start_date')),
                name='community_challenge_valid_dates',
            ),
            models.UniqueConstraint(
                fields=('title', 'start_date'),
                name='unique_community_challenge_title_start',
            ),
        ]

    def clean(self):
        super().clean()
        errors = {}
        if self.goal is not None and self.goal <= 0:
            errors['goal'] = 'Challenge goal must be greater than zero.'
        if self.start_date and self.end_date and self.end_date < self.start_date:
            errors['end_date'] = 'Challenge end date cannot be before its start date.'
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return self.title


class ChallengeParticipation(models.Model):
    challenge = models.ForeignKey(
        Challenge,
        on_delete=models.CASCADE,
        related_name='participations',
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='community_challenge_participations',
    )
    joined_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('joined_at', 'id')
        constraints = [
            models.UniqueConstraint(
                fields=('challenge', 'user'),
                name='unique_community_challenge_participation',
            ),
        ]

    def __str__(self):
        return f'{self.user.email} participating in {self.challenge}'


class ChallengeProgressEntry(models.Model):
    participation = models.ForeignKey(
        ChallengeParticipation,
        on_delete=models.CASCADE,
        related_name='progress_entries',
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    entry_date = models.DateField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-entry_date', '-id')
        constraints = [
            models.CheckConstraint(
                condition=Q(amount__gt=0),
                name='community_challenge_entry_positive_amount',
            ),
        ]

    def __str__(self):
        return f'{self.amount} {self.participation.challenge.unit} on {self.entry_date}'