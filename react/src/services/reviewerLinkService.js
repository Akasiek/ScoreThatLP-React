import http from "./httpService";

const apiEndpoint = "/reviewer_links/";

export const getUserLinks = (reviewer_id) => http.get(`${apiEndpoint}?reviewer_id=${reviewer_id}`);

export const getUserLinkWithService = (reviewer_id, service_name) => {
    return http.get(`${apiEndpoint}?reviewer_id=${reviewer_id}&service_name=${service_name}`);
};

export const createLink = (link) => http.post(apiEndpoint, link);

export const updateLink = (link_id, link) => http.patch(`${apiEndpoint}${link_id}/`, link);

export const deleteLink = (link_id) => http.delete(`${apiEndpoint}${link_id}/`);
