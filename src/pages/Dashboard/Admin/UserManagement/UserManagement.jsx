import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/all');
            return res.data;
        }
    });

    const handleRoleChange = (id, newRole) => {
        Swal.fire({
            title: "Change Role?",
            text: `Are you sure you want to make this user a ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}/role`, { role: newRole })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire('Updated', `User is now a ${newRole}`, 'success');
                            refetch();
                        }
                    });
            } else {
                refetch();
            }
        });
    };

    const handleInfoUpdate = async (e) => {
        e.preventDefault();
        const updatedData = {
            name: e.target.name.value,
            phone: e.target.phone.value
        };
        try {
            const res = await axiosSecure.patch(`/users/${selectedUser._id}/info`, updatedData);
            if (res.data.modifiedCount > 0) {
                document.getElementById('edit_user_modal').close();
                Swal.fire('Updated!', 'User info updated.', 'success');
                refetch();
            }
        } catch {
            Swal.fire('Error', 'Failed to update user.', 'error');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the user.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "User removed.", "success");
                            refetch();
                        }
                    });
            }
        });
    };

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-primary">User Management</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content text-sm">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div className="font-bold">{user.name}</div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        className="select select-sm select-bordered w-full max-w-xs focus:outline-primary"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        <option value="student">Student</option>
                                        <option value="tutor">Tutor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => { setSelectedUser(user); document.getElementById('edit_user_modal').showModal(); }}
                                        className="btn btn-sm btn-info text-white"
                                    >Edit</button>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-error text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="edit_user_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-4">Edit User Details</h3>
                    {selectedUser && (
                        <form onSubmit={handleInfoUpdate} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-medium">Full Name</label>
                                <input type="text" name="name" defaultValue={selectedUser.name} className="input input-bordered focus:outline-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium">Phone Number</label>
                                <input type="text" name="phone" defaultValue={selectedUser.phone || ''} className="input input-bordered focus:outline-primary" />
                            </div>
                            <div className="modal-action">
                                <button type="button" onClick={() => document.getElementById('edit_user_modal').close()} className="btn">Cancel</button>
                                <button type="submit" className="btn btn-primary text-secondary">Save Changes</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default UserManagement;
