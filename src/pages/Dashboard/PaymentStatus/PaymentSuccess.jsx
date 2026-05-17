import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payments/payment-success?sessionId=${sessionId}`)
                .then(res => {
                    if (res.data.success) {
                        setStatus('success');
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            text: 'The tutor has been hired.',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            navigate('/dashboard/payments');
                        });
                    }
                })
                .catch(() => {
                    setStatus('error');
                    Swal.fire('Error', 'Failed to confirm payment.', 'error');
                });
        }
    }, [sessionId, axiosSecure, navigate]);

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
            {status === 'processing' && <span className="loading loading-spinner text-primary loading-lg"></span>}
            {status === 'success' && <h2 className="text-3xl font-bold text-success mt-4">Payment Completed Successfully!</h2>}
            {status === 'error' && <h2 className="text-3xl font-bold text-error mt-4">Payment Verification Failed.</h2>}
        </div>
    );
};

export default PaymentSuccess;
