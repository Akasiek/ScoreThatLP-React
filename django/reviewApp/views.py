from django.db.models import query
from rest_framework import pagination
from rest_framework.utils import serializer_helpers
from rest_framework.viewsets import ModelViewSet
from reviewApp import pagination
from .serializers import (
    AlbumOfTheYearSerializer,
    AlbumSerializer,
    ArtistSerializer,
    ReviewSerializer,
    ReviewerSerializer,
    TrackSerializer,
)
from .models import Album, AlbumOfTheYear, Artist, Review, Reviewer, Track
from reviewApp import serializers


class ReviewerViewSet(ModelViewSet):
    queryset = Reviewer.objects.all()
    serializer_class = ReviewerSerializer


class ArtistViewSet(ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    pagination_class = pagination.TwentyFivePagesPagination


class AlbumViewSet(ModelViewSet):
    queryset = Album.objects.prefetch_related("tracks").prefetch_related(
        "album_genres").prefetch_related("album_links").prefetch_related("aoty").all()
    serializer_class = AlbumSerializer
    pagination_class = pagination.FivePagesPagination


class TrackViewSet(ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    pagination_class = pagination.TenPagesPagination


class AlbumOfTheYearViewSet(ModelViewSet):
    queryset = Album.objects.prefetch_related("aoty").all()
    serializer_class = AlbumOfTheYearSerializer


class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = pagination.FivePagesPagination
