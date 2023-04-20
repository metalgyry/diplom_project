import { $host, $authHost } from "./index.js";

export const signin = async (login, password) => {
    const response = await $host.post("login/", { login: login, password: password }); // , { headers: { 'Content-Type': 'multipart/form-data'} }
    return response;
};

export const listLobby = async () => {
    const response = await $authHost.get("lobby/");
    return response;
};
