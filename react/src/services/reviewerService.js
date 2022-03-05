import http from "./httpService";

const apiEndpoint = "/reviewers/";

export const getReviewer = (slug) => {
    return http.get(`${apiEndpoint}${slug}`);
};

export const createReviewer = (user) => {
    return http.post(`${apiEndpoint}`, user);
};

export const searchReviewers = (query) => {
    return http.get(`${apiEndpoint}?search=${query}`);
};
