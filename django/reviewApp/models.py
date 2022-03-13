import os
from django.db import models
from django.conf import settings
from django.contrib import admin
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.deconstruct import deconstructible
from django_resized import ResizedImageField
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
    profile_pic = ResizedImageField(size=[500, 500], null=True, blank=True,
                                    upload_to="users/profile_pics/", max_length=255)
    about_text = models.TextField(null=True, blank=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True
    )

    @admin.display(ordering="user__username")
    def username(self):
        return self.user.username

    def email(self):
        return self.user.email

    def __str__(self):
        return self.user.username


class ReviewerLink(models.Model):
    SERVICE_NAME_CHOICES = [
        ("spotify", "Spotify"),
        ("twitter", "Twitter"),
        ("lastFm", "Last.FM"),
    ]

    service_name = models.CharField(
        max_length=15, choices=SERVICE_NAME_CHOICES)
    url = models.CharField(max_length=255)
    reviewer_id = models.ForeignKey(
        Reviewer, on_delete=models.PROTECT, related_name="reviewer_links")

    def __str__(self) -> str:
        return f"{self.service_name} - {self.url}"


class Artist(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    image = ResizedImageField(size=[500, 500], crop=['middle', 'center'],
                              null=True, blank=True, upload_to=rename_artist_image, max_length=255)
    background_image = ResizedImageField(
        null=True, blank=True, upload_to=rename_artist_bg_image, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        Reviewer, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Album(models.Model):
    RELEASE_TYPE_ALBUM_CHOICES = [
        ("LP", "LP"),
        ("EP", "EP"),
        ("Single", "Single"),
        ("Live", "Live"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)
    release_date = models.DateField()
    artist_id = models.ForeignKey(
        Artist, on_delete=models.PROTECT, related_name="albums"
    )
    art_cover = ResizedImageField(
        size=[750, 750], crop=['middle', 'center'], null=True, blank=True, upload_to=rename_album_art_cover, max_length=255)
    release_type = models.CharField(max_length=10,
                                    choices=RELEASE_TYPE_ALBUM_CHOICES, default="LP")
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        Reviewer, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self) -> str:
        return self.title


class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class AlbumGenre(models.Model):
    album_id = models.ForeignKey(
        Album, on_delete=models.CASCADE, related_name="album_genres")
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
        Album, on_delete=models.CASCADE, related_name="album_links")

    def __str__(self) -> str:
        return f"{self.service_name} - {self.url}"


class Track(models.Model):
    title = models.CharField(max_length=255)
    position = models.PositiveIntegerField()
    album_id = models.ForeignKey(
        Album, on_delete=models.CASCADE, related_name="tracks")
    duration = models.DurationField(null=True)

    def __str__(self) -> str:
        return f"{self.position}. {self.title} - {self.duration}"


class AlbumOfTheYear(models.Model):
    album_id = models.OneToOneField(
        Album, on_delete=models.CASCADE, related_name="aoty")
    position = models.IntegerField()

    def __str__(self) -> str:
        return str(self.position)


class Review(models.Model):
    reviewer_id = models.ForeignKey(Reviewer, on_delete=models.PROTECT)
    rating = models.IntegerField(
        validators=[MaxValueValidator(100), MinValueValidator(0)], null=True, blank=True
    )
    review_text = models.TextField(null=True, blank=True)
    album_id = models.ForeignKey(
        Album, on_delete=models.CASCADE, related_name="reviews")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.reviewer_id} - {self.album_id}"

    def save(self, *args, **kwargs):
        if not self.review_text:
            self.review_text = None
        super(Review, self).save(*args, **kwargs)


class FavoriteReviewerArtist(models.Model):
    reviewer_id = models.OneToOneField(
        Reviewer, on_delete=models.CASCADE, related_name="favorite_artist")
    artist_id = models.ForeignKey(
        Artist, on_delete=models.CASCADE, related_name="favorite_artist")
