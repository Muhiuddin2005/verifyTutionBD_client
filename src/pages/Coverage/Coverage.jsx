import { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import serviceAreas from '../../assets/data/serviceAreas.json';
import { FaSearch } from 'react-icons/fa';

const Coverage = () => {
    const defaultPosition = [23.6850, 90.3563];
    const mapRef = useRef(null);
    const [searchError, setSearchError] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchError("");
        const locationQuery = e.target.location.value.trim().toLowerCase();
        
        if (!locationQuery) return;

        const foundDistrict = serviceAreas.find(area => 
            area.district.toLowerCase().includes(locationQuery)
        );

        if (foundDistrict) {
            const coord = [foundDistrict.coordinates.lat, foundDistrict.coordinates.lng];
            mapRef.current.flyTo(coord, 12, {
                duration: 1.5,
            });
            e.target.reset();
        } else {
            setSearchError(`Sorry, we couldn't find "${locationQuery}" in our active service areas.`);
        }
    };

    return (
        <div className='py-12'>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4">Our Coverage Areas</h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    verifyTutionBD operates across major districts in Bangladesh. Find out if we have active tutors in your city!
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <form onSubmit={handleSearch} className="w-full md:w-1/2 lg:w-1/3">
                    <label className="input input-bordered flex items-center gap-2 w-full focus-within:outline-primary">
                        <FaSearch className="opacity-50" />
                        <input type="text" className="grow" name="location" placeholder="Search your district (e.g., Dhaka, Rajshahi)..." />
                        <button type="submit" className="btn btn-sm btn-primary">Find</button>
                    </label>
                    {searchError && <p className="text-red-500 text-sm mt-2">{searchError}</p>}
                </form>
                
                <div className="stats shadow">
                    <div className="stat py-2 px-6">
                        <div className="stat-title">Total Districts</div>
                        <div className="stat-value text-primary">{serviceAreas.length}</div>
                    </div>
                </div>
            </div>

            <div className='border-2 border-base-200 rounded-2xl overflow-hidden shadow-lg h-[600px] lg:h-[700px] w-full relative z-0'>
                <MapContainer
                    center={defaultPosition}
                    zoom={7}
                    scrollWheelZoom={true}
                    className='h-full w-full'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {serviceAreas.map((area, index) => (
                        <Marker
                            key={index}
                            position={[area.coordinates.lat, area.coordinates.lng]}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1">
                                    <h3 className="font-bold text-lg mb-1">{area.district}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{area.division} Division</p>
                                    <div className="divider my-1"></div>
                                    <p className="text-sm"><strong>Active Tutors:</strong> {area.active_tutors}+</p>
                                    <p className="text-sm"><strong>Top Subjects:</strong> {area.top_subjects.join(', ')}</p>
                                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                        <strong>Zones:</strong> {area.covered_zones.join(', ')}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
