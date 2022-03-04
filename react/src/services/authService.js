import http from "./httpService";

const apiEndpoint = "/auth/";

export const getJWT = (user) => {
    return http.post(`${apiEndpoint}jwt/create/`, user);
};

export const getUser = (token) => {
    return http.get(`${apiEndpoint}users/me`, { headers: { Authorization: "JWT " + token } });
};
