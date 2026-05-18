import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { registerUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || '/';

    const handleRegistration = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        const phone = form.phone.value;
        
        const defaultPhotoURL = "https://i.ibb.co/4pDNDk1/avatar.png";

        try {
            await registerUser(email, password);
            
            await updateUserProfile({ displayName: name, photoURL: defaultPhotoURL });

            const userInfo = {
                name,
                email,
                role,
                phone,
                photoURL: defaultPhotoURL,
                status: 'verified'
            };

            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
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
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl rounded-3xl border border-base-200/60 p-2 md:p-4">
            <div className="card-body">
                <div className="text-center mb-6">
                    <h3 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Join Us</h3>
                    <p className='text-base-content/60 font-medium'>Create your account today</p>
                </div>
                
                <form onSubmit={handleRegistration}>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input type="text" name="name" className="input w-full" placeholder="John Doe" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">I want to join as a:</span></label>
                        <select name="role" className="select w-full" defaultValue="" required>
                            <option value="" disabled>Select your role</option>
                            <option value="student">Student (Hire a Tutor)</option>
                            <option value="tutor">Tutor (Find Tuitions)</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Phone Number</span></label>
                        <input type="text" name="phone" className="input w-full" placeholder="+880 123 456 7890" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" name="email" className="input w-full" placeholder="mail@example.com" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" name="password" className="input w-full" placeholder="••••••••" required />
                    </div>

                    <div className="form-control mt-8">
                        <button className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 border-none">
                            Register
                        </button>
                    </div>
                </form>
                
                <p className="text-center text-sm font-medium text-base-content/70 mt-6">
                    Already have an account?{' '}
                    <Link state={location.state} className='text-secondary hover:text-primary font-bold transition-colors' to="/auth/login">
                        Log In
                    </Link>
                </p>
            </div>
            
            <SocialLogin />
        </div>
    );
};

export default Register;
