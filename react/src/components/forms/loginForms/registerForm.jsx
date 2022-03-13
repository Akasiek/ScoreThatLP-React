import React, { useContext, useEffect, useState } from "react";
import Joi from "joi-browser";
import { Helmet } from "react-helmet";

import { StyledLoginForm } from "./loginForm";
import { InputComponent, SubmitBtnComponent, validate } from "../formComponents";
import { register, login } from "../../../services/authService";
import { createReviewer } from "../../../services/reviewerService";
import ReviewerContext from "./../../../context/reviewerContext";
import { Link } from "react-router-dom";

const RegisterForm = ({ history }) => {
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const setReviewer = useContext(ReviewerContext)[1];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const schema = {
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("E-mail"),
        password: Joi.string().min(8).required().label("Password"),
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validate(data, schema);
        if (errors) {
            setErrors(errors);
            return;
        }

        try {
            const { data: user } = await register(data);

            const { data: jwt } = await login({ username: data.username, password: data.password });
            localStorage.setItem("jwt", jwt.access);
            localStorage.setItem("refresh", jwt.refresh);

            await createReviewer({ user: user.id }, { Authorization: "JWT " + jwt.access });

            setReviewer({ id: 0 });
            history.push(`/settings`);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const err = ex.response.data;
                setErrors(err);
            }
        }
    };

    return (
        <StyledLoginForm>
            <div className="formContainer">
                <Helmet>
                    <title>Register | ScoreThatLP</title>
                </Helmet>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <InputComponent name="username" placeholder="Username" data={data} setData={setData} errors={errors} />
                    <InputComponent name="email" placeholder="E-mail" data={data} setData={setData} errors={errors} />
                    <InputComponent type="password" name="password" placeholder="Password" data={data} setData={setData} errors={errors} />
                    <SubmitBtnComponent value="Sign in" />
                    <p className="signInPrompt">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </StyledLoginForm>
    );
};

export default RegisterForm;
