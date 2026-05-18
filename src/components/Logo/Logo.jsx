import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className='flex items-center gap-2'>
                <img src="/logo.webp" alt="verifyTutionBD Logo" className="w-12 h-12 object-contain" />
                <h3 className="text-3xl font-bold">verifyTutionBD</h3>
            </div>
        </Link>
    );
};

export default Logo;
