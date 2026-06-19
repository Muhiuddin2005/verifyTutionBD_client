import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { 
    AreaChart, Area, 
    BarChart, Bar, 
    PieChart, Pie, Cell, 
    XAxis, YAxis, Tooltip, 
    ResponsiveContainer, CartesianGrid,
    LineChart, Line
} from 'recharts';
import { FiUsers, FiBookOpen, FiFileText, FiDollarSign, FiLayers } from 'react-icons/fi';
import useAuth from '../../../../hooks/useAuth';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Overview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: dashboardData = {}, isLoading, error } = useQuery({
        queryKey: ['dashboard-overview-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/dashboard/stats');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
                <span className="loading loading-spinner text-primary loading-lg"></span>
                <p className="text-base-content/70 animate-pulse">Loading dashboard summary...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error max-w-lg mx-auto my-10 shadow-lg">
                <span>Failed to load overview data. Please try again later.</span>
            </div>
        );
    }

    const { role, stats = {}, charts = {} } = dashboardData;

    // Render Stats Cards based on Role
    const renderAdminStats = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Total Users</span>
                        <h3 className="text-3xl font-extrabold text-primary mt-1">{stats.users || 0}</h3>
                    </div>
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                        <FiUsers size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Total Tuitions</span>
                        <h3 className="text-3xl font-extrabold text-secondary mt-1">{stats.tuitions || 0}</h3>
                    </div>
                    <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
                        <FiBookOpen size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Total Applications</span>
                        <h3 className="text-3xl font-extrabold text-accent mt-1">{stats.applications || 0}</h3>
                    </div>
                    <div className="p-4 bg-accent/10 text-accent rounded-2xl">
                        <FiFileText size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Total Revenue</span>
                        <h3 className="text-3xl font-extrabold text-success mt-1">৳{stats.revenue || 0}</h3>
                    </div>
                    <div className="p-4 bg-success/10 text-success rounded-2xl">
                        <FiDollarSign size={24} />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStudentStats = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Posted Tuitions</span>
                        <h3 className="text-3xl font-extrabold text-primary mt-1">{stats.posted || 0}</h3>
                    </div>
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                        <FiBookOpen size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Pending Approval</span>
                        <h3 className="text-3xl font-extrabold text-accent mt-1">{stats.pending || 0}</h3>
                    </div>
                    <div className="p-4 bg-accent/10 text-accent rounded-2xl">
                        <FiLayers size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Filled / Assigned</span>
                        <h3 className="text-3xl font-extrabold text-secondary mt-1">{stats.filled || 0}</h3>
                    </div>
                    <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
                        <FiFileText size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Total Spent</span>
                        <h3 className="text-3xl font-extrabold text-success mt-1">৳{stats.spent || 0}</h3>
                    </div>
                    <div className="p-4 bg-success/10 text-success rounded-2xl">
                        <FiDollarSign size={24} />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTutorStats = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Total Applications</span>
                        <h3 className="text-3xl font-extrabold text-primary mt-1">{stats.applications || 0}</h3>
                    </div>
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                        <FiFileText size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Pending Apps</span>
                        <h3 className="text-3xl font-extrabold text-accent mt-1">{stats.pending || 0}</h3>
                    </div>
                    <div className="p-4 bg-accent/10 text-accent rounded-2xl">
                        <FiLayers size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Approved Tuitions</span>
                        <h3 className="text-3xl font-extrabold text-secondary mt-1">{stats.approved || 0}</h3>
                    </div>
                    <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
                        <FiBookOpen size={24} />
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-200">
                <div className="card-body flex-row items-center justify-between p-6">
                    <div>
                        <span className="text-sm font-semibold text-base-content/60">Total Earnings</span>
                        <h3 className="text-3xl font-extrabold text-success mt-1">৳{stats.earnings || 0}</h3>
                    </div>
                    <div className="p-4 bg-success/10 text-success rounded-2xl">
                        <FiDollarSign size={24} />
                    </div>
                </div>
            </div>
        </div>
    );

    // Render Charts based on Role
    const renderAdminCharts = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Revenue Growth Area Chart */}
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200/60 hover:shadow-xl transition-all duration-300 h-[400px] flex flex-col justify-between group">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-secondary uppercase bg-secondary/10 px-2.5 py-1 rounded-full">Financial Overview</span>
                        <h3 className="text-xl font-extrabold text-base-content mt-1.5 group-hover:text-primary transition-colors duration-300">Revenue Growth</h3>
                        <p className="text-xs text-base-content/60 mt-0.5">Track platform revenue generated monthly</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-base-content/50">Total Revenue</span>
                        <span className="text-lg font-black text-secondary">৳{stats.revenue || 0}</span>
                    </div>
                </div>
                <div className="flex-grow h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={charts.revenue} margin={{ top: 15, right: 5, left: 5, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="currentColor" opacity={0.08} />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11, fontWeight: 600, fontFamily: 'Urbanist, sans-serif' }} 
                                axisLine={false} 
                                tickLine={false} 
                                dy={8}
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
                                                <span className="text-[9px] text-success font-bold">↑ Active growth</span>
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

            {/* User Registrations Bar Chart */}
            <div className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-200 h-[400px] flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-base-content">User Registrations</h3>
                    <p className="text-xs text-base-content/60 mb-4">New user account sign-ups per month</p>
                </div>
                <div className="flex-grow h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={charts.users} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" tick={{ fill: '#888888', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#888888', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={35} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tuition Status Pie Chart */}
            <div className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-200 h-[400px] flex flex-col justify-between lg:col-span-2">
                <div>
                    <h3 className="text-xl font-bold text-base-content">Tuition Requests breakdown</h3>
                    <p className="text-xs text-base-content/60 mb-4">Distribution by status (pending, approved, filled)</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around h-72">
                    <div className="w-full md:w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={charts.status}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {charts.status?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-2">
                        {charts.status?.map((entry, index) => (
                            <div key={`legend-${index}`} className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="font-medium text-sm text-base-content/80 capitalize">{entry.name}: {entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStudentCharts = () => (
        <div className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-200 h-[420px] mt-8 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-base-content">Expense Growth</h3>
                <p className="text-xs text-base-content/60 mb-4">Monthly tuition salary payments made</p>
            </div>
            <div className="flex-grow h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={charts.spent} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" tick={{ fill: '#888888', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#888888', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${v}`} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="total" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#spendGrad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    const renderTutorCharts = () => (
        <div className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-200 h-[420px] mt-8 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-base-content">Monthly Earnings Overview</h3>
                <p className="text-xs text-base-content/60 mb-4">Monthly tuition earnings received</p>
            </div>
            <div className="flex-grow h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={charts.earnings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="earningGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" tick={{ fill: '#888888', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#888888', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${v}`} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="total" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#earningGrad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    return (
        <div className="p-2 md:p-4 font-inter">
            {/* Top header banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-gradient-to-r from-primary to-primary-focus text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="z-10">
                    <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.displayName || 'User'}!</h2>
                    <p className="text-white/80 mt-2 text-sm max-w-xl">
                        Here is an overview of what is happening on your verifyTutionBD dashboard. Keep tracking your metrics to achieve maximum learning outcomes.
                    </p>
                </div>
                <div className="badge badge-accent py-3 px-4 font-bold text-white z-10 shadow-md uppercase tracking-wider">{role}</div>
                {/* Decorative blob shapes */}
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
                <div className="absolute left-1/3 top-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 pointer-events-none"></div>
            </div>

            {/* Dynamic statistics based on user type */}
            {role === 'admin' && renderAdminStats()}
            {role === 'student' && renderStudentStats()}
            {role === 'tutor' && renderTutorStats()}

            {/* Charts representation */}
            {role === 'admin' && renderAdminCharts()}
            {role === 'student' && renderStudentCharts()}
            {role === 'tutor' && renderTutorCharts()}
        </div>
    );
};

export default Overview;
