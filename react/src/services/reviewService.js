import http from "./httpService";

const apiEndpoint = "/reviews";

export const getAlbumReviews = (album_id) => {
    return http.get(`${apiEndpoint}/?album_id=${album_id}`);
};
