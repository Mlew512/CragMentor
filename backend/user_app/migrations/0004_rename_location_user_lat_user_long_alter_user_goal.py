# Generated by Django 5.0 on 2024-01-20 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0003_user_current_level'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='location',
            new_name='lat',
        ),
        migrations.AddField(
            model_name='user',
            name='long',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='goal',
            field=models.CharField(null=True),
        ),
    ]
