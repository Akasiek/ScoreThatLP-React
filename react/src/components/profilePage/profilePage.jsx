import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ProfilePageHeader from "./profilePageHeader";
import ProfilePageReviewsContainer from "./profilePageReviewsContainer";
import { Main } from "./../../App";
import { getReviewerByUsername } from "./../../services/reviewerService";
import LoadingScreen from "../loadingScreen";

const StyledProfilePage = styled.div``;

const ProfilePage = ({ match, history }) => {
    const [reviewer, setReviewer] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: reviewer } = await getReviewerByUsername(match.params.username);
            if (reviewer.length === 0) history.push("/not-found");
            else setReviewer(reviewer[0]);
        })();
    }, [match.params.username, history]);

    return reviewer ? (
        <React.Fragment>
            <Helmet>
                <title>{reviewer.username} Profile | ScoreThatLP</title>
            </Helmet>
            <Main>
                <StyledProfilePage>
                    <ProfilePageHeader reviewer={reviewer} />

                    <ProfilePageReviewsContainer reviewer={reviewer} />
                </StyledProfilePage>
            </Main>
        </React.Fragment>
    ) : (
        <LoadingScreen />
    );
};

export default ProfilePage;
