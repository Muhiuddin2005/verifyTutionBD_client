import { motion } from 'framer-motion';

const features = [
    { id: 1, img: '/c1.png', title: 'Verified Tutors', desc: 'Every tutor undergoes a strict verification process to ensure quality and safety.' },
    { id: 2, img: '/c2.png', title: 'Transparent Payments', desc: 'Secure, milestone-based payments ensure you only pay for completed sessions.' },
    { id: 3, img: '/c3.png', title: 'Smart Matching', desc: 'Find the perfect tutor based on subject, location, class, and budget.' },
    { id: 4, img: '/c4.png', title: 'Admin Mediation', desc: 'Our admin team monitors the system to quickly resolve any disputes.' }
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 overflow-hidden">
            <div className="text-center mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-4"
                >
                    Why Choose verifyTutionBD?
                </motion.h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    We bridge the gap between students and expert educators with a secure, transparent, and easy-to-use platform.
                </p>
            </div>

            <div className="relative w-full overflow-hidden py-10 px-4">
                {/* Gradient overlays for smooth fading edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none"></div>
                
                <motion.div 
                    className="flex gap-8 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                >
                    {[...features, ...features].map((feature, index) => (
                        <motion.div 
                            key={`${feature.id}-${index}`}
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="card w-80 md:w-96 bg-base-100 shadow-xl border border-base-200 cursor-pointer overflow-hidden flex-shrink-0"
                        >
                            <figure className="h-56 w-full bg-base-200">
                                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                            </figure>
                            <div className="card-body items-center text-center p-6">
                                <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                                <p className="text-sm text-base-content/70">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
