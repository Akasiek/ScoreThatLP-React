import datetime
import os
from distutils.command.upload import upload
from django.db import models
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.deconstruct import deconstructible
from uuid import uuid4


class Reviewer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True
    )


@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        if instance.name:
            filename = '{}.{}'.format(instance.name, ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)
        return os.path.join(self.path, filename)


rename_artist_image = PathAndRename("artist/images/")
rename_artist_bg_image = PathAndRename("artist/bg_images/")


class Artist(models.Model):
    name = models.CharField(max_length=255)
    image = models.FileField(null=True, blank=True,
                             upload_to=rename_artist_image)
    background_image = models.FileField(
        null=True, blank=True, upload_to=rename_artist_bg_image)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Album(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    release_year = models.DateField(null=True)
    artist_id = models.ForeignKey(
        Artist, on_delete=models.PROTECT, related_name="albums"
    )
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


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

    REVIEWED_ITEM_TYPE_CHOICES = [
        ("A", "Album"),
        ("T", "Track"),
    ]
    reviewed_item_type = models.CharField(
        max_length=1, choices=REVIEWED_ITEM_TYPE_CHOICES, default="A"
    )
    item_id = models.PositiveIntegerField()
