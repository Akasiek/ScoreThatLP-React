import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const accentColor = ({ theme }) => theme.colors.accentColor;
const mobile = ({ theme }) => theme.mobile;

export const StyledTitleBar = styled.div`
    margin: ${(props) => (props.noMargin ? 0 : "0 1rem")};

    hr {
        border: 1px solid ${accentColor};
    }

    div {
        text-transform: uppercase;
        display: flex;
        gap: 0.1rem 1rem;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    div > * {
        padding: 0.2rem 1rem;
    }

    h1 {
        font-size: clamp(0.85rem, 2vw, 1.75rem);
        flex: 1 1 50%;
    }

    a {
        color: var(--accent-color);
        text-decoration: none;
    }

    a > h3 {
        font-size: clamp(0.7rem, 1vw, 0.9rem);
    }

    a:active {
        text-decoration: underline;
    }

    @media (max-width: ${mobile}) {
        div > * {
            padding: 0.2rem 0.3rem;
        }
    }
`;

const TitleBar = ({ className, title, viewAllUrl, noMargin }) => {
    return (
        <StyledTitleBar className={className} noMargin={noMargin}>
            <div>
                <h1>{title}</h1>
                {viewAllUrl && (
                    <Link to={viewAllUrl}>
                        <h3>VIEW ALL</h3>
                    </Link>
                )}
            </div>
            <hr />
        </StyledTitleBar>
    );
};

export default TitleBar;
