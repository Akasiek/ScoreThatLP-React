import React, { useState, useEffect } from "react";

import { getRatingAlbums, getUsersReviews } from "./../../services/fakeMusicService";
import { StyledContentGroupPage } from "../albums";
import ContentGroup from "../common/contentGroup";
import sort from "./../../utils/sort";

const ProfilePageReviewsContainer = ({ user, reviews }) => {
    // TODO: Favorite albums from serializer
    const [favoriteAlbums, setFavoriteAlbums] = useState(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "highest-user-score" }));
    const [latestRatings, setLatestRatings] = useState(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "newest-reviews" }));
    const [latestReviews, setLatestReviews] = useState(sort(getUsersReviews(user.id, true), "reviews", { value: "newest" }));

    useEffect(() => {
        setFavoriteAlbums(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "highest-user-score" }));
        setLatestRatings(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "newest-reviews" }));
        setLatestReviews(sort(getUsersReviews(user.id, true), "reviews", { value: "newest" }));
    }, [user, reviews]);

    return (
        <StyledContentGroupPage>
            <ContentGroup
                title="Favorite albums"
                className="contentGroup"
                content={favoriteAlbums}
                contentType="ratingAlbums"
                ratingAlbumIsReviewDateHidden={true}
                itemsCount={5}
                colSize={[5, 3, 2]}
            />
            <ContentGroup
                title="Latest ratings"
                viewAllUrl={`/users/${user.username}/ratings`}
                className="contentGroup"
                content={latestRatings}
                contentType="ratingAlbums"
                itemsCount={15}
                colSize={[5, 3, 2]}
            />

            <ContentGroup
                title="Latest reviews"
                viewAllUrl={`/users/${user.username}/reviews`}
                className="contentGroup"
                content={latestReviews}
                contentType="reviews"
                reviewIsOutsideAlbum={true}
                itemsCount={6}
                colSize={[2, 1, 1]}
            />
        </StyledContentGroupPage>
    );
};

export default ProfilePageReviewsContainer;
