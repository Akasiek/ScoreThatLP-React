import http from "./httpService";

const apiEndpoint = "/albums";

const albumUrl = (id) => {
    return `${apiEndpoint}/${id}`;
};

export const getAlbums = () => {
    return http.get(apiEndpoint);
};

export const getAlbum = (id) => {
    return http.get(albumUrl(id));
};

export const saveAlbum = (album) => {
    return http.post(apiEndpoint + "/", album);
};

export const saveAlbumLink = (link) => {
    return http.post("/album_links/", link);
};

export const getNewReleases = () => {
    return http.get(`${apiEndpoint}/?ordering=-release_date&release_type=LP`);
};

export const getRecentlyAdded = () => {
    return http.get(`${apiEndpoint}/?ordering=-created_at`);
};

export const getArtistAlbums = (slug) => {
    return http.get(`${apiEndpoint}/?artist_id__slug=${slug}`);
};

export const getAOTY = () => {
    return http.get("/album_of_the_year/?ordering=aoty__position");
};

export const getNewSingles = () => {
    return http.get(`${apiEndpoint}/?ordering=-release_date&release_type=Single`);
};

export const searchAlbums = (query) => {
    return http.get(`${apiEndpoint}/?search=${query}`);
};

export const getFakeAOTY = () => {
    return http.get(`${apiEndpoint}?ordering=-overall_score&release_date__gte=2022-01-01&release_date__lte=2022-12-31&release_type=LP`);
};
