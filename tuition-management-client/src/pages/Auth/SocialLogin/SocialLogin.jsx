import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signInGoogle } = useAuth();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                console.log("Google User:", result.user);
                
                // create user in the database (Default role "Student" as per requirements)
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                    role: 'student' 
                };

                // TODO: Save to MongoDB using axiosPublic
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error);
                Swal.fire({ icon: 'error', title: 'Google Login Failed', text: error.message });
            });
    };

    return (
        <div className='px-8 pb-8'>
            <div className="divider text-base-content/50">OR</div>
            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full bg-base-100 hover:bg-base-200 text-base-content">
                <FcGoogle className="text-2xl" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;
