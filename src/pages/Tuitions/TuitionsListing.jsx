import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router';

const TuitionsListing = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);

    const { data: tuitionsData = {}, isLoading } = useQuery({
        queryKey: ['all-tuitions', search, classLevel, sort, page],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tuitions?search=${search}&classLevel=${classLevel}&sort=${sort}&page=${page}`);
            return res.data;
        }
    });

    const tuitions = tuitionsData.tuitions || [];
    const totalPages = tuitionsData.totalPages || 1;

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">Available Tuitions</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-base-200 p-4 rounded-xl">
                <input 
                    type="text" 
                    placeholder="Search by title, subject, location..." 
                    className="input input-bordered flex-1 focus:outline-primary"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
                
                <select 
                    className="select select-bordered focus:outline-primary" 
                    value={classLevel} 
                    onChange={(e) => { setClassLevel(e.target.value); setPage(1); }}
                >
                    <option value="">All Classes</option>
                    <option value="Primary">Primary (1-5)</option>
                    <option value="Middle">Middle (6-8)</option>
                    <option value="Secondary">Secondary (9-10)</option>
                    <option value="Higher Secondary">Higher Secondary (11-12)</option>
                    <option value="University">University</option>
                </select>

                <select 
                    className="select select-bordered focus:outline-primary" 
                    value={sort} 
                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                >
                    <option value="">Sort By</option>
                    <option value="newest">Newest First</option>
                    <option value="budgetHigh">Budget (High to Low)</option>
                    <option value="budgetLow">Budget (Low to High)</option>
                </select>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tuitions.map(tuition => (
                            <div key={tuition._id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition">
                                <div className="card-body">
                                    <div className="badge badge-secondary mb-2">{tuition.classLevel}</div>
                                    <h2 className="card-title text-xl text-primary">{tuition.title}</h2>
                                    <p className="text-base-content/80 text-sm mt-2">{tuition.description?.substring(0, 80)}...</p>
                                    
                                    <div className="mt-4 space-y-2 text-sm font-medium">
                                        <div className="flex items-center gap-2"><span>📚 Subject:</span> {tuition.subject}</div>
                                        <div className="flex items-center gap-2"><span>📍 Location:</span> {tuition.location}</div>
                                        <div className="flex items-center gap-2"><span>💰 Budget:</span> ৳ {tuition.budget}/mo</div>
                                    </div>
                                    
                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/tuitions/${tuition._id}`} className="btn btn-primary text-secondary w-full">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {tuitions.length === 0 && <p className="text-center text-xl text-base-content/60 my-12">No tuitions found matching your criteria.</p>}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12 gap-2">
                            {[...Array(totalPages).keys()].map(num => (
                                <button 
                                    key={num} 
                                    onClick={() => setPage(num + 1)} 
                                    className={`btn ${page === num + 1 ? 'btn-primary text-secondary' : 'btn-outline'}`}
                                >
                                    {num + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TuitionsListing;
