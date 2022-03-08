import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useDeepCompareEffect from "use-deep-compare-effect";
import moment from "moment";
import _ from "lodash";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export const StyledSearchResults = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 40%;
    max-width: 50%;
    background-color: var(--lightBlueColor);
    border-top: 0;
    left: 5%;
    margin: 0;
    margin-right: 5%;

    .simplebar {
        max-height: 60vh;
        .simplebar-scrollbar::before {
            background-color: var(--lightColor);
        }
    }

    .resultContainer {
        text-align: left;
        padding: 1rem 2rem;
        flex: 1.5;

        hr:first-child {
            display: none;
        }

        hr {
            margin: 1rem 2rem 1rem 0;
            border: 1px solid var(--lightColor);
        }

        a {
            display: block;
            position: relative;
            text-decoration: none;
            color: var(--lightColor);
            transition: all 0.3s ease;

            &:hover {
                color: var(--accentColor);
            }

            .infoContainer {
                display: flex;
                align-items: center;
                gap: 2%;

                &.artist,
                &.users {
                    img {
                        border-radius: 100%;
                    }
                }

                .imageContainer {
                    img {
                        height: clamp(3rem, 5vw, 5rem);
                    }
                }

                .textContainer {
                    padding: 0.5rem;
                    overflow: hidden;
                    flex: 1;
                    h2 {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: clamp(0.9rem, 1.2vw, 1.2rem);
                    }
                    h3 {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-weight: normal;
                        font-size: clamp(0.8rem, 1vw, 1rem);
                    }
                }
            }
        }
    }

    .noQuery {
        padding-block: clamp(1rem, 1.5vw, 1.5rem);
        h2 {
            font-size: clamp(1rem, 2vw, 2rem);
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        left: 0;
        max-width: none;
        width: 100%;

        .resultContainer {
            padding: 1rem 2rem 1rem;
            hr {
                margin: 0.5rem 1rem 0.5rem 0;
            }
            .textContainer {
                padding: 0.25rem;
            }
        }
    }
`;

const SearchResults = ({ queryResults: propsQueryResults, searchQuery, timer, onClick }) => {
    const { albums, artists, reviewers } = propsQueryResults;
    const [queryResults, setQueryResults] = useState({ albums: [], artists: [], reviewers: [] });
    const [isQueryEmpty, setIsQueryEmpty] = useState(true);

    useDeepCompareEffect(() => {
        setQueryResults({ albums: albums || [], artists: artists || [], reviewers: reviewers || [] });

        if (!_.isEmpty(albums) || !_.isEmpty(artists) || !_.isEmpty(reviewers)) setIsQueryEmpty(false);
        else setIsQueryEmpty(true);
    }, [propsQueryResults]);

    return (
        <StyledSearchResults isQueryEmpty={isQueryEmpty}>
            <SimpleBar className="simplebar" autoHide={false} forceVisible="y">
                {!isQueryEmpty ? (
                    <div className="resultContainer">
                        {queryResults.albums.length !== 0 &&
                            queryResults.albums?.slice(0, 4).map((a) => (
                                <React.Fragment key={a.id}>
                                    <hr />
                                    <Link to={`/albums/${a.id}`} onClick={onClick}>
                                        <div className="infoContainer album">
                                            <div className="imageContainer">
                                                <img src={a.art_cover} alt={`${a.title} cover art`} />
                                            </div>
                                            <div className="textContainer">
                                                <h2>{a.title}</h2>
                                                <h3>
                                                    {a.artist?.name} | {moment(a.release_date).format("YYYY")}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </React.Fragment>
                            ))}

                        {queryResults.artists.length !== 0 &&
                            queryResults.artists?.slice(0, 3).map((a) => (
                                <React.Fragment key={a.id}>
                                    <hr />
                                    <Link to={`/artists/${a.slug}`} onClick={onClick}>
                                        <div className="infoContainer artist">
                                            <div className="imageContainer">
                                                <img src={a.image} alt={`${a.title} band image`} />
                                            </div>
                                            <div className="textContainer">
                                                <h2>{a.name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </React.Fragment>
                            ))}

                        {queryResults.reviewers.length !== 0 &&
                            queryResults.reviewers?.slice(0, 3).map((u) => (
                                <React.Fragment key={u.id}>
                                    <hr />
                                    <Link to={`/users/${u.username}`} onClick={onClick}>
                                        <div className="infoContainer users">
                                            <div className="imageContainer">
                                                <img src={u.profile_pic} alt={`${u.profile_pic} band image`} />
                                            </div>
                                            <div className="textContainer">
                                                <h2>{u.username}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </React.Fragment>
                            ))}
                    </div>
                ) : (
                    searchQuery &&
                    searchQuery !== "" &&
                    timer === null && (
                        <div className="noQuery">
                            <h2>No query results</h2>
                        </div>
                    )
                )}
            </SimpleBar>
        </StyledSearchResults>
    );
};

export default SearchResults;
