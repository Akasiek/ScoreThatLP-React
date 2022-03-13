import React, { useContext, useState, useEffect } from "react";

import ReviewerContext from "./../../context/reviewerContext";
import { Main } from "./../../App";
import { getReviewerByUsername, updateReviewer } from "./../../services/reviewerService";
import { Helmet } from "react-helmet";
import { FileInputComponent, StyledForm, SubmitBtnComponent, TextAreaComponent } from "../forms/formComponents";

const SettingsForm = ({ match, history }) => {
    const currentReviewer = useContext(ReviewerContext)[0];
    const [reviewer, setReviewer] = useState({ id: null });

    const [data, setData] = useState({ about_text: "" });
    const [profilePic, setProfilePic] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const { data: newReviewer } = await getReviewerByUsername(match.params.username);
            setReviewer(newReviewer[0]);
        })();
    }, [match.params.username]);

    useEffect(() => {
        // If user from url param and current user aren't the same, go to current user settings
        if (reviewer.id !== null && currentReviewer) {
            if (reviewer?.username !== currentReviewer?.username) {
                history.push(`/users/${currentReviewer?.username}/settings`);
            }
        }
    }, [reviewer.id, reviewer?.username, currentReviewer, history]);

    useEffect(() => {
        // Populate inputs
        setData({ about_text: reviewer.about_text || "" });
    }, [reviewer.about_text]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let apiData = new FormData();
        if (data.about_text !== "") apiData.append("about_text", data.about_text);
        if (profilePic) apiData.append("profile_pic", profilePic);
        apiData.append("user", reviewer.user);

        await updateReviewer(reviewer.id, apiData);
        history.push(`/users/${reviewer.username}`);
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
