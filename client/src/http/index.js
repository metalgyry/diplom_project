import axios from "axios";

const $host = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL + process.env.REACT_APP_SERVER_PORT + "/auth/"
});

const $authHost = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL + process.env.REACT_APP_SERVER_PORT + "/"
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if(error.response.status === 403 && error.config) {
        try {
            const response = await $authHost.get("/auth/refresh/", {withCredentials: true});
            localStorage.setItem("accessToken", response.data.accessToken);
            return $authHost.request(error.config);
        }catch (e) {
            if(e.response.status === 401) {
                await $authHost.get("/auth/logout");
                localStorage.clear();
                return window.location.href = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_CLIENT_PORT}/login`;
            }
            alert(e.response.data.error);
        }
    }
    throw error;
})

export {
    $host,
    $authHost
};