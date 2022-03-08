import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { StyledContentGroupPage } from "./albums";
import { Main } from "./../App";
import ContentGroup from "./common/contentGroup";
import { searchArtists } from "../services/artistService";
import { searchAlbums } from "./../services/albumService";
import { searchReviewers } from "../services/reviewerService";
import LoadingScreen from "./loadingScreen";

const SearchPage = ({ match }) => {
    const [searchQuery, setSearchQuery] = useState(match.params.searchQuery);
    const [foundComponets, setFoundComponents] = useState({ albums: [], artists: [], users: [] });

    useEffect(async () => {
        const searchQuery = match.params.searchQuery;

        const { data: artistsResults } = await searchArtists(searchQuery);
        const { data: albumsResults } = await searchAlbums(searchQuery);
        const { data: reviewersResults } = await searchReviewers(searchQuery);
        setSearchQuery(searchQuery);
        setFoundComponents({ albums: albumsResults, artists: artistsResults, reviewers: reviewersResults });
    }, [match.params.searchQuery]);

    return foundComponets.albums && foundComponets.artists && foundComponets.reviewers ? (
        <Main>
            <Helmet>
                <title>Search - {searchQuery} | ScoreThatLP</title>
            </Helmet>
            {foundComponets.albums?.length !== 0 && (
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
            {foundComponets.artists?.length !== 0 && (
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
            {foundComponets.reviewers?.length !== 0 && (
                <StyledContentGroupPage>
                    <ContentGroup
                        title="Found Users"
                        content={foundComponets.reviewers}
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
    ) : (
        <LoadingScreen />
    );
};

export default SearchPage;
