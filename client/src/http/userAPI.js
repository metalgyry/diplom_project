import { $host, $authHost } from "./index.js";

export const signin = async (login, password) => {
    const response = await $host.post("login/", { login: login, password: password }); // , { headers: { 'Content-Type': 'multipart/form-data'} }
    return response;
};

export const listLobby = async () => {
    const response = await $authHost.get("main/");
    return response;
};

/*
export const refresh = async () => {
    const response = await $authHost.get("/auth/refresh/");
    return response;
};
*/

export const signout = async () => {
    const response = await $authHost.get("/auth/logout/");
    localStorage.clear();
    console.log("clear");
    return response;
};
