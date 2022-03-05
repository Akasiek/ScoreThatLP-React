import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ProfilePageHeader from "./profilePageHeader";
import ProfilePageReviewsContainer from "./profilePageReviewsContainer";
import { Main } from "./../../App";
import { getReviewerBySlug } from "./../../services/reviewerService";
import LoadingScreen from "../loadingScreen";

const StyledProfilePage = styled.div``;

const ProfilePage = ({ match }) => {
    const [reviewer, setReviewer] = useState(null);

    useEffect(async () => {
        const { data: reviewer } = await getReviewerBySlug(match.params.slug);
        setReviewer(reviewer[0]);
    }, [match.params.slug]);

    return reviewer ? (
        <React.Fragment>
            <Helmet>
                <title>{reviewer.username} Profile | ScoreThatLP</title>
            </Helmet>
            <Main pushUnderNavbar={true}>
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
