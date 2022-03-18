import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

import getScoreColor from "./../../utils/scoreColor";

const StyledArtistContainer = styled.div`
    display: block;
    /* max-width: 150px; */
    text-align: center;

    a {
        text-decoration: none;
        color: var(--lightColor);
    }

    .artist-image-container {
        display: flex;
        justify-content: center;
        align-items: center;

        aspect-ratio: 1 / 1;
        overflow: hidden;

        border-radius: 100%;
        outline: 0 solid var(--accentColor);
        transition: all 0.1s ease-in-out, box-shadow 0.4s ease-in-out;

        img {
            object-fit: cover;
            width: 100%;
            aspect-ratio: 1;
            vertical-align: top;
        }
    }

    .artist-name-container {
        margin-top: 10px;

        h1 {
            font-size: clamp(0.65rem, 1.5vw, 1.5rem);
            transition: all 0.3s ease-in-out;
        }

        h4 {
            font-size: clamp(0.55rem, 1vw, 1rem);

            &.Green {
                color: var(--greenScoreColor);
            }

            &.Yellow {
                color: var(--yellowScoreColor);
            }

            &.Red {
                color: var(--redScoreColor);
            }
        }
    }

    &:hover h1 {
        color: var(--accentColor);
        transition: all 0.1s ease-in-out;
    }

    &:hover .artist-image-container {
        outline-offset: -0.35rem;
        outline-width: 0.35rem;
        box-shadow: 0 0 25px var(--accentColor);
        transition: all 0.1s ease-in-out;
    }
`;

const ArtistContainer = ({ artist, onClick, showAvgScore }) => {
    return (
        <StyledArtistContainer>
            <Link to={`/artists/${artist.slug}`} onClick={onClick}>
                <div className="artist-image-container">
                    <LazyLoadImage
                        src={artist.image || artist.image_url || `/images/square-404.jpg`}
                        alt={artist.name}
                        placeholderSrc={`/images/avatar_placeholder.jpg`}
                    />
                </div>
                <div className="artist-name-container">
                    <h1>{artist.name}</h1>
                    {showAvgScore && artist.average_score && (
                        <h4 className={getScoreColor(artist.average_score)}>Average Score: {artist.average_score}</h4>
                    )}
                </div>
            </Link>
        </StyledArtistContainer>
    );
};

export default ArtistContainer;
