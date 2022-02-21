import React, { useState } from "react";
import { Helmet } from "react-helmet";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Main } from "../App";
import { StyledContentGroupPage } from "./albums";
import ContentGroup from "./common/contentGroup";
import { getAlbumOfTheYear } from "./../services/fakeMusicService";

const AOTY = () => {
    const [aoty, setAoty] = useState(getAlbumOfTheYear());

    useDeepCompareEffect(() => setAoty(getAlbumOfTheYear()), [aoty]);

    return (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>Album of the Year | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
                <ContentGroup
                    title="Album of the Year"
                    content={aoty}
                    contentType="albums"
                    albumIsAoty={true}
                    isPaginationEnabled={true}
                    contentPageSize={20}
                    className="contentGroup"
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    );
};

export default AOTY;
