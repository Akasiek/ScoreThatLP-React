from audioop import avg
from datetime import timedelta
from msilib.schema import Class
from django.db.models import F, ExpressionWrapper, Sum, Avg
from django.db.models.fields import BigIntegerField, IntegerField, CharField
from django.forms import DurationField
from django.utils.text import slugify
from rest_framework import serializers
from rest_framework.relations import StringRelatedField, RelatedField
from .models import Album, AlbumLink, AlbumOfTheYear, Artist, Review, Reviewer, Track


class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewer
        fields = ["id", "user"]


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ["id",
                  "name",
                  "slug",
                  "image",
                  "background_image",
                  "created_at"]
        read_only_fields = ["slug"]

     # Save slug as well
    def create(self, validated_data):
        slug = slugify(validated_data["name"])
        return Artist.objects.create(slug=slug, **validated_data)


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ["position", "title",  "duration"]

    def save(self, **kwargs):
        validated_data = {**self.validated_data, **kwargs}
        tracks = Track.objects.filter(album_id=validated_data["album_id"])
        if tracks.count() != 0:
            for track in tracks:
                if track.position == validated_data["position"]:
                    raise serializers.ValidationError(
                        "Track with this position is already in database"
                    )

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
        else:
            self.instance = self.create(validated_data)
        return self.instance


class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    album_genres = StringRelatedField(many=True, read_only=True)
    album_links = StringRelatedField(many=True, read_only=True)
    aoty = StringRelatedField(read_only=True)

    # Get overall score of the album
    def get_overall_score(self, album: Album):
        # TODO: Check if can return on first line
        reviews = Review.objects.only("rating").filter(album_id=album.id).aggregate(
            overall_score=Avg(F("rating"), output_field=IntegerField()))
        return reviews["overall_score"]

    overall_score = serializers.SerializerMethodField(
        method_name="get_overall_score")

    class Meta:
        model = Album
        fields = ["id",
                  "title",
                  "slug",
                  "created_at",
                  "artist_id",
                  "art_cover",
                  "album_genres",
                  "overall_score",
                  "release_date",
                  "release_type",
                  "tracks",
                  "album_links",
                  "aoty"]

    # Save slug as well
    def create(self, validated_data):
        slug = slugify(validated_data["title"])
        return Album.objects.create(slug=slug, **validated_data)


class AlbumOfTheYearSerializer(serializers.ModelSerializer):
    aoty = serializers.StringRelatedField(read_only=True)
    # position = serializers.IntegerField()
    # album = AlbumSerializer(read_only=True)

    class Meta:
        model = Album
        fields = ["title", "aoty"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "reviewer_id",
            "rating",
            "review_text",
            "album_id",
        ]
