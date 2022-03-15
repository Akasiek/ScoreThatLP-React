from django.db.models import F, Avg, Count, Sum
from django.db.models.fields import IntegerField, DurationField
from rest_framework import pagination, status
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from reviewApp import pagination
from .serializers import (
    AlbumLinkSerializer,
    AlbumOfTheYearSerializer,
    AlbumSerializer,
    ArtistSerializer,
    CreateAlbumSerializer,
    FavoriteReviewerArtistSerializer,
    ReviewSerializer,
    ReviewerLinkSerializer,
    ReviewerSerializer,
    SimpleAlbumSerializer,
    TrackSerializer,
)
from .models import Album, AlbumLink, Artist, FavoriteReviewerArtist, Review, Reviewer, ReviewerLink, Track
from .permissions import IsAdminOrPostOnly, IsAdminOrReadOnly


class ReviewerViewSet(ModelViewSet):
    queryset = Reviewer.objects \
        .select_related("user") \
        .prefetch_related("favorite_artist", "favorite_artist__artist_id") \
        .annotate(number_of_ratings=Count(F("review"), output_field=IntegerField()),
                  number_of_reviews=Count(F("review__review_text"), output_field=IntegerField()))

    serializer_class = ReviewerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["user__username", "user"]
    search_fields = ["user__username"]

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

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if (str(obj) != str(request.user)):
            return Response(data={'message': "User cannot delete another user"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().destroy(request, *args, **kwargs)


class ReviewerLinkViewSet(ModelViewSet):
    queryset = ReviewerLink.objects.all()
    serializer_class = ReviewerLinkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if (str(obj.reviewer_id) != str(request.user)):
            return Response(data={'message': "User cannot delete another user links"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().destroy(request, *args, **kwargs)


class FavoriteReviewerArtistViewSet(ModelViewSet):
    queryset = FavoriteReviewerArtist.objects.select_related(
        "reviewer_id", "reviewer_id__user", "artist_id")
    serializer_class = FavoriteReviewerArtistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if (str(obj.reviewer_id) != str(request.user)):
            return Response(data={'message': "User cannot delete another user favorite artist"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().destroy(request, *args, **kwargs)


class ArtistViewSet(ModelViewSet):
    queryset = Artist.objects \
        .annotate(average_score=Avg("albums__reviews__rating", output_field=IntegerField()))
    serializer_class = ArtistSerializer
    permission_classes = [IsAdminOrPostOnly]
    lookup_field = "slug"
    filter_backends = [SearchFilter]
    search_fields = ["name"]


class AlbumViewSet(ModelViewSet):
    queryset = Album.objects.all() \
        .prefetch_related("tracks", "album_genres", "album_genres__genre_id", "album_links", "reviews") \
        .select_related("aoty", "artist_id") \
        .annotate(overall_score=Avg("reviews__rating")) \
        .annotate(number_of_ratings=Count("reviews", distinct=True)).all()

    permission_classes = [IsAdminOrPostOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ["id", "title", "release_date", "overall_score"]
    filterset_fields = ("release_type", "artist_id__slug")
    filterset_fields = {
        "release_type": ["exact"],
        "artist_id__slug": ["exact"],
        "release_date": ["gte", "lte"]
    }
    search_fields = ["title", "artist_id__name"]

    def get_serializer_class(self):
        if self.action == "list":
            return SimpleAlbumSerializer
        if self.action == "create":
            return CreateAlbumSerializer
        return AlbumSerializer


class AlbumLinkViewSet(ModelViewSet):
    queryset = AlbumLink.objects.select_related("album_id")
    serializer_class = AlbumLinkSerializer
    permission_classes = [IsAdminOrPostOnly]


class TrackViewSet(ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [IsAdminOrPostOnly]


class AlbumOfTheYearViewSet(ModelViewSet):
    queryset = Album.objects \
        .prefetch_related("aoty", "artist_id") \
        .annotate(overall_score=Avg(F("reviews__rating"), output_field=IntegerField())) \
        .filter(aoty__isnull=False).all()
    serializer_class = AlbumOfTheYearSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [OrderingFilter]
    ordering_fields = ["aoty__position"]


class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.select_related(
        "album_id", "reviewer_id", "album_id__artist_id", "reviewer_id__user")
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    permission_classes = [IsAuthenticatedOrReadOnly]
    ordering_fields = ['created_at', 'updated_at']
    filterset_fields = {
        "album_id": ["exact"],
        "album_id__artist_id__slug": ["exact"],
        "reviewer_id": ["exact"],
        "review_text": ["exact", "isnull"],
        "rating": ["exact", "isnull"]
    }

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if (str(obj.reviewer_id) != str(request.user)):
            return Response(data={'message': "User cannot delete another user review"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().destroy(request, *args, **kwargs)
