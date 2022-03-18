import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
import styled from "styled-components";

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: clamp(1rem, 1.75vw, 1.75rem);

    nav {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        p {
            transition: background-color 0.25s ease-in-out;
            background-color: var(--blueColor);
            &.active {
                background-color: var(--accentColor);
            }

            padding: 0.65rem 0.9rem;

            @media (max-width: ${({ theme }) => theme.mobile}) {
                padding: 0.65rem 0.9rem;
            }
            list-style-type: none;
            cursor: pointer;

            &:not(.active):hover {
                background-color: var(--darkestColor);
            }
        }
    }
`;

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <StyledPagination>
            <nav aria-label="Page navigation example">
                {pages.map((page) => (
                    <p key={page} className={page === currentPage ? "active" : ""} onClick={() => onPageChange(page)}>
                        {page}
                    </p>
                ))}
            </nav>
        </StyledPagination>
    );
};

Pagination.propTypes = {
    itemsCount: propTypes.number.isRequired,
    pageSize: propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired,
};

export default Pagination;
