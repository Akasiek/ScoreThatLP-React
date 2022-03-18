import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const StyledUserContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--accentColor);

    & > a > div {
        padding-inline: 0.5rem;
    }

    a {
        color: var(--lightColor);
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .imageContainer {
        padding-top: 2rem;
        text-align: center;
        img {
            height: clamp(4rem, 7vw, 7rem);
            object-fit: cover;
            aspect-ratio: 1;
            vertical-align: top;
            border-radius: 100%;
        }
    }

    .usernameContainer {
        padding-bottom: 2rem;
        text-align: center;
        display: flex;
        justify-content: center;

        h1 {
            font-size: clamp(0.65rem, 1vw, 1rem);
            position: relative;

            &::after {
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
        }
    }

    &:hover {
        .usernameContainer > h1::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }
`;

const UserContainer = ({ user }) => {
    return (
        <StyledUserContainer>
            <Link to={`/users/${user.username}`}>
                <div className="imageContainer">
                    <LazyLoadImage
                        src={user.profile_pic || user.profile_pic_url || `/images/avatar_placeholder.jpg`}
                        alt={`${user.username} profile avatar`}
                        effect="blur"
                    />
                </div>
                <div className="usernameContainer">
                    <h1>{user.username}</h1>
                </div>
            </Link>
        </StyledUserContainer>
    );
};

export default UserContainer;
