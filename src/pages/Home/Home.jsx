import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarCheck } from 'react-icons/fa';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const { data: latestTuitions = [] } = useQuery({
        queryKey: ['latest-tuitions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tuitions?limit=6&sort=newest');
            return res.data.tuitions;
        }
    });

    const { data: latestTutors = [] } = useQuery({
        queryKey: ['latest-tutors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/tutors');
            return res.data.slice(0, 4);
        }
    });

    return (
        <div>
            <div className="hero min-h-[70vh] bg-base-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0"></div>
                <div className="hero-content text-center z-10">
                    <div className="max-w-2xl">
                        <motion.h1 
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-5 text-6xl font-bold text-primary drop-shadow-sm"
                        >
                            Elevate Your Learning
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="mb-8 text-xl text-base-content/80"
                        >
                            Connect with verified tutors in your area, or post a tuition request to find the perfect match for your educational needs.
                        </motion.p>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <Link to="/tuitions" className="btn btn-primary text-secondary btn-lg mr-4 shadow-lg shadow-primary/30">Find Tuitions</Link>
                            <Link to="/tutors" className="btn btn-outline btn-primary btn-lg">Browse Tutors</Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
                    <p className="text-base-content/70">Three simple steps to start your learning journey</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card bg-base-100 shadow-xl border border-base-200 text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body items-center">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <FaChalkboardTeacher className="text-4xl text-primary" />
                            </div>
                            <h3 className="card-title text-xl">1. Post a Requirement</h3>
                            <p className="text-base-content/70">Create a detailed tuition post with your subject, budget, and location.</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-200 text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body items-center">
                            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                                <FaUserGraduate className="text-4xl text-secondary" />
                            </div>
                            <h3 className="card-title text-xl">2. Tutors Apply</h3>
                            <p className="text-base-content/70">Verified and qualified tutors will apply to your post directly.</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-200 text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body items-center">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                                <FaCalendarCheck className="text-4xl text-accent" />
                            </div>
                            <h3 className="card-title text-xl">3. Accept & Learn</h3>
                            <p className="text-base-content/70">Review their profiles, accept the best match, and start learning.</p>
                        </div>
                    </div>
                </div>
            </div>

            <WhyChooseUs />

            <div className="bg-base-200 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-primary mb-4">Latest Tuitions</h2>
                            <p className="text-base-content/70">Fresh opportunities waiting for talented tutors.</p>
                        </div>
                        <Link to="/tuitions" className="btn btn-outline btn-primary">View All</Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/tuitions/${tuition._id}`} className="btn btn-primary text-secondary w-full">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-primary mb-4">Featured Tutors</h2>
                        <p className="text-base-content/70">Meet some of our top verified educators.</p>
                    </div>
                    <Link to="/tutors" className="btn btn-outline btn-primary">View All Tutors</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                <div className="badge badge-outline badge-secondary mt-2">Verified Tutor</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
