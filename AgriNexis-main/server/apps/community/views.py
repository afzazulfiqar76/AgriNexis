from calendar import monthrange
from datetime import date
from decimal import Decimal

from django.db.models import Count, Exists, OuterRef, Q, Sum, Value
from django.db.models.functions import Coalesce
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import (
    BasePermission,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.community.models import (
    Challenge,
    ChallengeParticipation,
    ChallengeProgressEntry,
    Comment,
    Like,
    Post,
)
from apps.community.serializers import (
    ChallengeParticipationSerializer,
    ChallengeProgressEntrySerializer,
    ChallengeSerializer,
    CommentSerializer,
    PostSerializer,
)

DEFAULT_CHALLENGE_TITLE = 'Water Conservation Month'
DEFAULT_CHALLENGE_GOAL = 200
DEFAULT_CHALLENGE_UNIT = 'L'


class IsPostOwner(BasePermission):
    message = 'You can only modify your own posts.'

    def has_object_permission(self, request, view, obj):
        return obj.author_id == request.user.id


class IsCommentOwner(BasePermission):
    message = 'You can only modify your own comments.'

    def has_object_permission(self, request, view, obj):
        return obj.author_id == request.user.id


class PostListCreateView(ListCreateAPIView):
    queryset = (
        Post.objects.annotate(
            like_count=Count('likes', distinct=True),
            comment_count=Count('comments', distinct=True),
        )
        .order_by('-created_at', '-id')
    )
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetailView(APIView):
    permission_classes = (IsAuthenticated, IsPostOwner)

    def get_post(self, post_id):
        post = get_object_or_404(Post, pk=post_id)
        self.check_object_permissions(self.request, post)
        return post

    def patch(self, request, post_id):
        post = self.get_post(post_id)
        serializer = PostSerializer(
            post,
            data=request.data,
            partial=True,
            context={'request': request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, post_id):
        post = self.get_post(post_id)
        image = post.image
        post.delete()
        if image:
            image.storage.delete(image.name)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentDetailView(APIView):
    permission_classes = (IsAuthenticated, IsCommentOwner)

    def get_comment(self, post_id, comment_id):
        comment = get_object_or_404(
            Comment,
            pk=comment_id,
            post_id=post_id,
        )
        self.check_object_permissions(self.request, comment)
        return comment

    def patch(self, request, post_id, comment_id):
        comment = self.get_comment(post_id, comment_id)
        serializer = CommentSerializer(
            comment,
            data=request.data,
            partial=True,
            context={'request': request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, post_id, comment_id):
        comment = self.get_comment(post_id, comment_id)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostLikeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        Like.objects.get_or_create(post=post, user=request.user)
        like_count = Like.objects.filter(post=post).count()
        return Response(
            {'liked': True, 'like_count': like_count},
            status=status.HTTP_200_OK,
        )

    def delete(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        Like.objects.filter(post=post, user=request.user).delete()
        like_count = Like.objects.filter(post=post).count()
        return Response(
            {'liked': False, 'like_count': like_count},
            status=status.HTTP_200_OK,
        )


class PostCommentListCreateView(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        post = get_object_or_404(Post, pk=self.kwargs['post_id'])
        return Comment.objects.filter(post=post).select_related('author')

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_id'])
        serializer.save(post=post, author=self.request.user)


class ChallengeListView(ListAPIView):
    serializer_class = ChallengeSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        today = timezone.localdate()
        start_date = date(today.year, today.month, 1)
        end_date = date(
            today.year,
            today.month,
            monthrange(today.year, today.month)[1],
        )
        Challenge.objects.get_or_create(
            title=DEFAULT_CHALLENGE_TITLE,
            start_date=start_date,
            defaults={
                'description': 'Save 200L water this month.',
                'goal': DEFAULT_CHALLENGE_GOAL,
                'unit': DEFAULT_CHALLENGE_UNIT,
                'end_date': end_date,
                'is_active': True,
            },
        )
        return (
            Challenge.objects.filter(
                is_active=True,
                start_date__lte=today,
                end_date__gte=today,
            )
            .annotate(
                is_joined=Exists(
                    ChallengeParticipation.objects.filter(
                        challenge=OuterRef('pk'),
                        user=self.request.user,
                    )
                ),
                joined_members_count=Count('participations', distinct=True),
            )
            .order_by('start_date', 'id')
        )


class CommunityLeaderboardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        today = timezone.localdate()
        start_date = date(today.year, today.month, 1)
        end_date = date(
            today.year,
            today.month,
            monthrange(today.year, today.month)[1],
        )
        challenge = Challenge.objects.filter(
            title=DEFAULT_CHALLENGE_TITLE,
            start_date=start_date,
            end_date=end_date,
            is_active=True,
        ).first()
        if challenge is None:
            return Response([])

        participations = (
            ChallengeParticipation.objects.filter(challenge=challenge)
            .select_related('user')
            .annotate(
                points=Coalesce(
                    Sum(
                        'progress_entries__amount',
                        filter=Q(
                            progress_entries__entry_date__gte=start_date,
                            progress_entries__entry_date__lte=end_date,
                        ),
                    ),
                    Value(Decimal('0.00')),
                ),
            )
            .order_by('-points', 'user_id')
        )
        ranked_users = [
            {
                'user_id': participation.user_id,
                'name': participation.user.full_name,
                'points': participation.points,
            }
            for participation in participations
        ]
        if not any(item['user_id'] == request.user.id for item in ranked_users):
            ranked_users.append({
                'user_id': request.user.id,
                'name': request.user.full_name,
                'points': Decimal('0.00'),
            })
        ranked_users.sort(key=lambda item: (-item['points'], item['user_id']))

        return Response([
            {
                **item,
                'rank': rank,
                'points': str(item['points']),
            }
            for rank, item in enumerate(ranked_users, start=1)
        ])


class MyChallengeParticipationListView(ListAPIView):
    serializer_class = ChallengeParticipationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        today = timezone.localdate()
        return (
            ChallengeParticipation.objects.filter(user=self.request.user)
            .filter(
                Q(
                    challenge__is_active=True,
                    challenge__start_date__lte=today,
                    challenge__end_date__gte=today,
                )
                | Q(challenge__end_date__lt=today)
            )
            .select_related('challenge')
            .prefetch_related('progress_entries')
            .order_by('challenge__start_date', 'challenge_id')
        )


class ChallengeParticipationView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, challenge_id):
        challenge = get_object_or_404(Challenge, pk=challenge_id)
        participation = get_object_or_404(
            ChallengeParticipation.objects.select_related('challenge').prefetch_related(
                'progress_entries',
            ),
            challenge=challenge,
            user=request.user,
        )
        return Response(
            ChallengeParticipationSerializer(
                participation,
                context={'request': request},
            ).data
        )

    def post(self, request, challenge_id):
        today = timezone.localdate()
        challenge = get_object_or_404(
            Challenge,
            pk=challenge_id,
            is_active=True,
            start_date__lte=today,
            end_date__gte=today,
        )
        participation, created = ChallengeParticipation.objects.get_or_create(
            challenge=challenge,
            user=request.user,
        )

        if not created:
            return Response(
                {'detail': 'You have already joined this challenge.'},
                status=status.HTTP_409_CONFLICT,
            )

        return Response(
            ChallengeParticipationSerializer(
                participation,
                context={'request': request},
            ).data,
            status=status.HTTP_201_CREATED,
        )


class ChallengeProgressEntryListCreateView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_participation(self, request, challenge_id):
        return get_object_or_404(
            ChallengeParticipation.objects.select_related('challenge'),
            challenge_id=challenge_id,
            user=request.user,
        )

    def check_entries_unlocked(self, participation):
        if timezone.localdate() > participation.challenge.end_date:
            raise PermissionDenied('Challenge progress entries are locked.')

    def post(self, request, challenge_id):
        participation = self.get_participation(request, challenge_id)
        self.check_entries_unlocked(participation)
        entry_date = timezone.localdate()
        serializer = ChallengeProgressEntrySerializer(
            data=request.data,
            context={'participation': participation},
        )
        serializer.is_valid(raise_exception=True)
        serializer.validate_entry_date(entry_date)
        entry = serializer.save(
            participation=participation,
            entry_date=entry_date,
        )
        return Response(
            ChallengeProgressEntrySerializer(entry).data,
            status=status.HTTP_201_CREATED,
        )


class ChallengeProgressEntryDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_entry(self, request, challenge_id, entry_id):
        return get_object_or_404(
            ChallengeProgressEntry.objects.select_related(
                'participation__challenge',
            ),
            pk=entry_id,
            participation__challenge_id=challenge_id,
            participation__user=request.user,
        )

    def check_entries_unlocked(self, entry):
        if timezone.localdate() > entry.participation.challenge.end_date:
            raise PermissionDenied('Challenge progress entries are locked.')

    def patch(self, request, challenge_id, entry_id):
        entry = self.get_entry(request, challenge_id, entry_id)
        self.check_entries_unlocked(entry)
        serializer = ChallengeProgressEntrySerializer(
            entry,
            data=request.data,
            partial=True,
            context={'participation': entry.participation},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, challenge_id, entry_id):
        entry = self.get_entry(request, challenge_id, entry_id)
        self.check_entries_unlocked(entry)
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
