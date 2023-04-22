import Login from "../Pages/Login";
import Tasks from "../Pages/Tasks";

export const noAuthRouters = [
    {
        path: "/login",
        Component: Login
    },
];

export const authRouters = [
    {
        path: "/tasks",
        Component: Tasks
    },
];