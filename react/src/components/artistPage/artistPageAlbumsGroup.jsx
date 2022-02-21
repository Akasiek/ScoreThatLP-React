import React, { useEffect, useState } from "react";
import { getArtistAlbums, getLatestArtistReviews } from "../../services/fakeMusicService";
import ContentGroup from "../common/contentGroup";
import useDeepCompareEffect from "use-deep-compare-effect";

const getReleaseTypeTitle = (release_type) => {
    if (release_type == "LP") return "Albums";
    if (release_type == "Single") return "Singles";
    if (release_type == "EP") return "EPs";
    if (release_type == "Live") return "Live albums";
};

const ArtistPageAlbumsGroup = ({ artist }) => {
    const [albums, setAlbums] = useState(getArtistAlbums(artist.id));
    const [groups, setGroups] = useState([{ name: "LP", albums: [] }]);

    useDeepCompareEffect(() => {
        setAlbums(getArtistAlbums(artist.id));
        const newGroups = [{ name: "LP", albums: [] }];
        albums.forEach((album) => {
            const release_type = album.release_type;
            if (!newGroups.find((o) => o.name === release_type)) {
                newGroups.push({ name: release_type, albums: [] });
            }
            newGroups.find((o) => o.name === release_type).albums?.push(album);
        });
        setGroups(newGroups);
    }, [artist, albums]);

    return (
        <React.Fragment>
            {groups.map((o, index) => {
                return (
                    <ContentGroup
                        key={index}
                        className="artistAlbums"
                        title={getReleaseTypeTitle(o.name)}
                        noTitleMargin={true}
                        content={o.albums}
                        contentType="albums"
                        showPlaceholderWhenEmpty={true}
                        albumIsInArtistPage={true}
                        colSize={[5, 2, 2]}
                        isPaginationEnabled={true}
                        contentPageSize={8}
                        isSortingEnabled={true}
                    />
                );
            })}
        </React.Fragment>
    );
};

export default ArtistPageAlbumsGroup;
