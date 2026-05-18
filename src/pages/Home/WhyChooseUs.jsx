import { motion } from 'framer-motion';

const features = [
    { id: 1, img: '/c1.png', title: 'Verified Tutors', desc: 'Every tutor undergoes a strict verification process to ensure quality and safety.' },
    { id: 2, img: '/c2.png', title: 'Transparent Payments', desc: 'Secure, milestone-based payments ensure you only pay for completed sessions.' },
    { id: 3, img: '/c3.png', title: 'Smart Matching', desc: 'Find the perfect tutor based on subject, location, class, and budget.' },
    { id: 4, img: '/c4.png', title: 'Admin Mediation', desc: 'Our admin team monitors the system to quickly resolve any disputes.' }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
        scale: 1.05, 
        transition: { duration: 0.3 } 
    }
};

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

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {features.map((feature) => (
                    <motion.div 
                        key={feature.id}
                        variants={cardVariants}
                        whileHover="hover"
                        className="card bg-base-100 shadow-xl border border-base-200 cursor-pointer overflow-hidden"
                    >
                        <figure className="h-48 w-full bg-base-200">
                            <img src={feature.img} alt={feature.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </figure>
                        <div className="card-body items-center text-center p-6">
                            <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                            <p className="text-sm text-base-content/70">{feature.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default WhyChooseUs;
