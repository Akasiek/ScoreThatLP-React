import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import useDeepCompareEffect from "use-deep-compare-effect";

import { getArtist } from "../../services/fakeMusicService";
import ArtistPageHeader from "./artistPageHeader";
import { Main } from "../../App";
import ArtistPageContentContainer from "./artistPageContentContainer";

const StyledArtistPage = styled.div`
    padding: 68px 0 0 0;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        padding: 55px 0 0 0;
        margin: 0;
    }
`;

const ArtistPage = ({ match }) => {
    const [artist, setArtist] = useState(getArtist(match.params.id));

    useDeepCompareEffect(() => {
        setArtist(getArtist(match.params.id));
    }, [match]);

    return (
        <StyledArtistPage>
            <Helmet>
                <title>{artist.name} | ScoreThatLP</title>
            </Helmet>

            <ArtistPageHeader artist={artist} />

            <Main>
                <ArtistPageContentContainer artist={artist} />
            </Main>
        </StyledArtistPage>
    );
};

export default ArtistPage;
