import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { StyledContentGroupPage } from "./albums";
import { Main } from "./../App";
import ContentGroup from "./common/contentGroup";
import { searchDB } from "../services/fakeMusicService";

const SearchPage = ({ match }) => {
    const [searchQuery, setSearchQuery] = useState(match.params.searchQuery);
    const [foundComponets, setFoundComponents] = useState({ albums: [], artists: [], users: [] });

    useEffect(() => {
        setSearchQuery(match.params.searchQuery);
    }, [match.params.searchQuery]);

    useEffect(() => {
        const { albums, artists, users } = searchDB(searchQuery);
        setFoundComponents({ albums: albums, artists: artists, users: users });
    }, [searchQuery]);

    return (
        <Main pushUnderNavbar={true}>
            <Helmet>
                <title>Search - {searchQuery} | ScoreThatLP</title>
            </Helmet>
            {foundComponets.albums.length !== 0 && (
                <StyledContentGroupPage>
                    <ContentGroup
                        title="Found Albums"
                        content={foundComponets.albums}
                        contentType="albums"
                        isPaginationEnabled={true}
                        contentPageSize={20}
                        className="contentGroup"
                        colSize={[5, 3, 2]}
                    />
                </StyledContentGroupPage>
            )}
            {foundComponets.artists.length !== 0 && (
                <StyledContentGroupPage>
                    <ContentGroup
                        title="Found Artists"
                        content={foundComponets.artists}
                        contentType="artists"
                        isPaginationEnabled={true}
                        contentPageSize={20}
                        className="contentGroup"
                        colSize={[5, 3, 2]}
                    />
                </StyledContentGroupPage>
            )}
            {foundComponets.users.length !== 0 && (
                <StyledContentGroupPage>
                    <ContentGroup
                        title="Found Users"
                        content={foundComponets.users}
                        contentType="users"
                        isPaginationEnabled={true}
                        contentPageSize={20}
                        className="contentGroup"
                        colSize={[5, 3, 2]}
                    />
                </StyledContentGroupPage>
            )}
            {/* {!foundAlbums && !foundArtists && <h1>Nothing was found in this search query</h1>} */}
        </Main>
    );
};

export default SearchPage;
