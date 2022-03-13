import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import AlbumPageHeader from "./albumPageHeader";
import AlbumPageAside from "./albumPageAside/albumPageAside";
import AlbumPageReviewSection from "./albumPageReviewSection";
import { Main } from "../../App";
import { getAlbum } from "../../services/albumService";
import LoadingScreen from "../loadingScreen";
import ReviewerContext from "./../../context/reviewerContext";

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

const AlbumPage = ({ match, history }) => {
    const [album, setAlbum] = useState(null);
    const [reload, setReload] = useState(false);
    const currentReviewer = useContext(ReviewerContext)[0];

    useEffect(() => {
        (async () => {
            try {
                const { data: album } = await getAlbum(match.params.id);
                setAlbum(album);
            } catch (ex) {
                if (ex.response && ex.response.status === 404) {
                    history.push("/not-found");
                }
            }
        })();
    }, [match.params.id, reload, history]);

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
                        <AlbumPageReviewSection album={album} user={currentReviewer} />

                        <AlbumPageAside album={album} user={currentReviewer} />
                    </AlbumPageMain>
                </StyledAlbumPage>
            </Main>
        </ReloadContext.Provider>
    ) : (
        <LoadingScreen />
    );
};

export default AlbumPage;
