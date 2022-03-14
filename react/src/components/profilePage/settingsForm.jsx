import React, { useContext, useState, useEffect } from "react";

import ReviewerContext from "./../../context/reviewerContext";
import { Main } from "./../../App";
import { updateReviewer } from "./../../services/reviewerService";
import { Helmet } from "react-helmet";
import { FileInputComponent, StyledForm, SubmitBtnComponent, TextAreaComponent } from "../forms/formComponents";

const SettingsForm = ({ history }) => {
    const [currentReviewer, setCurrentUser] = useContext(ReviewerContext);

    const [data, setData] = useState({ about_text: "" });
    const [profilePic, setProfilePic] = useState({ file: null, url: null });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Populate inputs
        setData({ about_text: currentReviewer?.about_text || "" });
    }, [currentReviewer?.about_text]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let apiData = new FormData();
        apiData.append("about_text", data.about_text);
        if (profilePic.file) apiData.append("profile_pic", profilePic.file);
        if (profilePic.url) apiData.append("profile_pic_url", profilePic.url);
        apiData.append("user", currentReviewer.user);

        const { data: newReviewer } = await updateReviewer(currentReviewer.id, apiData);
        setCurrentUser(newReviewer);
        history.push(`/users/${currentReviewer.username}`);
    };

    return (
        <Main>
            <Helmet>
                <title>Profile Settings | ScoreThatLP</title>
            </Helmet>
            <StyledForm onSubmit={handleSubmit}>
                <FileInputComponent name="profile_pic" label="Profile picture" file={profilePic} setFile={setProfilePic} optionalURL={true} />
                <TextAreaComponent name="about_text" label="About Me Text" data={data} setData={setData} placeholder="About me..." />
                <SubmitBtnComponent value="Update profile" />
            </StyledForm>
        </Main>
    );
};

export default SettingsForm;
