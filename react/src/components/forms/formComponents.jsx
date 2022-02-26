import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { selectStyles } from "../../services/selectStyles";

export const StyledForm = styled.form``;

const StyledInput = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledSelect = styled.div``;

export const InputComponent = ({ type = "text", name, label, placeholder, data, setData, error }) => {
    const handleChange = ({ currentTarget: input }) => {
        const newData = { ...data };
        newData[name] = input.value;
        setData(newData);
    };
    return (
        <StyledInput>
            <label htmlFor={name}>{label}</label>
            <input type={name} id={name} value={data[name]} onChange={handleChange} placeholder={placeholder} />
            {error && <p>{error}</p>}
        </StyledInput>
    );
};

export const SelectComponent = ({ name, label, options, isSearchable, isMulti, data, setData }) => {
    const handleChange = (value) => {
        const newData = { ...data };
        newData[name] = value.value;
        setData(newData);
    };
    return (
        <StyledSelect>
            <p>{label}</p>
            <Select
                options={options}
                onChange={handleChange}
                styles={selectStyles}
                getValue={(value) => handleChange(value)}
                isSearchable={isSearchable}
                isMulti={isMulti}
            />
        </StyledSelect>
    );
};
