import React, { useState } from "react";
import styled from "styled-components";
import { getArtistAlbums, getLatestArtistReviews } from "../../services/fakeMusicService";
import ContentGroup from "../common/contentGroup";
import useDeepCompareEffect from "use-deep-compare-effect";
import ArtistPageAlbumsGroup from "./artistPageAlbumsGroup";

const StyledArtistContentContainer = styled.div`
    background-color: var(--darkBlueColor);
    padding: 0 2rem;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        padding: 1rem 0;
    }

    .artistAlbums {
        padding: 1rem 0;
        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 1rem 0.5rem;
        }

        .contentTitleBar {
            margin: 2rem 1rem 0 1rem;
        }

        .sortingContainer {
            margin: 1.5rem 1rem;
        }

        .contentContainer {
            gap: 3rem 4%;
            margin: 2rem 3rem;
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {
            .contentContainer {
                gap: 2.5rem 5%;
                margin: 1.75rem 3rem;
            }
            .contentTitleBar {
                margin-top: 0;
            }
        }

        @media (max-width: 35rem) {
            .contentContainer {
                gap: 1.5rem 6%;
                margin: 1.25rem 1.5rem;
            }
        }
    }
`;

const ArtistPageContentContainer = ({ artist }) => {
    const [latestReviews, setLatestReviews] = useState(getLatestArtistReviews(artist.id));

    useDeepCompareEffect(() => {
        setLatestReviews(getLatestArtistReviews(artist.id));
    }, [artist]);

    return (
        <StyledArtistContentContainer>
            <ArtistPageAlbumsGroup artist={artist} />
            <ContentGroup
                className="artistAlbums"
                title={`Latest reviews`}
                noTitleMargin={true}
                content={latestReviews}
                contentType="reviews"
                showPlaceholderWhenEmpty={true}
                reviewIsOutsideAlbum={true}
                itemsCount={4}
                colSize={[2, 1, 1]}
            />
        </StyledArtistContentContainer>
    );
};

export default ArtistPageContentContainer;
