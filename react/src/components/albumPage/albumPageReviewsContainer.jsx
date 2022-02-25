import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ContentGroup from "../common/contentGroup";
import { getAlbumReviews } from "../../services/reviewService";
import LoadingScreen from "../loadingScreen";

const StyledReviewsContainer = styled.div`
    /* & > div {
        margin: 2rem 1rem;

        & > div:not(first-child) > div,
        & > div:first-child {
            margin-top: 3rem;
        }
    } */

    .reviewGroup {
        margin: 3rem 0;

        .contentTitleBar {
            margin: 0 0 2rem 0;
        }

        .contentContainer {
            gap: 3rem;
        }
    }

    .ratingGroup {
        margin: 3rem 0;

        & > div {
            gap: 2.5rem 4%;
            grid-template-columns: repeat(4, 1fr);

            @media (max-width: 80rem) {
                grid-template-columns: repeat(2, 1fr);
            }

            @media (max-width: ${({ theme }) => theme.mobile}) {
                gap: 1.5rem 4%;
                grid-template-columns: repeat(4, 1fr);
            }

            @media (max-width: 30rem) {
                gap: 1rem 6%;
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .contentTitleBar {
            margin: 0 0 2rem 0;
        }
    }
`;

const AlbumPageReviewsContainer = ({ album }) => {
    const [reviews, setReviews] = useState();
    const [ratings, setRatings] = useState();

    useEffect(async () => {
        const { data: allReviews } = await getAlbumReviews(album.id);
        setReviews(allReviews.filter((r) => r.review_text !== null));
        setRatings(allReviews.filter((r) => r.review_text === null));
    }, []);

    return reviews && ratings ? (
        <StyledReviewsContainer>
            {reviews.length !== 0 && (
                <ContentGroup
                    className="reviewGroup"
                    title="Latest Reviews"
                    viewAllUrl={`/albums/${album.id}/reviews/`}
                    // noTitleMargin={true}
                    content={reviews}
                    contentType="reviews"
                    itemsCount={4}
                    colSize={[1, 1, 1]}
                />
            )}
            {ratings.length !== 0 && (
                <ContentGroup
                    className="ratingGroup"
                    title="Latest Ratings"
                    viewAllUrl={`/albums/${album.id}/reviews/`}
                    // noTitleMargin={true}
                    content={ratings}
                    contentType="ratings"
                    itemsCount={8}
                    colSize={[4, 4, 2]}
                />
            )}
        </StyledReviewsContainer>
    ) : (
        <LoadingScreen />
    );
};

export default AlbumPageReviewsContainer;
