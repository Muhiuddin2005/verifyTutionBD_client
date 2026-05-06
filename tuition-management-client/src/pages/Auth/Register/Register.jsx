import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegistration = (data) => {
        console.log('Registration form data:', data);
    };

    return (
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border border-base-200">
            <div className="card-body pb-2">
                <h3 className="text-3xl font-bold text-center mb-2">Join Us</h3>
                <p className='text-center text-base-content/70 mb-4'>Create your account today</p>
                
                <form onSubmit={handleSubmit(handleRegistration)} className="space-y-3">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Full Name</span></label>
                        <input type="text" {...register('name', { required: true })} className="input input-bordered focus:outline-primary" placeholder="John Doe" />
                        {errors.name && <p className='text-error text-sm mt-1'>Name is required.</p>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">I want to join as a:</span></label>
                        <select {...register('role', { required: true })} className="select select-bordered focus:outline-primary w-full" defaultValue="">
                            <option value="" disabled>Select your role</option>
                            <option value="student">Student (Hire a Tutor)</option>
                            <option value="tutor">Tutor (Find Tuitions)</option>
                        </select>
                        {errors.role && <p className='text-error text-sm mt-1'>Please select a role.</p>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Profile Photo</span></label>
                        <input type="file" {...register('photo', { required: true })} className="file-input file-input-bordered w-full focus:outline-primary" accept="image/*" />
                        {errors.photo && <p className='text-error text-sm mt-1'>Photo is required.</p>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Email</span></label>
                        <input type="email" {...register('email', { required: true })} className="input input-bordered focus:outline-primary" placeholder="mail@example.com" />
                        {errors.email && <p className='text-error text-sm mt-1'>Email is required.</p>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Password</span></label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                        })} className="input input-bordered focus:outline-primary" placeholder="******" />
                        
                        {errors.password?.type === 'required' && <p className='text-error text-sm mt-1'>Password is required.</p>}
                        {errors.password?.type === 'minLength' && <p className='text-error text-sm mt-1'>Password must be at least 6 characters.</p>}
                        {errors.password?.type === 'pattern' && <p className='text-error text-sm mt-1 leading-tight'>Must have at least one uppercase, one lowercase, one number, and one special character.</p>}
                    </div>

                    <button className="btn btn-primary w-full text-secondary font-bold mt-4">Register</button>
                </form>
                
                <p className="text-center text-sm mt-4">
                    Already have an account? <Link state={location.state} className='text-primary font-bold hover:underline' to="/login">Log In</Link>
                </p>
            </div>
            <SocialLogin />
        </div>
    );
};

export default Register;
