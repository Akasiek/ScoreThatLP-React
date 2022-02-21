import React from "react";
import styled from "styled-components";
import AlbumPageReviewForm from "./albumPageReviewForm";
import AlbumPageReviewsContainer from "./albumPageReviewsContainer";

const mobile = ({ theme }) => theme.mobile;

const StyledReviewSection = styled.section`
    margin: 3rem;
    @media (max-width: ${mobile}) {
        margin: 3rem 1rem;
    }
`;

const AlbumPageReviewSection = ({ album }) => {
    return (
        <StyledReviewSection>
            <AlbumPageReviewForm album={album} />
            <AlbumPageReviewsContainer album={album} />
        </StyledReviewSection>
    );
};

export default AlbumPageReviewSection;
