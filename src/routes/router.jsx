import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PostTuition from "../pages/Dashboard/Student/PostTuition/PostTuition";
import MyTuitions from "../pages/Dashboard/Student/MyTuitions/MyTuitions";
import TuitionsListing from "../pages/Tuitions/TuitionsListing";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import TutorsListing from "../pages/Tutors/TutorsListing";
import TuitionManagement from "../pages/Dashboard/Admin/TuitionManagement/TuitionManagement";
import UserManagement from "../pages/Dashboard/Admin/UserManagement/UserManagement";
import AppliedTutors from "../pages/Dashboard/Student/AppliedTutors/AppliedTutors";
import PaymentSuccess from "../pages/Dashboard/PaymentStatus/PaymentSuccess";
import PaymentsHistory from "../pages/Dashboard/Shared/PaymentsHistory/PaymentsHistory";
import MyApplications from "../pages/Dashboard/Tutor/MyApplications/MyApplications";
import OngoingTuitions from "../pages/Dashboard/Tutor/OngoingTuitions/OngoingTuitions";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Profile from "../pages/Dashboard/Shared/Profile/Profile";
import Analytics from "../pages/Dashboard/Admin/Analytics/Analytics";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../pages/ErrorPage/Forbidden";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "tuitions", element: <PrivateRoute><TuitionsListing /></PrivateRoute> },
            { path: "tuitions/:id", element: <PrivateRoute><TuitionDetails /></PrivateRoute> },
            { path: "tutors", element: <PrivateRoute><TutorsListing /></PrivateRoute> }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> }
        ]
    },
    {
        path: "/forbidden",
        element: <Forbidden />
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Profile /> },
            { path: "profile", element: <Profile /> },
            { path: "my-tuitions", element: <PrivateRoute requiredRole="student"><MyTuitions /></PrivateRoute> },
            { path: "post-tuition", element: <PrivateRoute requiredRole="student"><PostTuition /></PrivateRoute> },
            { path: "applied-tutors", element: <PrivateRoute requiredRole="student"><AppliedTutors /></PrivateRoute> },
            { path: "payments", element: <PrivateRoute requiredRole="student"><PaymentsHistory /></PrivateRoute> },
            { path: "my-applications", element: <PrivateRoute requiredRole="tutor"><MyApplications /></PrivateRoute> },
            { path: "ongoing-tuitions", element: <PrivateRoute requiredRole="tutor"><OngoingTuitions /></PrivateRoute> },
            { path: "revenue", element: <PrivateRoute requiredRole="tutor"><PaymentsHistory /></PrivateRoute> },
            { path: "payment-success", element: <PaymentSuccess /> },
            { path: "users", element: <PrivateRoute requiredRole="admin"><UserManagement /></PrivateRoute> },
            { path: "tuitions", element: <PrivateRoute requiredRole="admin"><TuitionManagement /></PrivateRoute> },
            { path: "analytics", element: <PrivateRoute requiredRole="admin"><Analytics /></PrivateRoute> }
        ]
    }
]);
