# Generated by Django 5.0 on 2024-02-26 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ticks_app', '0004_ticked_route_notes_ticked_route_rating_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticked_route',
            name='lat',
            field=models.CharField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ticked_route',
            name='long',
            field=models.CharField(null=True),
        ),
    ]
