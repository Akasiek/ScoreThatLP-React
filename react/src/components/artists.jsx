import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Main } from "../App";
import ContentGroup from "./common/contentGroup";
import { StyledContentGroupPage } from "./albums";
import { getArtists } from "./../services/artistService";
import LoadingScreen from "./loadingScreen";
import FormLink from "./forms/formLink";
import UserContext from "./../context/userContext";

const Artists = () => {
    const [artists, setArtists] = useState(null);
    const [currentUser, setCurrentUser] = useContext(UserContext);

    useEffect(async () => {
        const { data: artists } = await getArtists();
        setArtists(artists);
    }, []);

    return artists !== null ? (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>Artists | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
                {currentUser && <FormLink label="Add Artist" url="/artists/new" />}
                <ContentGroup
                    title="Artists"
                    content={artists}
                    contentType="artists"
                    isPaginationEnabled={true}
                    contentPageSize={30}
                    isSortingEnabled={true}
                    sortingMethod={{ value: "name-asc", label: "Name ascending" }}
                    artistShowAvgScore={true}
                    className="contentGroup"
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    ) : (
        <LoadingScreen />
    );
};

export default Artists;
