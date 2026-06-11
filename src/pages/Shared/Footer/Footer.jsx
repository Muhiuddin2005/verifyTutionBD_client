import Logo from '../../../components/Logo/Logo';
import { Link } from 'react-router';
import { FaFacebook, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-24 border-t border-base-300">
            <div className="footer max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <aside className="space-y-4">
                    <Logo />
                    <p className="text-sm leading-relaxed text-base-content/75">
                        verifyTutionBD is a reliable platform connecting students with qualified tutors. We ensure quality education and a seamless experience for both learners and educators.
                    </p>
                </aside>
                
                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title font-extrabold text-primary opacity-100">Quick Links</h6>
                    <Link to="/tuitions" className="link link-hover text-sm text-base-content/80 hover:text-primary transition-colors">Explore Tuitions</Link>
                    <Link to="/tutors" className="link link-hover text-sm text-base-content/80 hover:text-primary transition-colors">Find Tutors</Link>
                    <Link to="/blog" className="link link-hover text-sm text-base-content/80 hover:text-primary transition-colors">Blog Insights</Link>
                    <Link to="/support" className="link link-hover text-sm text-base-content/80 hover:text-primary transition-colors">Help & Support</Link>
                    <Link to="/about" className="link link-hover text-sm text-base-content/80 hover:text-primary transition-colors">About Us</Link>
                    <Link to="/contact" className="link link-hover text-sm text-base-content/80 hover:text-primary transition-colors">Contact Us</Link>
                </nav>
                
                <nav className="flex flex-col gap-2">
                    <h6 className="footer-title font-extrabold text-primary opacity-100">Contact Info</h6>
                    <a href="tel:+8801234567890" className="flex items-center gap-2.5 text-sm text-base-content/80 hover:text-primary transition-colors">
                        <FaPhoneAlt className="text-primary"/> +880 1234-567890
                    </a>
                    <a href="mailto:support@verifytutionbd.com" className="flex items-center gap-2.5 text-sm text-base-content/80 hover:text-primary transition-colors">
                        <FaEnvelope className="text-primary"/> support@verifytutionbd.com
                    </a>
                    <span className="flex items-center gap-2.5 text-sm text-base-content/80">
                        <FaMapMarkerAlt className="text-primary"/> Dhaka, Bangladesh
                    </span>
                </nav>

                <nav className="flex flex-col gap-3">
                    <h6 className="footer-title font-extrabold text-primary opacity-100">Social Media</h6>
                    <p className="text-xs text-base-content/60 leading-relaxed">Follow us on our channels to get regular updates and announcements.</p>
                    <div className="flex items-center gap-4 mt-1">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-xl text-base-content/70 hover:text-primary transition-colors" aria-label="Follow us on Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl text-base-content/70 hover:text-primary transition-colors" aria-label="Follow us on Facebook">
                            <FaFacebook />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl text-base-content/70 hover:text-primary transition-colors" aria-label="Follow us on LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-xl text-base-content/70 hover:text-primary transition-colors" aria-label="Follow us on YouTube">
                            <FaYoutube />
                        </a>
                    </div>
                </nav>
            </div>
            
            <div className="footer footer-center p-6 bg-base-300 text-base-content/70 border-t border-base-content/5">
                <aside>
                    <p className="text-xs">Copyright © {new Date().getFullYear()} - All rights reserved by verifyTutionBD Ltd.</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
