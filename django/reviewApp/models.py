import datetime
from django.db import models
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.core.validators import MinValueValidator, MaxValueValidator


class Reviewer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True
    )


class Artist(models.Model):
    name = models.CharField(max_length=255)

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
    album_id = models.ForeignKey(Album, on_delete=models.PROTECT, related_name="tracks")
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
