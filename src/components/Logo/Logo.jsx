import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity duration-200">
            {/* Removed the text, slightly increased the size to w-16 h-16 */}
            <img src="/logo.webp" alt="verifyTutionBD Logo" className="w-16 h-16 object-contain" />
        </Link>
    );
};

export default Logo;
