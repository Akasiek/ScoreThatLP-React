import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledFormLink = styled.div`
    display: flex;
    justify-content: end;
    a {
        display: block;
        margin-right: 2rem;
        padding: 0.565rem 1rem;

        border-radius: 25px;
        border: 1px solid var(--accentColor);
        color: var(--lightColor);
        text-decoration: none;

        transition: all 0.3s ease-in-out;

        &:hover {
            color: var(--darkestColor);
            background-color: var(--accentColor);
        }
    }
`;

const FormLink = ({ label, url }) => {
    return (
        <StyledFormLink>
            <Link to={url}>{label}</Link>
        </StyledFormLink>
    );
};

export default FormLink;
