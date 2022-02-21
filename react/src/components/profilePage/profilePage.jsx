import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ProfilePageHeader from "./profilePageHeader";
import { Main } from "./../../App";
import { getUserByUsername, getUsersReviews } from "../../services/fakeMusicService";
import ProfilePageReviewsContainer from "./profilePageReviewsContainer";

const StyledProfilePage = styled.div``;

const ProfilePage = ({ match }) => {
    const [user, setUser] = useState(getUserByUsername(match.params.username));
    const [userReviews, setUserReviews] = useState(getUsersReviews(user.id));

    useEffect(() => {
        setUser(getUserByUsername(match.params.username));
    }, [match]);

    useEffect(() => {
        setUserReviews(getUsersReviews(user.id));
    }, [user]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{user.username} Profile | ScoreThatLP</title>
            </Helmet>
            <Main pushUnderNavbar={true}>
                <StyledProfilePage>
                    <ProfilePageHeader user={user} />

                    <ProfilePageReviewsContainer user={user} reviews={userReviews} />
                </StyledProfilePage>
            </Main>
        </React.Fragment>
    );
};

export default ProfilePage;
