import http from "./httpService";

const apiEndpoint = "/reviewers/";

export const getReviewer = (id) => {
    return http.get(`${apiEndpoint}${id}`);
};

export const getReviewerBySlug = (slug) => {
    return http.get(`${apiEndpoint}?slug=${slug}`);
};

export const createReviewer = (user) => {
    return http.post(`${apiEndpoint}`, user);
};

export const searchReviewers = (query) => {
    return http.get(`${apiEndpoint}?search=${query}`);
};
