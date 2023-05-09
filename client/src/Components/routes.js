import LoginPage from "../Pages/LoginPage";
import ProjectsPage from "../Pages/ProjectsPage";
import SchedulePage from "../Pages/SchedulePage";
import CoursesPage from "../Pages/CoursesPage";

export const noAuthRouters = [
    {
        path: "/login",
        Component: LoginPage
    },
];

export const authRouters = [
    {
        path: "/tasks",
        Component: CoursesPage
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