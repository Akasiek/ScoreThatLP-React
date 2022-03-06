import React, { useState, useEffect } from "react";
import ContentGroup from "../common/contentGroup";
import ArtistPageAlbumsGroup from "./artistPageAlbumsGroup";
import { StyledContentGroupPage } from "./../albums";
import { getLatestArtistReviews } from "../../services/reviewService";
import FormLink from "../forms/formLink";

const ArtistPageContentContainer = ({ artist }) => {
    const [latestReviews, setLatestReviews] = useState(null);

    useEffect(async () => {
        const { data: reviews } = await getLatestArtistReviews(artist.slug);
        setLatestReviews(reviews);
    }, [artist.slug]);

    return (
        <StyledContentGroupPage>
            <FormLink label={`Add ${artist.name} album`} url={`/artists/${artist.slug}/new-album`} />
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
