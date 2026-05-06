import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, element: <Home /> },
            { path: "coverage", element: <Coverage /> }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> }
        ]
    }
]);
