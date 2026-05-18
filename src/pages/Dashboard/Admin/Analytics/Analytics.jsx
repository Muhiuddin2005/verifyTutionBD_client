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
            
            <div className="bg-base-100 p-8 rounded-2xl h-[450px] shadow-inner border border-base-200">
                <h3 className="text-2xl font-bold mb-6 text-center text-primary">Revenue Growth Overview</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4DB04F" stopOpacity={0.6}/>
                                <stop offset="95%" stopColor="#4DB04F" stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 600, dy: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 600 }} tickFormatter={(value) => `৳${value}`} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#4DB04F', fontWeight: 'bold' }}
                            formatter={(value) => [`৳${value}`, 'Revenue']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#4DB04F" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorRevenue)" 
                            activeDot={{ r: 8, strokeWidth: 0, fill: '#4DB04F' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
