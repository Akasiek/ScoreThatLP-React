import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Main } from "../App";
import { StyledContentGroupPage } from "./albums";
import ContentGroup from "./common/contentGroup";
import { getFakeAOTY } from "../services/albumService";
import LoadingScreen from "./loadingScreen";

const AOTY = () => {
    const [aoty, setAOTY] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: aoty } = await getFakeAOTY();
            const newAOTY = aoty.filter((a) => a.overall_score !== null && a.overall_score >= 70);
            newAOTY.forEach((a, index) => {
                a.position = index + 1;
            });
            setAOTY(newAOTY);
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
