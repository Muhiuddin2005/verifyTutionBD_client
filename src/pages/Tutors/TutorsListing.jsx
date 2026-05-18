import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const TutorsListing = () => {
    const axiosPublic = useAxiosPublic();

    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ['public-tutors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/tutors');
            return res.data;
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-primary">Meet Our Tutors</h1>
            
            {isLoading ? (
                <div className="flex justify-center py-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tutors.map(tutor => (
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
                    {tutors.length === 0 && <p className="col-span-full text-center text-xl text-base-content/60 my-12">No tutors are currently registered.</p>}
                </div>
            )}
        </div>
    );
};

export default TutorsListing;
