from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.generic import base
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register("reviewers", views.ReviewerViewSet, basename="reviewers")
router.register("artists", views.ArtistViewSet, basename="artists")
router.register("albums", views.AlbumViewSet, basename="albums")
router.register("tracks", views.TrackViewSet, basename="tracks")
router.register("reviews", views.ReviewViewSet, basename="reviews")

urlpatterns = router.urls


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)