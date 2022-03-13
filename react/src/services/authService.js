import http from "./httpService";

const apiEndpoint = "/auth/";

export const login = (user) => {
    return http.post(`${apiEndpoint}jwt/create/`, user);
};

export const register = (user) => {
    return http.post(`${apiEndpoint}users/`, user);
};

export const getUser = (token) => {
    return http.get(`${apiEndpoint}users/me`);
};
