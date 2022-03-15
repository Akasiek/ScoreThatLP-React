import React, { useContext, useState, useEffect } from "react";

import ReviewerContext from "./../../context/reviewerContext";
import { Main } from "./../../App";
import { updateReviewer } from "./../../services/reviewerService";
import { Helmet } from "react-helmet";
import { FileInputComponent, StyledForm, SubmitBtnComponent, TextAreaComponent } from "../forms/formComponents";
import { LinkInputComponent } from "./../forms/formComponents";
import styled from "styled-components";
import { getUserLinks } from "./../../services/reviewerLinkService";

const StyledSettingsForm = styled(StyledForm)`
    .linksContainer {
        display: flex;
        flex-direction: column;
        gap: clamp(1rem, 1.5vw, 1.5rem);
        input {
            min-width: 10rem;
            width: 90%;
            max-width: 40rem;
            font-size: clamp(0.95rem, 1.35vw, 1.35rem);
            padding: 0.5rem 1.5rem;
        }
    }
`;

const SettingsForm = ({ history }) => {
    const [currentReviewer, setCurrentUser] = useContext(ReviewerContext);

    const [data, setData] = useState({
        about_text: "",
        spotify: "",
        twitter: "",
        last_fm: "",
    });
    const [profilePic, setProfilePic] = useState({ file: null, url: null });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            // Populate inputs
            const newData = { ...data };

            // About text
            newData.about_text = currentReviewer?.about_text ? currentReviewer?.about_text : "";

            // Links
            if (currentReviewer?.id) {
                const { data: userLinks } = await getUserLinks(currentReviewer?.id);
                if (userLinks.length > 0) {
                    userLinks.forEach((l) => {
                        console.log(l);
                        newData[l.service_name] = l.url;
                    });
                }
            }

            setData(newData);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentReviewer]);

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
            <StyledSettingsForm onSubmit={handleSubmit}>
                <FileInputComponent name="profile_pic" label="Profile picture" file={profilePic} setFile={setProfilePic} optionalURL={true} />
                <TextAreaComponent name="about_text" label="About me" data={data} setData={setData} placeholder="About me..." />

                <div className="linksContainer">
                    <p className="label">Profile links</p>
                    <LinkInputComponent name="spotify" label="Spotify" links={data} setLinks={setData} />
                    <LinkInputComponent name="twitter" label="Twitter" links={data} setLinks={setData} />
                    <LinkInputComponent name="last_fm" label="Last.FM" links={data} setLinks={setData} />
                </div>

                <SubmitBtnComponent value="Update profile" />
            </StyledSettingsForm>
        </Main>
    );
};

export default SettingsForm;
