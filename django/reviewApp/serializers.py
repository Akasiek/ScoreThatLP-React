from django.db.models import F, Avg, Count
from django.db.models.fields import IntegerField
from django.utils.text import slugify
from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from .models import Album, AlbumLink, Artist, Review, Reviewer, Track


class ReviewerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user", read_only=True)

    class Meta:
        model = Reviewer
        fields = ["id", "username", "user", "slug", "profile_pic"]
        read_only_fields = ["slug"]

    # Save slug
    def create(self, validated_data):
        slug = slugify(validated_data["user"])
        return Reviewer.objects.create(slug=slug, **validated_data)


class ArtistSerializer(serializers.ModelSerializer):
    average_score = serializers.IntegerField()

    class Meta:
        model = Artist
        fields = [
            "id",
            "name",
            "slug",
            "image",
            "background_image",
            "average_score",
            "created_at"
        ]
        read_only_fields = ["slug"]
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }

     # Save slug
    def create(self, validated_data):
        slug = slugify(validated_data["name"])
        return Artist.objects.create(slug=slug, **validated_data)


class SimpleArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ["id", "name", "slug"]


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


class AlbumLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumLink
        fields = ["service_name", "url"]


class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    genres = StringRelatedField(
        source="album_genres", many=True, read_only=True)
    aoty = StringRelatedField(read_only=True)
    links = AlbumLinkSerializer(
        source="album_links", many=True, read_only=True)
    artist = SimpleArtistSerializer(source="artist_id")
    overall_score = serializers.IntegerField()
    number_of_ratings = serializers.IntegerField()

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "slug",
            "created_at",
            "artist",
            "art_cover",
            "genres",
            "overall_score",
            "number_of_ratings",
            "release_date",
            "release_type",
            "tracks",
            "links",
            "aoty"
        ]

    # Save slug
    def create(self, validated_data):
        slug = slugify(validated_data["title"])
        return Album.objects.create(slug=slug, **validated_data)


class SimpleAlbumSerializer(serializers.ModelSerializer):
    artist = SimpleArtistSerializer(source="artist_id", read_only=True)
    overall_score = serializers.IntegerField()
    number_of_ratings = serializers.IntegerField()

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "art_cover",
            "release_date",
            "release_type",
            "artist",
            "overall_score",
            "number_of_ratings"
        ]


class AlbumOfTheYearSerializer(serializers.ModelSerializer):
    position = serializers.StringRelatedField(source="aoty", read_only=True)
    artist = SimpleArtistSerializer(source="artist_id", read_only=True)
    overall_score = serializers.IntegerField()

    class Meta:
        model = Album
        fields = [
            "position",
            "id",
            "title",
            "art_cover",
            "release_date",
            "artist",
            "overall_score"
        ]


class ReviewAlbumSerializer(serializers.ModelSerializer):
    artist = SimpleArtistSerializer(source="artist_id")

    class Meta:
        model = Album
        fields = ["id", "title", "art_cover", "artist"]


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = ReviewerSerializer(source="reviewer_id", read_only=True)
    album = ReviewAlbumSerializer(source="album_id", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "reviewer_id",
            "reviewer",
            "rating",
            "review_text",
            "album_id",
            "album",
            "created_at"
        ]

    def create(self, validated_data):
        if Review.objects.filter(album_id=self.validated_data["album_id"], reviewer_id=self.validated_data["reviewer_id"]).exists():
            raise serializers.ValidationError(
                'This user created review for this album already')

        return Review.objects.create(**validated_data)
