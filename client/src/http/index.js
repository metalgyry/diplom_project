import axios from "axios";

const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL + process.env.SERVER_PORT + "/auth/"
});

const $authHost = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL + process.env.SERVER_PORT + "/"
});

const authInterceptor = config => { // НУЖНО РАЗОБРАТЬСЯ СО ВХОДОМ ЧТО И КАК (ВИДОС)
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
};