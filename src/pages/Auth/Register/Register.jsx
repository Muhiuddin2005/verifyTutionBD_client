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
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border border-base-200">
            <div className="card-body pb-2">
                <h3 className="text-3xl font-bold text-center mb-2">Join Us</h3>
                <p className='text-center text-base-content/70 mb-4'>Create your account today</p>
                
                <form onSubmit={handleRegistration} className="space-y-3">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Full Name</span></label>
                        <input type="text" name="name" className="input input-bordered focus:outline-primary" placeholder="John Doe" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">I want to join as a:</span></label>
                        <select name="role" className="select select-bordered focus:outline-primary w-full" defaultValue="" required>
                            <option value="" disabled>Select your role</option>
                            <option value="student">Student (Hire a Tutor)</option>
                            <option value="tutor">Tutor (Find Tuitions)</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Phone Number</span></label>
                        <input type="text" name="phone" className="input input-bordered focus:outline-primary" placeholder="+880 123 456 7890" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Email</span></label>
                        <input type="email" name="email" className="input input-bordered focus:outline-primary" placeholder="mail@example.com" required />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Password</span></label>
                        <input type="password" name="password" className="input input-bordered focus:outline-primary" placeholder="******" required />
                    </div>

                    <button className="btn btn-primary w-full text-secondary font-bold mt-4">Register</button>
                </form>
                
                <p className="text-center text-sm mt-4">
                    Already have an account? <Link state={location.state} className='text-primary font-bold hover:underline' to="/auth/login">Log In</Link>
                </p>
            </div>
            <SocialLogin />
        </div>
    );
};

export default Register;
