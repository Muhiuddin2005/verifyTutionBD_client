import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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

    const chartData = stats.chartData || [];

    return (
        <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-8 text-primary">Platform Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="stat bg-primary/10 rounded-2xl border border-primary/20">
                    <div className="stat-title text-primary font-bold">Total Users</div>
                    <div className="stat-value text-primary">{stats.users || 0}</div>
                </div>
                <div className="stat bg-secondary/10 rounded-2xl border border-secondary/20">
                    <div className="stat-title text-secondary font-bold">Total Tuitions</div>
                    <div className="stat-value text-secondary">{stats.tuitions || 0}</div>
                </div>
                <div className="stat bg-accent/10 rounded-2xl border border-accent/20">
                    <div className="stat-title text-accent font-bold">Total Revenue</div>
                    <div className="stat-value text-accent">৳ {stats.revenue || 0}</div>
                </div>
            </div>
            
            <div className="bg-base-200 p-8 rounded-2xl h-[400px]">
                <h3 className="text-xl font-bold mb-6 text-center">Revenue Growth (Monthly BDT)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4DB04F" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#4DB04F" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="total" stroke="#4DB04F" fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
