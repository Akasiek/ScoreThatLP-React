import http from "./httpService";

const apiEndpoint = "/tracks/";

export const saveTrack = (track) => {
    return http.post(apiEndpoint, track);
};
