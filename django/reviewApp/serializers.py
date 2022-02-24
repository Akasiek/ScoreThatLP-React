from datetime import timedelta
from pyexpat import model
from django.db.models import F, Avg, Count
from django.db.models.fields import BigIntegerField, IntegerField
from django.utils.text import slugify
from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from .models import Album, AlbumLink, Artist, Review, Reviewer, Track


class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviewer
        fields = ["id", "user"]


class ArtistSerializer(serializers.ModelSerializer):

    # def get_average_score(self, artist: Artist):
    #     reviews = Album.objects.only("reviews").filter(artist_id=artist.id).aggregate(
    #         average_score=Avg(F("reviews"), output_field=BigIntegerField()))
    #     return reviews["average_score"]

    # average_score = serializers.SerializerMethodField(
    #     method_name="get_average_score")

    class Meta:
        model = Artist
        fields = ["id",
                  "name",
                  "slug",
                  "image",
                  "background_image",
                  #   "average_score",
                  "created_at"]
        read_only_fields = ["slug"]
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }

     # Save slug as well
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

    def get_avg_and_count_of_reviews(self, album: Album):
        reviews = Review.objects.only("rating").filter(album_id=album.id).aggregate(
            overall_score=Avg(F("rating"), output_field=IntegerField()), number_of_ratings=Count(F("rating"), output_field=IntegerField()))
        return reviews

    reviews = serializers.SerializerMethodField(
        method_name="get_avg_and_count_of_reviews")

    class Meta:
        model = Album
        fields = ["id",
                  "title",
                  "slug",
                  "created_at",
                  "artist",
                  "art_cover",
                  "genres",
                  "reviews",
                  "release_date",
                  "release_type",
                  "tracks",
                  "links",
                  "aoty"]

    # Save slug as well
    def create(self, validated_data):
        slug = slugify(validated_data["title"])
        return Album.objects.create(slug=slug, **validated_data)


class SimpleAlbumSerializer(serializers.ModelSerializer):
    artist = SimpleArtistSerializer(source="artist_id", read_only=True)

    def get_avg_and_count_of_reviews(self, album: Album):
        # TODO: Check if can return on first line
        reviews = Review.objects.only("rating").filter(album_id=album.id).aggregate(
            overall_score=Avg(F("rating"), output_field=IntegerField()), number_of_ratings=Count(F("rating"), output_field=IntegerField()))
        return reviews

    reviews = serializers.SerializerMethodField(
        method_name="get_avg_and_count_of_reviews")

    class Meta:
        model = Album
        fields = ["id",
                  "title",
                  "art_cover",
                  "release_date",
                  "release_type",
                  "artist",
                  "reviews"]


class AlbumOfTheYearSerializer(serializers.ModelSerializer):
    position = serializers.StringRelatedField(source="aoty", read_only=True)
    artist = SimpleArtistSerializer(source="artist_id", read_only=True)

    def get_overall_score(self, album: Album):
        # TODO: Check if can return on first line
        reviews = Review.objects.only("rating").filter(album_id=album.id).aggregate(
            overall_score=Avg(F("rating"), output_field=IntegerField()))
        return reviews["overall_score"]

    overall_score = serializers.SerializerMethodField(
        method_name="get_overall_score")

    class Meta:
        model = Album
        fields = ["position",
                  "id",
                  "title",
                  "art_cover",
                  "release_date",
                  "artist",
                  "overall_score"]


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
