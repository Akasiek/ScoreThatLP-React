import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import _ from "lodash";

import { updateReviewer } from "./../../services/reviewerService";
import { FileInputComponent, SelectComponent, StyledForm, SubmitBtnComponent, TextAreaComponent, LinkInputComponent } from "../forms/formComponents";
import { createLink, deleteLink, getUserLinks, updateLink } from "./../../services/reviewerLinkService";
import { getArtists } from "../../services/artistService";
import { createFavoriteReviewerArtist, getFavoriteReviewerArtist } from "../../services/favoriteArtistService";
import { updateFavoriteReviewerArtist } from "./../../services/favoriteArtistService";
import { Main } from "./../../App";
import ReviewerContext from "./../../context/reviewerContext";

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

    const [data, setData] = useState({ about_text: "", artist_id: "" });
    const [profilePic, setProfilePic] = useState({ file: null, url: null });

    const [links, setLinks] = useState({ spotify: "", twitter: "", last_fm: "" });
    const [linksFromDB, setLinksFromDB] = useState({});

    const [artistsOptions, setArtistsOptions] = useState([]);
    const [favArtistFromDB, setFavArtistFromDB] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Populate options
        (async () => {
            // Artist options
            const { data: artists } = await getArtists();

            const artistsOptions = [];
            artists.forEach((a) => {
                artistsOptions.push({ value: a.id, label: a.name });
            });
            setArtistsOptions(_.orderBy(artistsOptions, (a) => a.label, ["asc"]));
        })();

        // Populate inputs

        // About text
        const newData = { ...data };
        newData.about_text = currentReviewer?.about_text ? currentReviewer?.about_text : "";

        (async () => {
            const newLinks = { ...links };
            if (currentReviewer?.id) {
                // Links
                const { data: userLinks } = await getUserLinks(currentReviewer?.id);
                if (userLinks.length > 0) {
                    userLinks.forEach((l) => {
                        newLinks[l.service_name] = l.url;
                    });
                }
                setLinksFromDB(userLinks);

                // Artists
                const { data: favoriteArtist } = await getFavoriteReviewerArtist(currentReviewer?.id);
                setFavArtistFromDB(favoriteArtist[0]);
                newData.artist_id = favoriteArtist[0].artist_id;
            }
            setLinks(newLinks);
        })();
        setData(newData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentReviewer]);

    const saveLinkToDB = async (url, service_name) => {
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
    };

    const saveFavArtistToDB = async () => {
        if (data.artist_id !== "") {
            if (favArtistFromDB) {
                // If there is a fav artist in DB, updated it
                try {
                    const response = await updateFavoriteReviewerArtist(favArtistFromDB.id, {
                        reviewer_id: currentReviewer.id,
                        artist_id: data.artist_id,
                    });
                    console.log(response);
                } catch (ex) {
                    ex.response && toast.error(`Error: ${ex.response.statusText}`);
                }
            } else {
                // If user has no fav artist, create it
                try {
                    await createFavoriteReviewerArtist({
                        reviewer_id: currentReviewer.id,
                        artist_id: data.artist_id,
                    });
                } catch (ex) {
                    ex.response && toast.error(`Error: ${ex.response.statusText}`);
                }
            }
        } else return;
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

        saveFavArtistToDB();

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

                <SelectComponent
                    name="artist_id"
                    isSearchable={true}
                    label="Favorite artist"
                    options={artistsOptions}
                    data={data}
                    setData={setData}
                />

                <SubmitBtnComponent value="Update profile" />
            </StyledSettingsForm>
        </Main>
    );
};

export default SettingsForm;
