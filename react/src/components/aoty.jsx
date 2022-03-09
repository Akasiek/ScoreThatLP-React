import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Main } from "../App";
import { StyledContentGroupPage } from "./albums";
import ContentGroup from "./common/contentGroup";
import { getAOTY } from "../services/albumService";
import LoadingScreen from "./loadingScreen";

const AOTY = () => {
    const [aoty, setAoty] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: aoty } = await getAOTY();
            setAoty(aoty);
        })();
    }, []);

    return aoty ? (
        <Main>
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
    ) : (
        <LoadingScreen />
    );
};

export default AOTY;
