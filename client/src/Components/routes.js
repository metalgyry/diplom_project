import LoginPage from "../Pages/LoginPage";
import Schedule from "../Pages/Schedule";
import TasksPage from "../Pages/TasksPage";

export const noAuthRouters = [
    {
        path: "/login",
        Component: LoginPage
    },
];

export const authRouters = [
    {
        path: "/tasks",
        Component: TasksPage
    },
    {
        path: "/schedule",
        Component: Schedule
    },
];