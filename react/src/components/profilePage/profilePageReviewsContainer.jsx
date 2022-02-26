import React, { useState, useEffect } from "react";

import { StyledContentGroupPage } from "../albums";
import ContentGroup from "../common/contentGroup";
import sort from "./../../utils/sort";
import { getLatestReviewerReviews } from "../../services/reviewService";
import _ from "lodash";
import LoadingScreen from "./../loadingScreen";

const ProfilePageReviewsContainer = ({ reviewer }) => {
    // const [favoriteAlbums, setFavoriteAlbums] = useState(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "highest-user-score" }));
    // const [latestRatings, setLatestRatings] = useState(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "newest-reviews" }));
    // const [latestReviews, setLatestReviews] = useState(sort(getUsersReviews(user.id, true), "reviews", { value: "newest" }));

    // useEffect(() => {
    //     setFavoriteAlbums(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "highest-user-score" }));
    //     setLatestRatings(sort(getRatingAlbums(reviews), "ratingAlbums", { value: "newest-reviews" }));
    //     setLatestReviews(sort(getUsersReviews(user.id, true), "reviews", { value: "newest" }));
    // }, [user, reviews]);

    const [latestReviews, setLatestReviews] = useState(null);
    const [latestRatings, setLatestRatings] = useState(null);

    useEffect(async () => {
        const { data: latestReviews } = await getLatestReviewerReviews(reviewer.id);
        setLatestReviews(latestReviews.filter((r) => r.review_text !== null));
        setLatestRatings(latestReviews);
    }, []);

    return latestRatings && latestReviews ? (
        <StyledContentGroupPage>
            <ContentGroup
                title="Favorite albums"
                className="contentGroup"
                content={_.orderBy(
                    latestRatings,
                    (r) => {
                        return r.rating;
                    },
                    ["desc"]
                )}
                contentType="ratingAlbums"
                ratingAlbumIsReviewDateHidden={true}
                itemsCount={5}
                colSize={[5, 3, 2]}
            />
            <ContentGroup
                title="Latest ratings"
                viewAllUrl={`/users/${reviewer.slug}/ratings`}
                className="contentGroup"
                content={latestRatings}
                contentType="ratingAlbums"
                itemsCount={15}
                colSize={[5, 3, 2]}
            />

            <ContentGroup
                title="Latest reviews"
                viewAllUrl={`/users/${reviewer.slug}/reviews`}
                className="contentGroup"
                content={latestReviews}
                contentType="reviews"
                reviewIsOutsideAlbum={true}
                itemsCount={6}
                colSize={[2, 1, 1]}
            />
        </StyledContentGroupPage>
    ) : (
        <LoadingScreen />
    );
};

export default ProfilePageReviewsContainer;
