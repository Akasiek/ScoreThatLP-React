import React from "react";
import styled from "styled-components";
import moment from "moment";

const StyledAlbumPageAside = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 2rem 0;

    font-size: clamp(0.8rem, 1vw, 1rem);

    & > div {
        margin: 1rem 3rem 3.5rem 3rem;
    }

    h3 {
        font-size: clamp(1.25rem, 1.5vw, 1.65rem);
    }

    hr {
        margin: 1rem 20% 1rem 0;
        border: 1px solid var(--darkBlueColor);
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
        & > div {
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

const AlbumPageAside = ({ album }) => {
    return (
        <StyledAlbumPageAside>
            {album.links && (
                <div className="albumLinks">
                    <h3>Listen to the Album</h3>
                    <hr />
                    <div className="linksContainer">
                        {album.links.map((l, index) => {
                            return (
                                <a key={index} href={l.url} rel="noreferrer" target="_blank">
                                    <img src={`/images/serviceIcons/${l.service_name}.svg`} alt={`${l.service_name} music service provider logo`} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
            <div className="albumDetails">
                <h3>Details</h3>
                <hr />
                <ul>
                    <li>
                        Release Date: <span style={{ fontWeight: 900 }}>{moment(album.release_date).format("Do MMMM YYYY")}</span>
                    </li>
                    <li>
                        Genres:
                        {album.genres.map((g, index) => {
                            {
                                // TODO: Genres links
                            }
                            return (
                                <span key={index} className="genreLink" style={{ fontWeight: 900 }}>
                                    {g}
                                </span>
                            );
                        })}
                    </li>
                </ul>
            </div>
            {album.tracks && (
                <div className="albumTracks">
                    <h3>Tracks</h3>
                    <hr />
                    {album.tracks.map((t, index) => {
                        return (
                            <div key={index}>
                                <p className="trackPosition">{t.position}.</p>
                                <p className="trackTitle">{t.title}</p>
                                <p className="trackDuration">{moment(t.duration, [moment.ISO_8601, "HH:MM:ss"]).format("MM:ss")}</p>
                            </div>
                        );
                    })}
                    {
                        // TODO: Full album length
                    }
                </div>
            )}
        </StyledAlbumPageAside>
    );
};

export default AlbumPageAside;
