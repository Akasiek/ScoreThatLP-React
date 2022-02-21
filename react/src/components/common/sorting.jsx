import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { getSortOptions } from "../../utils/sort";
import { selectStyles } from "../../services/selectStyles";

const StyledSorting = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    p {
        font-size: clamp(0.8rem, 1.25vw, 1.25rem);
    }
`;

const Sorting = ({ setSortingMethod, contentType, sortingMethod }) => {
    const options = getSortOptions(contentType);
    return (
        <StyledSorting>
            <p>SORT</p>
            <Select
                options={options}
                onChange={setSortingMethod}
                styles={selectStyles}
                isSearchable={false}
                defaultValue={sortingMethod || options[0]}
            />
        </StyledSorting>
    );
};

export default Sorting;
