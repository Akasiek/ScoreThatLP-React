import http from "./httpService";

const apiEndpoint = "/simple_albums";

const albumUrl = (id) => {
    return `/albums/${id}`;
};

export const getAlbums = () => {
    return http.get(apiEndpoint);
};

export const getAlbum = (id) => {
    return http.get(albumUrl(id));
};

export const getNewReleases = () => {
    return http.get(`${apiEndpoint}/?ordering=-release_date`);
};

export const getAOTY = () => {
    return http.get("/album_of_the_year/?ordering=aoty");
};
