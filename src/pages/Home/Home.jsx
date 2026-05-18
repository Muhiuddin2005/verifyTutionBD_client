import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import WhyChooseUs from './WhyChooseUs';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const bannerImages = ["/b1.webp", "/b2.webp", "/b3.webp", "/b4.webp"];

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [currentImage, setCurrentImage] = useState(0);

    // Auto-slide effect for the new banner
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const { data: latestTuitions = [], isLoading: loadingTuitions } = useQuery({
        queryKey: ['latest-tuitions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tuitions?limit=6&sort=newest');
            return res.data.tuitions;
        }
    });

    const { data: latestTutors = [], isLoading: loadingTutors } = useQuery({
        queryKey: ['latest-tutors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/tutors');
            return res.data.slice(0, 4);
        }
    });

    if (loadingTuitions || loadingTutors) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {/* 1. New Framer Motion Sliding Banner */}
            <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[75vh] overflow-hidden bg-base-300">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImage}
                        src={bannerImages[currentImage]}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        
                        /* Change "object-fill" to "object-cover" here if you want it to crop instead of stretch! */
                        className="absolute inset-0 w-full h-full object-fill"
                        
                        alt={`Banner ${currentImage + 1}`}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-base-100/10 via-transparent to-base-100 pointer-events-none"></div>
            </div>

            {/* Note: The 4 static images section has been completely removed from here */}

            {/* 2. Why Choose Us Section */}
            <WhyChooseUs />

            {/* Latest Tuitions Section (Margin/Padding polished) */}
            <div className="bg-base-200 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-4xl font-bold text-primary mb-3">Latest Tuitions</h2>
                            <p className="text-base-content/70">Fresh opportunities waiting for talented tutors.</p>
                        </div>
                        <Link to="/tuitions" className="btn">View All</Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestTuitions?.map(tuition => (
                            <div key={tuition._id} className="card bg-base-100 shadow-lg border border-base-200">
                                <div className="card-body">
                                    <div className="badge badge-secondary mb-2">{tuition.classLevel}</div>
                                    <h2 className="card-title text-xl text-primary">{tuition.title}</h2>
                                    <p className="text-base-content/80 text-sm mt-2">{tuition.description?.substring(0, 80)}...</p>
                                    
                                    <div className="mt-4 space-y-2 text-sm font-medium">
                                        <div className="flex items-center gap-2"><span>📚 Subject:</span> {tuition.subject}</div>
                                        <div className="flex items-center gap-2"><span>📍 Location:</span> {tuition.location}</div>
                                        <div className="flex items-center gap-2"><span>💰 Budget:</span> ৳ {tuition.budget}/mo</div>
                                    </div>

                                    <div className="card-actions justify-end mt-6">
                                        <Link to={`/tuitions/${tuition._id}`} className="btn btn-primary w-full">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Tutors Section (Margin/Padding polished) */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-bold text-primary mb-3">Featured Tutors</h2>
                        <p className="text-base-content/70">Meet some of our top verified educators.</p>
                    </div>
                    <Link to="/tutors" className="btn ">View All Tutors</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {latestTutors.map(tutor => (
                        <div key={tutor._id} className="card bg-base-100 shadow-xl border border-base-200 text-center">
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={tutor.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={tutor.name} />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center">
                                <h2 className="card-title text-primary">{tutor.name}</h2>
                                <p className="text-sm text-base-content/60">{tutor.email}</p>
                                <div className="badge badge-outline badge-secondary mt-2 flex items-center gap-1">
                                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                                    </svg>
                                    <span>Verified Tutor</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
