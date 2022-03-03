import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { saveAlbumLink } from "../../../services/albumService";
import { StyledTracksForm } from "./albumPageTracksForm";

const StyledLinksForm = styled(StyledTracksForm)`
    .inputsContainer {
        display: flex;
        flex-direction: column;
        gap: clamp(1.5rem, 2vw, 2rem);
        margin: clamp(1.5rem, 2vw, 2rem);
        .inputContainer {
            display: flex;
            gap: clamp(1.5rem, 2vw, 2rem);
            align-items: center;
            img {
                height: clamp(1.5rem, 2.25vw, 2.25rem);
            }
            input {
                font-size: clamp(0.9rem, 1.1vw, 1.1rem);
                width: clamp(9rem, 25vw, 25rem);
                padding: 0.5rem 0.75rem;
            }
        }
    }
`;

const LinkInputContainer = ({ name, label, value, onChange }) => {
    return (
        <div className="inputContainer">
            <img src={`/images/serviceIcons/${name}.svg`} alt={`${label} logo`} />
            <input type="text" name={name} className="linkInput" value={value} onChange={onChange} placeholder={`${label} link`} />
        </div>
    );
};

const AlbumPageLinksForm = ({ album, setVisibility }) => {
    const [links, setLinks] = useState({ spotify: "", tidal: "", amazonMusic: "", appleMusic: "" });

    const handleChange = ({ currentTarget: input }) => {
        const newLinks = { ...links };
        newLinks[input.name] = input.value;
        setLinks(newLinks);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (let key in links) {
            if (links[key] !== "") {
                const linkData = new FormData();
                linkData.append("album_id", album.id);
                linkData.append("service_name", key);
                linkData.append("url", links[key]);
                const respond = await saveAlbumLink(linkData);
            }
        }

        window.location.reload(false);
    };

    return (
        <StyledLinksForm>
            <div className="formContainer">
                <div className="formHeader">
                    <h2>{album.title} links</h2>
                    <img src="/images/close.svg" className="closeIcon" onClick={setVisibility} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputsContainer">
                        <LinkInputContainer name="spotify" label="Spotify" value={links.spotify} onChange={handleChange} />
                        <LinkInputContainer name="tidal" label="Tidal" value={links.tidal} onChange={handleChange} />
                        <LinkInputContainer name="amazonMusic" label="Amazon Music" value={links.amazonMusic} onChange={handleChange} />
                        <LinkInputContainer name="appleMusic" label="Apple Music" value={links.appleMusic} onChange={handleChange} />
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
