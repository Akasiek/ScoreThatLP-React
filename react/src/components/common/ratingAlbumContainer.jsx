import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { StyledAlbumContainer } from "./albumContainer";
import getScoreColor from "./../../utils/scoreColor";

const StyledRatingAlbumContainer = styled(StyledAlbumContainer)`
    .albumTextContainer {
        h4 {
            font-size: clamp(0.65rem, 1.1vw, 1.1rem);
            font-weight: normal;
            text-indent: -1.5px;
            padding-left: 1px;
            white-space: wrap;

            opacity: 0.6;
            font-style: italic;
        }
    }
`;

const RatingAlbumContainer = ({ review, isReviewDateHidden }) => {
    return (
        <StyledRatingAlbumContainer>
            <div className="albumImageContainer">
                <Link to={`/albums/${review.album.id}`}>
                    <LazyLoadImage
                        src={review.album.art_cover || review.album.art_cover_url || `/images/square-404.jpg`}
                        alt={`${review.album.title} art cover`}
                        effect="blur"
                        threshold="240"
                    />
                </Link>
            </div>

            <div className="albumTextContainer">
                <Link to={`/artists/${review.album.artist.slug}`}>
                    <h2>{review.album.artist.name}</h2>
                </Link>
                <Link to={`/albums/${review.album.id}`}>
                    <h3>{review.album.title}</h3>
                </Link>
                {isReviewDateHidden || (
                    <h4 title={moment(review.updated_at).format("YYYY-MM-DD HH:mm:ss")}>Rated {moment(review.updated_at).fromNow()}</h4>
                )}
            </div>

            <div className={`albumScoreContainer ${getScoreColor(review.rating)}BG`}>
                <p>{review.rating}</p>
            </div>
        </StyledRatingAlbumContainer>
    );
};

export default RatingAlbumContainer;
