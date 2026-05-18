import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedApp, setSelectedApp] = useState(null);

    const { data: applications = [], refetch, isLoading } = useQuery({
        queryKey: ['my-applications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/my-applications/${user?.email}`);
            return res.data;
        }
    });

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            expectedSalary: e.target.salary.value,
            experience: e.target.experience.value
        };
        try {
            const res = await axiosSecure.patch(`/applications/${selectedApp._id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                document.getElementById('edit_modal').close();
                Swal.fire('Updated!', 'Your application has been updated.', 'success');
                refetch();
            }
        } catch {
            Swal.fire('Error', 'Failed to update.', 'error');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Withdraw Application?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, withdraw!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/applications/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Withdrawn!", "Your application has been removed.", "success");
                            refetch();
                        }
                    });
            }
        });
    };

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-primary">My Applications</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content text-sm">
                            <th>Tuition Title</th>
                            <th>Student Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id}>
                                <td className="font-medium">{app.tuition?.title}</td>
                                <td>{app.tuition?.studentName}</td>
                                <td>
                                    <span className={`status-badge status-${app.status}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td>
                                    {app.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { setSelectedApp(app); document.getElementById('edit_modal').showModal(); }}
                                                className="btn btn-sm btn-info text-white"
                                            >Edit</button>
                                            <button onClick={() => handleDelete(app._id)} className="btn btn-sm btn-error text-white">Withdraw</button>
                                        </div>
                                    ) : (
                                        <span className="text-sm opacity-60">Locked</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {applications.length === 0 && <p className="text-center text-gray-500 my-8 text-lg">You haven't applied to any tuitions yet.</p>}
            </div>

            <dialog id="edit_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-4">Update Application</h3>
                    {selectedApp && (
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-medium">Expected Salary</label>
                                <input type="number" name="salary" defaultValue={selectedApp.expectedSalary} className="input input-bordered focus:outline-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium">Experience</label>
                                <input type="text" name="experience" defaultValue={selectedApp.experience} className="input input-bordered focus:outline-primary" required />
                            </div>
                            <div className="modal-action">
                                <button type="button" onClick={() => document.getElementById('edit_modal').close()} className="btn">Cancel</button>
                                <button type="submit" className="btn btn-primary text-secondary">Save Changes</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyApplications;
