import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Analytics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        }
    });

    if (isLoading) return <div className="flex justify-center my-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

    const chartData = [
        { name: 'Users', total: stats.users || 0 },
        { name: 'Tuitions', total: stats.tuitions || 0 }
    ];

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-8 text-primary">Platform Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="stat bg-primary/10 rounded-2xl border border-primary/20">
                    <div className="stat-title text-primary font-bold">Total Users</div>
                    <div className="stat-value text-primary">{stats.users}</div>
                </div>
                <div className="stat bg-secondary/10 rounded-2xl border border-secondary/20">
                    <div className="stat-title text-secondary font-bold">Total Tuitions</div>
                    <div className="stat-value text-secondary">{stats.tuitions}</div>
                </div>
                <div className="stat bg-accent/10 rounded-2xl border border-accent/20">
                    <div className="stat-title text-accent font-bold">Total Revenue</div>
                    <div className="stat-value text-accent">৳ {stats.revenue}</div>
                </div>
            </div>
            
            <div className="bg-base-200 p-8 rounded-2xl h-[400px]">
                <h3 className="text-xl font-bold mb-6 text-center">Platform Growth Overview</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="total" fill="#4DB04F" radius={[8, 8, 0, 0]} barSize={60} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
