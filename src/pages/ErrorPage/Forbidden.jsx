import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { FaShieldAlt } from 'react-icons/fa';

const Forbidden = () => {
    const { logOut } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            logOut()
                .then(() => {
                    navigate('/auth/login', { replace: true });
                })
                .catch(error => console.log(error));
        }, 2000);

        return () => clearTimeout(timer);
    }, [logOut, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
            <FaShieldAlt className="text-error text-8xl mb-6 animate-bounce" />
            <h1 className="text-6xl font-black text-error mb-2 drop-shadow-md">403</h1>
            <h2 className="text-3xl font-bold text-base-content mb-4 uppercase tracking-wider">Access Forbidden</h2>
            <div className="max-w-md text-center bg-error/10 p-6 rounded-xl border border-error/20">
                <p className="text-base-content/80 text-lg mb-4">
                    Security Violation Detected. You do not have permission to access this directory.
                </p>
                <p className="text-error font-semibold flex items-center justify-center gap-2">
                    Forcefully logging out for your security <span className="loading loading-dots loading-sm"></span>
                </p>
            </div>
        </div>
    );
};

export default Forbidden;
