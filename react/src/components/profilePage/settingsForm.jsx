import React, { useContext, useState, useEffect } from "react";

import ReviewerContext from "./../../context/reviewerContext";
import { Main } from "./../../App";
import { updateReviewer } from "./../../services/reviewerService";
import { Helmet } from "react-helmet";
import { FileInputComponent, StyledForm, SubmitBtnComponent, TextAreaComponent } from "../forms/formComponents";
import { LinkInputComponent } from "./../forms/formComponents";
import styled from "styled-components";
import { createLink, deleteLink, getUserLinks, getUserLinkWithService, updateLink } from "./../../services/reviewerLinkService";
import { toast } from "react-toastify";

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

    const [data, setData] = useState({ about_text: "" });
    const [links, setLinks] = useState({ spotify: "", twitter: "", last_fm: "" });
    const [linksFromDB, setLinksFromDB] = useState({});
    const [profilePic, setProfilePic] = useState({ file: null, url: null });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Populate inputs

        // About text
        const newData = { ...data };
        newData.about_text = currentReviewer?.about_text ? currentReviewer?.about_text : "";
        setData(newData);

        // Links
        (async () => {
            const newLinks = { ...links };
            if (currentReviewer?.id) {
                const { data: userLinks } = await getUserLinks(currentReviewer?.id);
                if (userLinks.length > 0) {
                    userLinks.forEach((l) => {
                        newLinks[l.service_name] = l.url;
                    });
                }
                setLinksFromDB(userLinks);
            }
            setLinks(newLinks);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentReviewer]);

    console.log(linksFromDB);

    const saveLinkToDB = (url, service_name) => {
        (async () => {
            // Check if link's already in DB
            // const { data: linkFromDB } = await getUserLinkWithService(currentReviewer.id, service_name);
            let DBLink = null;
            linksFromDB.forEach((l) => {
                if (l.service_name === service_name) DBLink = l;
            });
            if (DBLink !== null && url !== "") {
                // If there is a record in DB and new url isn't empty, update
                if (DBLink.url !== url) {
                    // If links are diffrent, update the record in DB
                    try {
                        await updateLink(DBLink.id, {
                            url: url,
                            service_name: service_name,
                            reviewer_id: currentReviewer.id,
                        });
                    } catch (ex) {
                        ex.response && toast.error(`Error: ${ex.response.statusText}`);
                    }
                } else return; // If links are the same, return
            } else if (DBLink !== null && url === "") {
                // If new url is empty but there is a record in DB, delete the record
                try {
                    await deleteLink(DBLink.id);
                } catch (ex) {
                    ex.response && toast.error(`Error: ${ex.response.statusText}`);
                }
            } else if (url !== "") {
                // If there is no link in DB and url isn't null, create it
                try {
                    await createLink({
                        url: url,
                        service_name: service_name,
                        reviewer_id: currentReviewer.id,
                    });
                } catch (ex) {
                    ex.response && toast.error(`Error: ${ex.response.statusText}`);
                }
            } else return;
        })();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let apiData = new FormData();
        apiData.append("about_text", data.about_text);
        if (profilePic.file) apiData.append("profile_pic", profilePic.file);
        if (profilePic.url) apiData.append("profile_pic_url", profilePic.url);
        apiData.append("user", currentReviewer.user);

        for (let link in links) {
            saveLinkToDB(links[link], link);
        }

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
                    <LinkInputComponent name="twitter" label="Twitter" links={links} setLinks={setLinks} />
                    <LinkInputComponent name="spotify" label="Spotify" links={links} setLinks={setLinks} />
                    <LinkInputComponent name="last_fm" label="Last.FM" links={links} setLinks={setLinks} />
                </div>

                <SubmitBtnComponent value="Update profile" />
            </StyledSettingsForm>
        </Main>
    );
};

export default SettingsForm;
