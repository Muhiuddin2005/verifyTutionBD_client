import { Outlet, NavLink } from "react-router";
import { Suspense } from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo/Logo";
import { FiHome, FiSettings, FiList, FiLogOut, FiUsers, FiDollarSign, FiLayers } from "react-icons/fi";
import { MdOutlineClass } from "react-icons/md";
import Swal from 'sweetalert2';

const DashboardLayout = () => {
    const [role, isRoleLoading] = useRole();
    const { logOut } = useAuth();

    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({ icon: 'success', title: 'Logged out', timer: 1500, showConfirmButton: false });
        });
    };

    if (isRoleLoading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    const studentLinks = (
        <>
            <li><NavLink to="/dashboard" end><FiHome /> Overview</NavLink></li>
            <li><NavLink to="/dashboard/my-tuitions"><FiList /> My Tuitions</NavLink></li>
            <li><NavLink to="/dashboard/post-tuition"><MdOutlineClass /> Post New Tuition</NavLink></li>
            <li><NavLink to="/dashboard/applied-tutors"><FiUsers /> Applied Tutors</NavLink></li>
            <li><NavLink to="/dashboard/payments"><FiDollarSign /> Payments</NavLink></li>
        </>
    );

    const tutorLinks = (
        <>
            <li><NavLink to="/dashboard" end><FiHome /> Overview</NavLink></li>
            <li><NavLink to="/dashboard/my-applications"><FiList /> My Applications</NavLink></li>
            <li><NavLink to="/dashboard/ongoing-tuitions"><MdOutlineClass /> Ongoing Tuitions</NavLink></li>
            <li><NavLink to="/dashboard/revenue"><FiDollarSign /> Revenue History</NavLink></li>
        </>
    );

    const adminLinks = (
        <>
            <li><NavLink to="/dashboard" end><FiHome /> Overview</NavLink></li>
            <li><NavLink to="/dashboard/users"><FiUsers /> User Management</NavLink></li>
            <li><NavLink to="/dashboard/tuitions"><FiList /> Tuition Management</NavLink></li>
            <li><NavLink to="/dashboard/analytics"><FiDollarSign /> Reports & Analytics</NavLink></li>
            <li><NavLink to="/dashboard/categories"><FiLayers /> Categories</NavLink></li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open font-inter">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-200 min-h-screen overflow-x-hidden">
                {/* Navbar for mobile */}
                <div className="w-full navbar bg-base-100 lg:hidden shadow-sm">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <Logo />
                    </div>
                </div>

                {/* Main content */}
                <div className="p-4 lg:p-8">
                    <Suspense fallback={
                        <div className="flex justify-center items-center py-20 min-h-[40vh]">
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                        </div>
                    }>
                        <Outlet />
                    </Suspense>
                </div>
            </div> 
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content flex flex-col justify-between">
                    <div>
                        <div className="mb-8 mt-4 ml-4">
                            <Logo />
                        </div>
                        {role === 'student' && studentLinks}
                        {role === 'tutor' && tutorLinks}
                        {role === 'admin' && adminLinks}
                        
                        <div className="divider"></div>
                        <li><NavLink to="/dashboard/profile"><FiSettings /> Profile Settings</NavLink></li>
                        <li><NavLink to="/"><FiHome /> Back to Home</NavLink></li>
                    </div>
                    <div>
                        <li><button onClick={handleLogOut} className="text-error font-semibold"><FiLogOut /> Logout</button></li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
