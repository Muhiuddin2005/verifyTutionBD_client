import { Link, useRouteError } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
            <div className="text-center p-12 bg-base-100 rounded-3xl shadow-2xl border border-error/20 max-w-lg w-full">
                <FaExclamationTriangle className="text-8xl text-error mx-auto mb-6 drop-shadow-lg" />
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
                <p className="text-base-content/70 mb-8">
                    {error?.statusText || error?.message || "The page you are looking for doesn't exist or has been moved."}
                </p>
                <Link to="/" className="btn btn-primary text-secondary w-full text-lg shadow-lg">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
