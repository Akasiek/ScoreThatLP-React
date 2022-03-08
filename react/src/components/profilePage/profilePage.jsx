import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ProfilePageHeader from "./profilePageHeader";
import ProfilePageReviewsContainer from "./profilePageReviewsContainer";
import { Main } from "./../../App";
import { getReviewerByUsername } from "./../../services/reviewerService";
import LoadingScreen from "../loadingScreen";

const StyledProfilePage = styled.div``;

const ProfilePage = ({ match }) => {
    const [reviewer, setReviewer] = useState(null);

    useEffect(async () => {
        const { data: reviewer } = await getReviewerByUsername(match.params.username);
        setReviewer(reviewer[0]);
    }, [match.params.username]);

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
