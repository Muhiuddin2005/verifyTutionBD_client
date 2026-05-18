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
                            /* Added fixed responsive heights back in (h-48, h-56, h-64) so it has a box to fill */
                            className="w-[260px] sm:w-[320px] md:w-[380px] h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-xl border border-base-200 cursor-pointer flex-shrink-0 bg-base-100 flex items-center justify-center"
                        >
                            
                            {/* Change "object-fill" to "object-cover" here if you want it to crop instead of stretch! */}
                            <img 
                                src={feature.img} 
                                alt={`Feature ${feature.id}`} 
                                className="w-full h-full object-fill hover:scale-105 transition-transform duration-500" 
                            />

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
