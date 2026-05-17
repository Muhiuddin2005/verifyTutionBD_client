import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const OngoingTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['my-ongoing-tuitions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/my-applications/${user?.email}`);
            return res.data;
        }
    });

    const ongoing = applications.filter(app => app.status === 'approved');

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-primary">Ongoing Tuitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoing.map(app => (
                    <div key={app._id} className="card bg-base-200 shadow-lg border border-primary/20">
                        <div className="card-body">
                            <h2 className="card-title text-primary">{app.tuition?.title}</h2>
                            <p className="text-sm text-base-content/80 mt-2">{app.tuition?.description?.substring(0, 100)}...</p>
                            
                            <div className="mt-4 space-y-2 text-sm font-medium border-t border-base-300 pt-4">
                                <div className="flex items-center gap-2"><span>👤 Student:</span> {app.tuition?.studentName}</div>
                                <div className="flex items-center gap-2"><span>📍 Location:</span> {app.tuition?.location}</div>
                                <div className="flex items-center gap-2"><span>💰 Salary:</span> ৳ {app.tuition?.budget}/mo</div>
                                <div className="flex items-center gap-2"><span>📅 Days:</span> {app.tuition?.daysPerWeek}/week</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {ongoing.length === 0 && <p className="text-center text-gray-500 my-8 text-lg">You don't have any ongoing tuitions right now.</p>}
        </div>
    );
};

export default OngoingTuitions;
