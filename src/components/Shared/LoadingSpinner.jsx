import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-100/90 backdrop-blur-sm">
            <div className="relative flex items-center justify-center">
                {/* Outer rotating ring */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute w-24 h-24 border-4 border-primary border-t-transparent border-b-transparent rounded-full"
                />
                {/* Inner pulsing ring */}
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center"
                >
                    {/* Center Dot */}
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                </motion.div>
            </div>
            <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="mt-6 text-xl font-semibold text-primary tracking-widest"
            >
                LOADING...
            </motion.p>
        </div>
    );
};

export default LoadingSpinner;
