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

const choiceURL = (isTaskOrSubTask) => {
    if(isTaskOrSubTask) {
        return "/tasks";
    }else {
        return "/subtasks";
    }
}

export const createTaskOrSubTask = async (task, isTaskOrSubTask) => {    
    const response = await $authHost.post(choiceURL(isTaskOrSubTask) + "/create", task);
    return response;
};

export const updateTaskOrSubTask = async (task, isTaskOrSubTask) => {
    
    const response = await $authHost.patch(choiceURL(isTaskOrSubTask) + `/update/`, task);
    return response;
};

export const deleteTaskOrSubTask = async (id, isTaskOrSubTask) => {

    const response = await $authHost.delete(choiceURL(isTaskOrSubTask) + `/delete/${id}`);
    return response;
};

export const allProjects = async () => {
    const response = await $authHost.get("/projects/all");
    return response;
};

export const createProject = async (project) => {    
    const response = await $authHost.post("/projects/create", project);
    return response;
};

export const updateProject = async (project) => {
    const response = await $authHost.patch(`/projects/update/`, project);
    return response;
};

export const deleteProject = async (id) => {
    const response = await $authHost.delete(`/projects/delete/${id}`);
    return response;
};

export const allGroupStudents = async (id) => {
    const response = await $authHost.get('/groups/students');
    return response;
};

export const exitStudentProject = async (id) => {
    const response = await $authHost.delete(`/student-projects/exit/${id}`);
    return response;
};

export const allStudentsInGroupProject = async (id_project) => {
    const response = await $authHost.get(`/student-projects/list-students/${id_project}`);
    return response;
};