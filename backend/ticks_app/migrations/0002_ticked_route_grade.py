# Generated by Django 5.0 on 2024-02-23 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ticks_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticked_route',
            name='grade',
            field=models.CharField(max_length=255, null=True),
        ),
    ]