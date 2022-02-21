import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import getScoreColor from "./../../utils/scoreColor";

const accentColor = ({ theme }) => theme.colors.accentColor;
const lightColor = ({ theme }) => theme.colors.lightColor;

const StyledArtistContainer = styled.div`
    display: block;
    /* max-width: 150px; */
    text-align: center;

    a {
        text-decoration: none;
        color: ${lightColor};
    }

    .artist-image-container {
        width: inherit;
        height: inherit;

        img {
            width: 100%;
            border-radius: 100%;
            outline: 0 solid ${accentColor};
            transition: all 0.1s ease-in-out, box-shadow 0.4s ease-in-out;
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
        color: ${accentColor};
        transition: all 0.1s ease-in-out;
    }

    &:hover img {
        outline-offset: -0.35rem;
        outline-width: 0.35rem;
        box-shadow: 0 0 25px ${accentColor};
        transition: all 0.1s ease-in-out;
    }
`;

const ArtistContainer = ({ artist, onClick, showAvgScore }) => {
    return (
        <StyledArtistContainer>
            <Link to={`/artists/${artist.id}`} onClick={onClick}>
                <div className="artist-image-container">
                    <img src={artist.image} alt={artist.name} />
                </div>
                <div className="artist-name-container">
                    <h1>{artist.name}</h1>
                    {showAvgScore && <h4 className={getScoreColor(artist.average_score)}>Average Score: {artist.average_score}</h4>}
                </div>
            </Link>
        </StyledArtistContainer>
    );
};

export default ArtistContainer;
