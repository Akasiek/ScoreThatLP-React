import React, { useState } from "react";
import styled from "styled-components";

const StyledTracksForm = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--accentColor);
`;

const AlbumPageTracksForm = ({ album }) => {
    const [tracks, setTracks] = useState([]);

    return <StyledTracksForm></StyledTracksForm>;
};

export default AlbumPageTracksForm;
