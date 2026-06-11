import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { tuitionSchema } from '../../../utils/validationSchemas';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const PostTuition = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(tuitionSchema),
        mode: "onChange"
    });
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        const tuitionPost = {
            title: data.title,
            subject: data.subject,
            classLevel: data.classLevel,
            location: data.location,
            budget: data.budget,
            description: data.description,
            tuitionType: data.tuitionType || 'Offline (Student Home)',
            status: 'pending',
            studentName: user?.displayName,
            studentEmail: user?.email,
            createdAt: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post('/tuitions', tuitionPost);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tuition Posted!',
                    text: 'Your tuition requirement has been submitted for admin approval.',
                    showConfirmButton: false,
                    timer: 2000
                });
                reset();
            }
        } catch (error) {
            console.error('Error posting tuition:', error);
            Swal.fire({
                icon: 'error',
                title: 'Post Failed',
                text: error.response?.data?.message || 'Something went wrong. Please try again.'
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mt-6"
        >
            <Card className="p-8">
                <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Post a Tuition Requirement
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Row 1: Title & Subject */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Tuition Title"
                            type="text"
                            placeholder="e.g., Need a Math Tutor for HSC"
                            error={errors.title?.message}
                            disabled={isSubmitting}
                            required
                            {...register("title")}
                        />

                        <Input
                            label="Subject(s)"
                            type="text"
                            placeholder="e.g., Higher Math, Physics"
                            error={errors.subject?.message}
                            disabled={isSubmitting}
                            required
                            {...register("subject")}
                        />
                    </div>

                    {/* Row 2: Class Level & Tuition Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-bold text-base-content/80 text-sm">
                                    Class Level <span className="text-error font-bold">*</span>
                                </span>
                            </label>
                            <select
                                className={`select w-full bg-base-200/50 border-base-300 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 ${errors.classLevel ? 'border-error ring-2 ring-error/10 bg-error/5' : ''}`}
                                disabled={isSubmitting}
                                defaultValue=""
                                {...register("classLevel")}
                            >
                                <option value="" disabled>Select Class Level</option>
                                <option value="Primary (1-5)">Primary (1-5)</option>
                                <option value="JSC (6-8)">Middle School (6-8)</option>
                                <option value="SSC (9-10)">SSC (9-10)</option>
                                <option value="HSC (11-12)">HSC (11-12)</option>
                                <option value="Admission">University Admission</option>
                            </select>
                            {errors.classLevel && (
                                <p className="text-error text-xs font-semibold mt-1.5 flex items-center gap-1">
                                    {errors.classLevel.message}
                                </p>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label pb-1">
                                <span className="label-text font-bold text-base-content/80 text-sm">
                                    Tuition Type <span className="text-error font-bold">*</span>
                                </span>
                            </label>
                            <select
                                className="select w-full bg-base-200/50 border-base-300 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
                                disabled={isSubmitting}
                                defaultValue="Offline (Student Home)"
                                {...register("tuitionType")}
                            >
                                <option value="Offline (Student Home)">Offline (Student's Home)</option>
                                <option value="Offline (Tutor Home)">Offline (Tutor's Home)</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Location & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Location / Area"
                            type="text"
                            placeholder="e.g., Mirpur 10, Dhaka"
                            error={errors.location?.message}
                            disabled={isSubmitting}
                            required
                            {...register("location")}
                        />

                        <Input
                            label="Budget (BDT / month)"
                            type="number"
                            placeholder="e.g., 5000"
                            error={errors.budget?.message}
                            disabled={isSubmitting}
                            required
                            {...register("budget")}
                        />
                    </div>

                    {/* Details Textarea */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                          <span className="label-text font-bold text-base-content/80 text-sm">
                            Detailed Requirements <span className="text-error font-bold">*</span>
                          </span>
                        </label>
                        <textarea
                            placeholder="Mention specific days, times, or any special requirements..."
                            className={`textarea w-full min-h-[120px] bg-base-200/50 border-base-300 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 ${errors.description ? 'border-error ring-2 ring-error/10 bg-error/5' : ''}`}
                            disabled={isSubmitting}
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-error text-xs font-semibold mt-1.5 flex items-center gap-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full text-base font-bold tracking-wider py-3"
                            isLoading={isSubmitting}
                        >
                            Post Tuition Requirement
                        </Button>
                    </div>
                </form>
            </Card>
        </motion.div>
    );
};

export default PostTuition;
