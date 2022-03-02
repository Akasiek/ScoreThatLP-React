import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { saveTrack } from "./../../../services/trackService";

const StyledTracksForm = styled.div`
    margin: -1rem -3rem;
    position: fixed;
    z-index: 500;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;
    align-items: center;

    .formContainer {
        background-color: var(--accentColor);
    }
`;

const AlbumPageTracksForm = ({ album, setVisibility }) => {
    const [tracks, setTracks] = useState([{ position: 1, title: "", duration: "" }]);

    const handleChange = ({ currentTarget: input }) => {
        console.log(input);
        const newTracks = [...tracks];
        const track = newTracks[parseInt(input.className)];

        if (input.name == "position") track[input.name] = parseInt(input.value);
        else track[input.name] = input.value;
        setTracks(newTracks);
    };

    const handleTrackCreate = () => {
        const lastTrackPos = tracks[tracks.length - 1].position + 1;
        setTracks([...tracks, { position: lastTrackPos, title: "", duration: "" }]);
    };

    const handleDelete = (index) => {
        let newTracks = [...tracks];
        newTracks.splice(index, 1);
        setTracks(newTracks);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newTracks = [...tracks];
        newTracks.forEach(async (t, index) => {
            t.album_id = album.id;
            const respond = await saveTrack(t);
            console.log(respond);
            if (index === newTracks.length - 1) {
                window.location.reload(false);
            }
        });
    };

    return (
        <StyledTracksForm>
            <div className="formContainer">
                <p>{album.title} tracks</p>
                <button type="button" onClick={setVisibility}>
                    X
                </button>
                <form onSubmit={handleSubmit}>
                    {_.orderBy(tracks, (t) => t.position, ["asc"]).map((t, index) => {
                        return (
                            <div className="trackContainer" key={index}>
                                <input type="number" name="position" className={index} value={t.position} onChange={handleChange} />
                                <input type="text" name="title" className={index} value={t.title} placeholder="Title..." onChange={handleChange} />
                                <input type="text" name="duration" className={index} value={t.duration} placeholder="00:00" onChange={handleChange} />
                                {index > 0 && (
                                    <button type="button" onClick={() => handleDelete(index)}>
                                        X
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    <input type="button" value="Add Track" onClick={handleTrackCreate} />
                    <input type="submit" value="Save Tracks" />
                </form>
            </div>
        </StyledTracksForm>
    );
};

export default AlbumPageTracksForm;
