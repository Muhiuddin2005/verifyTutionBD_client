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
        <div className="card max-w-3xl mx-auto bg-base-100 w-full shrink-0 shadow-2xl rounded-3xl border border-base-200/60 p-4 md:p-8">
            <div className="card-body p-0">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Post New Tuition</h3>
                    <p className='text-base-content/60 font-medium'>Find the perfect tutor for your needs</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Title</span></label>
                            <input type="text" {...register("title", { required: true })} className="input w-full" placeholder="Need a Math Tutor" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Subject</span></label>
                            <input type="text" {...register("subject", { required: true })} className="input w-full" placeholder="Mathematics" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Class Level</span></label>
                            <select {...register("classLevel", { required: true })} className="select w-full" defaultValue="">
                                <option value="" disabled>Select Class</option>
                                <option value="Primary">Primary (1-5)</option>
                                <option value="Middle">Middle (6-8)</option>
                                <option value="Secondary">Secondary (9-10)</option>
                                <option value="Higher Secondary">Higher Secondary (11-12)</option>
                                <option value="University">University</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Location / Area</span></label>
                            <input type="text" {...register("location", { required: true })} className="input w-full" placeholder="Dhanmondi, Dhaka" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Monthly Budget (BDT)</span></label>
                            <input type="number" {...register("budget", { required: true })} className="input w-full" placeholder="5000" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Days per Week</span></label>
                            <input type="number" {...register("daysPerWeek", { required: true, max: 7, min: 1 })} className="input w-full" placeholder="3" />
                        </div>
                    </div>
                    <div className="form-control mt-2">
                        <label className="label"><span className="label-text">Detailed Requirements</span></label>
                        <textarea {...register("description", { required: true })} className="textarea w-full h-32" placeholder="Mention specific syllabus, timings, etc."></textarea>
                    </div>
                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 border-none">
                            Post Tuition Requirement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostTuition;
