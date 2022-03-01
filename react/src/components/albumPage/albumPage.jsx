import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import AlbumPageHeader from "./albumPageHeader";
import AlbumPageAside from "./albumPageAside";
import AlbumPageReviewSection from "./albumPageReviewSection";
import { Main } from "../../App";
import { getAlbum } from "../../services/albumService";
import LoadingScreen from "../loadingScreen";

export const StyledAlbumPage = styled.div`
    background-color: var(--darkBlueColor);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
    max-width: 100%;

    svg {
        fill: var(--lightColor);
    }
`;

const AlbumPageMain = styled.main`
    display: flex;

    section {
        flex: 2;
    }

    aside {
        flex: 1;
        background-color: var(--blueColor);

        div {
        }

        ul {
            list-style-type: none;
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
    }
`;

const AlbumPage = ({ match }) => {
    const [album, setAlbum] = useState(null);

    useEffect(async () => {
        const { data: album } = await getAlbum(match.params.id);
        setAlbum(album);
    }, [match.params.id]);

    return album ? (
        <Main pushUnderNavbar={true}>
            <StyledAlbumPage>
                <Helmet>
                    <title>
                        {album.title} - {album.artist.name} | ScoreThatLP
                    </title>
                </Helmet>

                <AlbumPageHeader album={album} />

                <AlbumPageMain>
                    <AlbumPageReviewSection album={album} />

                    <AlbumPageAside album={album} />
                </AlbumPageMain>
            </StyledAlbumPage>
        </Main>
    ) : (
        <LoadingScreen />
    );
};

export default AlbumPage;
