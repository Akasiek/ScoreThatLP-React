import http from "./httpService";

const apiEndpoint = "/reviews/";

export const getAlbumReviews = (album_id) => {
    return http.get(`${apiEndpoint}?album_id=${album_id}&ordering=-updated_at`);
};

export const getLatestArtistReviews = (artist_slug) => {
    return http.get(`${apiEndpoint}?ordering=-updated_at&review_text__isnull=False&album_id__artist_id__slug=${artist_slug}`);
};

export const getReviewerReviews = (reviewer_id) => {
    return http.get(`${apiEndpoint}?reviewer_id=${reviewer_id}`);
};

export const getLatestReviewerReviews = (reviewer_id) => {
    return http.get(`${apiEndpoint}?reviewer_id=${reviewer_id}&ordering=-updated_at`);
};

export const getLatestReviews = () => {
    return http.get(`${apiEndpoint}`);
};

export const getLatestReviewsOnly = () => {
    return http.get(`${apiEndpoint}?ordering=-updated_at&review_text__isnull=False`);
};

// Album page requests
export const getReviewerAlbumRating = (reviewer_id, album_id) => {
    return http.get(`${apiEndpoint}?reviewer_id=${reviewer_id}&album_id=${album_id}`);
};
export const createReview = (review) => {
    return http.post(`${apiEndpoint}`, review);
};
export const saveReview = (review, review_id) => {
    return http.patch(`${apiEndpoint}${review_id}/`, review);
};
export const deleteReview = (review_id) => {
    return http.delete(`${apiEndpoint}${review_id}/`);
};
