
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const CareerLens = () => {
  const [career, setCareer] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting career:', career);
    // Add your logic here to handle the career submission
  };

  const illustrations = [
    {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-indigo-500">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      position: "top-16 left-16",
      animation: { x: ["-25%", "0%"], y: ["-25%", "0%"], rotate: [-15, 0] }
    },
    {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-pink-500">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      position: "top-16 right-16",
      animation: { x: ["25%", "0%"], y: ["-25%", "0%"], rotate: [15, 0] }
    },
    {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-yellow-500">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      position: "bottom-16 left-16",
      animation: { x: ["-25%", "0%"], y: ["25%", "0%"], rotate: [15, 0] }
    },
    {
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-green-500">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      position: "bottom-16 right-16",
      animation: { x: ["25%", "0%"], y: ["25%", "0%"], rotate: [-15, 0] }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden flex flex-col items-center justify-center">
      {illustrations.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            ...item.animation
          }}
          transition={{
            duration: 1.5,
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          className={`absolute ${item.position} w-64 h-64 md:w-80 md:h-80 pointer-events-none opacity-30`}
        >
          <motion.div
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
              rotate: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {item.svg}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      <div className="z-10 text-center px-4">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ATISHA
        </motion.h1>

        <AnimatePresence>
          {!isInputVisible ? (
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsInputVisible(true)}
            >
              <span className="relative z-10">Explore Your Future</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ scale: [0.9, 1.1, 1] }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="text"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="Enter a career path..."
                className="w-full px-6 py-4 text-lg rounded-full bg-white shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
              >
                <Search size={24} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-gray-600 text-lg max-w-md mx-auto"
        >
          Discover your perfect career path with AI-powered insights
        </motion.p>
      </div>
    </div>
  );
};

export default CareerLens;

