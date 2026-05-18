import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import serviceAreas from '../../assets/data/serviceAreas.json';

const About = () => {
    // Center of Bangladesh for the default map view
    const defaultPosition = [23.6850, 90.3563];

    return (
        <div className="max-w-7xl mx-auto py-20 px-4">
            
            {/* 1. Intro Section */}
            <div className="max-w-4xl mx-auto text-center mb-24">
                <h1 className="text-5xl font-bold text-primary mb-6">About Us</h1>
                <p className="text-xl text-base-content/80 leading-relaxed">
                    Welcome to verifyTutionBD. Our mission is to solve the real problem of finding qualified tutors and verified tuitions across Bangladesh. We aim to reduce friction between students and educators by providing automated workflows, digital class tracking, and transparent payment structures.
                </p>
            </div>

            {/* 2. Coverage Map Section */}
            <div className="bg-base-100 rounded-[3rem] shadow-2xl border border-base-200 p-8 md:p-12 mb-12">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-primary mb-4">Our Growing Network</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
                        We are rapidly expanding our reach across Bangladesh. Explore our active service zones and see where our verified tutors are making a difference.
                    </p>
                </div>

                {/* Map Container - beautifully styled */}
                <div className="rounded-3xl overflow-hidden shadow-inner border-4 border-base-200 h-[500px] w-full relative z-0">
                    <MapContainer
                        center={defaultPosition}
                        zoom={7}
                        scrollWheelZoom={false} // Turned off by default to prevent annoying scrolling interruptions when reading the page
                        className="h-full w-full"
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
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

        </div>
    );
};

export default About;
