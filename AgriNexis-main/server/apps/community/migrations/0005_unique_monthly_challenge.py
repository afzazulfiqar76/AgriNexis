from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0004_challenges'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='challenge',
            constraint=models.UniqueConstraint(
                fields=('title', 'start_date'),
                name='unique_community_challenge_title_start',
            ),
        ),
    ]
