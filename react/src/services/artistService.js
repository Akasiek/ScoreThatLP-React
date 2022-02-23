import http from "./httpService";

const apiEndpoint = "/artists";

const artistUrl = (slug) => {
    return `${apiEndpoint}/${slug}`;
};

export const getArtists = () => {
    return http.get(apiEndpoint);
};

export const getArtist = (slug) => {
    return http.get(artistUrl(slug));
};
