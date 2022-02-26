import http from "./httpService";

const apiEndpoint = "/reviews";

export const getAlbumReviews = (album_id) => {
    return http.get(`${apiEndpoint}/?album_id=${album_id}`);
};

export const getLatestReviewerReviews = (reviewer_id) => {
    return http.get(`${apiEndpoint}/?reviewer_id=${reviewer_id}&ordering=-created_at`);
};

export const getLatestReviewsOnly = () => {
    return http.get(`${apiEndpoint}/?ordering=-created_at&reviews_only`);
};
