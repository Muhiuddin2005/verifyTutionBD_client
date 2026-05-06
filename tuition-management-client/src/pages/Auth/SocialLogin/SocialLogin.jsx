// import { useLocation, useNavigate } from 'react-router';
// import useAuth from '../../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const { signInGoogle } = useAuth();

    const handleGoogleSignIn = () => {
        console.log("Google Sign in clicked.");
    };

    return (
        <div className='px-8 pb-8'>
            <div className="divider text-base-content/50">OR</div>
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full bg-base-100 hover:bg-base-200 text-base-content">
                <FcGoogle className="text-2xl" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;
