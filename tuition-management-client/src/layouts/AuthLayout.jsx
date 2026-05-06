import { Outlet, Link } from 'react-router';
import Logo from '../components/Logo/Logo';
import { FaArrowLeft } from 'react-icons/fa';

const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto'>
            
            <div className='flex-1 flex flex-col justify-center p-8 lg:p-16'>
                <div className="mb-8">
                    <Link to="/" className="btn btn-sm btn-ghost mb-4 gap-2">
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <Logo />
                </div>
                
                <div className="flex items-center justify-center w-full">
                    <Outlet />
                </div>
            </div>

            <div className='hidden md:flex flex-1 bg-base-200 items-center justify-center p-12 relative overflow-hidden'>
                <div className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl -top-20 -right-20"></div>
                
                <div className="relative z-10 text-center">
                    <div className="w-80 h-80 bg-base-300 rounded-3xl shadow-xl flex items-center justify-center mb-8 mx-auto">
                        <p className="text-base-content/50 font-bold">Illustration Space</p>
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Empowering Education</h2>
                    <p className="text-lg text-base-content/70 max-w-md mx-auto">
                        Join thousands of students and tutors transforming the way learning happens across Bangladesh.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;
