import React, { useState } from "react";
import styled from "styled-components";
import { getArtistAlbums, getLatestArtistReviews } from "../../services/fakeMusicService";
import ContentGroup from "../common/contentGroup";
import useDeepCompareEffect from "use-deep-compare-effect";
import ArtistPageAlbumsGroup from "./artistPageAlbumsGroup";
import { StyledContentGroupPage } from "./../albums";

const ArtistPageContentContainer = ({ artist }) => {
    const [latestReviews, setLatestReviews] = useState(getLatestArtistReviews(artist.id));

    useDeepCompareEffect(() => {
        setLatestReviews(getLatestArtistReviews(artist.id));
    }, [artist]);

    return (
        <StyledContentGroupPage>
            <ArtistPageAlbumsGroup artist={artist} />
            <ContentGroup
                className="contentGroup"
                title={`Latest reviews`}
                noTitleMargin={true}
                content={latestReviews}
                contentType="reviews"
                showPlaceholderWhenEmpty={true}
                reviewIsOutsideAlbum={true}
                itemsCount={4}
                colSize={[2, 1, 1]}
            />
        </StyledContentGroupPage>
    );
};

export default ArtistPageContentContainer;
