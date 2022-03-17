import _ from "lodash";
import React, { useContext } from "react";
import styled from "styled-components";
import FormLink from "../forms/formLink";
import ReviewerContext from "./../../context/reviewerContext";

const StyledProfilePageHeader = styled.div`
    .topPanelContainer {
        width: 100%;
        max-height: 400px;
        min-height: 225px;
        background-color: var(--darkBlueColor);
        position: relative;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgb(233, 69, 96);
            background: linear-gradient(0deg, rgba(233, 69, 96, 0.75) 0%, rgba(233, 69, 96, 0) 100%);
        }

        .artistImageContainer {
            overflow: hidden;
            max-height: inherit;

            display: flex;
            align-items: flex-start;

            & > img {
                width: 100%;
            }
        }

        .profilePicContainer {
            position: absolute;
            bottom: 0;
            transform: translateY(50%);
            padding-left: 5rem;
            z-index: 2;

            & > img {
                height: clamp(6rem, 12vw, 12rem);
                object-fit: cover;
                aspect-ratio: 1;
                vertical-align: top;
                border-radius: 100%;
            }
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
            & {
                min-height: 150px;
            }
            .profilePicContainer {
                right: 0;
                left: 0;
                display: flex;
                justify-content: center;
                padding: 0;
            }
        }
    }
    .bottomPanelContainer {
        padding-top: clamp(4rem, 7.5vw, 7.5rem);
        padding-inline: clamp(1.5rem, 3vw, 3rem);
        padding-bottom: clamp(2rem, 3vw, 3rem);
        background-color: var(--blueColor);

        .usernameCounterContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 1rem 3rem;
            text-align: center;
            h1 {
                font-size: clamp(1.75rem, 2.75vw, 2.75rem);
            }

            .countersContainer {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 0.75rem 1.5rem;
                h3 {
                    font-size: clamp(1rem, 1.5vw, 1.5rem);
                    font-weight: normal;
                }
            }
        }

        .linksContainer {
            padding-top: clamp(1rem, 1.5vw, 1.5rem);
            display: flex;
            align-items: center;
            gap: clamp(1rem, 2vw, 2rem);
            a > img {
                height: clamp(1.25rem, 2vw, 2rem);
                transition: transform 0.1s ease-in-out;
                &:hover {
                    transform: scale(1.25);
                    transform-origin: center;
                }
            }
        }

        .aboutContainer {
            padding-top: clamp(0.75rem, 1vw, 1rem);
            max-width: 40vw;
            font-weight: normal;
            white-space: pre-wrap;
            font-size: clamp(0.9rem, 1.1vw, 1.2rem);
        }

        .favArtistContainer {
            padding-top: clamp(0.75rem, 1vw, 1rem);
            font-weight: normal;
            font-size: clamp(0.8rem, 1vw, 1.1rem);
            a {
                color: var(--lightColor);
                text-decoration: none;
                position: relative;
            }

            a::after {
                content: "";
                height: 2px;
                background-color: var(--lightColor);
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                transform: scaleX(0);
                transform-origin: bottom right;
                transition: transform 0.1s ease-in-out;
            }

            a:hover::after {
                transform: scaleX(1);
                transform-origin: bottom left;
            }
        }

        .formLinkContainer {
            div {
                justify-content: left;
                margin: 2rem 0 0 0;
            }
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
            .usernameCounterContainer {
                flex-direction: column;
                justify-content: center;
            }
            .linksContainer {
                justify-content: center;
            }

            .aboutContainer {
                padding-inline: 2rem;
                text-align: center;
                max-width: 100%;
            }

            .formLinkContainer {
                div {
                    display: none;
                }
            }

            .favArtistContainer {
                text-align: center;
                a {
                    text-decoration: underline;
                }
            }
        }
    }
`;

const ProfilePageHeader = ({ reviewer }) => {
    const currentReviewer = useContext(ReviewerContext)[0];
    return (
        <StyledProfilePageHeader>
            <div className="topPanelContainer">
                {(reviewer.favorite_artist?.artist.background_image || reviewer.favorite_artist?.artist.background_image_url) && (
                    <div className="artistImageContainer">
                        <img
                            src={reviewer.favorite_artist.artist.background_image || reviewer.favorite_artist?.artist.background_image_url}
                            alt="Profile background"
                        />
                    </div>
                )}
                <div className="profilePicContainer">
                    <img
                        src={reviewer.profile_pic || reviewer.profile_pic_url || `/images/avatar_placeholder.jpg`}
                        alt={`${reviewer.username} profile avatar`}
                    />
                </div>
            </div>
            <div className="bottomPanelContainer">
                <div className="usernameCounterContainer">
                    <h1>{reviewer.username}</h1>
                    <div className="countersContainer">
                        {/* <h3>
                            <span style={{ fontWeight: 900 }}>{reviewer.number_of_followers}</span> Followers
                        </h3> */}
                        <h3>
                            <span style={{ fontWeight: 900 }}>{reviewer.number_of_ratings}</span> Ratings
                        </h3>
                        <h3>
                            <span style={{ fontWeight: 900 }}>{reviewer.number_of_reviews}</span> Reviews
                        </h3>
                    </div>
                </div>
                {reviewer.links.length > 0 && (
                    <div className="linksContainer">
                        {_.orderBy(reviewer.links, (l) => l.service_name, ["desc"]).map((l, index) => {
                            return (
                                <a key={index} href={l.url} rel="noreferrer" target="_blank">
                                    <img src={`/images/serviceIcons/${l.service_name}.svg`} alt={`${l.service} music service provider logo`} />
                                </a>
                            );
                        })}
                    </div>
                )}
                {reviewer.about_text && (
                    <div className="aboutContainer">
                        <p>
                            <span style={{ fontWeight: 900 }}>About</span>
                            <br />
                            {reviewer.about_text}
                        </p>
                    </div>
                )}
                {reviewer.favorite_artist && (
                    <div className="favArtistContainer">
                        <p>
                            Favorite artist:{" "}
                            <a href={`/artists/${reviewer.favorite_artist.artist.slug}`} style={{ fontWeight: 900 }}>
                                {reviewer.favorite_artist.artist.name}
                            </a>
                        </p>
                    </div>
                )}
                {currentReviewer?.id === reviewer.id && (
                    <div className="formLinkContainer">
                        <FormLink label="User Settings" url="/settings" />
                    </div>
                )}
            </div>
        </StyledProfilePageHeader>
    );
};

export default ProfilePageHeader;
