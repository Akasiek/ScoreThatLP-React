from datetime import timedelta
from django.db.models import F, ExpressionWrapper, Sum
from django.db.models.fields import BigIntegerField
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
        fields = ["id", "name", "image", "background_image", "created_at"]


class AlbumSerializer(serializers.ModelSerializer):
    tracks = StringRelatedField(many=True, read_only=True)

    # Get duration of a full album
    def get_duration(self, album: Album):
        tracks = (
            Track.objects.only("duration")
            .filter(album_id=album.id)
            .aggregate(dur_sum=Sum(F("duration"), output_field=BigIntegerField()))
        )
        dur_sum = tracks["dur_sum"]
        if dur_sum is not None:
            return str(timedelta(0, 0, dur_sum))
        return "00:00:00"

    duration = serializers.SerializerMethodField(method_name="get_duration")

    class Meta:
        model = Album
        fields = ["id", "title", "artist_id",
                  "tracks", "duration", "created_at"]

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
            "reviewed_item_type",
            "item_id",
        ]

    def save(self, **kwargs):
        validated_data = {**self.validated_data, **kwargs}
        if (
            validated_data["album_id"] is not None
            and validated_data["track_id"] is not None
        ):
            raise serializers.ValidationError("Only one id should be provided")
        elif validated_data["album_id"] is None and validated_data["track_id"] is None:
            raise serializers.ValidationError(
                "At least one id should be provided")

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
        else:
            self.instance = self.create(validated_data)
        return self.instance
