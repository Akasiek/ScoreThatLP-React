import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import ContentGroup from "../common/contentGroup";
import { ReloadContext } from "./albumPage";
import { getAlbumReviews } from "../../services/reviewService";
import { getArtistAlbums } from "../../services/albumService";
import { shuffle } from "lodash";

const StyledReviewsContainer = styled.div`
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

    .albumsGroup {
        margin-top: clamp(2.5rem, 5vw, 5rem);
        .contentTitleBar {
            margin: 0;
        }

        .contentContainer {
            gap: 3rem 4%;
            margin-block: clamp(1rem, 1.5vw, 1.5rem);
            margin-inline: clamp(0.5rem, 1vw, 1rem);
        }
    }
`;

const AlbumPageReviewsContainer = ({ album }) => {
    const [reviews, setReviews] = useState();
    const [ratings, setRatings] = useState();
    const [artistOtherAlbums, setArtistOtherAlbums] = useState();
    const reload = useContext(ReloadContext)[0];

    useEffect(() => {
        (async () => {
            const { data: allReviews } = await getAlbumReviews(album.id);
            setReviews(allReviews.filter((r) => r.review_text !== null));
            setRatings(allReviews.filter((r) => r.review_text === null));

            let { data: artistOtherAlbums } = await getArtistAlbums(album.artist.slug);
            artistOtherAlbums = artistOtherAlbums.filter((a) => a.id !== album.id && a);
            artistOtherAlbums = shuffle(artistOtherAlbums);
            setArtistOtherAlbums(artistOtherAlbums);
        })();
    }, [album.id, album.artist.slug, reload]);

    return reviews && ratings && artistOtherAlbums ? (
        <StyledReviewsContainer>
            {reviews.length !== 0 && (
                <ContentGroup
                    className="reviewGroup"
                    title="Latest Reviews"
                    viewAllUrl={`/albums/${album.id}/reviews/`}
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
                    content={ratings}
                    contentType="ratings"
                    itemsCount={8}
                    colSize={[4, 4, 2]}
                />
            )}

            {artistOtherAlbums.length !== 0 && (
                <ContentGroup
                    className="albumsGroup"
                    title="Other albums by this artist"
                    viewAllUrl={`/artists/${album.artist.slug}`}
                    content={artistOtherAlbums}
                    contentType="albums"
                    itemsCount={4}
                    colSize={[4, 2, 2]}
                />
            )}
        </StyledReviewsContainer>
    ) : null;
};

export default AlbumPageReviewsContainer;
