import React, { useContext } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import AlbumPageHeader from "./albumPageHeader";
import AlbumPageAside from "./albumPageAside";
import AlbumPageReviewSection from "./albumPageReviewSection";
import { getAlbum, getArtist } from "../../services/fakeMusicService";
import { Main } from "../../App";

export const StyledAlbumPage = styled.header`
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
    const album = getAlbum(match.params.id);
    album.artist = getArtist(album.artist_id);

    return (
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
    );
};

export default AlbumPage;
