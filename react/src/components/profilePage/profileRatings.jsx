import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Main } from "../../App";
import ContentGroup from "./../common/contentGroup";
import { StyledContentGroupPage } from "./../albums";
import { getReviewerReviews } from "../../services/reviewService";
import { getReviewerByUsername } from "./../../services/reviewerService";
import LoadingScreen from "../loadingScreen";

const ProfileRatings = ({ match }) => {
    const [reviewer, setReviewer] = useState(null);
    const [ratings, setRatings] = useState(null);

    useEffect(async () => {
        const { data: reviewer } = await getReviewerByUsername(match.params.username);
        setReviewer(reviewer[0]);
    }, [match.params.username]);

    useEffect(async () => {
        if (reviewer?.id) {
            const { data: reviews } = await getReviewerReviews(reviewer.id);
            setRatings(reviews);
        }
    }, [reviewer?.id]);

    return reviewer && ratings ? (
        <Main>
            <StyledContentGroupPage>
                <Helmet>
                    <title>{reviewer.username} Ratings | ScoreThatLP</title>
                </Helmet>
                <ContentGroup
                    title={`${reviewer.username} ratings`}
                    content={ratings}
                    contentType="ratingAlbums"
                    className="contentGroup"
                    isSortingEnabled={true}
                    isPaginationEnabled={true}
                    contentPageSize={25}
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    ) : (
        <LoadingScreen />
    );
};

export default ProfileRatings;
