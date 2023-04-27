import LoginPage from "../Pages/LoginPage";
import ProjectsPage from "../Pages/ProjectsPage";
import SchedulePage from "../Pages/SchedulePage";
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
        Component: SchedulePage
    },
    {
        path: "/projects",
        Component: ProjectsPage
    },
];