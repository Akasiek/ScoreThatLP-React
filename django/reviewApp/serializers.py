from audioop import avg
from datetime import timedelta
from django.db.models import F, ExpressionWrapper, Sum, Avg
from django.db.models.fields import BigIntegerField, IntegerField, CharField
from django.forms import DurationField
from django.utils.text import slugify
from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from .models import Album, Artist, Review, Reviewer, Track


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


class AlbumSerializer(serializers.ModelSerializer):
    tracks = StringRelatedField(many=True, read_only=True)
    album_genres = StringRelatedField(many=True, read_only=True)

    # Get overall score of the album
    def get_overall_score(self, album: Album):
        # TODO: Check if can return on first line
        reviews = Review.objects.only("rating").filter(album_id=album.id).aggregate(
            overall_score=Avg(F("rating"), output_field=IntegerField()))
        return reviews["overall_score"]

    overall_score = serializers.SerializerMethodField(
        method_name="get_overall_score")

    # Get duration of a full album
    # def get_duration(self, album: Album):
    #     tracks = Track.objects.filter(album_id=album.id).aggregate(
    #         dur_sum=Sum(F('duration'), output_field=BigIntegerField()))

    #     dur_sum = tracks["dur_sum"]
    #     if dur_sum is not None:
    #         return str(timedelta(0, 0, dur_sum))
    #     return "00:00:00"

    # duration = serializers.SerializerMethodField(method_name="get_duration")

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
                  "tracks"]

    # Save slug as well
    def create(self, validated_data):
        slug = slugify(validated_data["title"])
        return Album.objects.create(slug=slug, **validated_data)


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ["id", "title", "position", "album_id", "duration"]

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
