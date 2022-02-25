import http from "./httpService";

const apiEndpoint = "/reviewers";

export const getReviewer = (slug) => {
    return http.get(`${apiEndpoint}/${slug}`);
};
