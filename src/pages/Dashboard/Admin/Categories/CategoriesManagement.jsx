import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../../components/ui/Table';
import Modal from '../../../../components/ui/Modal';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Swal from 'sweetalert2';
import { FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const CategoriesManagement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch categories
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data;
        }
    });

    // Add category mutation
    const addMutation = useMutation({
        mutationFn: async (newCat) => {
            const res = await axiosSecure.post('/categories', newCat);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            Swal.fire({
                icon: 'success',
                title: 'Category Added',
                text: 'The new category has been successfully added.',
                showConfirmButton: false,
                timer: 1500
            });
            setIsAddModalOpen(false);
            reset();
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to add',
                text: err.response?.data?.message || err.message
            });
        }
    });

    // Delete category mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/categories/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            Swal.fire({
                icon: 'success',
                title: 'Category Deleted',
                text: 'The category has been deleted successfully.',
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete',
                text: err.response?.data?.message || err.message
            });
        }
    });

    const handleAddCategory = (data) => {
        addMutation.mutate(data);
    };

    const handleDeleteCategory = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This category will be permanently removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3B82F6',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 font-inter">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-primary tracking-tight">Category Management</h2>
                    <p className="text-base-content/60 font-medium mt-1">Add, update, or remove subjects and class level options</p>
                </div>
                <Button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn btn-primary rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                    <FiPlus /> Add Category
                </Button>
            </div>

            {/* Filter and Search controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                        <FiSearch />
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered w-full pl-10 bg-base-100 rounded-xl"
                    />
                </div>
            </div>

            {/* Reusable Table component */}
            {isLoading ? (
                <div className="flex justify-center my-20">
                    <span className="loading loading-spinner text-primary loading-lg"></span>
                </div>
            ) : filteredCategories.length === 0 ? (
                <div className="bg-base-100 p-12 text-center rounded-2xl border border-base-200">
                    <p className="text-base-content/60 font-semibold text-lg">No categories found matching your query</p>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCategories.map((cat) => (
                            <TableRow key={cat._id}>
                                <TableCell className="font-bold text-base-content">{cat.name}</TableCell>
                                <TableCell>
                                    <span className={`badge ${cat.type === 'Subject' ? 'badge-primary' : 'badge-secondary'} badge-sm font-semibold rounded-lg`}>
                                        {cat.type}
                                    </span>
                                </TableCell>
                                <TableCell className="text-base-content/70">{cat.description || 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <button 
                                        onClick={() => handleDeleteCategory(cat._id)}
                                        className="btn btn-ghost btn-square text-error hover:bg-error/10 rounded-xl"
                                        title="Delete Category"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Add Category Modal */}
            <Modal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Category"
            >
                <form onSubmit={handleSubmit(handleAddCategory)} className="space-y-4">
                    <Input 
                        id="cat-name"
                        label="Category Name"
                        placeholder="e.g. Science, Mathematics, Class 10"
                        {...register("name", { required: "Name is required" })}
                        error={errors.name?.message}
                    />

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Category Type</span>
                        </label>
                        <select 
                            {...register("type", { required: "Type is required" })}
                            className="select select-bordered w-full rounded-xl bg-base-100"
                            defaultValue="Subject"
                        >
                            <option value="Subject">Subject</option>
                            <option value="Class Level">Class Level</option>
                        </select>
                        {errors.type && <p className="text-error text-xs mt-1">{errors.type.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">Description (Optional)</span>
                        </label>
                        <textarea 
                            placeholder="Add brief details..."
                            {...register("description")}
                            className="textarea textarea-bordered w-full h-24 rounded-xl bg-base-100"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                        <Button 
                            type="button" 
                            variant="secondary"
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            variant="primary"
                            loading={addMutation.isPending}
                        >
                            Save Category
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CategoriesManagement;
