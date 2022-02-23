import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Main } from "../App";
import { StyledContentGroupPage } from "./albums";
import ContentGroup from "./common/contentGroup";
import { getAlbums } from "./../services/albumService";
import LoadingScreen from "./loadingScreen";

const NewReleases = () => {
    const [newReleases, setNewReleases] = useState(null);

    useEffect(async () => {
        const { data: albums } = await getAlbums();
        setNewReleases(albums);
    }, []);

    return newReleases ? (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>New Releases | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
                <ContentGroup
                    title="New Releases"
                    content={newReleases}
                    contentType="albums"
                    isPaginationEnabled={true}
                    contentPageSize={30}
                    isSortingEnabled={true}
                    className="contentGroup"
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    ) : (
        <LoadingScreen />
    );
};

export default NewReleases;
