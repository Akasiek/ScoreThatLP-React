from cProfile import label
import datetime
import os
from distutils.command.upload import upload
from tkinter.tix import IMAGE
from django.db import models
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.deconstruct import deconstructible
from uuid import uuid4


@deconstructible
class RenameImageToSlug(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        if instance.slug:
            filename = '{}.{}'.format(instance.slug, ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)
        return os.path.join(self.path, filename)


rename_artist_image = RenameImageToSlug("artist/images/")
rename_artist_bg_image = RenameImageToSlug("artist/bg_images/")
rename_album_art_cover = RenameImageToSlug("album/art_covers/")


class Reviewer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True
    )


class Artist(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    image = models.FileField(null=True, blank=True,
                             upload_to=rename_artist_image)
    background_image = models.FileField(
        null=True, blank=True, upload_to=rename_artist_bg_image)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Album(models.Model):

    RELEASE_TYPE_ALBUM_CHOICES = [
        ("LP", "LP"),
        ("EP", "EP"),
        ("S", "Single"),
        ("Live", "Live"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    release_date = models.DateField(null=True)
    artist_id = models.ForeignKey(
        Artist, on_delete=models.PROTECT, related_name="albums"
    )
    art_cover = models.FileField(
        null=True, blank=True, upload_to=rename_album_art_cover)
    release_type = models.CharField(max_length=10,
                                    choices=RELEASE_TYPE_ALBUM_CHOICES, default="LP")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class AlbumGenre(models.Model):
    album_id = models.ForeignKey(
        Album, on_delete=models.PROTECT, related_name="album_genres")
    genre_id = models.ForeignKey(
        Genre,  on_delete=models.PROTECT, related_name="album_genres")

    def __str__(self) -> str:
        return self.genre_id.name


class AlbumLink(models.Model):
    SERVICE_NAME_CHOICES = [
        ("spotify", "Spotify"),
        ("tidal", "Tidal"),
        ("amazonMusic", "Amazon Music"),
        ("appleMusic", "Apple Music"),
    ]

    service_name = models.CharField(
        max_length=15, choices=SERVICE_NAME_CHOICES)
    url = models.CharField(max_length=255)
    album_id = models.ForeignKey(
        Album, on_delete=models.PROTECT, related_name="album_links")

    def __str__(self) -> str:
        return f"{self.service_name} - {self.url}"


class Track(models.Model):
    title = models.CharField(max_length=255)
    position = models.PositiveIntegerField()
    album_id = models.ForeignKey(
        Album, on_delete=models.PROTECT, related_name="tracks")
    duration = models.DurationField(null=True)

    def __str__(self) -> str:
        return f"{self.position}. {self.title} - {self.duration}"


class Review(models.Model):
    reviewer_id = models.ForeignKey(Reviewer, on_delete=models.PROTECT)
    rating = models.IntegerField(
        validators=[MaxValueValidator(100), MinValueValidator(0)]
    )
    review_text = models.TextField(null=True)
    album_id = models.ForeignKey(
        Album, on_delete=models.PROTECT, related_name="reviews")
    created_at = models.DateTimeField(auto_now_add=True)
