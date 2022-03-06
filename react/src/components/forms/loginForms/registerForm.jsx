import React, { useContext, useEffect, useState } from "react";
import Joi from "joi-browser";
import { Helmet } from "react-helmet";

import { StyledLoginForm } from "./loginForm";
import { InputComponent, SubmitBtnComponent, validate } from "../formComponents";
import { register, login } from "../../../services/authService";
import UserContext from "../../../context/userContext";
import { createReviewer } from "../../../services/reviewerService";

const RegisterForm = ({ history }) => {
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [user, setUser] = useContext(UserContext);

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
            const { data: reviewer } = await createReviewer({ user_id: user.id });

            const { data: jwt } = await login({ username: data.username, password: data.password });
            localStorage.setItem("jwt", jwt.access);
            localStorage.setItem("refresh", jwt.refresh);

            setUser({ id: 0 });
            history.push(`/users/${user.id}/settings`);
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
                </form>
            </div>
        </StyledLoginForm>
    );
};

export default RegisterForm;