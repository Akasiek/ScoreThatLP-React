import React from "react";

import styled from "styled-components";

const StyledLike = styled.div`
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0 0 0;
    font-size: 1rem;
`;

const Like = ({ content, onLike }) => {
    return (
        <StyledLike>
            {
                // TODO: Like handler
            }
            <i className={`fa fa-heart-o`} aria-hidden="true"></i>
            <p>{content.likes}</p>
        </StyledLike>
    );
};

export default Like;
