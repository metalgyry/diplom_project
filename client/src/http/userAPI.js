import { $host, $authHost } from "./index.js";

export const signin = async (login, password) => {
    const response = await $host.post("login/", { login: login, password: password }); // , { headers: { 'Content-Type': 'multipart/form-data'} }
    return response;
};

export const getCoursesAndTasks = async () => {
    const response = await $authHost.get("/courses");
    return response;
};

export const signout = async () => {
    const response = await $authHost.get("/auth/logout");
    localStorage.clear();
    console.log("clear");
    return response;
};

export const allTasks = async () => {
    const response = await $authHost.get("/tasks/all");
    return response;
};

export const createTask = async (task) => {
    const response = await $authHost.post("/tasks/create", task);
    return response;
};

export const updateTask = async (task) => {
    // TODO: Удостовериться что правильно передан task на сервер
    const response = await $authHost.patch(`/tasks/update/`, task);
    return response;
};

export const deleteTask = async (id) => {
    const response = await $authHost.delete(`/tasks/delete/${id}`);
    return response;
};
