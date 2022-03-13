import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

import { Main } from "../App";
import ReviewerContext from "./../context/reviewerContext";

const StyledFooter = styled.footer`
    background-color: var(--accentColor);
    min-height: 300px;
    padding-bottom: 1rem;

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

    .mainLinksContainer {
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
        hr {
            border: 1px solid var(--lightColor);
            margin: 1rem;
        }
        .linksContainer {
            h2 {
                font-size: clamp(1.2rem, 1.4vw, 1.4rem);
                text-transform: uppercase;
                margin-bottom: 0.25rem;
            }
            ul {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                li {
                    list-style-type: none;
                    a {
                        font-size: clamp(0.9rem, 1.1vw, 1.1rem);
                        font-weight: normal;
                    }
                }
            }
        }
    }
    .infoContainer {
        display: flex;
        flex-direction: column;
        margin-top: 3rem;
        gap: 0.5rem;
        text-align: center;
        font-weight: normal;
        font-size: clamp(1rem, 1.2vw, 1.2rem);
        .copyRightContainer {
            font-weight: 900;
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        .mainLinksContainer {
            /* justify-content: space-between; */
            flex-direction: column;
            hr {
                margin: 0 25% 0 0;
            }
            .linksContainer {
                ul {
                    flex-direction: row;
                    flex-wrap: wrap;
                    li:not(:last-child)::after {
                        font-weight: normal;
                        content: " | ";
                    }
                }
            }
        }
    }
`;

const Footer = () => {
    const currentReviewer = useContext(ReviewerContext)[0];

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
                    {currentReviewer && (
                        <React.Fragment>
                            <hr />
                            <div className="linksContainer">
                                <h2>Profile</h2>
                                <ul>
                                    <li>
                                        <Link to={`/users/${currentReviewer.username}`}>my profile</Link>
                                    </li>
                                    <li>
                                        <Link to={`/users/${currentReviewer.username}/settings`}>settings</Link>
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
                    <div className="copyRightContainer">ScoreThatLP &copy; {moment().format("YYYY")}</div>

                    <div className="madeWithContainer">
                        Made with 💜 using <a href="https://reactjs.org/">React</a> | <a href="https://www.djangoproject.com/">django</a> |{" "}
                        <a href="https://www.postgresql.org/">PostgreSQL</a>
                    </div>

                    <div className="authorContainer">
                        Made by <a href="https://linktr.ee/kamilpomykala">Kamil Pomykała</a>
                    </div>
                </div>
            </Main>
        </StyledFooter>
    );
};

export default Footer;
