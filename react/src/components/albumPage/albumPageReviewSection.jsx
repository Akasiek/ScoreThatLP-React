import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AlbumPageReviewForm from "./albumPageReviewForm";
import AlbumPageReviewsContainer from "./albumPageReviewsContainer";

// const mobile = ;

const StyledReviewSection = styled.section`
    margin: 3rem;

    .loginPrompt {
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
            {user ? (
                <AlbumPageReviewForm album={album} />
            ) : (
                <div className="loginPrompt">
                    You need to be logged in as user to review albums. <Link to="/login">Log in here</Link>
                </div>
            )}
            <AlbumPageReviewsContainer album={album} />
        </StyledReviewSection>
    );
};

export default AlbumPageReviewSection;
