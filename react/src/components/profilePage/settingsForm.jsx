import React, { useContext, useState, useEffect } from "react";

import UserContext from "./../../context/userContext";
import { Main } from "./../../App";
import { getReviewerByUsername } from "./../../services/reviewerService";

const SettingsForm = ({ match, history }) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [user, setUser] = useState({ id: null });

    useEffect(async () => {
        const { data: newUser } = await getReviewerByUsername(match.params.username);
        setUser(newUser[0]);
    }, [match.params.username]);

    useEffect(() => {
        // If user from url param and current user aren't the same, go to current user settings
        if (user.id !== null && currentUser) {
            if (user?.username !== currentUser?.username) {
                history.push(`/users/${currentUser?.username}/settings`);
            }
        }
    }, [user.id, currentUser]);

    return (
        <Main>
            <h1></h1>
        </Main>
    );
};

export default SettingsForm;
