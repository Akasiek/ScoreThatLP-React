import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Main } from "../App";
import ContentGroup from "./common/contentGroup";
import { StyledContentGroupPage } from "./albums";
import { getArtists } from "./../services/artistService";

const Artists = () => {
    const [artists, setArtists] = useState();

    useEffect(async () => {
        const { data: artists } = await getArtists();
        setArtists(artists.results);
    }, []);

    return (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>Artists | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
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
    );
};

export default Artists;
