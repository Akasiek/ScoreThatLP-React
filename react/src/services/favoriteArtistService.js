import http from "./httpService";

const apiEndpoint = "/favorite_reviewer_artist/";

export const getFavoriteReviewerArtist = (reviewer_id) => http.get(`${apiEndpoint}?reviewer_id=${reviewer_id}`);
