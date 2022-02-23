from django.db.models import query
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import pagination
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.utils import serializer_helpers
from rest_framework.viewsets import ModelViewSet
from reviewApp import pagination
from .serializers import (
    AlbumOfTheYearSerializer,
    AlbumSerializer,
    ArtistSerializer,
    ReviewSerializer,
    ReviewerSerializer,
    SimpleAlbumSerializer,
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
    lookup_field = "slug"


class AlbumViewSet(ModelViewSet):
    queryset = Album.objects.prefetch_related("tracks").prefetch_related("album_genres").prefetch_related(
        "album_links").prefetch_related("reviews").select_related("aoty").select_related("artist_id").all()
    serializer_class = AlbumSerializer
    # pagination_class = pagination.FivePagesPagination


class SimpleAlbumViewSet(ModelViewSet):
    queryset = Album.objects.select_related(
        "artist_id").prefetch_related("reviews").all()
    serializer_class = SimpleAlbumSerializer


class TrackViewSet(ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    pagination_class = pagination.TenPagesPagination


class AlbumOfTheYearViewSet(ModelViewSet):
    queryset = Album.objects.prefetch_related(
        "aoty").filter(aoty__isnull=False).all()
    serializer_class = AlbumOfTheYearSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ['aoty']


class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer
    pagination_class = pagination.FivePagesPagination

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against `album_id` and `reviewer_id` query parameter in the URL.
        """
        queryset = Review.objects.select_related("album_id").all()
        album_id = self.request.query_params.get('album_id')
        reviewer_id = self.request.query_params.get('reviewer_id')
        if album_id is not None:
            queryset = queryset.filter(album_id=album_id)
        if reviewer_id is not None:
            queryset = queryset.filter(reviewer_id=reviewer_id)
        return queryset
