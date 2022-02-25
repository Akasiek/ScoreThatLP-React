from django.db.models import F, Avg, Count
from django.db.models.fields import IntegerField
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import pagination
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
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
from .models import Album, Artist, Review, Reviewer, Track
from .permissions import IsAdminOrPostOnly


class ReviewerViewSet(ModelViewSet):
    queryset = Reviewer.objects.all()
    serializer_class = ReviewerSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        (reviewer, created) = Reviewer.objects.get_or_create(
            user_id=request.user.id)
        if request.method == "GET":
            serializer = ReviewerSerializer(reviewer)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = ReviewerSerializer(reviewer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class ArtistViewSet(ModelViewSet):
    queryset = Artist.objects\
        .annotate(average_score=Avg(F("albums__reviews__rating"), output_field=IntegerField()))
    serializer_class = ArtistSerializer
    pagination_class = pagination.TwentyFivePagesPagination
    lookup_field = "slug"


class AlbumViewSet(ModelViewSet):
    permission_classes = [IsAdminOrPostOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ["title", "release_date"]

    def get_queryset(self):
        queryset = Album.objects \
            .prefetch_related("tracks", "album_genres", "album_links", "reviews") \
            .select_related("aoty", "artist_id") \
            .annotate(overall_score=Avg(F("reviews__rating"), output_field=IntegerField()),
                      number_of_ratings=Count(F("reviews__rating"), output_field=IntegerField()))

        artist_slug = self.request.query_params.get('artist')
        release_type = self.request.query_params.get('type')
        count = self.request.query_params.get('count')
        if artist_slug is not None:
            queryset = queryset.filter(artist_id__slug=artist_slug)
        if release_type is not None:
            queryset = queryset.filter(release_type=release_type)
        if count is not None:
            queryset = queryset[0:int(count)]
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return SimpleAlbumSerializer
        return AlbumSerializer


class TrackViewSet(ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    pagination_class = pagination.TenPagesPagination


class AlbumOfTheYearViewSet(ModelViewSet):
    queryset = Album.objects \
        .prefetch_related("aoty", "artist_id") \
        .annotate(overall_score=Avg(F("reviews__rating"), output_field=IntegerField())) \
        .filter(aoty__isnull=False).all()
    serializer_class = AlbumOfTheYearSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ['aoty']


class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ['created_at']

    def get_queryset(self):
        queryset = Review.objects.select_related(
            "album_id", "reviewer_id", "album_id__artist_id", "reviewer_id__user").all()

        album_id = self.request.query_params.get('album_id')
        reviewer_id = self.request.query_params.get('reviewer_id')
        ratings_only = self.request.query_params.get('ratings_only')
        reviews_only = self.request.query_params.get('reviews_only')
        if album_id is not None:
            queryset = queryset.filter(album_id=album_id)
        if reviewer_id is not None:
            queryset = queryset.filter(reviewer_id=reviewer_id)
        if ratings_only is not None:
            queryset = queryset.filter(review_text__isnull=True)
        if reviews_only is not None:
            queryset = queryset.filter(review_text__isnull=False)
        return queryset
