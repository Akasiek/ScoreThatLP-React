from django.contrib import admin
from . import models


@admin.register(models.Album)
class AlbumAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        "slug": ["title"]
    }


@admin.register(models.Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ["name"]
    ordering = ["name"]
    prepopulated_fields = {
        "slug": ["name"]
    }


@admin.register(models.Genre)
class GenreAdmin(admin.ModelAdmin):
    pass


@admin.register(models.AlbumGenre)
class AlbumGenreAdmin(admin.ModelAdmin):
    list_display = ["__str__", "album_id", "genre_id"]


@admin.register(models.AlbumLink)
class AlbumLinkAdmin(admin.ModelAdmin):
    list_display = ["__str__", "album_id"]


@admin.register(models.AlbumOfTheYear)
class AlbumOfTheYear(admin.ModelAdmin):
    pass


@admin.register(models.Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ["__str__", "album_id"]
