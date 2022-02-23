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
