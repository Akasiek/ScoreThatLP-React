import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";

import { Main } from "../../App";
import { getLatestReviewerReviews, getReviewerReviews } from "../../services/reviewService";
import ContentGroup from "../common/contentGroup";
import LoadingScreen from "../loadingScreen";
import { StyledContentGroupPage } from "./../albums";
import { getReviewerByUsername } from "./../../services/reviewerService";
import UserContext from "./../../context/userContext";

const ProfileReviews = ({ match }) => {
    const [reviewer, setReviewer] = useState(null);
    const [reviews, setReviews] = useState(null);

    useEffect(async () => {
        const { data: reviewer } = await getReviewerByUsername(match.params.username);
        setReviewer(reviewer[0]);
    }, [match.params.username]);

    useEffect(async () => {
        if (reviewer?.id) {
            const { data: reviews } = await getReviewerReviews(reviewer.id);
            setReviews(reviews.filter((r) => r.review_text !== null));
        }
    }, [reviewer?.id]);

    return reviewer && reviews ? (
        <Main>
            <StyledContentGroupPage>
                <Helmet>
                    <title>{reviewer.username} Reviews | ScoreThatLP</title>
                </Helmet>
                <ContentGroup
                    title={`${reviewer.username} reviews`}
                    content={reviews}
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
    ) : (
        <LoadingScreen />
    );
};

export default ProfileReviews;
