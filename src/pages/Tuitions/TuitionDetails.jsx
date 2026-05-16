import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TuitionDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [role] = useRole();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: tuition = {}, isLoading } = useQuery({
        queryKey: ['tuition', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tuitions/${id}`);
            return res.data;
        }
    });

    const { data: applications = [], refetch: refetchApps } = useQuery({
        queryKey: ['tuition-apps', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/my-tuition-apps/${id}`);
            return res.data;
        },
        enabled: !!user
    });

    const hasApplied = applications.some(app => app.tutorEmail === user?.email);

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const applicationData = {
            tuitionId: tuition._id,
            tutorEmail: user?.email,
            tutorName: user?.displayName,
            tutorImage: user?.photoURL,
            qualifications: form.qualifications.value,
            experience: form.experience.value,
            expectedSalary: form.expectedSalary.value
        };

        try {
            const res = await axiosSecure.post('/applications', applicationData);
            if (res.data.insertedId) {
                document.getElementById('apply_modal').close();
                Swal.fire('Success!', 'Your application has been submitted.', 'success');
                refetchApps();
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to apply', 'error');
        }
    };

    if (isLoading) return <div className="flex justify-center py-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-base-100 shadow-2xl rounded-2xl border border-base-200 overflow-hidden">
                <div className="bg-primary/10 p-8 border-b border-base-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="badge badge-secondary mb-4">{tuition.classLevel}</div>
                            <h1 className="text-4xl font-bold text-primary mb-2">{tuition.title}</h1>
                            <p className="text-lg text-base-content/70">Posted by: {tuition.studentName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-secondary">৳ {tuition.budget}</p>
                            <p className="text-sm text-base-content/60 mt-1">per month</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 border-b pb-2">Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-base-200 p-4 rounded-xl">
                            <span className="block text-sm text-base-content/60 mb-1">Subject</span>
                            <span className="font-semibold text-lg">{tuition.subject}</span>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl">
                            <span className="block text-sm text-base-content/60 mb-1">Location</span>
                            <span className="font-semibold text-lg">{tuition.location}</span>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl">
                            <span className="block text-sm text-base-content/60 mb-1">Days Per Week</span>
                            <span className="font-semibold text-lg">{tuition.daysPerWeek} Days</span>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl">
                            <span className="block text-sm text-base-content/60 mb-1">Status</span>
                            <span className={`badge ${tuition.status === 'approved' ? 'badge-success' : 'badge-warning'} font-semibold`}>{tuition.status}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 border-b pb-2">Description</h3>
                    <p className="text-base-content/80 whitespace-pre-wrap leading-relaxed mb-8">
                        {tuition.description}
                    </p>

                    {role === 'tutor' && tuition.status === 'approved' && (
                        <div className="flex justify-end">
                            <button 
                                onClick={() => document.getElementById('apply_modal').showModal()} 
                                disabled={hasApplied}
                                className="btn btn-primary text-secondary btn-lg px-12 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {hasApplied ? 'Applied' : 'Apply Now'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <dialog id="apply_modal" className="modal">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-2xl text-primary mb-4">Apply for Tuition</h3>
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Name</span></label>
                                <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered bg-base-200" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Email</span></label>
                                <input type="email" value={user?.email || ''} readOnly className="input input-bordered bg-base-200" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Qualifications</span></label>
                            <input type="text" name="qualifications" placeholder="e.g., BSc in CSE" className="input input-bordered focus:outline-primary" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Experience</span></label>
                            <input type="text" name="experience" placeholder="e.g., 3 Years" className="input input-bordered focus:outline-primary" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Expected Salary (BDT)</span></label>
                            <input type="number" name="expectedSalary" defaultValue={tuition.budget} className="input input-bordered focus:outline-primary" required />
                        </div>
                        
                        <div className="modal-action">
                            <button type="button" onClick={() => document.getElementById('apply_modal').close()} className="btn">Cancel</button>
                            <button type="submit" className="btn btn-primary text-secondary">Submit Application</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TuitionDetails;
