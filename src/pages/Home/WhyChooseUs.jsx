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
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-80 md:w-96 h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/5 cursor-pointer flex-shrink-0"
                        >
                            <img src={feature.img} alt="Feature" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
