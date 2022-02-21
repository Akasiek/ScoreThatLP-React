import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Main } from "../../App";
import { getRatingAlbums, getUserByUsername, getUsersReviews } from "../../services/fakeMusicService";
import ContentGroup from "./../common/contentGroup";
import { StyledContentGroupPage } from "./../albums";

const ProfileRatings = ({ match }) => {
    const [user, setUser] = useState(getUserByUsername(match.params.username));
    const [userReviews, setUserReviews] = useState(getUsersReviews(user.id));
    const [ratingAlbums, setAlbumRatings] = useState(getRatingAlbums(userReviews));

    useEffect(() => {
        setUser(getUserByUsername(match.params.username));
    }, [match.params.username]);

    useEffect(() => {
        setUserReviews(getUsersReviews(user.id));
    }, [user.id]);

    useEffect(() => {
        setAlbumRatings(getRatingAlbums(userReviews));
    }, [userReviews]);
    return (
        <Main pushUnderNavbar={true}>
            <StyledContentGroupPage>
                <Helmet>
                    <title>{user.username} Ratings | ScoreThatLP</title>
                </Helmet>
                <ContentGroup
                    title={`${user.username} ratings`}
                    content={ratingAlbums}
                    contentType="ratingAlbums"
                    className="contentGroup"
                    isSortingEnabled={true}
                    isPaginationEnabled={true}
                    contentPageSize={25}
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    );
};

export default ProfileRatings;
