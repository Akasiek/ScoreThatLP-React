import React, { useState } from "react";
import { Helmet } from "react-helmet";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Main } from "../App";
import { StyledContentGroupPage } from "./albums";
import ContentGroup from "./common/contentGroup";
import { getNewReleases } from "./../services/fakeMusicService";

const NewReleases = () => {
    const [newReleases, setNewReleases] = useState(getNewReleases());

    useDeepCompareEffect(() => setNewReleases(getNewReleases()), [newReleases]);

    return (
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
    );
};

export default NewReleases;
