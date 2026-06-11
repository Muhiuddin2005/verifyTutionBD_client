import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TuitionCard from '../../components/TuitionCard';

const TuitionsListing = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [subject, setSubject] = useState('');
    const [location, setLocation] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);

    const { data: tuitionsData = {}, isLoading } = useQuery({
        queryKey: ['all-tuitions', search, classLevel, subject, location, sort, page],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tuitions?search=${search}&classLevel=${classLevel}&subject=${subject}&location=${location}&sort=${sort}&page=${page}`);
            return res.data;
        }
    });

    const tuitions = tuitionsData.tuitions || [];
    const totalPages = tuitionsData.totalPages || 1;

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">Available Tuitions</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-base-200 p-4 rounded-xl items-center">
                <input 
                    type="text" 
                    placeholder="Search by title..." 
                    className="input input-bordered flex-1 focus:outline-primary w-full"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
                
                <input 
                    type="text" 
                    placeholder="Subject (e.g. Math)" 
                    className="input input-bordered focus:outline-primary w-full md:w-40"
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value); setPage(1); }}
                />

                <input 
                    type="text" 
                    placeholder="Location (e.g. Dhaka)" 
                    className="input input-bordered focus:outline-primary w-full md:w-40"
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                />
                
                <select 
                    className="select select-bordered focus:outline-primary w-full md:w-44" 
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
                    className="select select-bordered focus:outline-primary w-full md:w-40" 
                    value={sort} 
                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                >
                    <option value="">Sort By</option>
                    <option value="newest">Newest First</option>
                    <option value="budgetHigh">Budget (High to Low)</option>
                    <option value="budgetLow">Budget (Low to High)</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array(6).fill(0).map((_, i) => <TuitionCard key={i} isLoading={true} />)
                ) : (
                    tuitions.map(tuition => (
                        <TuitionCard key={tuition._id} tuition={tuition} />
                    ))
                )}
            </div>

            {!isLoading && tuitions.length === 0 && (
                <p className="text-center text-xl text-base-content/60 my-12">No tuitions found matching your criteria.</p>
            )}
            
            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    {[...Array(totalPages).keys()].map(num => (
                        <button 
                            key={num} 
                            onClick={() => setPage(num + 1)} 
                            className={`btn ${page === num + 1 ? 'btn-primary text-white font-bold' : 'btn-outline'}`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TuitionsListing;
