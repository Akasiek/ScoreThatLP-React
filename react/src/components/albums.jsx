import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import moment from "moment";

import LoadingScreen from "./loadingScreen";
import ContentGroup from "./common/contentGroup";
import FormLink from "./forms/formLink";
import { Main } from "./../App";
import { getAlbums } from "./../services/albumService";
import UserContext from "./../context/userContext";

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
    const [currentUser, setCurrentUser] = useContext(UserContext);

    useEffect(async () => {
        let { data: albums } = await getAlbums();
        albums = albums.filter((a) => moment(a.release_date) < moment());
        setAlbums(albums);
    }, []);

    return albums ? (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>Albums | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
                {currentUser && <FormLink label="Add Album" url="/albums/new" />}
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
