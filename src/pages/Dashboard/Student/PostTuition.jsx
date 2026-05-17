import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth'; 

const PostTuition = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 

    const onSubmit = async (data) => {
        // Construct the tuition post object
        const tuitionPost = {
            ...data,
            budget: parseFloat(data.budget),
            status: 'pending', // Requires admin approval
            studentName: user?.displayName,
            studentEmail: user?.email,
            createdAt: new Date().toISOString()
        };

        console.log('Tuition Post Data:', tuitionPost);

        // TODO: Send to backend
        try {
            const res = await axiosSecure.post('/tuitions', tuitionPost);
            if(res.data.insertedId){
                alert('Tuition posted successfully! Waiting for admin approval.');
                reset();
            }
        } catch (error) {
            console.error('Error posting tuition:', error);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-6 bg-base-100 rounded-2xl shadow-xl mt-8 border border-base-200"
        >
            <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Post a Tuition Requirement
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Row 1: Title & Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Tuition Title</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g., Need a Math Tutor for HSC" 
                            className="input input-bordered input-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <span className="text-error text-sm mt-2 flex items-center gap-1 font-medium">⚠ {errors.title.message}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Subject(s)</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g., Higher Math, Physics" 
                            className="input input-bordered input-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            {...register("subjects", { required: "Subject is required" })}
                        />
                        {errors.subjects && <span className="text-error text-sm mt-2 flex items-center gap-1 font-medium">⚠ {errors.subjects.message}</span>}
                    </div>
                </div>

                {/* Row 2: Class Level & Tuition Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Class Level</span>
                        </label>
                        <select 
                            className="select select-bordered select-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            {...register("classLevel", { required: "Please select a class level" })}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Class Level</option>
                            <option value="Primary (1-5)">Primary (1-5)</option>
                            <option value="JSC (6-8)">Middle School (6-8)</option>
                            <option value="SSC (9-10)">SSC (9-10)</option>
                            <option value="HSC (11-12)">HSC (11-12)</option>
                            <option value="Admission">University Admission</option>
                        </select>
                        {errors.classLevel && <span className="text-error text-sm mt-2 flex items-center gap-1 font-medium">⚠ {errors.classLevel.message}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Tuition Type</span>
                        </label>
                        <select 
                            className="select select-bordered select-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            {...register("tuitionType", { required: "Please select a type" })}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Type</option>
                            <option value="Offline (Student Home)">Offline (Student's Home)</option>
                            <option value="Offline (Tutor Home)">Offline (Tutor's Home)</option>
                            <option value="Online">Online</option>
                        </select>
                        {errors.tuitionType && <span className="text-error text-sm mt-2 flex items-center gap-1 font-medium">⚠ {errors.tuitionType.message}</span>}
                    </div>
                </div>

                {/* Row 3: Location & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Location / Area</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g., Mirpur 10, Dhaka" 
                            className="input input-bordered input-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            {...register("location", { required: "Location is required" })}
                        />
                        {errors.location && <span className="text-error text-sm mt-2 flex items-center gap-1 font-medium">⚠ {errors.location.message}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg">Budget (BDT / month)</span>
                        </label>
                        <input 
                            type="number" 
                            placeholder="e.g., 5000" 
                            className="input input-bordered input-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            {...register("budget", { required: "Budget is required", min: { value: 500, message: "Minimum budget is 500" } })}
                        />
                        {errors.budget && <span className="text-error text-sm mt-2 flex items-center gap-1 font-medium">⚠ {errors.budget.message}</span>}
                    </div>
                </div>

                {/* Details Textarea */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-bold text-lg">Detailed Requirements</span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered textarea-primary h-32 focus:ring-2 focus:ring-primary/20 transition-all duration-300" 
                        placeholder="Mention specific days, times, or any special requirements..."
                        {...register("details", { required: "Please provide some details" })}
                    ></textarea>
                    {errors.details && <span className="text-error text-sm mt-2 flex items-center gap-1 font-medium">⚠ {errors.details.message}</span>}
                </div>

                <div className="form-control mt-10">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-full text-white font-bold tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/30"
                    >
                        Post Tuition Requirement
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default PostTuition;
