from django.utils.text import slugify
from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from .models import Album, AlbumLink, Artist, FavoriteReviewerArtist, Review, Reviewer, ReviewerLink, Track


class ArtistSerializer(serializers.ModelSerializer):
    average_score = serializers.IntegerField(read_only=True)

    class Meta:
        model = Artist
        fields = [
            "id",
            "name",
            "slug",
            "image",
            "image_url",
            "background_image",
            "background_image_url",
            "average_score",
            "created_at",
            "created_by"
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
        fields = ["id", "position", "title",  "duration", "album_id"]

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
        fields = ["id", "album_id", "service_name", "url"]


class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    genres = StringRelatedField(
        source="album_genres", many=True, read_only=True)
    aoty = StringRelatedField(read_only=True)
    links = AlbumLinkSerializer(
        source="album_links", many=True, read_only=True)
    artist = SimpleArtistSerializer(source="artist_id", read_only=True)
    overall_score = serializers.IntegerField(read_only=True)
    number_of_ratings = serializers.IntegerField(read_only=True)

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "slug",
            "created_at",
            "created_by",
            "artist",
            "art_cover",
            "art_cover_url",
            "genres",
            "overall_score",
            "number_of_ratings",
            "release_date",
            "release_type",
            "tracks",
            "links",
            "aoty"
        ]


class CreateAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "artist_id",
            "art_cover",
            "art_cover_url",
            "release_date",
            "release_type",
            "created_by"
        ]

    def create(self, validated_data):
        if Album.objects.filter(title=self.validated_data["title"], artist_id=self.validated_data["artist_id"]).exists():
            raise serializers.ValidationError(
                'This albums is already in database')
        # Save slug
        slug = slugify(validated_data["title"])
        return Album.objects.create(slug=slug, **validated_data)


class SimpleAlbumSerializer(serializers.ModelSerializer):
    artist = SimpleArtistSerializer(source="artist_id", read_only=True)
    overall_score = serializers.IntegerField(read_only=True)

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "art_cover",
            "art_cover_url",
            "release_date",
            "release_type",
            "artist",
            "overall_score",
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
            "art_cover_url",
            "release_date",
            "artist",
            "overall_score"
        ]


class ReviewAlbumSerializer(serializers.ModelSerializer):
    artist = SimpleArtistSerializer(source="artist_id")

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "art_cover",
            "art_cover_url",
            "release_date",
            "release_type",
            "artist"
        ]


class FavoriteArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ["name", "background_image"]


class FavoriteReviewerArtistSerializer(serializers.ModelSerializer):
    artist = FavoriteArtistSerializer(source="artist_id", read_only=True)
    reviewer = serializers.StringRelatedField(
        source="reviewer_id", read_only=True)

    class Meta:
        model = FavoriteReviewerArtist
        fields = ["id", "reviewer_id", "reviewer", "artist_id", "artist"]

    def create(self, validated_data):
        print(self.context["request"].user,
              self.validated_data["reviewer_id"])
        if str(self.context["request"].user) != str(self.validated_data["reviewer_id"]):
            raise serializers.ValidationError(
                'User cannot create diffrent user favorite artist')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if str(self.context["request"].user) != str(self.validated_data["reviewer_id"]):
            raise serializers.ValidationError(
                'User cannot update another user favorite artist')
        return super().update(instance, validated_data)


class ReviewerLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewerLink
        fields = ["id", "reviewer_id", "service_name", "url"]

    def create(self, validated_data):
        print(self.context["request"].user,
              self.validated_data["reviewer_id"])
        if str(self.context["request"].user) != str(self.validated_data["reviewer_id"]):
            raise serializers.ValidationError(
                'User cannot create diffrent user links')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if str(self.context["request"].user) != str(self.validated_data["reviewer_id"]):
            raise serializers.ValidationError(
                'User cannot update another user links')
        return super().update(instance, validated_data)


class ReviewerSerializer(serializers.ModelSerializer):
    # user_id = serializers.IntegerField()
    favorite_artist = FavoriteReviewerArtistSerializer(read_only=True)
    number_of_ratings = serializers.IntegerField(read_only=True)
    number_of_reviews = serializers.IntegerField(read_only=True)
    links = ReviewerLinkSerializer(
        source="reviewer_links", many=True, read_only=True)

    class Meta:
        model = Reviewer
        fields = [
            "id",
            "username",
            "user",
            "email",
            "profile_pic",
            "profile_pic_url",
            "about_text",
            "favorite_artist",
            "number_of_ratings",
            "number_of_reviews",
            "links"
        ]

    def create(self, validated_data):
        if str(self.context["request"].user) != str(self.validated_data["user"]):
            raise serializers.ValidationError(
                'User cannot create diffrent user')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if str(self.context["request"].user) != str(self.validated_data["user"]):
            raise serializers.ValidationError(
                'User cannot update another user')
        return super().update(instance, validated_data)


class SimpleReviewerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user", read_only=True)

    class Meta:
        model = Reviewer
        fields = [
            "id",
            "username",
            "profile_pic",
            "profile_pic_url"
        ]


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = SimpleReviewerSerializer(source="reviewer_id", read_only=True)
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
            "created_at",
            "updated_at"
        ]

    def create(self, validated_data):
        if Review.objects.filter(album_id=self.validated_data["album_id"], reviewer_id=self.validated_data["reviewer_id"]).exists():
            raise serializers.ValidationError(
                'This user created review for this album already')
        if str(self.context["request"].user) != str(self.validated_data["reviewer_id"]):
            raise serializers.ValidationError(
                'User cannot create reviews as someone else')
        return Review.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if str(self.context["request"].user) != str(self.validated_data["reviewer_id"]):
            raise serializers.ValidationError(
                'User cannot update reviews as someone else')
        return super().update(instance, validated_data)
