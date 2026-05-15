import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signInGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                console.log("Google User:", result.user);
                
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photoURL: result.user.photoURL,
                    role: 'student' 
                };

                axiosPublic.post('/users', userInfo).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(from, { replace: true });
                });
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
