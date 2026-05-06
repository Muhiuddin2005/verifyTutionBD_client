import Logo from '../../../components/Logo/Logo';
import { Link } from 'react-router';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa6';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-24">
            <div className="footer max-w-7xl mx-auto p-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <aside>
                    <Logo />
                    <p className="mt-4 text-sm leading-relaxed">
                        verifyTutionBD is a reliable platform connecting students with qualified tutors. We ensure quality education and a seamless experience for both learners and educators.
                    </p>
                </aside>
                
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <Link to="/tuitions" className="link link-hover">Browse Tuitions</Link>
                    <Link to="/tutors" className="link link-hover">Find Tutors</Link>
                    <Link to="/about" className="link link-hover">About Us</Link>
                    <Link to="/contact" className="link link-hover">Contact</Link>
                </nav>
                
                <nav>
                    <h6 className="footer-title">Contact Info</h6>
                    <a className="flex items-center gap-2 mb-2"><FaPhoneAlt className="text-primary"/> +880 1234-567890</a>
                    <a className="flex items-center gap-2 mb-2"><FaEnvelope className="text-primary"/> support@etuitionbd.com</a>
                    <a className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary"/> Dhaka, Bangladesh</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Social Media</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a href="#" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 1200 1227">
                                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                            </svg>
                        </a>
                        <a href="#" className="text-2xl hover:text-primary transition-colors"><FaFacebook /></a>
                        <a href="#" className="text-2xl hover:text-primary transition-colors"><FaLinkedin /></a>
                        <a href="#" className="text-2xl hover:text-primary transition-colors"><FaYoutube /></a>
                    </div>
                </nav>
            </div>
            
            <div className="footer footer-center p-4 bg-base-300 text-base-content border-t border-base-content/10">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by verifyTutionBD Ltd.</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
