import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNotFound = styled.div`
    height: 80vh;
    width: 100%;
    background: var(--darkBlueColor);

    .textContainer {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1;
        h1 {
            font-size: clamp(6rem, 15vw, 15rem);
            margin-bottom: clamp(0.5rem, 1vw, 1rem);
        }

        h2 {
            font-size: clamp(1.75rem, 3vw, 3rem);
            margin-bottom: clamp(2rem, 3vw, 3rem);
        }

        p {
            font-size: clamp(1rem, 1.5vw, 1.5rem);
            margin-bottom: clamp(0.75rem, 1.1vw, 1.1rem);
            font-weight: normal;
        }

        a {
            color: var(--accentColor);
            text-decoration: none;
            font-size: clamp(1rem, 1.5vw, 1.5rem);
            &:hover {
                text-decoration: underline;
            }
            @media (max-width: ${({ theme }) => theme.mobile}) {
                text-decoration: underline;
            }
        }
    }
`;

const NotFound = () => {
    return (
        <StyledNotFound>
            <Helmet>
                <title>Not Found | ScoreThatLP</title>
            </Helmet>
            <div className="textContainer">
                <h1>404</h1>
                <h2>Not Found</h2>
                <p>Are you lost my little friend?</p>
                <Link>Go back to homepage</Link>
            </div>
        </StyledNotFound>
    );
};

export default NotFound;
