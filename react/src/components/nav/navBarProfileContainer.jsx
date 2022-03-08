import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledProfileContainer = styled.div`
    .userContainer > a {
        max-width: clamp(12rem, 25vw, 35rem);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: clamp(0.5rem, 1vw, 1rem);
        img {
            height: 2rem;
            border-radius: 100%;
        }

        h2 {
            font-size: inherit;
            transition: inherit;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .hiddenMenu {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateY(100%);
        display: none;
        background-color: var(--lightBlueColor);

        ul {
            list-style-type: none;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: right;
            gap: 1rem;
            li {
                a {
                    padding: 0;
                    cursor: pointer;
                    &:hover {
                        color: var(--accentColor);
                    }
                }
            }
        }
    }

    &:hover {
        .userContainer > a {
            h2 {
                transform: scale(1.1);
            }
        }
        .hiddenMenu {
            display: block;
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        .userContainer {
            display: none;
        }

        .hiddenMenu {
            display: block;
            position: static;
            transform: none;
            font-size: inherit;
            text-transform: lowercase;
            background-color: transparent;
            gap: clamp(1.5rem, 2vw, 3rem);
            ul {
                li {
                    text-align: center;
                }
            }
        }

        &::before {
            content: "";
            border: 1px solid var(--accentColor);
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 30%;
        }
    }
`;

const NavBarProfileContainer = ({ user }) => {
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("refresh");
        window.location.reload(false);
    };
    return (
        <StyledProfileContainer>
            <div className="userContainer">
                <Link to={`/users/${user.username}`}>
                    <img src={user.profile_pic} alt={`${user.username} profile picture`} />
                    <h2>{user.username}</h2>
                </Link>
            </div>
            <div className="hiddenMenu">
                <ul>
                    <li>
                        <Link to={`/users/${user.username}`}>Profile</Link>
                    </li>
                    <li>
                        <Link to={`/users/${user.username}/settings`}>Settings</Link>
                    </li>
                    <li>
                        <a onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
            </div>
        </StyledProfileContainer>
    );
};

export default NavBarProfileContainer;
