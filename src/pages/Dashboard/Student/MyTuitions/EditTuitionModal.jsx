import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tuitionSchema } from '../../../../utils/validationSchemas';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Modal from '../../../../components/ui/Modal';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';

const EditTuitionModal = ({ tuition, onClose, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(tuitionSchema),
        mode: "onChange"
    });
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (tuition) {
            reset({
                title: tuition.title,
                subject: tuition.subject,
                classLevel: tuition.classLevel,
                location: tuition.location,
                budget: tuition.budget,
                description: tuition.description
            });
        }
    }, [tuition, reset]);

    const onSubmit = async (data) => {
        try {
            const updatedTuition = {
                title: data.title,
                subject: data.subject,
                classLevel: data.classLevel,
                location: data.location,
                budget: data.budget,
                description: data.description
            };
            const res = await axiosSecure.patch(`/tuitions/${tuition._id}`, updatedTuition);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Tuition details updated successfully.', 'success');
                onSave();
                onClose();
            } else {
                Swal.fire('No Changes', 'No changes were made to the tuition.', 'info');
                onClose();
            }
        } catch (error) {
            console.error('Error updating tuition:', error);
            Swal.fire('Error!', error.response?.data?.message || 'Failed to update tuition. Please try again.', 'error');
        }
    };

    const modalFooter = (
        <>
            <Button
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                isLoading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
            >
                Save Changes
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={!!tuition}
            onClose={onClose}
            title="Edit Tuition Requirement"
            footer={modalFooter}
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Tuition Title"
                    type="text"
                    placeholder="Tuition Title"
                    error={errors.title?.message}
                    disabled={isSubmitting}
                    required
                    {...register('title')}
                />

                <Input
                    label="Subject"
                    type="text"
                    placeholder="Subject (e.g., Math, Physics)"
                    error={errors.subject?.message}
                    disabled={isSubmitting}
                    required
                    {...register('subject')}
                />

                <div className="form-control w-full">
                    <label className="label pb-1">
                        <span className="label-text font-bold text-base-content/80 text-sm">
                            Class Level <span className="text-error font-bold">*</span>
                        </span>
                    </label>
                    <select
                        className={`select w-full bg-base-200/50 border-base-300 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 ${errors.classLevel ? 'border-error ring-2 ring-error/10 bg-error/5' : ''}`}
                        disabled={isSubmitting}
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

                <Input
                    label="Location"
                    type="text"
                    placeholder="Location (e.g., Dhaka, Chittagong)"
                    error={errors.location?.message}
                    disabled={isSubmitting}
                    required
                    {...register('location')}
                />

                <Input
                    label="Budget (BDT / month)"
                    type="number"
                    placeholder="Budget (e.g., 5000)"
                    error={errors.budget?.message}
                    disabled={isSubmitting}
                    required
                    {...register('budget')}
                />

                <div className="form-control w-full">
                    <label className="label pb-1">
                      <span className="label-text font-bold text-base-content/80 text-sm">
                        Detailed Requirements <span className="text-error font-bold">*</span>
                      </span>
                    </label>
                    <textarea
                        placeholder="Provide a detailed description of the tuition requirements."
                        className={`textarea w-full min-h-[100px] bg-base-200/50 border-base-300 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 ${errors.description ? 'border-error ring-2 ring-error/10 bg-error/5' : ''}`}
                        disabled={isSubmitting}
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-error text-xs font-semibold mt-1.5 flex items-center gap-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default EditTuitionModal;