import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../../components/ui/Table';
import Modal from '../../../../components/ui/Modal';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import { FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useAuth();
    
    // States for filtering, search, sorting and pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const itemsPerPage = 6;

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/all');
            return res.data;
        }
    });

    const totalAdmins = users.filter(u => u.role === 'admin').length;

    const handleRoleChange = (id, newRole) => {
        Swal.fire({
            title: "Change Role?",
            text: `Are you sure you want to change this user's role to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}/role`, { role: newRole })
                    .then(() => {
                        Swal.fire('Updated', `User is now a ${newRole}`, 'success');
                        refetch();
                    })
                    .catch(err => {
                        Swal.fire('Error', err.response?.data?.message || 'Failed to update role', 'error');
                        refetch();
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
                setIsEditModalOpen(false);
                Swal.fire('Updated!', 'User info updated successfully.', 'success');
                refetch();
            }
        } catch {
            Swal.fire('Error', 'Failed to update user.', 'error');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the user. This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#3B82F6",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "User has been removed.", "success");
                            refetch();
                        }
                    });
            }
        });
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    // Filter and Sort Data
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        const valA = a[sortField]?.toLowerCase() || '';
        const valB = b[sortField]?.toLowerCase() || '';
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination calculations
    const totalItems = sortedUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    if (isLoading) return (
        <div className="flex justify-center my-20">
            <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-6 font-inter">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">User Management</h2>
                <p className="text-base-content/60 font-medium mt-1">Manage system accounts, update roles, and modify details</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                        <FiSearch />
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="input input-bordered w-full pl-10 bg-base-100 rounded-xl"
                    />
                </div>
                <select 
                    value={roleFilter}
                    onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                    className="select select-bordered bg-base-100 rounded-xl w-full sm:w-48"
                >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* Users Table */}
            {paginatedUsers.length === 0 ? (
                <div className="bg-base-100 p-12 text-center rounded-2xl border border-base-200 shadow-sm">
                    <p className="text-base-content/60 font-semibold text-lg">No users found matching your search</p>
                </div>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="cursor-pointer select-none" onClick={() => handleSort('name')}>
                                    User {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </TableHead>
                                <TableHead className="cursor-pointer select-none" onClick={() => handleSort('email')}>
                                    Email {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedUsers.map(u => {
                                const isOnlyAdmin = u.role === 'admin' && totalAdmins <= 1;
                                const isSelf = u.email === currentUser?.email;

                                return (
                                    <TableRow key={u._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-11 h-11 border border-base-200">
                                                        <img src={u.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-base-content">{u.name}</div>
                                                    <div className="text-xs text-base-content/50 font-medium">Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-base-content/80">{u.email}</TableCell>
                                        <TableCell>
                                            <select
                                                className="select select-sm select-bordered w-full max-w-xs focus:outline-primary bg-base-100 rounded-xl font-medium"
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                disabled={isOnlyAdmin && isSelf}
                                                title={(isOnlyAdmin && isSelf) ? "You cannot demote yourself as the only Admin" : "Change User Role"}
                                            >
                                                <option value="student">Student</option>
                                                <option value="tutor">Tutor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedUser(u); setIsEditModalOpen(true); }}
                                                    className="btn btn-ghost btn-square text-info hover:bg-info/10 rounded-xl"
                                                    title="Edit User"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(u._id)} 
                                                    disabled={isOnlyAdmin || isSelf}
                                                    title={isSelf ? "You cannot delete yourself" : isOnlyAdmin ? "Cannot delete the last admin" : "Delete User"}
                                                    className="btn btn-ghost btn-square text-error hover:bg-error/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    {/* Pagination component */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <span className="text-sm text-base-content/60 font-medium">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} users
                            </span>
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="secondary" 
                                    className="btn-sm rounded-lg"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    <FiChevronLeft className="mr-1" /> Prev
                                </Button>
                                <div className="join">
                                    {[...Array(totalPages).keys()].map((page) => (
                                        <button 
                                            key={page + 1}
                                            onClick={() => setCurrentPage(page + 1)}
                                            className={`btn btn-sm join-item border-base-300 ${currentPage === page + 1 ? 'btn-primary text-white font-bold' : 'bg-base-100 text-base-content'}`}
                                        >
                                            {page + 1}
                                        </button>
                                    ))}
                                </div>
                                <Button 
                                    variant="secondary" 
                                    className="btn-sm rounded-lg"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next <FiChevronRight className="ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Reusable Modal for editing user info */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit User Details"
            >
                {selectedUser && (
                    <form onSubmit={handleInfoUpdate} className="space-y-4">
                        <Input 
                            id="user-name"
                            label="Full Name"
                            name="name"
                            defaultValue={selectedUser.name}
                            required
                        />
                        <Input 
                            id="user-phone"
                            label="Phone Number"
                            name="phone"
                            defaultValue={selectedUser.phone || ''}
                            placeholder="e.g. 01700000000"
                        />
                        <div className="flex justify-end gap-3 pt-4 border-t border-base-200 mt-6">
                            <Button 
                                type="button" 
                                variant="secondary" 
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant="primary"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default UserManagement;
