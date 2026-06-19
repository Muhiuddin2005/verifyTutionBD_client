import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

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
            
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200/60 hover:shadow-xl transition-all duration-300 h-[450px] flex flex-col justify-between group mt-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-secondary uppercase bg-secondary/10 px-2.5 py-1 rounded-full">Analytics Report</span>
                        <h3 className="text-xl font-extrabold text-base-content mt-1.5 group-hover:text-primary transition-colors duration-300">Revenue Growth Overview</h3>
                        <p className="text-xs text-base-content/60 mt-0.5">Historical overview of platform earnings</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-base-content/50">Current Balance</span>
                        <span className="text-lg font-black text-secondary">৳{stats.revenue || 0}</span>
                    </div>
                </div>
                <div className="flex-grow h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 20, right: 10, left: 5, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="currentColor" opacity={0.08} />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11, fontWeight: 600, fontFamily: 'Urbanist, sans-serif' }} 
                                axisLine={false} 
                                tickLine={false} 
                                dy={10}
                            />
                            <YAxis 
                                tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11, fontWeight: 600, fontFamily: 'Urbanist, sans-serif' }} 
                                axisLine={false} 
                                tickLine={false} 
                                tickFormatter={(v) => `৳${v}`}
                            />
                            <Tooltip 
                                cursor={{ stroke: 'var(--color-secondary, #4DB04F)', strokeWidth: 1.5, strokeDasharray: '3 3', opacity: 0.5 }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-base-100/90 backdrop-blur-md border border-base-content/10 p-3 rounded-2xl shadow-xl flex flex-col gap-1 transition-all duration-300">
                                                <p className="text-[10px] font-extrabold text-base-content/50 uppercase tracking-wider">{label}</p>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-secondary" />
                                                    <p className="text-base font-black text-base-content">
                                                        ৳{payload[0].value.toLocaleString()}
                                                    </p>
                                                </div>
                                                <span className="text-[9px] text-success font-bold">↑ Growth Tracked</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="total" 
                                stroke="var(--color-secondary, #4DB04F)" 
                                strokeWidth={4}
                                dot={{ r: 4, stroke: 'var(--color-secondary, #4DB04F)', strokeWidth: 1, fill: '#fff' }}
                                activeDot={{ r: 7, stroke: '#fff', strokeWidth: 2, fill: 'var(--color-secondary, #4DB04F)' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
