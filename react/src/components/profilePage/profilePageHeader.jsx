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
            align-items: center;

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
                height: clamp(8rem, 15vw, 15rem);
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
        padding-top: clamp(5rem, 9vw, 9rem);
        padding-inline: clamp(1.5rem, 3vw, 3rem);
        padding-bottom: 3rem;
        background-color: var(--blueColor);

        .usernameCounterContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 1rem 3rem;
            text-align: center;
            h1 {
                font-size: clamp(2rem, 3.5vw, 3.5rem);
            }

            .countersContainer {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 0.75rem 1rem;
                h3 {
                    font-size: clamp(1rem, 1.5vw, 1.5rem);
                    font-weight: normal;
                }
            }
        }

        .linksContainer {
            padding-top: clamp(1.5rem, 2vw, 2rem);
            display: flex;
            align-items: center;
            gap: clamp(1rem, 2vw, 2rem);
            a > img {
                height: clamp(1.25rem, 2vw, 2rem);
                transition: transform 0.1s ease-in-out;
                &:hover {
                    /* Change svg color to accent color */
                    filter: brightness(0) saturate(100%) invert(41%) sepia(60%) saturate(1239%) hue-rotate(314deg) brightness(90%) contrast(105%);
                    transform: scale(1.25);
                    transform-origin: center;
                }
            }
        }

        .aboutContainer {
            padding-top: clamp(1.5rem, 2vw, 2rem);
            max-width: 50vw;
            font-weight: normal;
            white-space: pre-wrap;
            font-size: clamp(0.8rem, 1.25vw, 1.25vw);
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
                {currentReviewer.id === reviewer.id && (
                    <div className="formLinkContainer">
                        <FormLink label="User Settings" url="/settings" />
                    </div>
                )}
            </div>
        </StyledProfilePageHeader>
    );
};

export default ProfilePageHeader;
