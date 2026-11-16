from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0006_monthly_water_challenge_goal'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MonthlyWaterChallengeGoal',
        ),
    ]
