import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

import { Main } from "../App";
import UserContext from "./../context/userContext";

const StyledFooter = styled.footer`
    background-color: var(--accentColor);
    min-height: 300px;

    .mainLinksContainer {
        padding: 1rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        hr {
            border: 1px solid var(--lightColor);
            margin: 1rem;
        }
        .linksContainer {
            h2 {
                font-size: clamp(1.25rem, 1.5vw, 1.75rem);
                margin-bottom: 0.5rem;
            }
            ul {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                li {
                    list-style-type: none;
                    a {
                        font-weight: normal;
                        font-size: clamp(0.9rem, 1.1vw, 1.1rem);
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
            }
        }
    }
    .infoContainer {
    }
`;

const Footer = () => {
    const currentUser = useContext(UserContext)[0];

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("refresh");
        window.location.reload(false);
    };

    return (
        <StyledFooter>
            <Main>
                <div className="mainLinksContainer">
                    <div className="linksContainer">
                        <h2>Albums</h2>
                        <ul>
                            <li>
                                <Link to="/albums">all albums</Link>
                            </li>
                            <li>
                                <Link to="/aoty">album of the year</Link>
                            </li>
                            <li>
                                <Link to="/new-releases">new releases</Link>
                            </li>
                            <li>
                                <Link to="/albums/new">add album</Link>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="linksContainer">
                        <h2>Artists</h2>
                        <ul>
                            <li>
                                <Link to="/artists">all artists</Link>
                            </li>
                            <li>
                                <Link to="/artists/new">add artist</Link>
                            </li>
                        </ul>
                    </div>
                    {currentUser && (
                        <React.Fragment>
                            <hr />
                            <div className="linksContainer">
                                <h2>Profile</h2>
                                <ul>
                                    <li>
                                        <Link to={`/users/${currentUser.username}`}>my profile</Link>
                                    </li>
                                    <li>
                                        <Link to={`/users/${currentUser.username}/settings`}>settings</Link>
                                    </li>
                                    <li>
                                        <a href="/" onClick={handleLogout}>
                                            logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <div className="infoContainer">
                    <div className="copyRightContainer">ScoreThatLP &copy; {moment().format("YYYY")}</div>.
                    <div className="authorContainer">
                        Made by <a href="https://linktr.ee/kamilpomykala">Kamil Pomykała</a>
                    </div>
                </div>
            </Main>
        </StyledFooter>
    );
};

export default Footer;
