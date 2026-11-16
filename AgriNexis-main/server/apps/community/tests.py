import tempfile
from calendar import monthrange
from datetime import timedelta
from decimal import Decimal
from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.test.utils import override_settings
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from PIL import Image
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.test import APIClient

from apps.community.models import (
    Challenge,
    ChallengeParticipation,
    ChallengeProgressEntry,
    Comment,
    Like,
    Post,
)
from apps.community.serializers import (
    MAX_POST_IMAGE_SIZE,
    ChallengeProgressEntrySerializer,
    CommentSerializer,
    PostSerializer,
)
from apps.users.models import User


def make_uploaded_image(name='garden.png', image_format='PNG'):
    image_buffer = BytesIO()
    Image.new('RGB', (4, 4), color='green').save(image_buffer, format=image_format)
    return SimpleUploadedFile(
        name,
        image_buffer.getvalue(),
        content_type=f'image/{image_format.lower()}',
    )


class CommunityPostApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='farmer@example.com',
            password='Valid-test-password-123',
            full_name='Test Farmer',
        )
        self.url = '/api/community/posts/'

    def test_anonymous_user_cannot_list_posts(self):
        Post.objects.create(author=self.user, content='Garden tip')

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)

    def test_post_api_returns_accurate_comment_count(self):
        post = Post.objects.create(author=self.user, content='Garden tip')
        Comment.objects.create(post=post, author=self.user, content='First')
        Comment.objects.create(post=post, author=self.user, content='Second')
        Like.objects.create(post=post, user=self.user)
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['comment_count'], 2)
        self.assertEqual(response.data[0]['like_count'], 1)

    def test_comment_count_is_read_only(self):
        serializer = PostSerializer(data={
            'content': 'Garden tip',
            'comment_count': 99,
        })

        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data, {'content': 'Garden tip'})

    def test_anonymous_user_cannot_create_post(self):
        response = self.client.post(
            self.url,
            {'content': 'Garden tip'},
            format='json',
        )

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Post.objects.count(), 0)

    def test_authenticated_user_creates_post_as_themselves(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            self.url,
            {'content': 'Garden tip'},
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        post = Post.objects.get()
        self.assertEqual(post.author, self.user)
        self.assertEqual(post.content, 'Garden tip')
        self.assertFalse(post.image)
        self.assertEqual(response.data['author_name'], 'Test Farmer')
        self.assertFalse(response.data['is_liked_by_current_user'])

    def test_posts_are_returned_newest_first(self):
        now = timezone.now()
        older = Post.objects.create(
            author=self.user,
            content='Older',
            created_at=now - timedelta(minutes=1),
        )
        newer = Post.objects.create(
            author=self.user,
            content='Newer',
            created_at=now,
        )
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            [item['id'] for item in response.data],
            [newer.id, older.id],
        )

    def test_serializer_requires_content_and_ignores_read_only_input(self):
        serializer = PostSerializer(data={
            'id': 123,
            'author': self.user.id,
            'content': 'Garden tip',
            'created_at': timezone.now().isoformat(),
            'updated_at': timezone.now().isoformat(),
        })

        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data, {'content': 'Garden tip'})

        for field in ('id', 'author', 'created_at', 'updated_at'):
            with self.subTest(field=field):
                self.assertTrue(serializer.fields[field].read_only)

        missing_content = PostSerializer(data={})
        self.assertFalse(missing_content.is_valid())
        self.assertIn('content', missing_content.errors)


class CommunityPostImageApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='image-poster@example.com',
            password='Valid-test-password-123',
            full_name='Image Poster',
        )
        self.url = '/api/community/posts/'
        self.client.force_authenticate(user=self.user)
        media_directory = tempfile.TemporaryDirectory()
        self.addCleanup(media_directory.cleanup)
        media_settings = override_settings(MEDIA_ROOT=media_directory.name)
        media_settings.enable()
        self.addCleanup(media_settings.disable)

    def test_text_only_post_remains_compatible(self):
        response = self.client.post(
            self.url,
            {'content': 'Text without an image'},
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['content'], 'Text without an image')
        self.assertIsNone(response.data['image'])

    def test_image_only_post_is_created(self):
        response = self.client.post(
            self.url,
            {'image': make_uploaded_image()},
            format='multipart',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['content'], '')
        self.assertTrue(response.data['image'].startswith('http://testserver/media/community/posts/'))
        self.assertEqual(response.data['author_name'], 'Image Poster')
        self.assertEqual(response.data['like_count'], 0)
        self.assertFalse(response.data['is_liked_by_current_user'])

    def test_image_with_caption_is_created(self):
        response = self.client.post(
            self.url,
            {
                'content': 'First harvest',
                'image': make_uploaded_image('harvest.webp', 'WEBP'),
            },
            format='multipart',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['content'], 'First harvest')
        self.assertTrue(response.data['image'].startswith('http://testserver/media/community/posts/'))

    def test_unsupported_image_format_is_rejected(self):
        response = self.client.post(
            self.url,
            {
                'image': make_uploaded_image('animated.gif', 'GIF'),
            },
            format='multipart',
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Post.objects.count(), 0)

    def test_invalid_image_data_is_rejected(self):
        invalid_image = SimpleUploadedFile(
            'not-an-image.jpg',
            b'not an image',
            content_type='image/jpeg',
        )

        response = self.client.post(
            self.url,
            {'image': invalid_image},
            format='multipart',
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Post.objects.count(), 0)

    def test_oversized_image_is_rejected(self):
        oversized_image = SimpleUploadedFile(
            'oversized.jpg',
            b'x' * (MAX_POST_IMAGE_SIZE + 1),
            content_type='image/jpeg',
        )

        response = self.client.post(
            self.url,
            {'content': 'Caption', 'image': oversized_image},
            format='multipart',
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Post.objects.count(), 0)

    def test_post_with_empty_content_and_no_image_is_rejected(self):
        response = self.client.post(
            self.url,
            {'content': '  '},
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Post.objects.count(), 0)


class CommunityPostUpdateDeleteApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='post-owner@example.com',
            password='Valid-test-password-123',
            full_name='Post Owner',
        )
        self.other_user = User.objects.create_user(
            email='not-owner@example.com',
            password='Valid-test-password-123',
            full_name='Not Owner',
        )
        self.post = Post.objects.create(author=self.user, content='Original text')
        self.url = f'/api/community/posts/{self.post.id}/'
        media_directory = tempfile.TemporaryDirectory()
        self.addCleanup(media_directory.cleanup)
        media_settings = override_settings(MEDIA_ROOT=media_directory.name)
        media_settings.enable()
        self.addCleanup(media_settings.disable)

    def test_owner_can_update_content_and_preserve_likes_and_comments(self):
        like = Like.objects.create(post=self.post, user=self.other_user)
        comment = Comment.objects.create(
            post=self.post,
            author=self.other_user,
            content='Existing comment',
        )
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            self.url,
            {'content': 'Updated caption'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['content'], 'Updated caption')
        self.assertEqual(response.data['like_count'], 1)
        self.assertTrue(Like.objects.filter(pk=like.pk).exists())
        self.assertTrue(Comment.objects.filter(pk=comment.pk).exists())

    def test_owner_can_remove_image_while_preserving_caption(self):
        self.post.image = make_uploaded_image()
        self.post.save()
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            self.url,
            {'remove_image': True},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertIsNone(response.data['image'])
        self.assertFalse(Post.objects.get(pk=self.post.pk).image)

    def test_owner_cannot_remove_the_only_post_content(self):
        self.post.content = ''
        self.post.image = make_uploaded_image()
        self.post.save()
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            self.url,
            {'remove_image': True},
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        self.post.refresh_from_db()
        self.assertTrue(self.post.image)

    def test_owner_can_update_image_and_caption_together(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            self.url,
            {
                'content': 'Harvest photo',
                'image': make_uploaded_image('harvest.png'),
            },
            format='multipart',
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['content'], 'Harvest photo')
        self.assertTrue(response.data['image'])

    def test_update_rejects_empty_text_only_post(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            self.url,
            {'content': '   '},
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        self.post.refresh_from_db()
        self.assertEqual(self.post.content, 'Original text')

    def test_non_owner_cannot_update_post(self):
        self.client.force_authenticate(user=self.other_user)

        response = self.client.patch(
            self.url,
            {'content': 'Unauthorized change'},
            format='json',
        )

        self.assertEqual(response.status_code, 403)
        self.post.refresh_from_db()
        self.assertEqual(self.post.content, 'Original text')

    def test_owner_can_delete_post(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 204)
        self.assertFalse(Post.objects.filter(pk=self.post.pk).exists())

    def test_non_owner_cannot_delete_post(self):
        self.client.force_authenticate(user=self.other_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 403)
        self.assertTrue(Post.objects.filter(pk=self.post.pk).exists())

    def test_anonymous_user_cannot_update_or_delete_post(self):
        patch_response = self.client.patch(
            self.url,
            {'content': 'Anonymous change'},
            format='json',
        )
        delete_response = self.client.delete(self.url)

        self.assertEqual(patch_response.status_code, 401)
        self.assertEqual(delete_response.status_code, 401)
        self.assertTrue(Post.objects.filter(pk=self.post.pk).exists())


class CommunityLikeApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='liker@example.com',
            password='Valid-test-password-123',
            full_name='Test Liker',
        )
        self.post = Post.objects.create(author=self.user, content='Garden tip')
        self.url = f'/api/community/posts/{self.post.id}/like/'

    def test_authenticated_user_can_like_and_unlike_post(self):
        self.client.force_authenticate(user=self.user)

        like_response = self.client.post(self.url)

        self.assertEqual(like_response.status_code, 200)
        self.assertEqual(like_response.data, {'liked': True, 'like_count': 1})
        self.assertTrue(Like.objects.filter(post=self.post, user=self.user).exists())

        unlike_response = self.client.delete(self.url)

        self.assertEqual(unlike_response.status_code, 200)
        self.assertEqual(unlike_response.data, {'liked': False, 'like_count': 0})
        self.assertFalse(Like.objects.filter(post=self.post, user=self.user).exists())

    def test_repeated_like_does_not_create_duplicate(self):
        self.client.force_authenticate(user=self.user)

        first_response = self.client.post(self.url)
        second_response = self.client.post(self.url)

        self.assertEqual(first_response.status_code, 200)
        self.assertEqual(second_response.status_code, 200)
        self.assertEqual(second_response.data['like_count'], 1)
        self.assertEqual(Like.objects.filter(post=self.post, user=self.user).count(), 1)

    def test_anonymous_user_cannot_like_post(self):
        response = self.client.post(self.url)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Like.objects.count(), 0)

    def test_anonymous_user_cannot_unlike_post(self):
        Like.objects.create(post=self.post, user=self.user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Like.objects.count(), 1)

    def test_post_api_returns_accurate_like_count(self):
        other_user = User.objects.create_user(
            email='another-liker@example.com',
            password='Valid-test-password-123',
            full_name='Another Liker',
        )
        Like.objects.create(post=self.post, user=self.user)
        Like.objects.create(post=self.post, user=other_user)
        self.client.force_authenticate(user=self.user)

        response = self.client.get('/api/community/posts/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['like_count'], 2)

    def test_post_api_returns_current_users_liked_status(self):
        Like.objects.create(post=self.post, user=self.user)
        self.client.force_authenticate(user=self.user)

        response = self.client.get('/api/community/posts/')

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data[0]['is_liked_by_current_user'])


class CommunityCommentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='commenter@example.com',
            password='Valid-test-password-123',
            full_name='Test Commenter',
        )
        self.other_user = User.objects.create_user(
            email='other-commenter@example.com',
            password='Valid-test-password-123',
            full_name='Other Commenter',
        )
        self.post = Post.objects.create(author=self.other_user, content='Garden tip')
        self.url = f'/api/community/posts/{self.post.id}/comments/'

    def test_anonymous_user_cannot_retrieve_post_comments(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.other_user,
            content='Thanks for sharing.',
        )

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)
        self.assertTrue(Comment.objects.filter(pk=comment.pk).exists())

    def test_authenticated_user_can_retrieve_post_comments(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.other_user,
            content='Thanks for sharing.',
        )
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], comment.id)
        self.assertEqual(response.data[0]['author'], self.other_user.id)
        self.assertEqual(response.data[0]['author_name'], 'Other Commenter')
        self.assertEqual(response.data[0]['content'], 'Thanks for sharing.')
        self.assertIn('created_at', response.data[0])

    def test_authenticated_user_can_create_comment_for_post_as_themselves(self):
        self.client.force_authenticate(user=self.user)
        other_post = Post.objects.create(
            author=self.user,
            content='A different post',
        )

        response = self.client.post(
            self.url,
            {
                'post': other_post.id,
                'author': self.other_user.id,
                'content': '  Thanks for sharing.  ',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        comment = Comment.objects.get()
        self.assertEqual(comment.post, self.post)
        self.assertEqual(comment.author, self.user)
        self.assertEqual(comment.content, 'Thanks for sharing.')
        self.assertEqual(response.data['post'], self.post.id)
        self.assertEqual(response.data['author'], self.user.id)
        self.assertEqual(response.data['author_name'], 'Test Commenter')
        self.assertIn('created_at', response.data)

    def test_anonymous_user_cannot_create_comment(self):
        response = self.client.post(
            self.url,
            {'content': 'Thanks for sharing.'},
            format='json',
        )

        self.assertEqual(response.status_code, 401)
        self.assertEqual(Comment.objects.count(), 0)

    def test_empty_comment_content_is_rejected(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            self.url,
            {'content': '   '},
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Comment.objects.count(), 0)

    def test_comment_serializer_returns_author_and_creation_time(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            content='Useful tip.',
        )

        data = CommentSerializer(comment).data

        self.assertEqual(data['author'], self.user.id)
        self.assertEqual(data['author_name'], 'Test Commenter')
        self.assertEqual(parse_datetime(data['created_at']), comment.created_at)

    def test_comment_author_can_edit_content_without_changing_relations_or_timestamp(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            content='Original comment',
        )
        original_created_at = comment.created_at
        other_post = Post.objects.create(author=self.user, content='Other post')
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            f'{self.url}{comment.id}/',
            {
                'content': '  Updated comment  ',
                'author': self.other_user.id,
                'post': other_post.id,
            },
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        comment.refresh_from_db()
        self.assertEqual(comment.content, 'Updated comment')
        self.assertEqual(comment.author, self.user)
        self.assertEqual(comment.post, self.post)
        self.assertEqual(comment.created_at, original_created_at)
        self.assertEqual(response.data['author'], self.user.id)
        self.assertEqual(response.data['post'], self.post.id)

    def test_comment_author_can_delete_their_comment(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            content='Remove this comment',
        )
        self.client.force_authenticate(user=self.user)

        response = self.client.delete(f'{self.url}{comment.id}/')

        self.assertEqual(response.status_code, 204)
        self.assertFalse(Comment.objects.filter(pk=comment.pk).exists())

    def test_non_owner_cannot_edit_or_delete_comment(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            content='Owner comment',
        )
        self.client.force_authenticate(user=self.other_user)
        comment_url = f'{self.url}{comment.id}/'

        patch_response = self.client.patch(
            comment_url,
            {'content': 'Unauthorized edit'},
            format='json',
        )
        delete_response = self.client.delete(comment_url)

        self.assertEqual(patch_response.status_code, 403)
        self.assertEqual(delete_response.status_code, 403)
        comment.refresh_from_db()
        self.assertEqual(comment.content, 'Owner comment')

    def test_anonymous_user_cannot_edit_or_delete_comment(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            content='Private edit rights',
        )
        comment_url = f'{self.url}{comment.id}/'

        patch_response = self.client.patch(
            comment_url,
            {'content': 'Anonymous edit'},
            format='json',
        )
        delete_response = self.client.delete(comment_url)

        self.assertEqual(patch_response.status_code, 401)
        self.assertEqual(delete_response.status_code, 401)
        self.assertTrue(Comment.objects.filter(pk=comment.pk).exists())

    def test_comment_edit_rejects_empty_or_whitespace_content(self):
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            content='Keep this comment',
        )
        self.client.force_authenticate(user=self.user)

        for value in ('', '   '):
            with self.subTest(content=value):
                response = self.client.patch(
                    f'{self.url}{comment.id}/',
                    {'content': value},
                    format='json',
                )
                self.assertEqual(response.status_code, 400)
                comment.refresh_from_db()
                self.assertEqual(comment.content, 'Keep this comment')


class CommunityChallengeApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.today = timezone.localdate()
        self.user = User.objects.create_user(
            email='challenge-user@example.com',
            password='Valid-test-password-123',
            full_name='Challenge User',
        )
        self.other_user = User.objects.create_user(
            email='challenge-other@example.com',
            password='Valid-test-password-123',
            full_name='Other Challenge User',
        )
        self.client.force_authenticate(user=self.user)

    def get_current_month_challenge(self):
        response = self.client.get('/api/community/challenges/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        return response.data[0]

    def join_challenge(self, user, challenge_id):
        self.client.force_authenticate(user=user)
        response = self.client.post(
            f'/api/community/challenges/{challenge_id}/participation/',
            format='json',
        )
        return response

    def test_monthly_challenge_is_created_once_with_200_liter_goal(self):
        first_response = self.client.get('/api/community/challenges/')
        second_response = self.client.get('/api/community/challenges/')

        self.assertEqual(first_response.status_code, 200)
        self.assertEqual(second_response.status_code, 200)
        self.assertEqual(len(first_response.data), 1)
        self.assertEqual(len(second_response.data), 1)
        self.assertEqual(first_response.data[0]['title'], 'Water Conservation Month')
        self.assertEqual(first_response.data[0]['goal'], '200.00')
        self.assertEqual(
            Challenge.objects.filter(
                title='Water Conservation Month',
                start_date=self.today.replace(day=1),
            ).count(),
            1,
        )

    def test_user_can_join_monthly_challenge_only_once(self):
        challenge = self.get_current_month_challenge()

        response = self.join_challenge(self.user, challenge['id'])
        duplicate_response = self.client.post(
            f"/api/community/challenges/{challenge['id']}/participation/",
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(duplicate_response.status_code, 409)
        self.assertEqual(
            ChallengeParticipation.objects.filter(
                challenge_id=challenge['id'],
                user=self.user,
            ).count(),
            1,
        )

    def test_user_can_add_valid_progress(self):
        challenge = self.get_current_month_challenge()
        join_response = self.join_challenge(self.user, challenge['id'])
        self.assertEqual(join_response.status_code, 201)

        response = self.client.post(
            f"/api/community/challenges/{challenge['id']}/entries/",
            {'amount': '12.50'},
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['amount'], '12.50')
        self.assertEqual(response.data['entry_date'], self.today.isoformat())
        participation_response = self.client.get(
            f"/api/community/challenges/{challenge['id']}/participation/",
        )
        self.assertEqual(
            Decimal(participation_response.data['progress_total']),
            Decimal('12.50'),
        )

    def test_zero_and_negative_progress_are_rejected(self):
        challenge = self.get_current_month_challenge()
        join_response = self.join_challenge(self.user, challenge['id'])
        self.assertEqual(join_response.status_code, 201)

        for amount in ('0', '-1'):
            with self.subTest(amount=amount):
                response = self.client.post(
                    f"/api/community/challenges/{challenge['id']}/entries/",
                    {'amount': amount},
                    format='json',
                )
                self.assertEqual(response.status_code, 400)
        self.assertEqual(ChallengeProgressEntry.objects.count(), 0)

    def test_future_dated_progress_is_rejected_by_entry_date_validation(self):
        challenge = self.get_current_month_challenge()
        join_response = self.join_challenge(self.user, challenge['id'])
        self.assertEqual(join_response.status_code, 201)
        participation = ChallengeParticipation.objects.get(
            challenge_id=challenge['id'],
            user=self.user,
        )
        serializer = ChallengeProgressEntrySerializer(
            data={'amount': '1.00'},
            context={'participation': participation},
        )
        self.assertTrue(serializer.is_valid(), serializer.errors)

        with self.assertRaises(DRFValidationError) as error:
            serializer.validate_entry_date(self.today + timedelta(days=1))
        self.assertIn('later than today', str(error.exception.detail))

    def test_progress_is_rejected_after_challenge_ends(self):
        previous_month_end = self.today.replace(day=1) - timedelta(days=1)
        previous_month_start = previous_month_end.replace(day=1)
        ended_challenge = Challenge.objects.create(
            title='Ended Water Challenge',
            description='Ended challenge.',
            goal=200,
            unit='L',
            start_date=previous_month_start,
            end_date=previous_month_end,
        )
        ChallengeParticipation.objects.create(
            challenge=ended_challenge,
            user=self.user,
        )

        response = self.client.post(
            f'/api/community/challenges/{ended_challenge.id}/entries/',
            {'amount': '1.00'},
            format='json',
        )

        self.assertEqual(response.status_code, 403)
        self.assertFalse(ChallengeProgressEntry.objects.exists())

    def test_each_users_progress_is_isolated(self):
        challenge = self.get_current_month_challenge()
        join_response = self.join_challenge(self.user, challenge['id'])
        self.assertEqual(join_response.status_code, 201)
        other_join_response = self.join_challenge(self.other_user, challenge['id'])
        self.assertEqual(other_join_response.status_code, 201)
        ChallengeProgressEntry.objects.create(
            participation=ChallengeParticipation.objects.get(
                challenge_id=challenge['id'],
                user=self.user,
            ),
            amount='5.00',
            entry_date=self.today,
        )
        ChallengeProgressEntry.objects.create(
            participation=ChallengeParticipation.objects.get(
                challenge_id=challenge['id'],
                user=self.other_user,
            ),
            amount='11.00',
            entry_date=self.today,
        )

        self.client.force_authenticate(user=self.user)
        own_response = self.client.get(
            f"/api/community/challenges/{challenge['id']}/participation/",
        )
        self.client.force_authenticate(user=self.other_user)
        other_response = self.client.get(
            f"/api/community/challenges/{challenge['id']}/participation/",
        )

        self.assertEqual(
            Decimal(own_response.data['progress_total']),
            Decimal('5.00'),
        )
        self.assertEqual(
            Decimal(other_response.data['progress_total']),
            Decimal('11.00'),
        )
        self.assertEqual(len(own_response.data['entries']), 1)
        self.assertEqual(len(other_response.data['entries']), 1)


class CommunityLeaderboardApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/community/leaderboard/'
        self.today = timezone.localdate()
        self.start_date = self.today.replace(day=1)
        self.end_date = self.today.replace(
            day=monthrange(self.today.year, self.today.month)[1],
        )
        self.challenge = Challenge.objects.create(
            title='Water Conservation Month',
            description='Save water this month.',
            goal=200,
            unit='L',
            start_date=self.start_date,
            end_date=self.end_date,
        )
        self.first_user = User.objects.create_user(
            email='first@example.com',
            password='Valid-test-password-123',
            full_name='First Farmer',
        )
        self.second_user = User.objects.create_user(
            email='second@example.com',
            password='Valid-test-password-123',
            full_name='Second Farmer',
        )
        self.zero_point_user = User.objects.create_user(
            email='zero@example.com',
            password='Valid-test-password-123',
            full_name='Zero Point Farmer',
        )

    def test_anonymous_user_cannot_view_leaderboard(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)

    def test_logged_in_nonparticipant_is_included_with_zero_points(self):
        self.client.force_authenticate(user=self.first_user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data,
            [{
                'rank': 1,
                'user_id': self.first_user.id,
                'name': 'First Farmer',
                'points': '0.00',
            }],
        )

    def test_leaderboard_aggregates_current_challenge_and_breaks_ties_by_user_id(self):
        first_participation = ChallengeParticipation.objects.create(
            challenge=self.challenge,
            user=self.first_user,
        )
        second_participation = ChallengeParticipation.objects.create(
            challenge=self.challenge,
            user=self.second_user,
        )
        ChallengeParticipation.objects.create(
            challenge=self.challenge,
            user=self.zero_point_user,
        )
        ChallengeProgressEntry.objects.create(
            participation=first_participation,
            amount='3.50',
            entry_date=self.today,
        )
        ChallengeProgressEntry.objects.create(
            participation=second_participation,
            amount='3.50',
            entry_date=self.today,
        )

        previous_month_end = self.start_date - timedelta(days=1)
        previous_month_start = previous_month_end.replace(day=1)
        previous_challenge = Challenge.objects.create(
            title='Water Conservation Month',
            description='Previous month.',
            goal=200,
            unit='L',
            start_date=previous_month_start,
            end_date=previous_month_end,
        )
        previous_participation = ChallengeParticipation.objects.create(
            challenge=previous_challenge,
            user=self.second_user,
        )
        ChallengeProgressEntry.objects.create(
            participation=previous_participation,
            amount='100.00',
            entry_date=previous_month_end,
        )

        self.client.force_authenticate(user=self.first_user)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            [
                (
                    entry['rank'],
                    entry['user_id'],
                    entry['name'],
                    Decimal(entry['points']),
                )
                for entry in response.data
            ],
            [
                (1, self.first_user.id, 'First Farmer', Decimal('3.50')),
                (2, self.second_user.id, 'Second Farmer', Decimal('3.50')),
                (3, self.zero_point_user.id, 'Zero Point Farmer', Decimal('0.00')),
            ],
        )
