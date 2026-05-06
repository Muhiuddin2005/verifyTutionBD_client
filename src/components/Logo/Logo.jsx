import { Link } from 'react-router';
import { FaGraduationCap } from 'react-icons/fa6'; 

const Logo = () => {
    return (
        <Link to="/">
            <div className='flex items-center gap-2'>
                <FaGraduationCap className="text-4xl text-primary" />
                <h3 className="text-3xl font-bold">verifyTutionBD</h3>
            </div>
        </Link>
    );
};

export default Logo;
