from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.generic import base
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register("artists", views.ArtistViewSet, basename="artists")
router.register("albums", views.AlbumViewSet, basename="albums")
router.register("tracks", views.TrackViewSet, basename="tracks")
router.register("album_links", views.AlbumLinkViewSet, basename="album_links")
router.register("album_of_the_year", views.AlbumOfTheYearViewSet,
                basename="album_of_the_year")
router.register("reviewers", views.ReviewerViewSet, basename="reviewers")
router.register("reviewer_links", views.ReviewerLinkViewSet,
                basename="reviewer_links")
router.register("favorite_reviewer_artist", views.FavoriteReviewerArtistViewSet,
                basename="favorite_reviewer_artist")
router.register("reviews", views.ReviewViewSet, basename="reviews")
router.register("likes", views.LikeViewSet, basename="likes")

urlpatterns = router.urls


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
