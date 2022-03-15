import React from "react";
import styled from "styled-components";
import Select from "react-select";
import Joi from "joi-browser";
import { selectStyles } from "../../services/selectStyles";

export const StyledForm = styled.form`
    background-color: var(--darkBlueColor);
    padding: 3rem 5rem;

    & > div {
        margin-bottom: 5rem;
    }

    .label {
        font-size: clamp(1.25rem, 2vw, 2rem);
        margin-bottom: 1rem;
    }

    .errorContainer {
        margin-left: 1rem;
        margin-top: 0.5rem;
        text-align: left;
        font-size: clamp(0.9rem, 1.35vw, 1.35rem);
        color: var(--redScoreColor);
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        padding: 1.5rem 2rem;

        & > div {
            margin-bottom: 4rem;
        }

        .label {
            margin-bottom: 0.5rem;
        }
    }
`;

const StyledInput = styled.div`
    display: flex;
    flex-direction: column;

    input {
        min-width: 2rem;
        font-size: clamp(1rem, 1.5vw, 1.5rem);
        font-family: "Montserrat";
        font-weight: normal;

        padding: 0.5rem 1.5rem;
        border-radius: 25px;
        box-shadow: 0;
        transition: all 0.2s ease-in-out;

        border: 1px solid var(--accentColor);
        background-color: var(--darkBlueColor);
        color: var(--lightColor);

        &[type="date"] {
            &::-webkit-calendar-picker-indicator {
                filter: invert(1);
            }
        }

        &:focus-visible {
            outline: none;
            box-shadow: 0 0 1.5rem -0.25rem var(--accentColor);
        }
    }
`;

const StyledFileInput = styled.div`
    display: flex;
    flex-direction: column;

    input[type="file"] {
        font-family: "Montserrat";
        font-size: clamp(0.8rem, 1.1vw, 1.1rem);

        &::file-selector-button {
            margin: 0.5rem 1rem 0.5rem 0;
            cursor: pointer;
            border: none;
            outline: none;

            background-color: var(--accentColor);
            color: var(--darkestColor);
            box-shadow: 0 0.4rem rgb(0, 0, 0, 0.2);

            font-weight: 900;
            font-size: clamp(0.8rem, 1.2vw, 1.2rem);
            font-family: "Montserrat";
            padding: 0.5rem 1rem;
            border-radius: 25px;

            transition: all 0.1s ease-in-out;

            &:active {
                transform: translateY(0.4rem);
                box-shadow: 0 0 rgb(0, 0, 0, 0.2);
            }
        }
    }

    h3 {
        font-size: clamp(0.9rem, 1.25vw, 1.25rem);
        font-weight: normal;
        margin-block: 1rem;
    }
`;

const StyledSelect = styled.div`
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    padding: 0.35rem 0.5rem;
    font-weight: normal;
    border-radius: 25px;
    #react-select-3-input {
        color: var(--lightColor) !important;
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 1.5rem -0.25rem var(--accentColor);
    }
`;

const StyledSubmitBtn = styled.div`
    margin-top: 5rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
        cursor: pointer;
        border: none;
        outline: none;

        background-color: var(--darkBlueColor);
        border: 1px solid var(--accentColor);
        color: var(--lightColor);
        box-shadow: 0 0.4rem rgb(0, 0, 0, 0.2);

        font-weight: 900;
        font-size: clamp(1rem, 1.5vw, 1.5rem);
        font-family: "Montserrat";

        padding: 0.6rem 1.5rem;

        border-radius: 25px;

        transition: all 0.1s ease-in-out;

        &:hover {
            background-color: var(--accentColor);
            color: var(--darkestColor);
        }

        &:active {
            transform: translateY(0.4rem);
            box-shadow: 0 0 rgb(0, 0, 0, 0.2);
        }
    }
`;

const StyledTextArea = styled.div`
    textarea {
        font-size: clamp(1rem, 1.2vw, 1.2rem);
        font-family: "Montserrat";
        background-color: var(--darkBlueColor);
        border: 1px solid var(--accentColor);
        border-radius: 25px;
        color: var(--lightColor);
        padding: 1rem;
        min-height: 7rem;
        width: 90%;
        max-width: 40rem;
        transition: box-shadow 0.2s ease-in-out;
        &:focus {
            outline: none;
            box-shadow: 0 0 1.5rem -0.25rem var(--accentColor);
        }
    }
`;

const StyledLinkInput = styled.div`
    display: flex;
    gap: clamp(1.5rem, 2vw, 2rem);
    align-items: center;

    img {
        height: clamp(1.5rem, 2.25vw, 2.25rem);
    }
    input {
        font-family: "Montserrat";
        border: none;
        outline: none;
        font-size: clamp(0.9rem, 1.1vw, 1.1rem);
        width: clamp(9rem, 25vw, 25rem);
        padding: 0.5rem 0.75rem;

        background-color: var(--darkBlueColor);
        color: var(--lightColor);

        border: 1px solid var(--accentColor);
        border-radius: 25px;
    }
`;

export const InputComponent = ({ type = "text", name, label, placeholder, data, setData, errors }) => {
    const handleChange = ({ currentTarget: input }) => {
        const newData = { ...data };
        newData[name] = input.value;
        setData(newData);
    };
    return (
        <StyledInput>
            <label htmlFor={name} className="label">
                {label}
            </label>
            <input type={type} id={name} value={data[name]} onChange={handleChange} placeholder={placeholder} />
            {errors[name] && <p className="errorContainer">{errors[name]}</p>}
        </StyledInput>
    );
};

export const FileInputComponent = ({ name, label, file, setFile, optionalURL }) => {
    const handleChange = ({ currentTarget: input }) => {
        const newFile = { ...file };
        if (input.files) newFile.file = input.files[0];
        else newFile.url = input.value;
        setFile(newFile);
    };
    return (
        <StyledFileInput>
            <label htmlFor={name} className="label">
                {label}
            </label>
            <input type="file" id={name} onChange={handleChange} />
            {optionalURL && (
                <React.Fragment>
                    <h3>Or type in URL</h3>
                    <StyledInput>
                        <input placeholder="URL" onChange={handleChange} />
                    </StyledInput>
                </React.Fragment>
            )}
        </StyledFileInput>
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
            <p className="label">{label}</p>
            <Select
                options={options}
                onChange={handleChange}
                styles={selectStyles}
                value={options.find((o) => o.value === data[name])}
                getValue={(value) => handleChange(value)}
                isSearchable={isSearchable}
                isMulti={isMulti}
            />
            {errors[name] && <p className="errorContainer">{errors[name]}</p>}
        </StyledSelect>
    );
};

export const SubmitBtnComponent = ({ value, style }) => {
    return (
        <StyledSubmitBtn style={style}>
            {/* <input type="submit" value={value} /> */}
            <button>{value}</button>
        </StyledSubmitBtn>
    );
};

export const TextAreaComponent = ({ name, label, data, setData, placeholder }) => {
    const handleChange = ({ currentTarget: input }) => {
        const newData = { ...data };
        newData[name] = input.value;
        setData(newData);
    };
    return (
        <StyledTextArea>
            <p className="label">{label}</p>
            <textarea value={data[name]} onChange={handleChange} placeholder={placeholder} />
        </StyledTextArea>
    );
};

export const LinkInputComponent = ({ name, label, links, setLinks }) => {
    const handleChange = ({ currentTarget: input }) => {
        const newLinks = { ...links };
        newLinks[input.name] = input.value;
        setLinks(newLinks);
    };

    return (
        <StyledLinkInput>
            <img src={`/images/serviceIcons/${name}.svg`} alt={`${label} logo`} />
            <input type="text" name={name} className="linkInput" value={links[name]} onChange={handleChange} placeholder={`${label} link`} />
        </StyledLinkInput>
    );
};

export const validate = (data, schema) => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
};
