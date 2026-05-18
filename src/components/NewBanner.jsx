import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "/b1.webp",
    "/b2.webp",
    "/b3.webp",
    "/b4.webp"
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const NewBanner = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-gray-900 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt={`Banner Image ${imageIndex + 1}`}
        />
      </AnimatePresence>
      <div 
        className="next absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-3 cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity select-none text-xl font-bold" 
        onClick={() => paginate(1)}
      >
        ❯
      </div>
      <div 
        className="prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-full p-3 cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity select-none text-xl font-bold" 
        onClick={() => paginate(-1)}
      >
        ❮
      </div>
    </div>
  );
};

export default NewBanner;
