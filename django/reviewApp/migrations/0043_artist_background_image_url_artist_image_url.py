# Generated by Django 4.0.2 on 2022-03-13 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviewApp', '0042_album_art_cover_url_alter_album_art_cover'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='background_image_url',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='image_url',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]