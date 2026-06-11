import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../../utils/validationSchemas';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    });
    const location = useLocation();
    const navigate = useNavigate();
    const { registerUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || '/';

    const handleRegistration = async (data) => {
        const defaultPhotoURL = "https://i.ibb.co/4pDNDk1/avatar.png";

        try {
            await registerUser(data.email, data.password);
            await updateUserProfile({ displayName: data.name, photoURL: defaultPhotoURL });

            const userInfo = {
                name: data.name,
                email: data.email,
                role: data.role,
                phone: data.phone,
                photoURL: defaultPhotoURL,
                status: 'verified'
            };

            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId || res.data.message === 'user already exists') {
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created Successfully!',
                    text: 'Welcome to Tuition Management.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            Swal.fire({ icon: 'error', title: 'Registration Failed', text: error.message });
        }
    };

    return (
        <Card className="w-full max-w-md p-4 md:p-6" hoverable>
            <div className="text-center mb-6">
                <h3 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Join Us</h3>
                <p className='text-base-content/60 font-medium'>Create your account today</p>
            </div>
            
            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    leftIcon={<FaUser />}
                    error={errors.name?.message}
                    disabled={isSubmitting}
                    required
                    {...register('name')}
                />

                <div className="form-control w-full">
                    <label className="label pb-1">
                        <span className="label-text font-bold text-base-content/80 text-sm">
                            I want to join as a: <span className="text-error font-bold">*</span>
                        </span>
                    </label>
                    <select
                        name="role"
                        className={`select w-full bg-base-200/50 border-base-300 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 ${errors.role ? 'border-error ring-2 ring-error/10 bg-error/5' : ''}`}
                        disabled={isSubmitting}
                        defaultValue=""
                        {...register('role')}
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="student">Student (Hire a Tutor)</option>
                        <option value="tutor">Tutor (Find Tuitions)</option>
                    </select>
                    {errors.role && (
                        <p className="text-error text-xs font-semibold mt-1.5 flex items-center gap-1">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                <Input
                    label="Phone Number"
                    type="text"
                    placeholder="+880 123 456 7890"
                    leftIcon={<FaPhone />}
                    error={errors.phone?.message}
                    disabled={isSubmitting}
                    required
                    {...register('phone')}
                />

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

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<FaLock />}
                    error={errors.password?.message}
                    disabled={isSubmitting}
                    required
                    {...register('password')}
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isSubmitting}
                    >
                        Register
                    </Button>
                </div>
            </form>
            
            <p className="text-center text-sm font-medium text-base-content/70 mt-6">
                Already have an account?{' '}
                <Link state={location.state} className='text-secondary hover:text-primary font-bold transition-colors' to="/auth/login">
                    Log In
                </Link>
            </p>
            
            <SocialLogin />
        </Card>
    );
};

export default Register;
