# Generated by Django 5.0 on 2024-03-04 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0007_remove_user_ticks_user_ticks'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='ticks',
        ),
        migrations.AddField(
            model_name='user',
            name='location',
            field=models.CharField(null=True),
        ),
    ]
