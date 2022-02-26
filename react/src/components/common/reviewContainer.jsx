import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import ReadMoreReact from "read-more-react";
import Like from "./like";
import { getAlbum, getArtist, getUser } from "../../services/fakeMusicService";
import getScoreColor from "../../utils/scoreColor";

const StyledReviewContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    .userContainer {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding: 1rem;
        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 0.5rem;
        }
        color: var(--darkBlueColor);

        h2 {
            font-size: clamp(1rem, 2vw, 1.5rem);
        }

        h4 {
            font-size: clamp(0.65rem, 1.5vw, 1rem);
        }

        a {
            display: flex;
            align-items: center;
            justify-content: left;

            h4 {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            color: inherit;
            text-decoration: none;
            gap: 0.5rem;

            @media (max-width: ${({ theme }) => theme.mobile}) {
                gap: 0.5rem;
            }

            &:hover {
                text-decoration: underline;
            }
            &:hover img {
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            }
        }

        a > img {
            height: clamp(2.5rem, 4vw, 4rem);
            /* width: 15%; */
            border-radius: 100%;
            transition: all 0.2s ease-in-out;
        }

        &.GreenBG {
            background-color: var(--greenScoreColor) !important;
        }
        &.YellowBG {
            background-color: var(--yellowScoreColor) !important;
        }
        &.RedBG {
            background-color: var(--redScoreColor) !important;
        }
    }
    .reviewAlbumContainer {
        display: flex;

        .albumCoverContainer {
            img {
                height: clamp(7.5rem, 10vw, 10rem);
                width: auto;

                aspect-ratio: 1;
                vertical-align: top;
                object-fit: cover;
                /* height: auto;
                width: 100%; */
            }
        }

        .albumTextContainer {
            flex: 1;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;

            background-color: var(--blueColor);
            padding: 0.5rem 1rem;
            a {
                width: 100%;
                color: var(--lightColor);
                text-decoration: none !important;
            }

            h2 {
                font-size: clamp(0.85rem, 1.8vw, 1.5rem);
            }
            h4 {
                font-weight: normal;
                font-size: clamp(0.7rem, 1.5vw, 1rem);
            }

            h2:hover,
            h4:hover {
                text-decoration: underline;
            }
        }
    }
    .reviewContainer {
        & > * {
            margin: 0 auto;
            max-width: 800px;
        }
        line-height: 1.6;
        padding: 1.5rem 2rem;
        background-color: var(--blueColor);
        font-size: clamp(0.8rem, 1vw, 1.1rem);
        font-weight: normal;
        .reviewHeaderText {
            text-transform: uppercase;
            /* font-size: 1.5rem; */
            font-weight: 900;
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 1rem 1.25rem;
        }
    }

    .read-more-button {
        cursor: pointer;
        font-weight: 900;
        margin-top: 0.5rem;
    }

    .creationTimeText {
        opacity: 0.6;
        font-style: italic;
    }
`;

const ReviewContainer = ({ review, isOutsideAlbum }) => {
    return (
        <StyledReviewContainer>
            {review.album && isOutsideAlbum && (
                <div className="reviewAlbumContainer">
                    <div className="albumCoverContainer">
                        <Link to={`/albums/${review.album.id}`}>
                            <img src={review.album.art_cover} alt={`${review.album.title} Cover Art`} />
                        </Link>
                    </div>
                    <div className="albumTextContainer">
                        <Link to={`/artists/${review.album.artist.slug}`}>
                            <h2>{review.album.artist.name}</h2>
                        </Link>

                        <Link to={`/albums/${review.album.id}`}>
                            <h4>{review.album.title}</h4>
                        </Link>
                    </div>
                </div>
            )}
            <div className={`userContainer ${getScoreColor(review.rating)}BG`}>
                <Link to={`/users/${review.reviewer.slug}`}>
                    <img src={review.reviewer.profile_pic} alt="" />
                    <h4>{review.reviewer.username}</h4>
                </Link>
                <h2>{review.rating}</h2>
            </div>
            <div className="reviewContainer">
                <p className="reviewHeaderText">Review</p>
                <ReadMoreReact text={review.review_text} min={300} ideal={350} max={400} readMoreText="click here to read more" />
                <p title={moment(review.created_at).format("YYYY-MM-DD HH:MM:ss")} className="creationTimeText">
                    {moment(review.created_at).fromNow()}
                </p>
                {/* <Like content={review} />  */}
            </div>
        </StyledReviewContainer>
    );
};

export default ReviewContainer;
