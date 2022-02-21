import React, { useState } from "react";
import { Helmet } from "react-helmet";
import useDeepCompareEffect from "use-deep-compare-effect";
import { getAlbums } from "./../services/fakeMusicService";
import ContentGroup from "./common/contentGroup";
import styled from "styled-components";
import { Main } from "./../App";

export const StyledContentGroupPage = styled.div`
    padding: 2rem 0;
    background-color: var(--darkBlueColor);

    .contentGroup {
        padding: 0 1rem 2rem 1rem;
        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 0 0.5rem;
        }

        .contentContainer {
            gap: 4rem 4%;
            margin-block: 2rem;
            margin-inline: clamp(1.5rem, 2.5vw, 3rem);

            @media (max-width: ${({ theme }) => theme.mobile}) {
                gap: 3rem 5%;
                /* margin-inline: 1.75rem 3rem; */
            }

            @media (max-width: 35rem) {
                gap: 3rem 6%;
                margin: 1.25rem 1.5rem;
            }
        }
    }
`;

const Albums = () => {
    const [albums, setAlbums] = useState(getAlbums());

    useDeepCompareEffect(() => setAlbums(getAlbums()), [albums]);

    return (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>Albums | ScoreThatLP</title>
            </Helmet>
            <StyledContentGroupPage>
                <ContentGroup
                    title="Albums"
                    content={albums}
                    contentType="albums"
                    isPaginationEnabled={true}
                    contentPageSize={30}
                    isSortingEnabled={true}
                    sortingMethod={{ value: "name-asc", label: "Name asceding" }}
                    className="contentGroup"
                    colSize={[5, 3, 2]}
                />
            </StyledContentGroupPage>
        </Main>
    );
};

export default Albums;
