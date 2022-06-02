import http from "./httpService";

const apiEndpoint = "/likes";

export const saveLike = (like) => {};

export const getLikeForUserForReview = (user_id, review_id) => {
    return http.get(`${apiEndpoint}/?user_id=${user_id}&review_id=${review_id}`);
};
