import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import { StyledAlbumContainer } from "./albumContainer";
import { getArtist } from "./../../services/fakeMusicService";
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

const RatingAlbumContainer = ({ album, isReviewDateHidden }) => {
    return (
        <StyledRatingAlbumContainer>
            <div className="albumImageContainer">
                <Link to={`/albums/${album.id}`}>
                    <img src={album.image} alt={`${album.title} art cover`} />
                </Link>
            </div>

            <div className="albumTextContainer">
                <Link to={`/artists/${album.artist?.id || getArtist(album.artist_id)}`}>
                    <h2>{album.artist?.name || getArtist(album.artist_id).name}</h2>
                </Link>
                <Link to={`/albums/${album.id}`}>
                    <h3>{album.title}</h3>
                </Link>
                {isReviewDateHidden || <h4>Rated {moment(album.review_date).fromNow()}</h4>}
            </div>

            <div className={`albumScoreContainer ${getScoreColor(album.user_score)}BG`}>
                <p>{album.user_score}</p>
            </div>
        </StyledRatingAlbumContainer>
    );
};

export default RatingAlbumContainer;
