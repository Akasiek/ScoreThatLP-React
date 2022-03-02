import React, { useState } from "react";
import styled from "styled-components";

import AlbumPageAsideLinks from "./albumPageAsideLinks";
import AlbumPageAsideDetails from "./albumPageAsideDetails";
import AlbumPageAsideTracks from "./albumPageAsideTracks";
import AlbumPageTracksForm from "./albumPageTracksForm";

const StyledAlbumPageAside = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 2rem 0;

    font-size: clamp(0.8rem, 1vw, 1rem);

    .albumDetails,
    .albumLinks,
    .albumTracks {
        margin: 1rem 3rem 3.5rem 3rem;
    }

    h3 {
        font-size: clamp(1.25rem, 1.5vw, 1.65rem);
    }

    hr {
        margin: 1rem 20% 1rem 0;
        border: 1px solid var(--darkBlueColor);
    }

    .addButton {
        text-align: center;
        margin-block: 1rem;
        button {
            cursor: pointer;
            outline: none;
            color: var(--lightColor);
            font-family: "Montserrat";
            font-weight: 900;
            font-size: clamp(1rem, 1.2vw, 1.2rem);

            background-color: var(--blueColor);
            border: 1px solid var(--accentColor);
            border-radius: 25px;
            padding: 0.5rem 1rem;

            transition: all 0.1s ease-in-out;
            &:hover {
                color: var(--darkestColor);
                background-color: var(--accentColor);
            }
        }
    }

    .albumLinks {
        .linksContainer {
            display: flex;
        }

        a {
            margin-right: 1.5rem;
        }

        img {
            height: 1.5rem;
            transform-origin: center;
            transition: transform 0.1s ease-in-out;

            &:hover {
                /* Change svg color to accent color */
                filter: brightness(0) saturate(100%) invert(41%) sepia(60%) saturate(1239%) hue-rotate(314deg) brightness(90%) contrast(105%);
                transform: scale(1.25);
                transform-origin: center;
            }
        }
    }
    .albumDetails {
        font-weight: normal;
        li {
            margin: 0.8rem 0;
        }

        .genreLink {
            &::before {
                content: " ";
            }
            &:not(:last-child)::after {
                content: ", ";
            }
        }
    }
    .albumTracks {
        .trackContainer {
            margin: 0.35rem 0;
            display: grid;
            gap: 1rem;
            justify-items: space-between;
            grid-template-columns: 0.75rem 1fr auto;

            & > p:not(.trackTitle) {
                font-weight: normal;
            }

            .trackPosition {
                color: var(--accentColor);
                user-select: none;
                -moz-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -o-user-select: none;
            }
        }

        .albumDuration {
            margin-top: 1rem;
            text-align: right;
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        padding: 1rem 0;
        & > div {
            margin: 1rem 2rem 2rem 2rem;
        }

        .albumTracks {
            & > div {
                margin: 0.25rem 0;
            }
        }
    }
`;

const AddButton = ({ label, onClick }) => {
    return (
        <div className="addButton">
            <button onClick={onClick}>{label}</button>
        </div>
    );
};

const AlbumPageAside = ({ album }) => {
    const [isTracksFormVisible, setIsTracksFormVisible] = useState(false);

    const handleTracksFormVisiblity = () => setIsTracksFormVisible(!isTracksFormVisible);

    return (
        <React.Fragment>
            <StyledAlbumPageAside>
                <AlbumPageAsideDetails album={album} />

                {album.links.length !== 0 ? (
                    <AlbumPageAsideLinks album={album} />
                ) : (
                    <AddButton label="Add Links" onClick={handleTracksFormVisiblity} />
                )}

                {album.tracks.length !== 0 ? (
                    <AlbumPageAsideTracks album={album} />
                ) : (
                    <AddButton label="Add Tracklist" onClick={handleTracksFormVisiblity} />
                )}
            </StyledAlbumPageAside>
            {isTracksFormVisible ? <AlbumPageTracksForm album={album} setVisibility={handleTracksFormVisiblity} /> : null}
        </React.Fragment>
    );
};

export default AlbumPageAside;
