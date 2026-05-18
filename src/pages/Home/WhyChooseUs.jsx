import { motion } from 'framer-motion';

const features = [
    { id: 1, img: '/c1.png' },
    { id: 2, img: '/c2.png' },
    { id: 3, img: '/c3.png' },
    { id: 4, img: '/c4.png' }
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 overflow-hidden bg-base-100">
            <div className="text-center mb-12">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-4 text-primary"
                >
                    Why Choose verifyTutionBD?
                </motion.h2>
            </div>

            <div className="relative w-full overflow-hidden py-6 px-4">
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none"></div>
                
                <motion.div 
                    className="flex gap-6 md:gap-8 w-max items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                >
                    {[...features, ...features].map((feature, index) => (
                        <motion.div 
                            key={`${feature.id}-${index}`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            /* Responsive width. Height is set to auto so it perfectly wraps the image */
                            className="w-[260px] sm:w-[320px] md:w-[380px] h-auto rounded-2xl overflow-hidden shadow-xl border border-base-200 cursor-pointer flex-shrink-0 bg-base-100 flex items-center justify-center"
                        >
                            {/* object-contain and h-auto ensure the image shape is 100% preserved and never cut */}
                            <img 
                                src={feature.img} 
                                alt={`Feature ${feature.id}`} 
                                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" 
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
