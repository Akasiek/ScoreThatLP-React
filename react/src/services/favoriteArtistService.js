import http from "./httpService";

const apiEndpoint = "/favorite_reviewer_artist/";

export const getFavoriteReviewerArtist = (reviewer_id) => http.get(`${apiEndpoint}?reviewer_id=${reviewer_id}`);

export const createFavoriteReviewerArtist = (fav_artist) => http.post(apiEndpoint, fav_artist);

export const updateFavoriteReviewerArtist = (old_artist_id, fav_artist) => http.patch(`${apiEndpoint}${old_artist_id}/`, fav_artist);
