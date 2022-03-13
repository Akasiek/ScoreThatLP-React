import http from "./httpService";

const apiEndpoint = "/reviewers/";

export const getReviewer = (id) => {
    return http.get(`${apiEndpoint}${id}`);
};

export const getReviewerWithUser = (user_id) => {
    return http.get(`${apiEndpoint}?user=${user_id}`);
};

export const getReviewerByUsername = (username) => {
    return http.get(`${apiEndpoint}?user__username=${username}`);
};

export const createReviewer = (user, headers = null) => {
    return http.post(`${apiEndpoint}`, user, { headers: headers });
};

export const updateReviewer = (reviewer_id, reviewer) => {
    return http.patch(`${apiEndpoint}${reviewer_id}/`, reviewer);
};

export const searchReviewers = (query) => {
    return http.get(`${apiEndpoint}?search=${query}`);
};
