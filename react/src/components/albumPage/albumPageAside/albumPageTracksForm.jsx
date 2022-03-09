import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import { saveTrack } from "./../../../services/trackService";

export const StyledTracksForm = styled.div`
    position: fixed;
    z-index: 500;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;
    align-items: center;

    input {
        font-family: "Montserrat";
        border: none;
        outline: none;
        background-color: var(--darkBlueColor);
        color: var(--lightColor);
        border: 1px solid var(--accentColor);
        border-radius: 25px;
    }

    .formContainer {
        background-color: var(--darkBlueColor);
        box-shadow: 0 0 100px -10px var(--accentColor);
        padding: 1rem;
        border-radius: 25px;
        overflow-y: auto;
        max-height: 100vh;
        .formHeader {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h2 {
                font-size: clamp(1.1rem, 1.65vw, 1.65rem);
                padding: 1rem;
            }

            .closeIcon {
                padding: 1rem;
                height: clamp(1.25rem, 2vw, 2rem);
            }
        }
    }

    .inputsContainer {
        display: flex;
        align-items: center;
        gap: clamp(0.5rem, 1vw, 1rem);
        margin: 1rem;
        & > input {
            font-size: clamp(0.9rem, 1.1vw, 1.1rem);
            padding: 0.5rem 0.75rem;
        }
        .positionInput {
            text-align: center;
            width: clamp(1.8rem, 2vw, 2rem);
        }

        .titleInput {
            width: clamp(5rem, 15vw, 15rem);
        }

        .durationInput {
            text-align: center;
            width: clamp(2.5rem, 3.5vw, 3.5rem);
        }

        .deleteIcon {
            cursor: pointer;
            height: clamp(1.25rem, 2vw, 2rem);
        }
    }

    .buttonsContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        & > input {
            border-radius: 25px;
            margin: 0.5rem 1rem 1rem 1rem;
            padding: 0.4rem 0.8rem;
            font-size: clamp(0.8rem, 1.2vw, 1.2rem);

            background-color: var(--darkBlueColor);
            color: var(--lightColor);
            border: 1px solid var(--accentColor);
            cursor: pointer;

            transition: all 0.1s ease-in-out;

            &:hover {
                background-color: var(--accentColor);
                color: var(--darkestColor);
            }
        }

        .submitButton {
            font-weight: 900;
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        .trackInputsContainer {
            margin: 0.75rem;
            gap: 0.5rem;
        }
    }
`;

const AlbumPageTracksForm = ({ album, setVisibility }) => {
    const [tracks, setTracks] = useState([{ position: 1, title: "", duration: "" }]);
    const [error, setError] = useState(null);

    const handleChange = ({ currentTarget: input }) => {
        const newTracks = [...tracks];
        const track = newTracks[parseInt(input.id)];

        if (input.name === "position") track[input.name] = parseInt(input.value);
        else track[input.name] = input.value;

        setTracks(_.orderBy(newTracks, (t) => t.position, ["asc"]));
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

        if (newTracks.filter((t) => t.title === "").length === 0) {
            setError(null);

            newTracks.forEach(async (t, index) => {
                t.album_id = album.id;
                await saveTrack(t);
                if (index === newTracks.length - 1) {
                    window.location.reload(false);
                }
            });
        } else setError("One or more titles are empty");
    };

    return (
        <StyledTracksForm>
            <div className="formContainer">
                <div className="formHeader">
                    <h2>{album.title} tracks</h2>
                    <img src="/images/close.svg" className="closeIcon" alt="Close icon" onClick={setVisibility} />
                </div>

                <form onSubmit={handleSubmit}>
                    {_.orderBy(tracks, (t) => t.position, ["asc"]).map((t, index) => {
                        return (
                            <div className="inputsContainer" key={index}>
                                <input
                                    type="number"
                                    name="position"
                                    className="positionInput"
                                    id={index}
                                    value={t.position}
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="title"
                                    className="titleInput"
                                    id={index}
                                    value={t.title}
                                    placeholder="Title..."
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="duration"
                                    className="durationInput"
                                    id={index}
                                    value={t.duration}
                                    placeholder="00:00"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                {index > 0 && (
                                    <img src="/images/close.svg" className="deleteIcon" alt="Delete track icon" onClick={() => handleDelete(index)} />
                                )}
                            </div>
                        );
                    })}
                    {error && <p className="errorContainer">{error}</p>}
                    <div className="buttonsContainer">
                        <input type="button" className="addTrackButton" value="Add Track" onClick={handleTrackCreate} />
                        <input type="submit" className="submitButton" value="Save Tracks" />
                    </div>
                </form>
            </div>
        </StyledTracksForm>
    );
};

export default AlbumPageTracksForm;
