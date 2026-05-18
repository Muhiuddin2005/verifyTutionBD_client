import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import WhyChooseUs from './WhyChooseUs';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import NewBanner from '../../components/NewBanner';

const Home = () => {
    const axiosPublic = useAxiosPublic();

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
            <section className="banner-section">
                <NewBanner />
            </section>

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
