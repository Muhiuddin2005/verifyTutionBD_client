import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useRole from '../../../../hooks/useRole';

const PaymentsHistory = () => {
    const { user } = useAuth();
    const [role] = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments-history', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/history/${user?.email}`);
            return res.data;
        },
        onError: (err) => {
            const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to load payments';
            // eslint-disable-next-line no-console
            console.error('Payments fetch error:', message);
        }
    });

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;
    if (error) return <div className="text-center text-error my-8">Failed to load transactions.</div>;

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-6 text-primary">{role === 'tutor' ? 'Revenue History' : 'Payment History'}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content text-sm">
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>{role === 'tutor' ? 'Student' : 'Tutor'}</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td className="font-mono text-xs opacity-70">{payment.transactionId}</td>
                                <td className="font-medium">{role === 'tutor' ? payment.studentEmail : payment.tutorEmail}</td>
                                <td className="font-bold text-secondary">৳ {payment.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {payments.length === 0 && <p className="text-center text-gray-500 my-8 text-lg">No transactions found.</p>}
            </div>
        </div>
    );
};

export default PaymentsHistory;
