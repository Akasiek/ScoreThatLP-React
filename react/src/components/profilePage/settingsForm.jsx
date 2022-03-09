import React, { useContext, useState, useEffect } from "react";

import UserContext from "./../../context/userContext";
import { Main } from "./../../App";
import { getReviewerByUsername, updateReviewer } from "./../../services/reviewerService";
import { Helmet } from "react-helmet";
import { FileInputComponent, StyledForm, SubmitBtnComponent, TextAreaComponent } from "../forms/formComponents";

const SettingsForm = ({ match, history }) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [user, setUser] = useState({ id: null });

    const [data, setData] = useState({ about_text: "" });
    const [profilePic, setProfilePic] = useState();

    useEffect(() => {
        (async () => {
            const { data: newUser } = await getReviewerByUsername(match.params.username);
            setUser(newUser[0]);
        })();
    }, [match.params.username]);

    useEffect(() => {
        // If user from url param and current user aren't the same, go to current user settings
        if (user.id !== null && currentUser) {
            if (user?.username !== currentUser?.username) {
                history.push(`/users/${currentUser?.username}/settings`);
            }
        }

        // Populate inputs
        setData({ about_text: user.about_text || "" });
    }, [user.id, currentUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let apiData = new FormData();
        if (data.about_text !== "") apiData.append("about_text", data.about_text);
        if (profilePic) apiData.append("profile_pic", profilePic);

        const respond = await updateReviewer(user.id, apiData);
        history.push(`/users/${user.username}`);
    };

    return (
        <Main>
            <Helmet>
                <title>Profile Settings | ScoreThatLP</title>
            </Helmet>
            <StyledForm onSubmit={handleSubmit}>
                <FileInputComponent name="profile_pic" label="Profile picture" setFile={setProfilePic} />
                <TextAreaComponent name="about_text" label="About Me Text" data={data} setData={setData} placeholder="About me..." />
                <SubmitBtnComponent value="Update profile" />
            </StyledForm>
        </Main>
    );
};

export default SettingsForm;
