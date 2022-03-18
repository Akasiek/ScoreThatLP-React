import React from "react";
import styled from "styled-components";
import getScoreColor from "./../../utils/scoreColor";

const StyledArtistPageHeader = styled.div`
    width: 100%;
    height: 700px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        height: 50vh;
    }
    background-image: url(${(props) => props.bg_image || "/images/artist-bg-404.jpg"});
    background-origin: content-box;
    background-position: top;
    background-size: cover;
    position: relative;

    .normalWeight {
        font-weight: normal;
    }

    .gradientContainer {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgb(22, 33, 62);
        background: linear-gradient(0deg, rgba(22, 33, 62, 0.7483368347338936) 0%, rgba(22, 33, 62, 0) 75%, rgba(22, 33, 62, 0) 100%);
    }

    .infoContainer {
        position: relative;
        height: inherit;
        max-width: 1550px;
        margin: 0 auto;

        .infoElements {
            line-height: 1;
            position: absolute;
            bottom: 2rem;

            padding: 0 2.5rem;

            h1 {
                font-size: clamp(1.75rem, 5vw, 5.5rem);
                margin-bottom: 0.5rem;
            }

            h2 {
                font-size: clamp(0.85rem, 2.5vw, 2.5rem);
                margin-bottom: 1rem;
            }

            h3 {
                font-size: clamp(0.65rem, 1.5vw, 1.5rem);
                margin-bottom: 0.5rem;
            }

            h1,
            h2,
            h3 {
                transition: opacity 0.25s ease-in-out;
            }

            h1:hover,
            h2:hover,
            h3:hover {
                opacity: 0.4;
            }

            h3 > span:not(:last-child):after {
                content: ", ";
            }

            .GreenBG {
                color: var(--greenScoreColor) !important;
            }
            .YellowBG {
                color: var(--yellowScoreColor) !important;
            }
            .RedBG {
                color: var(--redScoreColor) !important;
            }

            .linksContainer {
                display: flex;
            }

            a {
                margin-right: 1.5rem;
            }

            img {
                height: 1.75rem;
                transform-origin: center;
                transition: transform 0.1s ease-in-out;

                &:hover {
                    /* Change svg color to accent color */
                    filter: brightness(0) saturate(100%) invert(41%) sepia(60%) saturate(1239%) hue-rotate(314deg) brightness(90%) contrast(105%);
                    transform: scale(1.25);
                    transform-origin: center;
                }
            }
            @media (max-width: ${({ theme }) => theme.mobile}) {
                bottom: 0.5rem;

                img {
                    height: 1rem;
                }
                a {
                    margin-right: 1rem;
                }
                h1 {
                    /* font-size: clamp(2rem, 6vw, 6rem); */
                    margin-bottom: 0.5rem;
                }
                h2 {
                    margin-bottom: 1rem;
                }
            }
        }
    }
`;

const ArtistPageHeader = ({ artist }) => {
    return (
        <StyledArtistPageHeader bg_image={artist.background_image || artist.background_image_url}>
            <div className="gradientContainer"></div>
            <div className="infoContainer">
                <div className="infoElements">
                    <h1>{artist.name}</h1>
                    {artist.genres && (
                        <h3 className="normalWeight">
                            {artist.genres.map((g, index) => (
                                <span key={index}>{g}</span>
                            ))}
                        </h3>
                    )}
                    {artist.average_score && (
                        <h2 className={`${getScoreColor(artist.average_score)}BG`}>
                            <span className="normalWeight">Average Score: </span>
                            {artist.average_score}
                        </h2>
                    )}
                    <div className="linksContainer">
                        {artist.links?.map((l, index) => {
                            return (
                                <a key={index} href={l.url} rel="noreferrer" target="_blank">
                                    <img src={`/images/serviceIcons/${l.service}.svg`} alt={`${l.service} music service provider logo`} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </StyledArtistPageHeader>
    );
};

export default ArtistPageHeader;
