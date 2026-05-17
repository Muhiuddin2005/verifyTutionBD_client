import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const EditTuitionModal = ({ tuition, onClose, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (tuition) {
            reset(tuition);
        }
    }, [tuition, reset]);

    const onSubmit = async (data) => {
        try {
            const updatedTuition = { ...data, budget: parseFloat(data.budget) };
            const res = await axiosSecure.patch(`/tuitions/${tuition._id}`, updatedTuition);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Tuition details updated successfully.', 'success');
                onSave();
                onClose();
            } else {
                Swal.fire('No Changes', 'No changes were made to the tuition.', 'info');
            }
        } catch (error) {
            console.error('Error updating tuition:', error);
            Swal.fire('Error!', 'Failed to update tuition. Please try again.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-lg mx-4">
                <h2 className="text-2xl font-bold mb-6 text-primary">Edit Tuition</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Title</span></label>
                        <input
                            type="text"
                            placeholder="Tuition Title"
                            className="input input-bordered w-full"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Subject</span></label>
                        <input
                            type="text"
                            placeholder="Subject (e.g., Math, Physics)"
                            className="input input-bordered w-full"
                            {...register('subject', { required: 'Subject is required' })}
                        />
                        {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Class Level</span></label>
                        <input
                            type="text"
                            placeholder="Class Level (e.g., 9-10, A-Level)"
                            className="input input-bordered w-full"
                            {...register('classLevel', { required: 'Class Level is required' })}
                        />
                        {errors.classLevel && <span className="text-red-500 text-sm">{errors.classLevel.message}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Location</span></label>
                        <input
                            type="text"
                            placeholder="Location (e.g., Dhaka, Chittagong)"
                            className="input input-bordered w-full"
                            {...register('location', { required: 'Location is required' })}
                        />
                        {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label"><span className="label-text">Budget (BDT)</span></label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Budget (e.g., 5000)"
                            className="input input-bordered w-full"
                            {...register('budget', { required: 'Budget is required', min: { value: 0, message: 'Budget must be positive' } })}
                        />
                        {errors.budget && <span className="text-red-500 text-sm">{errors.budget.message}</span>}
                    </div>

                    <div className="form-control mb-6">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea
                            placeholder="Provide a detailed description of the tuition requirements."
                            className="textarea textarea-bordered h-24 w-full"
                            {...register('description', { required: 'Description is required' })}
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary text-white">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTuitionModal;