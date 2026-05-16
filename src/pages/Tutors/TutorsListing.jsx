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
                                <div className="badge badge-outline badge-secondary mt-2">Verified Tutor</div>
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
