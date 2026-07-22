import os

from django.core.management.base import BaseCommand

from apps.users.models import User, UserRole


class Command(BaseCommand):
    help = 'Create or update the default admin user from environment variables'

    def handle(self, *args, **options):
        email = os.getenv('ADMIN_EMAIL', 'S2023065070@umt.edu.pk').lower()
        password = os.getenv('ADMIN_PASSWORD')
        full_name = os.getenv('ADMIN_FULL_NAME', 'System Administrator')

        if not password:
            self.stderr.write(
                self.style.ERROR('ADMIN_PASSWORD is required in server/.env')
            )
            return

        user, created = User.objects.update_or_create(
            email=email,
            defaults={
                'full_name': full_name,
                'role': UserRole.ADMIN,
                'is_verified': True,
                'is_active': True,
                'is_staff': True,
                'is_superuser': True,
            },
        )
        user.set_password(password)
        user.save()

        verb = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{verb} admin user: {email}'))
