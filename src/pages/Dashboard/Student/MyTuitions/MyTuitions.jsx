import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditTuitionModal from './EditTuitionModal';

const MyTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTuition, setSelectedTuition] = useState(null);

    const handleEdit = (tuition) => {
        setSelectedTuition(tuition);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedTuition(null);
    };

    const { data: tuitions = [], refetch, isLoading } = useQuery({
        queryKey: ['my-tuitions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/my-tuitions/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tuitions/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your post has been deleted.", "success");
                            refetch();
                        }
                    });
            }
        });
    };

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-primary">My Tuitions</h2>
            
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content text-sm">
                            <th>Title</th>
                            <th>Subject</th>
                            <th>Budget</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.map(tuition => (
                            <tr key={tuition._id}>
                                <td className="font-medium">{tuition.title}</td>
                                <td>{tuition.subject}</td>
                                <td>৳ {tuition.budget}</td>
                                <td>
                                    <span className={`badge ${tuition.status === 'approved' ? 'badge-success' : tuition.status === 'rejected' ? 'badge-error' : 'badge-warning'} badge-outline font-semibold`}>
                                        {tuition.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleEdit(tuition)} className="btn btn-sm btn-info text-white"><FaEdit /></button>
                                    <button onClick={() => handleDelete(tuition._id)} className="btn btn-sm btn-error text-white"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {tuitions.length === 0 && <p className="text-center text-gray-500 my-8 text-lg">You haven't posted any tuitions yet.</p>}
            </div>
            {isEditModalOpen && (
                <EditTuitionModal 
                    tuition={selectedTuition} 
                    onClose={handleCloseModal} 
                    onSave={refetch} 
                />
            )}
        </div>
    );
};

export default MyTuitions;
