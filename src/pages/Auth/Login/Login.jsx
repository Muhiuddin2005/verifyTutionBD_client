import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../utils/validationSchemas';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    });
    const location = useLocation();
    const navigate = useNavigate();
    const { signInUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        return signInUser(data.email, data.password)
            .then(() => {
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
        <Card className="w-full max-w-md p-4 md:p-6" hoverable>
            <div className="text-center mb-6">
                <h3 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Welcome Back</h3>
                <p className='text-base-content/60 font-medium'>Log in to manage your tuitions</p>
            </div>
            
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="mail@example.com"
                    leftIcon={<FaEnvelope />}
                    error={errors.email?.message}
                    disabled={isSubmitting}
                    required
                    {...register('email')}
                />

                <div className="form-control w-full">
                    <div className="flex justify-between items-center mb-1">
                        <label className="label-text font-bold text-base-content/80 text-sm">
                            Password <span className="text-error font-bold">*</span>
                        </label>
                        <a href="#" className="text-xs font-bold text-primary hover:text-secondary transition-colors">Forgot password?</a>
                    </div>
                    
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        leftIcon={<FaLock />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-base-content/40 hover:text-primary transition-colors cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        }
                        error={errors.password?.message}
                        disabled={isSubmitting}
                        {...register('password')}
                    />
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isSubmitting}
                    >
                        Log In Securely
                    </Button>
                </div>
            </form>

            <div className="flex gap-3 mt-4">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs" 
                    onClick={() => {
                        setValue('email', 'student@verifytutionbd.com', { shouldValidate: true });
                        setValue('password', 'Password123!', { shouldValidate: true });
                        setTimeout(() => {
                            handleSubmit(handleLogin)();
                        }, 50);
                    }}
                >
                    Demo Student
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs" 
                    onClick={() => {
                        setValue('email', 'admin@verifytutionbd.com', { shouldValidate: true });
                        setValue('password', 'Password123!', { shouldValidate: true });
                        setTimeout(() => {
                            handleSubmit(handleLogin)();
                        }, 50);
                    }}
                >
                    Demo Admin
                </Button>
            </div>
            
            <p className="text-center text-sm font-medium text-base-content/70 mt-6">
                New to verifyTutionBD?{' '}
                <Link state={location.state} className='text-secondary hover:text-primary font-bold transition-colors' to="/auth/register">
                    Create an account
                </Link>
            </p>
            
            <SocialLogin />
        </Card>
    );
};

export default Login;
