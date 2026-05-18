import { motion } from 'framer-motion';

const features = [
    { id: 1, img: '/c1.png', title: 'Verified Tutors', desc: 'Every tutor undergoes a strict verification process to ensure quality and safety.' },
    { id: 2, img: '/c2.png', title: 'Transparent Payments', desc: 'Secure, milestone-based payments ensure you only pay for completed sessions.' },
    { id: 3, img: '/c3.png', title: 'Smart Matching', desc: 'Find the perfect tutor based on subject, location, class, and budget.' },
    { id: 4, img: '/c4.png', title: 'Admin Mediation', desc: 'Our admin team monitors the system to quickly resolve any disputes.' }
];

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary">Why You Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-base-100 rounded-lg shadow-lg overflow-hidden flex items-center justify-center hover:scale-105 transition-transform">
                            <img 
                                src={feature.img} 
                                alt={feature.title || `Why Choose Us Image ${index + 1}`} 
                                className="w-full h-auto object-cover aspect-video" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
