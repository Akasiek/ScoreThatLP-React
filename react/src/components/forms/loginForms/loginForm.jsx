import React, { useState, useContext, useEffect } from "react";
import Joi from "joi-browser";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { InputComponent, SubmitBtnComponent, validate } from "../formComponents";
import { login } from "../../../services/authService";
import ReviewerContext from "../../../context/reviewerContext";

export const StyledLoginForm = styled.div`
    height: 101vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .formContainer {
        width: 25rem;
        margin: 1rem;
        padding: 2rem;
        border-radius: 25px;
        background-color: var(--darkBlueColor);
        box-shadow: 0 0 100px -10px var(--accentColor);

        h1 {
            text-transform: uppercase;
            text-align: center;
            font-size: clamp(1.5rem, 2.65vw, 2.65rem);
            padding-block: clamp(0.5rem, 1.25vw, 1.25rem);
        }

        form {
            & > div {
                margin: 1.5rem 0;
                input {
                }
            }
        }

        .signInPrompt {
            text-align: center;
            font-size: clamp(0.9rem, 1.2vw, 1.2rem);
            padding-block: clamp(0rem, 1.25vw, 1.25rem);
            a {
                color: var(--accentColor);
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .errorContainer {
            margin-left: 1rem;
            margin-top: 0.5rem;
            text-align: left;
            font-size: clamp(0.9rem, 1.35vw, 1.35rem);
            color: var(--redScoreColor);
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        .formContainer {
            padding: 2rem 1rem;
        }
    }
`;

const LoginForm = ({ history }) => {
    const [data, setData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const setReviewer = useContext(ReviewerContext)[1];
    const currentReviewer = useContext(ReviewerContext)[0];

    useEffect(() => {
        window.scrollTo(0, 0);
        if (currentReviewer) history.push("/");
    }, [currentReviewer, history]);

    const schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validate(data, schema);
        if (errors) {
            setErrors(errors);
            return;
        }

        try {
            const { data: jwt } = await login(data);
            setErrors({});
            localStorage.setItem("jwt", jwt.access);
            localStorage.setItem("refresh", jwt.refresh);

            // For useEffect in App.js
            setReviewer({ id: 0 });

            // Go to last visited page or to homepage
            if (history.action === "POP") history.push("/");
            else history.goBack();
        } catch (ex) {
            if (ex.response && ex.response.status === 401) {
                const err = ex.response.data;
                setErrors({ password: err.detail });
            }
        }
    };

    return (
        <StyledLoginForm>
            <div className="formContainer">
                <Helmet>
                    <title>Login | ScoreThatLP</title>
                </Helmet>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <InputComponent name="username" placeholder="Username" data={data} setData={setData} errors={errors} />
                    <InputComponent type="password" name="password" placeholder="Password" data={data} setData={setData} errors={errors} />
                    <SubmitBtnComponent value="Log in" />
                    <p className="signInPrompt">
                        New member? <Link to="/register">Sign here</Link>
                    </p>
                </form>
            </div>
        </StyledLoginForm>
    );
};

export default LoginForm;
