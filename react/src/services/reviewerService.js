import http from "./httpService";

const apiEndpoint = "/reviewers/";

export const getReviewer = (id) => http.get(`${apiEndpoint}${id}`);

export const getReviewerWithUser = (user_id) => http.get(`${apiEndpoint}?user=${user_id}`);

export const getReviewerByUsername = (username) => http.get(`${apiEndpoint}?user__username=${username}`);

export const createReviewer = (user, headers = null) => http.post(apiEndpoint, user, { headers: headers });

export const updateReviewer = (reviewer_id, reviewer) => http.patch(`${apiEndpoint}${reviewer_id}/`, reviewer);

export const searchReviewers = (query) => http.get(`${apiEndpoint}?search=${query}`);
