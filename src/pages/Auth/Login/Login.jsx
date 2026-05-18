import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { signInUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome back!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({ icon: 'error', title: 'Login Failed', text: error.message });
            });
    };

    return (
        // Added rounded-3xl and polished the shadow/border for a premium card look
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl rounded-3xl border border-base-200/60 p-2 md:p-4">
            <div className="card-body">
                <div className="text-center mb-6">
                    <h3 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Welcome Back</h3>
                    <p className='text-base-content/60 font-medium'>Log in to manage your tuitions</p>
                </div>
                
                {/* We rely on the global .form-control margins now, so no need for space-y classes here */}
                <form onSubmit={handleSubmit(handleLogin)}>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email Address</span></label>
                        <input 
                            type="email" 
                            {...register('email', { required: true })} 
                            className="input w-full" 
                            placeholder="mail@example.com" 
                        />
                        {errors.email && <p className='text-error text-xs font-semibold mt-2'>Email is required</p>}
                    </div>

                    <div className="form-control">
                        <div className="flex justify-between items-center">
                            <label className="label"><span className="label-text">Password</span></label>
                            <a href="#" className="text-xs font-bold text-primary hover:text-secondary transition-colors">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                {...register('password', { required: true, minLength: 6 })} 
                                className="input w-full pr-12" 
                                placeholder="••••••••" 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                        {errors.password?.type === 'required' && <p className='text-error text-xs font-semibold mt-2'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-error text-xs font-semibold mt-2'>Must be 6 characters or longer</p>}
                    </div>

                    <div className="form-control mt-8">
                        <button className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 border-none">
                            Log In Securely
                        </button>
                    </div>
                </form>
                
                <p className="text-center text-sm font-medium text-base-content/70 mt-6">
                    New to verifyTutionBD?{' '}
                    <Link state={location.state} className='text-secondary hover:text-primary font-bold transition-colors' to="/auth/register">
                        Create an account
                    </Link>
                </p>
            </div>
            
            <SocialLogin />
        </div>
    );
};

export default Login;
