import http from "./httpService";

const apiEndpoint = "/reviewer_links/";

export const getUserLinks = (user_id) => http.get(`${apiEndpoint}?reviewer_id=${user_id}`);

export const createLink = (link) => http.post(apiEndpoint, link);

export const updateLink = (link_id, link) => http.patch(`${apiEndpoint}${link_id}/`, link);

export const deleteLink = (link_id) => http.delete(`${apiEndpoint}${link_id}/`);
