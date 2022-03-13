import axios from "axios";
import logService from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        logService.log(error);
        toast.error("An unexpected error occurred");
    }

    return Promise.reject(error);
});

export const setJwt = (jwt) => {
    axios.defaults.headers.common["authorization"] = jwt;
};

const httpMethods = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};

export default httpMethods;
