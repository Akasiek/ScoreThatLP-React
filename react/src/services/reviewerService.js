import http from "./httpService";

const apiEndpoint = "/reviewers/";

export const getReviewer = (id) => {
    return http.get(`${apiEndpoint}${id}`);
};

export const getReviewerWithUser = (user_id) => {
    return http.get(`${apiEndpoint}?user_id=${user_id}`);
};

export const getReviewerByUsername = (username) => {
    return http.get(`${apiEndpoint}?user__username=${username}`);
};

export const createReviewer = (user) => {
    return http.post(`${apiEndpoint}`, user);
};

export const searchReviewers = (query) => {
    return http.get(`${apiEndpoint}?search=${query}`);
};
