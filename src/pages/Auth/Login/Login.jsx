import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { signInUser } = useAuth();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log("Logged in user:", result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome back!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({ icon: 'error', title: 'Login Failed', text: error.message });
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border border-base-200">
            <div className="card-body pb-2">
                <h3 className="text-3xl font-bold text-center mb-2">Welcome Back</h3>
                <p className='text-center text-base-content/70 mb-6'>Log in to manage your tuitions</p>
                
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Email</span></label>
                        <input 
                            type="email" 
                            {...register('email', { required: true })} 
                            className="input input-bordered w-full focus:outline-primary" 
                            placeholder="mail@example.com" 
                        />
                        {errors.email?.type === 'required' && <p className='text-error text-sm mt-1'>Email is required</p>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Password</span></label>
                        <input 
                            type="password" 
                            {...register('password', { required: true, minLength: 6 })} 
                            className="input input-bordered w-full focus:outline-primary" 
                            placeholder="******" 
                        />
                        {errors.password?.type === 'required' && <p className='text-error text-sm mt-1'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-error text-sm mt-1'>Password must be 6 characters or longer</p>}
                        <label className="label justify-end">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>

                    <button className="btn btn-primary w-full text-secondary font-bold mt-2">Log In</button>
                </form>
                
                <p className="text-center text-sm mt-4">
                    New to verifyTutionBD? <Link state={location.state} className='text-primary font-bold hover:underline' to="/auth/register">Create an account</Link>
                </p>
            </div>
            <SocialLogin />
        </div>
    );
};

export default Login;
