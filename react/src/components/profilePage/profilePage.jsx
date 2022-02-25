import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ProfilePageHeader from "./profilePageHeader";
import ProfilePageReviewsContainer from "./profilePageReviewsContainer";
import { Main } from "./../../App";
import { getReviewer } from "./../../services/reviewerService";
import LoadingScreen from "../loadingScreen";

const StyledProfilePage = styled.div``;

const ProfilePage = ({ match }) => {
    // const [user, setUser] = useState(getUserByUsername(match.params.username));
    // const [userReviews, setUserReviews] = useState(getUsersReviews(user.id));

    // useEffect(() => {
    //     setUser(getUserByUsername(match.params.username));
    // }, [match]);

    // useEffect(() => {
    //     setUserReviews(getUsersReviews(user.id));
    // }, [user]);

    const [reviewer, setReviewer] = useState(null);

    useEffect(async () => {
        const { data: reviewer } = await getReviewer(match.params.slug);
        setReviewer(reviewer);
    }, [match.params.id]);

    return reviewer ? (
        <React.Fragment>
            <Helmet>
                <title>{reviewer.username} Profile | ScoreThatLP</title>
            </Helmet>
            <Main pushUnderNavbar={true}>
                <StyledProfilePage>
                    <ProfilePageHeader reviewer={reviewer} />

                    {/* <ProfilePageReviewsContainer user={reviewer} reviews={userReviews} /> */}
                </StyledProfilePage>
            </Main>
        </React.Fragment>
    ) : (
        <LoadingScreen />
    );
};

export default ProfilePage;
