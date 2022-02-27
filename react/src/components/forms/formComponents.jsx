import React from "react";
import styled from "styled-components";
import Select from "react-select";
import Joi from "joi-browser";
import { selectStyles } from "../../services/selectStyles";

export const StyledForm = styled.form``;

const StyledInput = styled.div`
    display: flex;
    flex-direction: column;

    input {
        width: 80%;
        font-size: 1.2rem;
        font-family: "Montserrat", sans-serif;
        border: none;
        outline: none;
        background-color: var(--blueColor);
        color: var(--lightColor);
        margin: 1.25rem;
        padding: 0.75rem;

        @media (max-width: ${({ theme }) => theme.mobile}) {
            font-size: 0.9rem;
            margin: 1rem;
            padding: 0.5rem;
        }

        &:focus {
            box-shadow: 0 0 25px 5px var(--darkestColor);
        }
    }
`;

const StyledSelect = styled.div``;

const StyledSubmitBtn = styled.div``;

export const InputComponent = ({ type = "text", name, label, placeholder, data, setData, errors }) => {
    const handleChange = ({ currentTarget: input }) => {
        const newData = { ...data };
        newData[name] = input.value;
        setData(newData);
    };
    return (
        <StyledInput>
            <label htmlFor={name}>{label}</label>
            <input type={type} id={name} value={data[name]} onChange={handleChange} placeholder={placeholder} />
            {errors[name] && <p className="errorContainer">{errors[name]}</p>}
        </StyledInput>
    );
};

export const FileInputComponent = ({ name, label, setFile }) => {
    const handleChange = ({ currentTarget: input }) => {
        setFile(input.files[0]);
    };
    return (
        <StyledInput>
            <label htmlFor={name}>{label}</label>
            <input type="file" id={name} onChange={handleChange} />
        </StyledInput>
    );
};

export const SelectComponent = ({ name, label, options, isSearchable, isMulti, data, setData, errors }) => {
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
            {errors[name] && <p className="errorContainer">{errors[name]}</p>}
        </StyledSelect>
    );
};

export const SubmitBtnComponent = ({ value }) => {
    return (
        <StyledSubmitBtn>
            <input type="submit" value={value} />
        </StyledSubmitBtn>
    );
};

export const validate = (data, schema) => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
};
