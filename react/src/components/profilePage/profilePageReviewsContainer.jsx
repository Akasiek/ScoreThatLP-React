import React, { useState, useEffect } from "react";

import { StyledContentGroupPage } from "../albums";
import ContentGroup from "../common/contentGroup";
import { getLatestReviewerReviews } from "../../services/reviewService";
import _ from "lodash";
import LoadingScreen from "./../loadingScreen";

const ProfilePageReviewsContainer = ({ reviewer }) => {
    const [latestReviews, setLatestReviews] = useState(null);
    const [latestRatings, setLatestRatings] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: latestReviews } = await getLatestReviewerReviews(reviewer.id);
            setLatestReviews(latestReviews.filter((r) => r.review_text !== null));
            setLatestRatings(latestReviews);
        })();
    }, [reviewer.id]);

    console.log(latestRatings);

    return latestRatings && latestReviews ? (
        <StyledContentGroupPage>
            <ContentGroup
                title="Favorite albums"
                className="contentGroup"
                content={_.orderBy(
                    latestRatings.filter((r) => r.album.release_type === "LP"),
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
                viewAllUrl={`/users/${reviewer.username}/ratings`}
                className="contentGroup"
                content={latestRatings}
                contentType="ratingAlbums"
                itemsCount={15}
                colSize={[5, 3, 2]}
            />

            <ContentGroup
                title="Latest reviews"
                viewAllUrl={`/users/${reviewer.username}/reviews`}
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
