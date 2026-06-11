import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TutorCard from '../../components/TutorCard';

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    Array(8).fill(0).map((_, i) => <TutorCard key={i} isLoading={true} />)
                ) : (
                    tutors.map(tutor => (
                        <TutorCard key={tutor._id} tutor={tutor} />
                    ))
                )}
                
                {!isLoading && tutors.length === 0 && (
                    <p className="col-span-full text-center text-xl text-base-content/60 my-12">No tutors are currently registered.</p>
                )}
            </div>
        </div>
    );
};

export default TutorsListing;
