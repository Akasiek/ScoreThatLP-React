import http from "./httpService";

const apiEndpoint = "/artists";

const artistUrl = (id) => {
    return `${apiEndpoint}/${id}`;
};

export const getArtists = () => {
    return http.get(apiEndpoint);
};

export const getArtist = (id) => {
    return http.get(artistUrl(id));
};
