import { motion } from 'framer-motion';
import { FaGraduationCap, FaBookOpen } from 'react-icons/fa';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-100/95 backdrop-blur-md">
            <div className="relative flex items-center justify-center mb-8">
                {/* Outer spinning dashed ring */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute w-40 h-40 border-2 border-dashed border-primary/50 rounded-full"
                />
                
                {/* Inner Icon Animation */}
                <div className="relative text-primary flex flex-col items-center">
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <FaGraduationCap className="text-6xl text-secondary drop-shadow-lg mb-2" />
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
                    >
                        <FaBookOpen className="text-4xl text-primary" />
                    </motion.div>
                </div>
            </div>
            
            <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="flex items-center gap-2 text-xl font-bold text-primary tracking-widest"
            >
                PREPARING YOUR DESK <span className="loading loading-dots loading-sm mt-1"></span>
            </motion.div>
        </div>
    );
};

export default LoadingSpinner;
