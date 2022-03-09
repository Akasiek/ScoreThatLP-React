import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import AlbumPageHeader from "./albumPageHeader";
import AlbumPageAside from "./albumPageAside/albumPageAside";
import AlbumPageReviewSection from "./albumPageReviewSection";
import { Main } from "../../App";
import { getAlbum } from "../../services/albumService";
import LoadingScreen from "../loadingScreen";
import UserContext from "./../../context/userContext";

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

export const ReloadContext = React.createContext();

const AlbumPage = ({ match }) => {
    const [album, setAlbum] = useState(null);
    const [reload, setReload] = useState(false);
    const currentUser = useContext(UserContext)[0];

    useEffect(() => {
        (async () => {
            const { data: album } = await getAlbum(match.params.id);
            setAlbum(album);
        })();
    }, [match.params.id, reload]);

    return album ? (
        <ReloadContext.Provider value={[reload, setReload]}>
            <Main>
                <StyledAlbumPage>
                    <Helmet>
                        <title>
                            {album.title} - {album.artist.name} | ScoreThatLP
                        </title>
                    </Helmet>

                    <AlbumPageHeader album={album} />

                    <AlbumPageMain>
                        <AlbumPageReviewSection album={album} user={currentUser} />

                        <AlbumPageAside album={album} user={currentUser} />
                    </AlbumPageMain>
                </StyledAlbumPage>
            </Main>
        </ReloadContext.Provider>
    ) : (
        <LoadingScreen />
    );
};

export default AlbumPage;
