from django.contrib import admin

from apps.community.models import (
    Challenge,
    ChallengeParticipation,
    ChallengeProgressEntry,
)


@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'goal', 'unit', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active', 'start_date', 'end_date')
    search_fields = ('title', 'description')
    ordering = ('-start_date', 'title')


@admin.register(ChallengeParticipation)
class ChallengeParticipationAdmin(admin.ModelAdmin):
    list_display = ('challenge', 'user', 'joined_at')
    list_filter = ('challenge', 'joined_at')
    search_fields = ('challenge__title', 'user__email', 'user__full_name')


@admin.register(ChallengeProgressEntry)
class ChallengeProgressEntryAdmin(admin.ModelAdmin):
    list_display = ('participation', 'amount', 'entry_date', 'created_at')
    list_filter = ('entry_date', 'participation__challenge')
    search_fields = (
        'participation__challenge__title',
        'participation__user__email',
        'participation__user__full_name',
    )
