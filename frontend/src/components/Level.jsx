// 'use client'

// import { motion } from 'framer-motion'
// import { Star } from 'lucide-react'

// export default function Level({ level = 0 }) {
//     return (
//         <div className="min-h-screen bg-amber-200 flex items-center justify-center p-4">
//             <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-lg flex flex-col items-center relative overflow-hidden"
//             >
//                 {/* Decorative Elements */}
//                 {[...Array(8)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className={`absolute w-2 h-2 ${
//                             i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-amber-300'
//                         } rounded-sm`}
//                         initial={{ opacity: 0, x: 0, y: 0 }}
//                         animate={{
//                             opacity: [0, 1, 0],
//                             x: [0, (i % 2 ? 100 : -100) * Math.random()],
//                             y: [0, -100 * Math.random()],
//                         }}
//                         transition={{
//                             duration: 2,
//                             delay: i * 0.2,
//                             repeat: Infinity,
//                             repeatDelay: 3,
//                         }}
//                         style={{
//                             top: '40%',
//                             left: '50%',
//                         }}
//                     />
//                 ))}

//                 {/* Badge */}
//                 <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
//                     transition={{
//                         type: "spring",
//                         stiffness: 260,
//                         damping: 20,
//                         duration: 1.5
//                     }}
//                     className="relative mb-8 w-24 h-24"
//                 >
//                     <div className="absolute inset-0 bg-amber-400 rounded-full flex items-center justify-center">
//                         <Star className="w-10 h-10 text-white fill-white" />
//                     </div>
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8">
//                         <div className="absolute left-0 w-8 h-8 bg-indigo-600 rounded-bl-full" />
//                         <div className="absolute right-0 w-8 h-8 bg-indigo-600 rounded-br-full" />
//                     </div>
//                 </motion.div>

//                 {/* Text Content */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-center space-y-2 mb-8"
//                 >
//                     <h1 className="text-2xl font-bold text-gray-900">Congratulations</h1>
//                     <p className="text-gray-500">
//                         You have completed Level {level}
//                     </p>
//                 </motion.div>

//                 {/* Continue Button */}
//                 <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full py-3 px-6 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
//                 >
//                     Continue
//                 </motion.button>
//             </motion.div>
//         </div>
//     )
// }

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import confetti from "canvas-confetti";

export default function Level({ level = 0 }) {
  useEffect(() => {
    // Trigger Side Cannons Confetti
    const sideCannonsEnd = Date.now() + 3 * 1000; // 3 seconds
    const sideColors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const sideFrame = () => {
      if (Date.now() > sideCannonsEnd) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: sideColors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: sideColors,
      });

      requestAnimationFrame(sideFrame);
    };
    sideFrame();

    // Trigger Star Confetti
    const starDefaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const starShoot = () => {
      confetti({
        ...starDefaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...starDefaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    setTimeout(starShoot, 0);
    setTimeout(starShoot, 100);
    setTimeout(starShoot, 200);
  }, []);

  return (
    <div className="min-h-screen bg-amber-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-8 w-full h-full max-w-4xl max-h-[80vh] shadow-lg flex flex-col items-center relative overflow-hidden"
      >
        {/* Decorative Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${
              i % 3 === 0
                ? "bg-pink-300"
                : i % 3 === 1
                ? "bg-purple-300"
                : "bg-amber-300"
            } rounded-sm`}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, (i % 2 ? 100 : -100) * Math.random()],
              y: [0, -100 * Math.random()],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              top: "40%",
              left: "50%",
            }}
          />
        ))}

        {/* Badge */}
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
          <div className="absolute inset-0 bg-amber-400 rounded-full flex items-center justify-center">
            <Star className="w-12 h-12 text-white fill-white" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10">
            <div className="absolute left-0 w-10 h-10 bg-indigo-600 rounded-bl-full" />
            <div className="absolute right-0 w-10 h-10 bg-indigo-600 rounded-br-full" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2 mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900">Congratulations</h1>
          <p className="text-lg text-gray-500">
            You have completed Level {level}
          </p>
        </motion.div>

        {/* Confetti Stars */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-full text-center mb-8"
        >
          <p className="text-gray-500 italic">Star confetti triggered automatically!</p>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
