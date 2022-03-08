import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import AlbumPageReviewFormContainer from "./reviewForm/reviewFormContainer";
import AlbumPageReviewsContainer from "./albumPageReviewsContainer";

const StyledReviewSection = styled.section`
    margin: 3rem;

    .prompt {
        font-size: clamp(1rem, 1.5vw, 1.5rem);
        a {
            color: var(--accentColor);
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin: 3rem 1rem;
        .loginPrompt > a {
            text-decoration: underline;
        }
    }
`;

const AlbumPageReviewSection = ({ album, user }) => {
    return (
        <StyledReviewSection>
            {moment(album.release_date) < moment() ? (
                user ? (
                    <AlbumPageReviewFormContainer album={album} user={user} />
                ) : (
                    <div className="prompt">
                        You need to be logged in as user to review albums. <Link to="/login">Log in here</Link>
                    </div>
                )
            ) : (
                <div className="prompt">The album is waiting for a release. Time to release: {moment(album.release_date).toNow(true)}</div>
            )}
            <AlbumPageReviewsContainer album={album} />
        </StyledReviewSection>
    );
};

export default AlbumPageReviewSection;
