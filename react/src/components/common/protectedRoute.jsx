import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    const jwt = localStorage.getItem("jwt");
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!jwt) return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;
