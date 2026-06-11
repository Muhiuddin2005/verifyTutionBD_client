/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../pages/ErrorPage/Forbidden";

// Lazy-loaded page components
const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Login = lazy(() => import("../pages/Auth/Login/Login"));
const Register = lazy(() => import("../pages/Auth/Register/Register"));
const PostTuition = lazy(() => import("../pages/Dashboard/Student/PostTuition/PostTuition"));
const MyTuitions = lazy(() => import("../pages/Dashboard/Student/MyTuitions/MyTuitions"));
const TuitionsListing = lazy(() => import("../pages/Tuitions/TuitionsListing"));
const TuitionDetails = lazy(() => import("../pages/Tuitions/TuitionDetails"));
const TutorsListing = lazy(() => import("../pages/Tutors/TutorsListing"));
const TuitionManagement = lazy(() => import("../pages/Dashboard/Admin/TuitionManagement/TuitionManagement"));
const UserManagement = lazy(() => import("../pages/Dashboard/Admin/UserManagement/UserManagement"));
const AppliedTutors = lazy(() => import("../pages/Dashboard/Student/AppliedTutors/AppliedTutors"));
const PaymentSuccess = lazy(() => import("../pages/Dashboard/PaymentStatus/PaymentSuccess"));
const PaymentsHistory = lazy(() => import("../pages/Dashboard/Shared/PaymentsHistory/PaymentsHistory"));
const MyApplications = lazy(() => import("../pages/Dashboard/Tutor/MyApplications/MyApplications"));
const OngoingTuitions = lazy(() => import("../pages/Dashboard/Tutor/OngoingTuitions/OngoingTuitions"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));
const Profile = lazy(() => import("../pages/Dashboard/Shared/Profile/Profile"));
const Analytics = lazy(() => import("../pages/Dashboard/Admin/Analytics/Analytics"));
const Overview = lazy(() => import("../pages/Dashboard/Shared/Overview/Overview"));
const CategoriesManagement = lazy(() => import("../pages/Dashboard/Admin/Categories/CategoriesManagement"));
const Blog = lazy(() => import("../pages/Blog/Blog"));
const Support = lazy(() => import("../pages/Support/Support"));

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "tuitions", element: <TuitionsListing />},
            { path: "tuitions/:id", element: <TuitionDetails /> },
            { path: "tutors", element: <TutorsListing />},
            { path: "blog", element: <Blog /> },
            { path: "support", element: <Support /> }
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
            { index: true, element: <Overview /> },
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
            { path: "analytics", element: <PrivateRoute requiredRole="admin"><Analytics /></PrivateRoute> },
            { path: "categories", element: <PrivateRoute requiredRole="admin"><CategoriesManagement /></PrivateRoute> }
        ]
    }
]);
