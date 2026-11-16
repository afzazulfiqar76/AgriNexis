from django.urls import path

from apps.community.views import (
    CommunityLeaderboardView,
    ChallengeListView,
    ChallengeParticipationView,
    ChallengeProgressEntryDetailView,
    ChallengeProgressEntryListCreateView,
    CommentDetailView,
    MyChallengeParticipationListView,
    PostCommentListCreateView,
    PostDetailView,
    PostLikeView,
    PostListCreateView,
)

urlpatterns = [
    path(
        'leaderboard/',
        CommunityLeaderboardView.as_view(),
        name='community-leaderboard',
    ),
    path('challenges/', ChallengeListView.as_view(), name='community-challenge-list'),
    path(
        'challenges/my-participations/',
        MyChallengeParticipationListView.as_view(),
        name='community-my-challenge-participations',
    ),
    path(
        'challenges/<int:challenge_id>/participation/',
        ChallengeParticipationView.as_view(),
        name='community-challenge-participation',
    ),
    path(
        'challenges/<int:challenge_id>/entries/',
        ChallengeProgressEntryListCreateView.as_view(),
        name='community-challenge-entries',
    ),
    path(
        'challenges/<int:challenge_id>/entries/<int:entry_id>/',
        ChallengeProgressEntryDetailView.as_view(),
        name='community-challenge-entry-detail',
    ),
    path('posts/', PostListCreateView.as_view(), name='community-post-list'),
    path(
        'posts/<int:post_id>/',
        PostDetailView.as_view(),
        name='community-post-detail',
    ),
    path(
        'posts/<int:post_id>/like/',
        PostLikeView.as_view(),
        name='community-post-like',
    ),
    path(
        'posts/<int:post_id>/comments/',
        PostCommentListCreateView.as_view(),
        name='community-post-comments',
    ),
    path(
        'posts/<int:post_id>/comments/<int:comment_id>/',
        CommentDetailView.as_view(),
        name='community-comment-detail',
    ),
]
