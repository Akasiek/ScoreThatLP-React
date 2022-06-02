import React, { useEffect, useContext } from "react";

import styled from "styled-components";
import { getLikeForUserForReview } from "../../services/likeService";
import ReviewerContext from "./../../context/reviewerContext";

const StyledLike = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-top: clamp(0.25rem, 0.5vw, 0.5rem);
    font-size: clamp(0.85rem, 1vw, 1rem);

    p {
        vertical-align: middle;
    }
`;

const Like = ({ content, onLike }) => {
    const currentReviewer = useContext(ReviewerContext)[0];

    useEffect(() => {
        (async () => {
            const { data: like } = await getLikeForUserForReview(currentReviewer, content.id);
        })();
    }, []);

    return (
        <StyledLike>
            {
                // TODO: Like handler
            }

            {/* <i className={`fa ${like.length > 0}`} aria-hidden="true"></i> */}
            <p>{content.likes}</p>
        </StyledLike>
    );
};

export default Like;
