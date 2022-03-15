import React, { useState } from "react";
import styled from "styled-components";
import { saveAlbumLink } from "../../../services/albumService";
import { LinkInputComponent } from "../../forms/formComponents";
import { StyledTracksForm } from "./albumPageTracksForm";

const StyledLinksForm = styled(StyledTracksForm)`
    .inputsContainer {
        display: flex;
        flex-direction: column;
        gap: clamp(1.5rem, 2vw, 2rem);
        margin: clamp(1.5rem, 2vw, 2rem);
    }
`;

const AlbumPageLinksForm = ({ album, setVisibility }) => {
    const [links, setLinks] = useState({ spotify: "", tidal: "", amazon_music: "", apple_music: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (let key in links) {
            if (links[key] !== "") {
                const linkData = new FormData();
                linkData.append("album_id", album.id);
                linkData.append("service_name", key);
                linkData.append("url", links[key]);
                await saveAlbumLink(linkData);
            }
        }

        window.location.reload(false);
    };

    return (
        <StyledLinksForm>
            <div className="formContainer">
                <div className="formHeader">
                    <h2>{album.title} links</h2>
                    <img src="/images/close.svg" className="closeIcon" alt="Close icon" onClick={setVisibility} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputsContainer">
                        <LinkInputComponent name="spotify" label="Spotify" links={links} setLinks={setLinks} />
                        <LinkInputComponent name="tidal" label="Tidal" links={links} setLinks={setLinks} />
                        <LinkInputComponent name="amazon_music" label="Amazon Music" links={links} setLinks={setLinks} />
                        <LinkInputComponent name="apple_music" label="Apple Music" links={links} setLinks={setLinks} />
                    </div>
                    <div className="buttonsContainer">
                        <input type="submit" className="submitButton" value="Save Links" />
                    </div>
                </form>
            </div>
        </StyledLinksForm>
    );
};

export default AlbumPageLinksForm;
