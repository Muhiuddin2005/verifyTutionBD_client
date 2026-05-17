import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const TuitionManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tuitions = [], refetch, isLoading } = useQuery({
        queryKey: ['admin-tuitions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tuitions/all-admin');
            return res.data;
        }
    });

    const handleStatusChange = (id, status) => {
        axiosSecure.patch(`/tuitions/${id}/status`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Success', `Tuition marked as ${status}`, 'success');
                    refetch();
                }
            });
    };

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-primary">Tuition Management</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content text-sm">
                            <th>Title</th>
                            <th>Student Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.map(tuition => (
                            <tr key={tuition._id}>
                                <td className="font-medium">{tuition.title}</td>
                                <td>{tuition.studentEmail}</td>
                                <td>
                                    <span className={`badge ${tuition.status === 'approved' ? 'badge-success' : tuition.status === 'rejected' ? 'badge-error' : 'badge-warning'} badge-outline font-semibold`}>
                                        {tuition.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button 
                                        onClick={() => handleStatusChange(tuition._id, 'approved')} 
                                        disabled={tuition.status === 'approved'}
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleStatusChange(tuition._id, 'rejected')} 
                                        disabled={tuition.status === 'rejected'}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TuitionManagement;
