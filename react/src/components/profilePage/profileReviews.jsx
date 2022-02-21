import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Main } from "../../App";
import { getUserByUsername, getUsersReviews } from "../../services/fakeMusicService";
import ContentGroup from "../common/contentGroup";
import { StyledContentGroupPage } from "./../albums";

const ProfileReviews = ({ match }) => {
    const [user, setUser] = useState(getUserByUsername(match.params.username));
    const [userReviews, setUserReviews] = useState(getUsersReviews(user.id, true));

    useEffect(() => {
        setUser(getUserByUsername(match.params.username));
    }, [match.params.username]);

    useEffect(() => {
        setUserReviews(getUsersReviews(user.id));
    }, [user.id]);

    return (
        <Main pushUnderNavbar={true}>
            <StyledContentGroupPage>
                <Helmet>
                    <title>{user.username} Reviews | ScoreThatLP</title>
                </Helmet>
                <ContentGroup
                    title={`${user.username} reviews`}
                    content={userReviews}
                    contentType="reviews"
                    reviewIsOutsideAlbum={true}
                    className="contentGroup"
                    isSortingEnabled={true}
                    isPaginationEnabled={true}
                    contentPageSize={10}
                    colSize={[2, 1, 1]}
                />
            </StyledContentGroupPage>
        </Main>
    );
};

export default ProfileReviews;
