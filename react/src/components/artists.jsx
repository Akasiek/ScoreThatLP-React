import React, { useState } from "react";
import { Helmet } from "react-helmet";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Main } from "../App";
import { getArtists } from "./../services/fakeMusicService";
import ContentGroup from "./common/contentGroup";
import { StyledContentGroupPage } from "./albums";

const Artists = () => {
    const [artists, setArtists] = useState(getArtists());

    useDeepCompareEffect(() => setArtists(getArtists()), [artists]);

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
