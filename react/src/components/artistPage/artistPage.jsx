import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ArtistPageHeader from "./artistPageHeader";
import { Main } from "../../App";
import ArtistPageContentContainer from "./artistPageContentContainer";
import { getArtist } from "../../services/artistService";

const StyledArtistPage = styled.div`
    padding: 68px 0 0 0;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        padding: 55px 0 0 0;
        margin: 0;
    }
`;

const ArtistPage = ({ match }) => {
    const [artist, setArtist] = useState(async () => {
        const { data: artist } = await getArtist(match.params.id);
        console.log(artist);
        return artist;
    });

    useEffect(async () => {
        const { data: artist } = await getArtist(match.params.id);
        console.log(artist);
        setArtist(artist);
    }, [match.params.id]);

    return (
        <StyledArtistPage>
            <Helmet>
                <title>{`${artist.name} | ScoreThatLP`}</title>
            </Helmet>

            <ArtistPageHeader artist={artist} />

            <Main>
                <ArtistPageContentContainer artist={artist} />
            </Main>
        </StyledArtistPage>
    );
};

export default ArtistPage;
