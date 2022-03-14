import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link as ScrollLink } from "react-scroll";
import moment from "moment";

import ContentGroup from "./common/contentGroup";
import { Main } from "../App";
import { getAOTY, getFakeAOTY, getNewReleases, getNewSingles } from "./../services/albumService";
import { getArtists } from "./../services/artistService";
import LoadingScreen from "./loadingScreen";
import { StyledContentGroupPage } from "./albums";
import { getLatestReviewsOnly } from "../services/reviewService";

const StyledHomePage = styled.div`
    background-color: var(--darkBlueColor);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
    max-width: 100%;
    padding-bottom: 3rem;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin: 0;
    }
`;

const HomePageHeader = styled.header`
    cursor: default;
    position: relative;
    overflow: hidden;
    max-height: 55vh;
    background-color: var(--accentColor);
    margin-bottom: 1rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin-bottom: 0;
        height: 80vh;
        max-height: none;
    }

    &,
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .textContainer {
        position: absolute;
        z-index: 5;
        width: 100%;
        height: 100%;
        flex-direction: column;

        h1,
        h4 {
            transition: all 1s cubic-bezier(0.28, -0.01, 0, 0.99);
        }

        h1 {
            font-size: clamp(2.75rem, 10vw, 8rem);
            letter-spacing: -0.55vw;
            line-height: clamp(2.5rem, 10vw, 7.5rem);
        }
        h4 {
            font-size: clamp(0.6rem, 2vw, 1.5rem);
            /* font-size: 1.5rem; */
        }
    }

    .imageContainer {
        width: 100%;
        height: 100%;
        img {
            opacity: 0.3;
            min-height: 100%;
            width: 100%;
            vertical-align: top;
            transition: all 1s cubic-bezier(0.28, -0.01, 0, 0.99);

            @media (max-width: ${({ theme }) => theme.mobile}) {
                max-width: none;
                width: auto;
            }
        }
    }

    &:hover {
        .imageContainer > img {
            transition: opacity 0.3s ease-in-out, transform 0.4s cubic-bezier(0.91, 0, 0.71, 1.36) 0.2s;
            opacity: 0.5;
            transform: scale(1.1);
        }
        h1,
        h4 {
            transform: scale(1.1);
            transition: all 0.4s cubic-bezier(0.91, -0.34, 0.71, 1.36) 0.2s;
        }
    }

    /* Arrow for better mobile UX */
    .arrowContainer {
        z-index: 100;
        position: absolute;
        bottom: 1rem;

        & > a > img {
            width: 3rem;
            display: none;
            transition: all 1s cubic-bezier(0.28, -0.01, 0, 0.99);

            @media (max-width: ${({ theme }) => theme.mobile}) {
                display: block;
            }

            &:hover {
                transition: all 0.2s cubic-bezier(0.91, -0.34, 0.71, 1.36);
                transform: scale(1.2);
            }
        }
    }
`;

const HomePage = () => {
    const [aoty, setAOTY] = useState(null);
    const [newReleases, setNewReleases] = useState(null);
    const [artists, setArtists] = useState(null);
    const [latestReviews, setLatestReviews] = useState(null);
    const [newSingles, setNewSingles] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: aoty } = await getFakeAOTY();
            const newAOTY = aoty.filter((a) => a.overall_score !== null);
            newAOTY.forEach((a, index) => {
                a.position = index + 1;
            });
            setAOTY(newAOTY);

            let { data: newReleases } = await getNewReleases();
            newReleases = newReleases.filter((a) => moment(a.release_date) < moment());
            setNewReleases(newReleases);

            const { data: artists } = await getArtists();
            setArtists(artists);

            const { data: latestReviews } = await getLatestReviewsOnly();
            setLatestReviews(latestReviews);

            const { data: singles } = await getNewSingles();
            setNewSingles(singles);
        })();
    }, []);

    return aoty && newReleases ? (
        <Main>
            <StyledHomePage>
                <Helmet>
                    <title>ScoreThatLP</title>
                </Helmet>

                <HomePageHeader>
                    <div className="textContainer">
                        <h1>ScoreThatLP</h1>
                        <h4>share your music opinions</h4>
                    </div>
                    <div className="imageContainer">
                        <img src="/images/headerImg.jpg" alt="Girl holding vinyl in music shop" />
                    </div>
                    <div className="arrowContainer">
                        <ScrollLink to="aoty" smooth={true} offset={-75}>
                            <img src="/images/arrow.svg" alt="Arrow facing downwards" />
                        </ScrollLink>
                    </div>
                </HomePageHeader>
                <StyledContentGroupPage>
                    <ContentGroup
                        id="aoty"
                        className="contentGroup"
                        title="Album of the Year 2022"
                        viewAllUrl="/aoty"
                        content={aoty}
                        contentType="albums"
                        albumIsAoty={true}
                        itemsCount={5}
                        colSize={[5, 3, 2]}
                    />

                    <ContentGroup
                        className="contentGroup"
                        title="New Releases"
                        viewAllUrl="/new-releases"
                        content={newReleases}
                        contentType="albums"
                        itemsCount={10}
                        colSize={[5, 3, 2]}
                    />

                    <ContentGroup
                        className="contentGroup"
                        title="Trending Artists"
                        viewAllUrl="/artists"
                        content={artists}
                        contentType="artists"
                        itemsCount={5}
                        colSize={[5, 3, 3]}
                    />

                    <ContentGroup
                        className="contentGroup reviewsGroup"
                        title="Latest Reviews"
                        content={latestReviews}
                        contentType="reviews"
                        itemsCount={4}
                        colSize={[2, 1, 1]}
                        reviewIsOutsideAlbum={true}
                    />

                    <ContentGroup
                        className="contentGroup"
                        title="Latest Singles"
                        content={newSingles}
                        contentType="albums"
                        itemsCount={5}
                        colSize={[5, 3, 2]}
                    />
                </StyledContentGroupPage>
            </StyledHomePage>
        </Main>
    ) : (
        <LoadingScreen />
    );
};

export default HomePage;
