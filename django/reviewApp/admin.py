from django.contrib import admin
from . import models


@admin.register(models.Reviewer)
class ReviewerAdmin(admin.ModelAdmin):
    autocomplete_fields = ["user"]
    list_display = ["username", "email"]
    search_fields = ["username__istartswith"]


@admin.register(models.Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ["title", "artist_id", "created_at", "created_by"]
    ordering = ["title"]
    list_per_page = 30
    prepopulated_fields = {
        "slug": ["title"]
    }
    list_select_related = ["artist_id", "created_by"]
    autocomplete_fields = ["artist_id"]
    search_fields = ["title"]


@admin.register(models.Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ["name", "created_at", "created_by"]
    ordering = ["name"]
    list_per_page = 30
    prepopulated_fields = {
        "slug": ["name"]
    }
    search_fields = ['name__istartswith']


@admin.register(models.Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ['name__istartswith']


@admin.register(models.AlbumGenre)
class AlbumGenreAdmin(admin.ModelAdmin):
    list_display = ["__str__", "album_id", "genre_id"]
    autocomplete_fields = ["album_id", "genre_id"]


@admin.register(models.AlbumLink)
class AlbumLinkAdmin(admin.ModelAdmin):
    list_display = ["__str__", "album_id"]
    autocomplete_fields = ["album_id"]


@admin.register(models.AlbumOfTheYear)
class AlbumOfTheYear(admin.ModelAdmin):
    list_display = ["__str__", "album_id"]
    autocomplete_fields = ["album_id"]


@admin.register(models.Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ["__str__", "album_id"]


@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    autocomplete_fields = ["album_id", "reviewer_id"]
    list_display = ["__str__", "album_id", "reviewer_id"]


@admin.register(models.FavoriteReviewerArtist)
class FavoriteReviewerArtistAdmin(admin.ModelAdmin):
    autocomplete_fields = ["artist_id", "reviewer_id"]
    list_display = ["artist_id", "reviewer_id"]


@admin.register(models.ReviewerLink)
class ReviewerLinkAdmin(admin.ModelAdmin):
    autocomplete_fields = ["reviewer_id"]
    list_display = ["reviewer_id", "service_name"]
