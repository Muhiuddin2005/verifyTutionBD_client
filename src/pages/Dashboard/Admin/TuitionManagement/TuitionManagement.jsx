import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../../components/ui/Table';
import Button from '../../../../components/ui/Button';
import Badge from '../../../../components/ui/Badge';
import { FiSearch, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const TuitionManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { data: tuitions = [], refetch, isLoading } = useQuery({
        queryKey: ['admin-tuitions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tuitions/all-admin');
            return res.data;
        }
    });

    const handleStatusChange = (id, status) => {
        Swal.fire({
            title: `Approve or Reject?`,
            text: `Are you sure you want to mark this tuition request as ${status}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: status === 'approved' ? '#10B981' : '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: status === 'approved' ? 'Yes, Approve' : 'Yes, Reject'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/tuitions/${id}/status`, { status })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire('Success', `Tuition marked as ${status}`, 'success');
                            refetch();
                        }
                    })
                    .catch(err => {
                        Swal.fire('Error', err.response?.data?.message || 'Failed to update status', 'error');
                    });
            }
        });
    };

    // Filtering logic
    const filteredTuitions = tuitions.filter(tuition => {
        const matchesSearch = tuition.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             tuition.studentEmail?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || tuition.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination calculations
    const totalItems = filteredTuitions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedTuitions = filteredTuitions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return <Badge variant="success">Approved</Badge>;
            case 'rejected':
                return <Badge variant="danger">Rejected</Badge>;
            case 'filled':
                return <Badge variant="info">Filled</Badge>;
            default:
                return <Badge variant="warning">Pending</Badge>;
        }
    };

    if (isLoading) return (
        <div className="flex justify-center my-20">
            <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-6 font-inter">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">Tuition Management</h2>
                <p className="text-base-content/60 font-medium mt-1">Review, approve, or reject student tuition requests</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                        <FiSearch />
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search by title or student email..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="input input-bordered w-full pl-10 bg-base-100 rounded-xl"
                    />
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="select select-bordered bg-base-100 rounded-xl w-full sm:w-48"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="filled">Filled</option>
                </select>
            </div>

            {/* Tuitions Table */}
            {paginatedTuitions.length === 0 ? (
                <div className="bg-base-100 p-12 text-center rounded-2xl border border-base-200 shadow-sm">
                    <p className="text-base-content/60 font-semibold text-lg">No tuition requests found matching your query</p>
                </div>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Student Email</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedTuitions.map((tuition) => (
                                <TableRow key={tuition._id}>
                                    <TableCell className="font-bold text-base-content">{tuition.title}</TableCell>
                                    <TableCell className="font-medium text-base-content/75">{tuition.studentEmail}</TableCell>
                                    <TableCell className="font-semibold text-base-content/90">৳{tuition.budget || 0}</TableCell>
                                    <TableCell>{getStatusBadge(tuition.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleStatusChange(tuition._id, 'approved')} 
                                                disabled={tuition.status === 'approved' || tuition.status === 'filled'}
                                                className="btn btn-ghost btn-square text-success hover:bg-success/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                                title="Approve Tuition"
                                            >
                                                <FiCheckCircle size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleStatusChange(tuition._id, 'rejected')} 
                                                disabled={tuition.status === 'rejected' || tuition.status === 'filled'}
                                                className="btn btn-ghost btn-square text-error hover:bg-error/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                                title="Reject Tuition"
                                            >
                                                <FiXCircle size={18} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <span className="text-sm text-base-content/60 font-medium">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} tuitions
                            </span>
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="secondary" 
                                    className="btn-sm rounded-lg"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    Prev
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
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TuitionManagement;
