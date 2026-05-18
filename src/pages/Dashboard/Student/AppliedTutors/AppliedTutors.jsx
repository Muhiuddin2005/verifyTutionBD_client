import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';

const AppliedTutors = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedApp, setSelectedApp] = useState(null);

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['applications-for-student', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/for-student/${user?.email}`);
            return res.data;
        }
    });

    const handleAccept = async (app) => {
        try {
            const res = await axiosSecure.post('/payments/create-checkout-session', {
                applicationId: app._id,
                tuitionId: app.tuitionId,
                salary: app.tuition.budget,
                tutorEmail: app.tutorEmail,
                studentEmail: user?.email
            });
            
            if (res.data.url) {
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = res.data.url;
            }
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.error || error.message || 'Could not initiate payment';
            Swal.fire('Error', msg, 'error');
        }
    };

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-primary">Applied Tutors</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content text-sm">
                            <th>Tutor Info</th>
                            <th>Tuition Post</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={app.tutorImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{app.tutorName}</div>
                                            <div className="text-xs opacity-60">{app.tutorEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold">{app.tuition?.title}</div>
                                    <div className="text-xs opacity-70">৳ {app.tuition?.budget}</div>
                                </td>
                                <td>
                                    <span className={`status-badge status-${app.status}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button 
                                        onClick={() => { setSelectedApp(app); document.getElementById('details_modal').showModal(); }}
                                        className="btn btn-sm btn-info text-white"
                                        title="View Application Details"
                                    >
                                        <FaEye /> View
                                    </button>
                                    {app.status === 'pending' && app.tuition?.status !== 'filled' && (
                                        <button 
                                            onClick={() => handleAccept(app)} 
                                            className="btn btn-sm btn-primary text-secondary"
                                        >
                                            Accept & Pay
                                        </button>
                                    )}
                                    {app.tuition?.status === 'filled' && app.status !== 'approved' && (
                                        <span className="text-sm text-error font-medium flex items-center px-2">Post Filled</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {applications.length === 0 && <p className="text-center text-gray-500 my-8 text-lg">No tutors have applied to your posts yet.</p>}
            </div>

            <dialog id="details_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-6 text-primary border-b pb-2">Tutor Application Details</h3>
                    {selectedApp && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="avatar">
                                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={selectedApp.tutorImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="tutor" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold">{selectedApp.tutorName}</h4>
                                    <p className="text-sm text-base-content/70">{selectedApp.tutorEmail}</p>
                                </div>
                            </div>
                            
                            <div className="bg-base-200 p-4 rounded-xl">
                                <span className="block text-sm text-base-content/60 mb-1 font-semibold">Qualifications</span>
                                <span className="text-lg">{selectedApp.qualifications}</span>
                            </div>
                            
                            <div className="bg-base-200 p-4 rounded-xl">
                                <span className="block text-sm text-base-content/60 mb-1 font-semibold">Experience</span>
                                <span className="text-lg">{selectedApp.experience}</span>
                            </div>
                            
                            <div className="bg-base-200 p-4 rounded-xl border border-primary/20 bg-primary/5">
                                <span className="block text-sm text-base-content/60 mb-1 font-semibold">Expected Salary</span>
                                <span className="text-lg font-bold text-primary">৳ {selectedApp.expectedSalary}</span>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default AppliedTutors;
