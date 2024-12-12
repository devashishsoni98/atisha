"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, X, ChevronRight, Lightbulb, BookOpen } from 'lucide-react';
import { Link } from "react-router-dom";

export default function CareerInterestPopup({ careerName = "this career" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setIsVisible(false);

  const decorativeElements = [...Array(12)].map((_, i) => (
    <motion.div
      key={i}
      className={`absolute w-3 h-3 ${
        i % 3 === 0 ? "bg-blue-300" : i % 3 === 1 ? "bg-green-300" : "bg-yellow-300"
      } rounded-full`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, (i % 2 ? 100 : -100) * Math.random()],
        y: [0, -100 * Math.random()],
      }}
      transition={{
        duration: 3,
        delay: i * 0.2,
        repeat: Infinity,
        repeatDelay: 1,
      }}
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
    />
  ));

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 w-full max-w-3xl shadow-lg flex flex-col items-center relative overflow-hidden"
          >
            {decorativeElements}

            {/* Close button */}
            <motion.button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1.5,
              }}
              className="relative mb-8 w-32 h-32"
            >
              <motion.div 
                className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center"
                animate={{ 
                  boxShadow: ["0px 0px 0px 0px rgba(59, 130, 246, 0.5)", "0px 0px 20px 10px rgba(59, 130, 246, 0.5)", "0px 0px 0px 0px rgba(59, 130, 246, 0.5)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Briefcase className="w-16 h-16 text-white" />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-4 mb-8"
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900"
                animate={{ color: ['#2563eb', '#10b981', '#2563eb'] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Hmm! Seems like you're interested in {careerName}
              </motion.h2>
              <p className="text-xl text-gray-600">
                We've noticed you've been exploring this page for a while. Would you like to learn more about career opportunities in this field?
              </p>
            </motion.div>

            {/* Links */}
            <div className="w-full space-y-4">
                {/* <Link to="/lens-details">     
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-full py-4 px-6 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors text-center text-lg"
              >
                Book a Session <ChevronRight className="ml-2" />
              </motion.div>
                </Link> */}
             
            </div>

            {/* Additional animated elements */}
            <motion.div
              className="absolute bottom-4 left-4 text-yellow-500"
              animate={{ 
                y: [0, -10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lightbulb className="w-8 h-8" />
            </motion.div>
            <motion.div
              className="absolute top-4 left-4 text-blue-500"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Briefcase className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

