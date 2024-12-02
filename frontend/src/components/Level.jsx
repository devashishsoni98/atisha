'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Level({ level = 0 }) {
    return (
        <div className="min-h-screen bg-amber-200 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-lg flex flex-col items-center relative overflow-hidden"
            >
                {/* Decorative Elements */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-2 h-2 ${
                            i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-amber-300'
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
                            top: '40%',
                            left: '50%',
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
                        duration: 1.5
                    }}
                    className="relative mb-8 w-24 h-24"
                >
                    <div className="absolute inset-0 bg-amber-400 rounded-full flex items-center justify-center">
                        <Star className="w-10 h-10 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8">
                        <div className="absolute left-0 w-8 h-8 bg-indigo-600 rounded-bl-full" />
                        <div className="absolute right-0 w-8 h-8 bg-indigo-600 rounded-br-full" />
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center space-y-2 mb-8"
                >
                    <h1 className="text-2xl font-bold text-gray-900">Congratulations</h1>
                    <p className="text-gray-500">
                        You have completed Level {level}
                    </p>
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
    )
}



//
// 'use client'
//
// import { motion } from 'framer-motion'
// import { Star } from 'lucide-react'
// import { useState, useEffect } from 'react'
//
// export default function DynamicCelebration({ level = 0 }) {
//     const [showContent, setShowContent] = useState(false)
//
//     useEffect(() => {
//         const timer = setTimeout(() => setShowContent(true), 1000)
//         return () => clearTimeout(timer)
//     }, [])
//
//     return (
//         <div className="min-h-screen bg-amber-200 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-sm">
//                 <motion.div
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                     className="bg-white rounded-3xl p-8 w-full shadow-lg flex flex-col items-center relative overflow-hidden"
//                 >
//                     {/* Decorative Elements */}
//                     {[...Array(8)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className={`absolute w-2 h-2 ${
//                                 i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-amber-300'
//                             } rounded-sm`}
//                             initial={{ opacity: 0, x: 0, y: 0 }}
//                             animate={{
//                                 opacity: [0, 1, 0],
//                                 x: [0, (i % 2 ? 100 : -100) * Math.random()],
//                                 y: [0, -100 * Math.random()],
//                             }}
//                             transition={{
//                                 duration: 2,
//                                 delay: i * 0.2,
//                                 repeat: Infinity,
//                                 repeatDelay: 3,
//                             }}
//                             style={{
//                                 top: '40%',
//                                 left: '50%',
//                             }}
//                         />
//                     ))}
//
//                     {/* Trophy Badge */}
//                     <motion.div
//                         initial={{ scale: 0, x: 0 }}
//                         animate={{
//                             scale: 1,
//                             x: showContent ? -60 : 0,
//                             rotate: showContent ? [0, -10, 10, -10, 0] : [0, 360, 720, 1080]
//                         }}
//                         transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             duration: 1.5
//                         }}
//                         className="relative mb-8 w-24 h-24"
//                     >
//                         <div className="absolute inset-0 bg-amber-400 rounded-full flex items-center justify-center">
//                             <Star className="w-10 h-10 text-white fill-white" />
//                         </div>
//                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8">
//                             <div className="absolute left-0 w-8 h-8 bg-indigo-600 rounded-bl-full" />
//                             <div className="absolute right-0 w-8 h-8 bg-indigo-600 rounded-br-full" />
//                         </div>
//                     </motion.div>
//
//                     {/* Text Content */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 100 }}
//                         animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : 100 }}
//                         transition={{ delay: 0.3, duration: 0.5 }}
//                         className="text-center space-y-2 mb-8"
//                     >
//                         <h1 className="text-2xl font-bold text-gray-900">Congratulations</h1>
//                         <p className="text-gray-500">
//                             You have completed Level {level}
//                         </p>
//                     </motion.div>
//
//                     {/* Continue Button */}
//                     <motion.button
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
//                         transition={{ delay: 0.5 }}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="w-full py-3 px-6 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
//                     >
//                         Continue
//                     </motion.button>
//                 </motion.div>
//             </div>
//         </div>
//     )
// }
//

// 'use client'
//
// import { motion } from 'framer-motion'
// import { Star } from 'lucide-react'
// import { useState, useEffect } from 'react'
//
// export default function Level({ level = 0 }) {
//     const [animationStep, setAnimationStep] = useState(0)
//
//     useEffect(() => {
//         const timer1 = setTimeout(() => setAnimationStep(1), 1000) // Trophy shifts left
//         const timer2 = setTimeout(() => setAnimationStep(2), 1500) // Content appears
//         return () => {
//             clearTimeout(timer1)
//             clearTimeout(timer2)
//         }
//     }, [])
//
//     return (
//         <div className="min-h-screen bg-amber-200 flex items-center justify-center p-4">
//             <div className="relative w-full max-w-sm h-[300px]">
//                 <motion.div
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                     className="bg-white rounded-3xl p-8 w-full h-full shadow-lg flex flex-col items-center justify-center relative overflow-hidden"
//                 >
//                     {/* Decorative Elements */}
//                     {[...Array(8)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className={`absolute w-2 h-2 ${
//                                 i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-amber-300'
//                             } rounded-sm`}
//                             initial={{ opacity: 0, x: 0, y: 0 }}
//                             animate={{
//                                 opacity: [0, 1, 0],
//                                 x: [0, (i % 2 ? 100 : -100) * Math.random()],
//                                 y: [0, -100 * Math.random()],
//                             }}
//                             transition={{
//                                 duration: 2,
//                                 delay: i * 0.2,
//                                 repeat: Infinity,
//                                 repeatDelay: 3,
//                             }}
//                             style={{
//                                 top: '40%',
//                                 left: '50%',
//                             }}
//                         />
//                     ))}
//
//                     {/* Trophy Badge */}
//                     <motion.div
//                         initial={{ scale: 0, x: 0 }}
//                         animate={{
//                             scale: 1,
//                             x: animationStep >= 1 ? -80 : 0,
//                             rotate: animationStep === 0 ? [0, 360, 720, 1080] : 0
//                         }}
//                         transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             duration: 1.5
//                         }}
//                         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
//                     >
//                         <div className="absolute inset-0 bg-amber-400 rounded-full flex items-center justify-center">
//                             <Star className="w-10 h-10 text-white fill-white" />
//                         </div>
//                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8">
//                             <div className="absolute left-0 w-8 h-8 bg-indigo-600 rounded-bl-full" />
//                             <div className="absolute right-0 w-8 h-8 bg-indigo-600 rounded-br-full" />
//                         </div>
//                     </motion.div>
//
//                     {/* Content Container */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 0, width: 0 }}
//                         animate={{
//                             opacity: animationStep >= 2 ? 1 : 0,
//                             x: animationStep >= 2 ? 40 : 0,
//                             width: animationStep >= 2 ? 'auto' : 0
//                         }}
//                         transition={{ duration: 0.5 }}
//                         className="flex flex-col items-center"
//                     >
//                         {/* Text Content */}
//                         <div className="text-center space-y-2 mb-4">
//                             <h1 className="text-2xl font-bold text-gray-900">Congratulations</h1>
//                             <p className="text-gray-500">
//                                 You have completed Level {level}
//                             </p>
//                         </div>
//
//                         {/* Continue Button */}
//                         <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             className="w-full py-3 px-6 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
//                         >
//                             Continue
//                         </motion.button>
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </div>
//     )
// }
//
