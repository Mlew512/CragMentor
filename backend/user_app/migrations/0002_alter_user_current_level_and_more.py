# Generated by Django 5.0 on 2023-12-27 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='current_level',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='distance_willing_to_travel',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='goal',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='location',
            field=models.FloatField(null=True),
        ),
    ]
