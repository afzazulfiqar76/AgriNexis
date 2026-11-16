import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0005_unique_monthly_challenge'),
    ]

    operations = [
        migrations.CreateModel(
            name='MonthlyWaterChallengeGoal',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                ('year', models.PositiveSmallIntegerField()),
                ('month', models.PositiveSmallIntegerField()),
                ('goal', models.DecimalField(decimal_places=2, max_digits=12)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('-year', '-month'),
            },
        ),
        migrations.AddConstraint(
            model_name='monthlywaterchallengegoal',
            constraint=models.UniqueConstraint(
                fields=('year', 'month'),
                name='unique_community_monthly_water_goal',
            ),
        ),
        migrations.AddConstraint(
            model_name='monthlywaterchallengegoal',
            constraint=models.CheckConstraint(
                condition=models.Q(('month__gte', 1), ('month__lte', 12)),
                name='community_monthly_water_goal_valid_month',
            ),
        ),
        migrations.AddConstraint(
            model_name='monthlywaterchallengegoal',
            constraint=models.CheckConstraint(
                condition=models.Q(('goal__gt', 0)),
                name='community_monthly_water_goal_positive',
            ),
        ),
    ]
