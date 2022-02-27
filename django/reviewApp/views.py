from django.db.models import F, Avg, Count
from django.db.models.fields import IntegerField
from rest_framework import pagination
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from reviewApp import pagination
from .serializers import (
    AlbumOfTheYearSerializer,
    AlbumSerializer,
    ArtistSerializer,
    CreateAlbumSerializer,
    ReviewSerializer,
    ReviewerSerializer,
    SimpleAlbumSerializer,
    TrackSerializer,
)
from .models import Album, Artist, Review, Reviewer, Track
from .permissions import IsAdminOrPostOnly


class ReviewerViewSet(ModelViewSet):
    queryset = Reviewer.objects \
        .select_related("user") \
        .prefetch_related("favorite_artist", "favorite_artist__artist_id") \
        .annotate(number_of_ratings=Count(F("review__review_text"), output_field=IntegerField()),
                  number_of_reviews=Count(F("review"), output_field=IntegerField()))

    serializer_class = ReviewerSerializer
    lookup_field = "slug"
    filter_backends = [SearchFilter]
    search_fields = ["user__username"]
    # TODO! Custom permission to check if user is user
    # permission_classes = [IsAuthenticatedOrReadOnly]

    @ action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
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
    queryset = Artist.objects \
        .annotate(average_score=Avg(F("albums__reviews__rating"), output_field=IntegerField()))
    serializer_class = ArtistSerializer
    lookup_field = "slug"
    filter_backends = [SearchFilter]
    search_fields = ["name"]


class AlbumViewSet(ModelViewSet):
    queryset = Album.objects \
        .prefetch_related("tracks", "album_genres", "album_links", "reviews") \
        .select_related("aoty", "artist_id") \
        .annotate(overall_score=Avg(F("reviews__rating"), output_field=IntegerField()),
                  number_of_ratings=Count(F("reviews__rating"), output_field=IntegerField()))

    # permission_classes = [IsAdminOrPostOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ["id", "title", "release_date"]
    filterset_fields = ("release_type", "artist_id__slug")
    search_fields = ["title", "artist_id__name"]

    def get_serializer_class(self):
        if self.action == "list":
            return SimpleAlbumSerializer
        if self.action == "create":
            return CreateAlbumSerializer
        return AlbumSerializer


class TrackViewSet(ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


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
            "album_id", "reviewer_id", "album_id__artist_id", "reviewer_id__user")

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
