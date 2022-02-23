import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import ContentGroup from "./common/contentGroup";
import { getAlbums } from "./../services/albumService";
import { Main } from "./../App";
import LoadingScreen from "./loadingScreen";

export const StyledContentGroupPage = styled.div`
    padding: 2rem 0;
    background-color: var(--darkBlueColor);

    .contentGroup {
        padding: 0 1rem 2rem 1rem;
        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 0 0.5rem;
        }

        .contentContainer {
            gap: 4rem 4%;
            margin-block: 2rem;
            margin-inline: clamp(1.5rem, 2.5vw, 3rem);

            @media (max-width: ${({ theme }) => theme.mobile}) {
                gap: 3rem 5%;
                /* margin-inline: 1.75rem 3rem; */
            }

            @media (max-width: 35rem) {
                gap: 3rem 6%;
                margin: 1.25rem 1.5rem;
            }
        }
    }
`;

const Albums = () => {
    const [albums, setAlbums] = useState(null);

    useEffect(async () => {
        const { data: albums } = await getAlbums();
        console.log(albums.results);
        setAlbums(albums.results);
    }, []);

    return albums ? (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>Albums | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
                <ContentGroup
                    title="Albums"
                    content={albums}
                    contentType="albums"
                    isPaginationEnabled={true}
                    contentPageSize={30}
                    isSortingEnabled={true}
                    sortingMethod={{ value: "name-asc", label: "Name asceding" }}
                    className="contentGroup"
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    ) : (
        <LoadingScreen />
    );
};

export default Albums;
