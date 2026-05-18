import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useTheme } from '../../../hooks/useTheme';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/auth/login');
            })
            .catch(error => console.log(error));
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/tuitions">Tuitions</NavLink></li>
            <li><NavLink to="/tutors">Tutors</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        </>
    );

    return (
        <header className='sticky top-0 z-[1000] w-full bg-base-100/80 backdrop-blur-md border-b border-base-content/10'>
            <div className="navbar max-w-7xl mx-auto px-4 lg:px-8 h-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100 rounded-box w-64 border border-base-content/10 gap-2">
                            {links}
                        </ul>
                    </div>
                    <Logo />
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    <label className="swap swap-rotate mr-2">
                        <input 
                            type="checkbox" 
                            onChange={toggleTheme} 
                            checked={theme === 'dark'} 
                        />
                        <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                        <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                    </label>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary ring ring-primary ring-offset-base-100 ring-offset-2">
                                <div className="w-10 rounded-full">
                                    <img alt="User profile" src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-content/10">
                                <li className="px-4 py-2 border-b border-base-content/10 mb-2">
                                    <p className="font-bold text-primary truncate">{user?.displayName || "User"}</p>
                                    <p className="text-xs opacity-60 truncate">{user?.email}</p>
                                </li>
                                <li><Link to="/dashboard" className="font-semibold">Dashboard</Link></li>
                                <li><Link to="/dashboard/profile" className="font-semibold">Profile</Link></li>
                                <li><button onClick={handleLogOut} className="text-error font-semibold">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link className='btn btn-ghost' to="/auth/login">Login</Link>
                            <Link className='btn btn-primary text-secondary' to="/auth/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;
