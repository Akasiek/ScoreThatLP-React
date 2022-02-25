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

export const getNewReleases = () => {
    return http.get(`${apiEndpoint}/?ordering=-release_date&type=LP`);
};

export const getArtistAlbums = (slug) => {
    return http.get(`${apiEndpoint}/?artist=${slug}`);
};

export const getAOTY = () => {
    return http.get("/album_of_the_year/?ordering=aoty");
};

export const getNewSingles = () => {
    return http.get(`${apiEndpoint}/?ordering=-release_date&type=Single`);
};
