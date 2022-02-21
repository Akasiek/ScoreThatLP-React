import React from "react";
import styled from "styled-components";

import { getArtist, users } from "../../services/fakeMusicService";

const StyledProfilePageHeader = styled.div`
    .topPanelContainer {
        width: 100%;
        max-height: 300px;
        /* overflow: hidden; */
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
                border-radius: 100%;
            }
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
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
            padding-block: clamp(1.5rem, 2vw, 2rem);
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
            max-width: 50vw;
            font-weight: normal;
            font-size: clamp(0.8rem, 1.25vw, 1.25vw);
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
        }
    }
`;

const ProfilePageHeader = ({ user }) => {
    const artistImage = getArtist(user.bg_image_artist_id)?.bg_image;

    return (
        <StyledProfilePageHeader>
            <div className="topPanelContainer">
                {artistImage && (
                    <div className="artistImageContainer">
                        <img src={artistImage} alt="Profile background image" />
                    </div>
                )}
                {user.profile_pic && (
                    <div className="profilePicContainer">
                        <img src={user.profile_pic} alt={`${user.username} profile picture`} />
                    </div>
                )}
            </div>
            <div className="bottomPanelContainer">
                <div className="usernameCounterContainer">
                    <h1>{user.username}</h1>
                    <div className="countersContainer">
                        <h3>
                            <span style={{ fontWeight: 900 }}>{user.followers_count}</span> Followers
                        </h3>
                        <h3>
                            <span style={{ fontWeight: 900 }}>{user.ratings_count}</span> Ratings
                        </h3>
                        <h3>
                            <span style={{ fontWeight: 900 }}>{user.reviews_count}</span> Reviews
                        </h3>
                    </div>
                </div>
                <div className="linksContainer">
                    {user.links?.map((l, index) => {
                        return (
                            <a key={index} href={l.url} rel="noreferrer" target="_blank">
                                <img src={`/images/serviceIcons/${l.service}.svg`} alt={`${l.service} music service provider logo`} />
                            </a>
                        );
                    })}
                </div>
                <div className="aboutContainer">
                    {user.about_text && (
                        <p>
                            <span style={{ fontWeight: 900 }}>About</span>
                            <br />
                            {user.about_text}
                        </p>
                    )}
                </div>
            </div>
        </StyledProfilePageHeader>
    );
};

export default ProfilePageHeader;
