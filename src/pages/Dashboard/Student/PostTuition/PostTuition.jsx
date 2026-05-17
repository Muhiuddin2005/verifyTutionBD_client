import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const PostTuition = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const tuitionInfo = {
            ...data,
            budget: parseFloat(data.budget),
            studentEmail: user?.email,
            studentName: user?.displayName
        };

        try {
            const res = await axiosSecure.post('/tuitions', tuitionInfo);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tuition Posted Successfully!',
                    text: 'Waiting for Admin approval.',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate('/dashboard/my-tuitions');
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Post New Tuition</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Title</span></label>
                        <input type="text" {...register("title", { required: true })} className="input input-bordered focus:outline-primary" placeholder="Need a Math Tutor" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Subject</span></label>
                        <input type="text" {...register("subject", { required: true })} className="input input-bordered focus:outline-primary" placeholder="Mathematics" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Class Level</span></label>
                        <select {...register("classLevel", { required: true })} className="select select-bordered focus:outline-primary" defaultValue="">
                            <option value="" disabled>Select Class</option>
                            <option value="Primary">Primary (1-5)</option>
                            <option value="Middle">Middle (6-8)</option>
                            <option value="Secondary">Secondary (9-10)</option>
                            <option value="Higher Secondary">Higher Secondary (11-12)</option>
                            <option value="University">University</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Location / Area</span></label>
                        <input type="text" {...register("location", { required: true })} className="input input-bordered focus:outline-primary" placeholder="Dhanmondi, Dhaka" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Monthly Budget (BDT)</span></label>
                        <input type="number" {...register("budget", { required: true })} className="input input-bordered focus:outline-primary" placeholder="5000" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Days per Week</span></label>
                        <input type="number" {...register("daysPerWeek", { required: true, max: 7, min: 1 })} className="input input-bordered focus:outline-primary" placeholder="3" />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Detailed Requirements</span></label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24 focus:outline-primary" placeholder="Mention specific syllabus, timings, etc."></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full text-secondary font-bold text-lg mt-4">Post Tuition Requirement</button>
            </form>
        </div>
    );
};

export default PostTuition;
