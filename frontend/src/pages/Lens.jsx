


// // // // import React, { useState } from 'react'
// // // // import { motion, AnimatePresence } from 'framer-motion'
// // // // import { Sparkles } from 'lucide-react'

// // // // const Triangle = () => (
// // // //   <svg className="coolshapes triangle-9" height="400" width="400" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
// // // //     <g clipPath="url(#cs_clip_1_triangle-9)">
// // // //       <mask height="200" id="cs_mask_1_triangle-9" style={{"maskType":"alpha"}} width="200" x="0" y="0" maskUnits="userSpaceOnUse">
// // // //         <path d="M118.01 77.99c3.32-3.32 4.981-4.98 5.881-6.964a11.994 11.994 0 001.073-5.128c-.03-2.178-.886-4.365-2.597-8.738L100 0 77.633 57.16c-1.711 4.373-2.567 6.56-2.597 8.737a12 12 0 001.073 5.13c.9 1.982 2.56 3.643 5.881 6.963l13.428 13.428c1.638 1.637 2.456 2.456 3.406 2.748a4.001 4.001 0 002.353 0c.949-.292 1.768-1.11 3.405-2.748L118.01 77.99zM118.01 122.01c3.32 3.32 4.981 4.981 5.881 6.964a11.991 11.991 0 011.073 5.128c-.03 2.178-.886 4.365-2.597 8.738L100 200l-22.367-57.16c-1.711-4.373-2.567-6.56-2.597-8.738a11.997 11.997 0 011.073-5.128c.9-1.983 2.56-3.644 5.881-6.964l13.428-13.428c1.638-1.637 2.456-2.456 3.406-2.748a3.998 3.998 0 012.353 0c.949.292 1.768 1.111 3.405 2.748l13.428 13.428zM200 100l-57.16 22.367c-4.373 1.711-6.56 2.567-8.738 2.597a11.991 11.991 0 01-5.128-1.073c-1.983-.9-3.644-2.561-6.964-5.881l-13.428-13.428c-1.637-1.637-2.456-2.456-2.748-3.405a3.998 3.998 0 010-2.353c.292-.95 1.111-1.768 2.748-3.406L122.01 81.99c3.32-3.32 4.981-4.98 6.964-5.881a11.997 11.997 0 015.128-1.073c2.178.03 4.365.886 8.738 2.597L200 100zM77.99 118.01c-3.32 3.32-4.98 4.981-6.964 5.881a11.994 11.994 0 01-5.128 1.073c-2.178-.03-4.365-.886-8.738-2.597L0 100l57.16-22.367c4.373-1.711 6.56-2.567 8.737-2.597a12 12 0 015.13 1.073c1.982.9 3.643 2.56 6.963 5.881l13.428 13.428c1.637 1.638 2.456 2.456 2.748 3.406a4.001 4.001 0 010 2.353c-.292.949-1.11 1.768-2.748 3.405L77.99 118.01z" fill="#fff"/>
// // // //       </mask>
// // // //       <g mask="url(#cs_mask_1_triangle-9)">
// // // //         <path d="M200 0H0v200h200V0z" fill="#FFFDEA"/>
// // // //         <path d="M200 0H0v200h200V0z" fill="url(#paint0_radial_748_4914)"/>
// // // //         <path d="M200 0H0v200h200V0z" fill="url(#paint1_radial_748_4914)"/>
// // // //         <path d="M200 0H0v200h200V0z" fill="url(#paint2_radial_748_4914)"/>
// // // //         <path d="M200 0H0v200h200V0z" fill="url(#paint3_radial_748_4914)"/>
// // // //       </g>
// // // //     </g>
// // // //     <defs>
// // // //       <radialGradient id="paint0_radial_748_4914" cx="0" cy="0" gradientTransform="matrix(81.99998 6 -6 81.99998 11.5 100)" gradientUnits="userSpaceOnUse" r="1">
// // // //         <stop stopColor="#00C5DF"/>
// // // //         <stop offset="1" stopColor="#0CE548" stopOpacity="0"/>
// // // //       </radialGradient>
// // // //       <radialGradient id="paint1_radial_748_4914" cx="0" cy="0" gradientTransform="rotate(73.352 43.022 75.99) scale(162.304)" gradientUnits="userSpaceOnUse" r="1">
// // // //         <stop stopColor="#FF58E4"/>
// // // //         <stop offset="0.383" stopColor="#FF7776"/>
// // // //         <stop offset="1" stopColor="#FFE500" stopOpacity="0"/>
// // // //       </radialGradient>
// // // //       <radialGradient id="paint2_radial_748_4914" cx="0" cy="0" gradientTransform="rotate(-86.927 139.95 32.493) scale(74.6073)" gradientUnits="userSpaceOnUse" r="1">
// // // //         <stop offset="0.355" stopColor="#00F0FF"/>
// // // //         <stop offset="1" stopColor="#fff" stopOpacity="0"/>
// // // //       </radialGradient>
// // // //       <radialGradient id="paint3_radial_748_4914" cx="0" cy="0" gradientTransform="rotate(-123.011 105.927 34.745) scale(93.6122)" gradientUnits="userSpaceOnUse" r="1">
// // // //         <stop stopColor="#FFE500"/>
// // // //         <stop offset="1" stopColor="#fff" stopOpacity="0"/>
// // // //       </radialGradient>
// // // //     </defs>
// // // //   </svg>
// // // // )

// // // // const Star = () => (
// // // //   <svg className="coolshapes star-13" height="400" width="400" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
// // // //     <g clipPath="url(#cs_clip_1_star-13)">
// // // //       <mask height="200" id="cs_mask_1_star-13" style={{"maskType":"alpha"}} width="200" x="0" y="0" maskUnits="userSpaceOnUse">
// // // //         <path d="M2.178 12.427C.158 5.905-.85 2.644.897.897 2.644-.85 5.905.159 12.427 2.177l50.984 15.781a24.58 24.58 0 0116.213 16.213L100 100 34.17 79.624a24.58 24.58 0 01-16.213-16.213L2.178 12.427z" fill="#fff"/>
// // // //         <path d="M100.002 100l65.826 20.375a24.578 24.578 0 0116.213 16.213l15.781 50.984c2.019 6.522 3.028 9.783 1.281 11.53-1.748 1.748-5.009.738-11.53-1.28l-50.984-15.781a24.58 24.58 0 01-16.213-16.213l-20.375-65.827-20.375 65.828a24.582 24.582 0 01-16.213 16.213l-50.984 15.78c-6.522 2.019-9.783 3.028-11.53 1.281-1.748-1.747-.739-5.008 1.28-11.53l15.78-50.984a24.58 24.58 0 0116.214-16.213L100 100l20.376-65.828a24.58 24.58 0 0116.213-16.213l50.984-15.78c6.522-2.02 9.783-3.029 11.53-1.281 1.747 1.747.738 5.008-1.281 11.53l-15.78 50.984a24.582 24.582 0 01-16.213 16.213L100.002 100z" fill="#fff"/>
// // // //       </mask>
// // // //       <g mask="url(#cs_mask_1_star-13)">
// // // //         <path d="M200 0H0v200h200V0z" fill="#fff"/>
// // // //         <path d="M200 0H0v200h200V0z" fill="#FFF500" fillOpacity="0.44"/>
// // // //         <g filter="url(#filter0_f_748_4314)">
// // // //           <ellipse cx="100" cy="10.5" fill="#FF00D6" rx="88" ry="49.5"/>
// // // //           <ellipse cx="57.5" cy="160" fill="#07FFE1" rx="64.5" ry="45"/>
// // // //           <path d="M211 131H93v120h118V131z" fill="#06F"/>
// // // //         </g>
// // // //       </g>
// // // //     </g>
// // // //     <defs>
// // // //       <filter height="450" id="filter0_f_748_4314" width="378" x="-87" y="-119" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
// // // //         <feFlood result="BackgroundImageFix" floodOpacity="0"/>
// // // //         <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix"/>
// // // //         <feGaussianBlur result="effect1_foregroundBlur_748_4314" stdDeviation="40"/>
// // // //       </filter>
// // // //     </defs>
// // // //   </svg>
// // // // )

// // // // export default function CareerLens() {
// // // //   const [career, setCareer] = useState('')
// // // //   const [isInputVisible, setIsInputVisible] = useState(false)

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault()
// // // //     console.log('Submitting career:', career)
// // // //   }

// // // //   const cornerElements = [
// // // //     {
// // // //       element: <Triangle />,
// // // //       position: "-top-64 -left-64",
// // // //       animation: { x: ["-100%", "0%"], y: ["-100%", "0%"], rotate: [-15, 0] }
// // // //     },
// // // //     {
// // // //       element: <Star />,
// // // //       position: "-top-64 -right-64",
// // // //       animation: { x: ["100%", "0%"], y: ["-100%", "0%"], rotate: [15, 0] }
// // // //     },
// // // //     {
// // // //       element: <Triangle />,
// // // //       position: "-bottom-64 -left-64",
// // // //       animation: { x: ["-100%", "0%"], y: ["100%", "0%"], rotate: [15, 0] }
// // // //     },
// // // //     {
// // // //       element: <Star />,
// // // //       position: "-bottom-64 -right-64",
// // // //       animation: { x: ["100%", "0%"], y: ["100%", "0%"], rotate: [-15, 0] }
// // // //     }
// // // //   ]

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden flex flex-col items-center justify-center">
// // // //       {/* Corner Elements */}
// // // //       {cornerElements.map((item, index) => (
// // // //         <motion.div
// // // //           key={index}
// // // //           initial={{ opacity: 0 }}
// // // //           animate={{ 
// // // //             opacity: 1,
// // // //             ...item.animation
// // // //           }}
// // // //           transition={{
// // // //             duration: 1.5,
// // // //             delay: index * 0.2,
// // // //             type: "spring",
// // // //             stiffness: 100
// // // //           }}
// // // //           className={`absolute ${item.position} w-128 h-128 pointer-events-none`}
// // // //         >
// // // //           {item.element}
// // // //         </motion.div>
// // // //       ))}

// // // //       {/* Main content */}
// // // //       <div className="z-10 text-center px-4">
// // // //         <motion.div
// // // //           initial={{ opacity: 0 }}
// // // //           animate={{ opacity: 1 }}
// // // //           className="relative mb-12"
// // // //         >
// // // //           <motion.h1 
// // // //             className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
// // // //             animate={{ 
// // // //               backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
// // // //             }}
// // // //             transition={{ 
// // // //               duration: 5,
// // // //               repeat: Infinity,
// // // //               ease: "linear"
// // // //             }}
// // // //             style={{ 
// // // //               backgroundSize: "200% auto"
// // // //             }}
// // // //           >
// // // //             ATISHA
// // // //           </motion.h1>
// // // //         </motion.div>

// // // //         {!isInputVisible && (
// // // //           <motion.button
// // // //             className="group relative px-8 py-4 text-lg font-medium text-white"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 0.5 }}
// // // //             onClick={() => setIsInputVisible(true)}
// // // //           >
// // // //             <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-y-0 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:translate-y-1 group-hover:opacity-90 rounded-xl">
// // // //             </span>
// // // //             <span className="absolute inset-0 w-full h-full border-2 border-purple-600 rounded-xl">
// // // //             </span>
// // // //             <span className="relative flex items-center justify-center gap-2">
// // // //               Explore
// // // //               <Sparkles className="w-4 h-4" />
// // // //             </span>
// // // //           </motion.button>
// // // //         )}

// // // //         <AnimatePresence>
// // // //           {isInputVisible && (
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               exit={{ opacity: 0, y: -20 }}
// // // //               transition={{ duration: 0.3 }}
// // // //             >
// // // //               <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
// // // //                 <input
// // // //                   type="text"
// // // //                   value={career}
// // // //                   onChange={(e) => setCareer(e.target.value)}
// // // //                   placeholder="Enter a career path..."
// // // //                   className="w-full px-6 py-4 text-lg rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
// // // //                 />
// // // //                 <motion.button
// // // //                   type="submit"
// // // //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
// // // //                   whileHover={{ scale: 1.02 }}
// // // //                   whileTap={{ scale: 0.98 }}
// // // //                 >
// // // //                   <motion.span
// // // //                     animate={{ 
// // // //                       background: [
// // // //                         "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
// // // //                         "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)"
// // // //                       ]
// // // //                     }}
// // // //                     transition={{ duration: 1, repeat: Infinity }}
// // // //                     className="absolute inset-0 rounded-lg"
// // // //                   />
// // // //                   Explore
// // // //                 </motion.button>
// // // //               </form>
// // // //             </motion.div>
// // // //           )}
// // // //         </AnimatePresence>

// // // //         <motion.p
// // // //           initial={{ opacity: 0 }}
// // // //           animate={{ opacity: 1 }}
// // // //           transition={{ delay: 0.8 }}
// // // //           className="mt-6 text-gray-600 text-lg"
// // // //         >
// // // //           Discover your perfect career path with AI-powered insights
// // // //         </motion.p>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }


// // // import React, { useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Sparkles } from 'lucide-react';

// // // const Triangle = () => (
// // //   <svg className="coolshapes triangle-9" height="400" width="400" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
// // //     <g clipPath="url(#cs_clip_1_triangle-9)">
// // //       <mask height="200" id="cs_mask_1_triangle-9" style={{"maskType":"alpha"}} width="200" x="0" y="0" maskUnits="userSpaceOnUse">
// // //         <path d="M118.01 77.99c3.32-3.32 4.981-4.98 5.881-6.964a11.994 11.994 0 001.073-5.128c-.03-2.178-.886-4.365-2.597-8.738L100 0 77.633 57.16c-1.711 4.373-2.567 6.56-2.597 8.737a12 12 0 001.073 5.13c.9 1.982 2.56 3.643 5.881 6.963l13.428 13.428c1.638 1.637 2.456 2.456 3.406 2.748a4.001 4.001 0 002.353 0c.949-.292 1.768-1.11 3.405-2.748L118.01 77.99zM118.01 122.01c3.32 3.32 4.981 4.981 5.881 6.964a11.991 11.991 0 011.073 5.128c-.03 2.178-.886 4.365-2.597 8.738L100 200l-22.367-57.16c-1.711-4.373-2.567-6.56-2.597-8.738a11.997 11.997 0 011.073-5.128c.9-1.983 2.56-3.644 5.881-6.964l13.428-13.428c1.638-1.637 2.456-2.456 3.406-2.748a3.998 3.998 0 012.353 0c.949.292 1.768 1.111 3.405 2.748l13.428 13.428zM200 100l-57.16 22.367c-4.373 1.711-6.56 2.567-8.738 2.597a11.991 11.991 0 01-5.128-1.073c-1.983-.9-3.644-2.561-6.964-5.881l-13.428-13.428c-1.637-1.637-2.456-2.456-2.748-3.405a3.998 3.998 0 010-2.353c.292-.95 1.111-1.768 2.748-3.406L122.01 81.99c3.32-3.32 4.981-4.98 6.964-5.881a11.997 11.997 0 015.128-1.073c2.178.03 4.365.886 8.738 2.597L200 100zM77.99 118.01c-3.32 3.32-4.98 4.981-6.964 5.881a11.994 11.994 0 01-5.128 1.073c-2.178-.03-4.365-.886-8.738-2.597L0 100l57.16-22.367c4.373-1.711 6.56-2.567 8.737-2.597a12 12 0 015.13 1.073c1.982.9 3.643 2.56 6.963 5.881l13.428 13.428c1.637 1.638 2.456 2.456 2.748 3.406a4.001 4.001 0 010 2.353c-.292.949-1.11 1.768-2.748 3.405L77.99 118.01z" fill="#fff"/>
// // //       </mask>
// // //       <g mask="url(#cs_mask_1_triangle-9)">
// // //         <path d="M200 0H0v200h200V0z" fill="#FFFDEA"/>
// // //         <path d="M200 0H0v200h200V0z" fill="url(#paint0_radial_748_4914)"/>
// // //         <path d="M200 0H0v200h200V0z" fill="url(#paint1_radial_748_4914)"/>
// // //         <path d="M200 0H0v200h200V0z" fill="url(#paint2_radial_748_4914)"/>
// // //         <path d="M200 0H0v200h200V0z" fill="url(#paint3_radial_748_4914)"/>
// // //       </g>
// // //     </g>
// // //     <defs>
// // //       <radialGradient id="paint0_radial_748_4914" cx="0" cy="0" gradientTransform="matrix(81.99998 6 -6 81.99998 11.5 100)" gradientUnits="userSpaceOnUse" r="1">
// // //         <stop stopColor="#00C5DF"/>
// // //         <stop offset="1" stopColor="#0CE548" stopOpacity="0"/>
// // //       </radialGradient>
// // //       <radialGradient id="paint1_radial_748_4914" cx="0" cy="0" gradientTransform="rotate(73.352 43.022 75.99) scale(162.304)" gradientUnits="userSpaceOnUse" r="1">
// // //         <stop stopColor="#FF58E4"/>
// // //         <stop offset="0.383" stopColor="#FF7776"/>
// // //         <stop offset="1" stopColor="#FFE500" stopOpacity="0"/>
// // //       </radialGradient>
// // //       <radialGradient id="paint2_radial_748_4914" cx="0" cy="0" gradientTransform="rotate(-86.927 139.95 32.493) scale(74.6073)" gradientUnits="userSpaceOnUse" r="1">
// // //         <stop offset="0.355" stopColor="#00F0FF"/>
// // //         <stop offset="1" stopColor="#fff" stopOpacity="0"/>
// // //       </radialGradient>
// // //       <radialGradient id="paint3_radial_748_4914" cx="0" cy="0" gradientTransform="rotate(-123.011 105.927 34.745) scale(93.6122)" gradientUnits="userSpaceOnUse" r="1">
// // //         <stop stopColor="#FFE500"/>
// // //         <stop offset="1" stopColor="#fff" stopOpacity="0"/>
// // //       </radialGradient>
// // //     </defs>
// // //   </svg>
// // // );

// // // const Star = () => (
// // //   <svg className="coolshapes star-13" height="400" width="400" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
// // //     <g clipPath="url(#cs_clip_1_star-13)">
// // //       <mask height="200" id="cs_mask_1_star-13" style={{"maskType":"alpha"}} width="200" x="0" y="0" maskUnits="userSpaceOnUse">
// // //         <path d="M2.178 12.427C.158 5.905-.85 2.644.897.897 2.644-.85 5.905.159 12.427 2.177l50.984 15.781a24.58 24.58 0 0116.213 16.213L100 100 34.17 79.624a24.58 24.58 0 01-16.213-16.213L2.178 12.427z" fill="#fff"/>
// // //         <path d="M100.002 100l65.826 20.375a24.578 24.578 0 0116.213 16.213l15.781 50.984c2.019 6.522 3.028 9.783 1.281 11.53-1.748 1.748-5.009.738-11.53-1.28l-50.984-15.781a24.58 24.58 0 01-16.213-16.213l-20.375-65.827-20.375 65.828a24.582 24.582 0 01-16.213 16.213l-50.984 15.78c-6.522 2.019-9.783 3.028-11.53 1.281-1.748-1.747-.739-5.008 1.28-11.53l15.78-50.984a24.58 24.58 0 0116.214-16.213L100 100l20.376-65.828a24.58 24.58 0 0116.213-16.213l50.984-15.78c6.522-2.02 9.783-3.029 11.53-1.281 1.747 1.747.738 5.008-1.281 11.53l-15.78 50.984a24.582 24.582 0 01-16.213 16.213L100.002 100z" fill="#fff"/>
// // //       </mask>
// // //       <g mask="url(#cs_mask_1_star-13)">
// // //         <path d="M200 0H0v200h200V0z" fill="#fff"/>
// // //         <path d="M200 0H0v200h200V0z" fill="#FFF500" fillOpacity="0.44"/>
// // //         <g filter="url(#filter0_f_748_4314)">
// // //           <ellipse cx="100" cy="10.5" fill="#FF00D6" rx="88" ry="49.5"/>
// // //           <ellipse cx="57.5" cy="160" fill="#07FFE1" rx="64.5" ry="45"/>
// // //           <path d="M211 131H93v120h118V131z" fill="#06F"/>
// // //         </g>
// // //       </g>
// // //     </g>
// // //     <defs>
// // //       <filter height="450" id="filter0_f_748_4314" width="378" x="-87" y="-119" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
// // //         <feFlood result="BackgroundImageFix" floodOpacity="0"/>
// // //         <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix"/>
// // //         <feGaussianBlur result="effect1_foregroundBlur_748_4314" stdDeviation="40"/>
// // //       </filter>
// // //     </defs>
// // //   </svg>
// // // );

// // // const CareerLens = () => {
// // //   const [career, setCareer] = useState('');
// // //   const [isInputVisible, setIsInputVisible] = useState(false);

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     console.log('Submitting career:', career);
// // //   };

// // //   const cornerElements = [
// // //     {
// // //       element: <Triangle />,
// // //       position: "top-0 left-0",
// // //       animation: { x: ["-25%", "0%"], y: ["-25%", "0%"], rotate: [-15, 0] }
// // //     },
// // //     {
// // //       element: <Star />,
// // //       position: "top-0 right-0",
// // //       animation: { x: ["25%", "0%"], y: ["-25%", "0%"], rotate: [15, 0] }
// // //     },
// // //     {
// // //       element: <Triangle />,
// // //       position: "bottom-0 left-0",
// // //       animation: { x: ["-25%", "0%"], y: ["25%", "0%"], rotate: [15, 0] }
// // //     },
// // //     {
// // //       element: <Star />,
// // //       position: "bottom-0 right-0",
// // //       animation: { x: ["25%", "0%"], y: ["25%", "0%"], rotate: [-15, 0] }
// // //     }
// // //   ];

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden flex flex-col items-center justify-center">
// // //       {/* Corner Elements */}
// // //       {cornerElements.map((item, index) => (
// // //         <motion.div
// // //           key={index}
// // //           initial={{ opacity: 0 }}
// // //           animate={{ 
// // //             opacity: 1,
// // //             ...item.animation
// // //           }}
// // //           transition={{
// // //             duration: 1.5,
// // //             delay: index * 0.2,
// // //             type: "spring",
// // //             stiffness: 100
// // //           }}
// // //           className={`absolute ${item.position} w-48 h-48 pointer-events-none`}
// // //         >
// // //           {item.element}
// // //         </motion.div>
// // //       ))}

// // //       {/* Main content */}
// // //       <div className="z-10 text-center px-4">
// // //         <motion.div
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           className="relative mb-12"
// // //         >
// // //           <motion.h1 
// // //             className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
// // //             animate={{ 
// // //               backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
// // //             }}
// // //             transition={{ 
// // //               duration: 5,
// // //               repeat: Infinity,
// // //               ease: "linear"
// // //             }}
// // //             style={{ 
// // //               backgroundSize: "200% auto"
// // //             }}
// // //           >
// // //             ATISHA
// // //           </motion.h1>
// // //         </motion.div>

// // //         {!isInputVisible && (
// // //           <motion.button
// // //             className="group relative px-8 py-4 text-lg font-medium text-white"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 0.5 }}
// // //             onClick={() => setIsInputVisible(true)}
// // //           >
// // //             <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-y-0 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:translate-y-1 group-hover:opacity-90 rounded-xl">
// // //             </span>
// // //             <span className="absolute inset-0 w-full h-full border-2 border-purple-600 rounded-xl">
// // //             </span>
// // //             <span className="relative flex items-center justify-center gap-2">
// // //               Explore
// // //               <Sparkles className="w-4 h-4" />
// // //             </span>
// // //           </motion.button>
// // //         )}

// // //         <AnimatePresence>
// // //           {isInputVisible && (
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               exit={{ opacity: 0, y: -20 }}
// // //               transition={{ duration: 0.3 }}
// // //             >
// // //               <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
// // //                 <input
// // //                   type="text"
// // //                   value={career}
// // //                   onChange={(e) => setCareer(e.target.value)}
// // //                   placeholder="Enter a career path..."
// // //                   className="w-full px-6 py-4 text-lg rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
// // //                 />
// // //                 <motion.button
// // //                   type="submit"
// // //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
// // //                   whileHover={{ scale: 1.02 }}
// // //                   whileTap={{ scale: 0.98 }}
// // //                 >
// // //                   <motion.span
// // //                     animate={{ 
// // //                       background: [
// // //                         "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
// // //                         "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)"
// // //                       ]
// // //                     }}
// // //                     transition={{ duration: 1, repeat: Infinity }}
// // //                     className="absolute inset-0 rounded-lg"
// // //                   />
// // //                   Explore
// // //                 </motion.button>
// // //               </form>
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>

// // //         <motion.p
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ delay: 0.8 }}
// // //           className="mt-6 text-gray-600 text-lg"
// // //         >
// // //           Discover your perfect career path with AI-powered insights
// // //         </motion.p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CareerLens;

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// // import { Sparkles } from 'lucide-react';

// // const CareerLens = () => {
// //   const [career, setCareer] = useState('');
// //   const [isInputVisible, setIsInputVisible] = useState(false);
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// //   const backgroundControls = useAnimation();

// //   useEffect(() => {
// //     const handleMouseMove = (e) => {
// //       setMousePosition({ x: e.clientX, y: e.clientY });
// //     };

// //     window.addEventListener('mousemove', handleMouseMove);

// //     return () => {
// //       window.removeEventListener('mousemove', handleMouseMove);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     backgroundControls.start({
// //       background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 80%)`,
// //     });
// //   }, [mousePosition, backgroundControls]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Submitting career:', career);
// //   };

// //   const illustrations = [
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
// //           <rect width="200" height="200" fill="#f0f0f0"/>
// //           <path d="M100 30l60 100H40z" fill="#4a90e2"/>
// //           <circle cx="100" cy="80" r="30" fill="#f5a623"/>
// //           <rect x="70" y="140" width="60" height="30" fill="#7ed321"/>
// //           <text x="100" y="190" fontSize="16" textAnchor="middle" fill="#4a4a4a">Education</text>
// //         </svg>
// //       ),
// //       position: "-top-32 -left-32",
// //       animation: { x: ["-100%", "0%"], y: ["-100%", "0%"], rotate: [-15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
// //           <rect width="200" height="200" fill="#f0f0f0"/>
// //           <path d="M20 180l80-160 80 160z" fill="#9b59b6"/>
// //           <circle cx="100" cy="100" r="40" fill="#e74c3c"/>
// //           <path d="M60 140h80l-40 40z" fill="#3498db"/>
// //           <text x="100" y="190" fontSize="16" textAnchor="middle" fill="#4a4a4a">Career</text>
// //         </svg>
// //       ),
// //       position: "-top-32 -right-32",
// //       animation: { x: ["100%", "0%"], y: ["-100%", "0%"], rotate: [15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
// //           <rect width="200" height="200" fill="#f0f0f0"/>
// //           <circle cx="100" cy="100" r="80" fill="#2ecc71"/>
// //           <rect x="60" y="60" width="80" height="80" fill="#e67e22"/>
// //           <polygon points="100,40 120,70 80,70" fill="#c0392b"/>
// //           <text x="100" y="190" fontSize="16" textAnchor="middle" fill="#4a4a4a">Growth</text>
// //         </svg>
// //       ),
// //       position: "-bottom-32 -left-32",
// //       animation: { x: ["-100%", "0%"], y: ["100%", "0%"], rotate: [15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
// //           <rect width="200" height="200" fill="#f0f0f0"/>
// //           <path d="M20 100a80 80 0 0 1 160 0" fill="#3498db"/>
// //           <circle cx="100" cy="100" r="40" fill="#f1c40f"/>
// //           <path d="M60 140a40 40 0 0 0 80 0" fill="#1abc9c"/>
// //           <text x="100" y="190" fontSize="16" textAnchor="middle" fill="#4a4a4a">Success</text>
// //         </svg>
// //       ),
// //       position: "-bottom-32 -right-32",
// //       animation: { x: ["100%", "0%"], y: ["100%", "0%"], rotate: [-15, 0] }
// //     }
// //   ];

// //   return (
// //     <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden flex flex-col items-center justify-center">
// //       <motion.div
// //         className="absolute inset-0 pointer-events-none"
// //         animate={backgroundControls}
// //       />
// //       {/* Illustrations */}
// //       {illustrations.map((item, index) => (
// //         <motion.div
// //           key={index}
// //           initial={{ opacity: 0 }}
// //           animate={{ 
// //             opacity: 1,
// //             ...item.animation
// //           }}
// //           transition={{
// //             duration: 1.5,
// //             delay: index * 0.2,
// //             type: "spring",
// //             stiffness: 100
// //           }}
// //           className={`absolute ${item.position} w-64 h-64 pointer-events-none`}
// //         >
// //           {item.svg}
// //         </motion.div>
// //       ))}

// //       {/* Main content */}
// //       <div className="z-10 text-center px-4">
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           className="relative mb-12"
// //         >
// //           <motion.h1 
// //             className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
// //             animate={{ 
// //               backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
// //             }}
// //             transition={{ 
// //               duration: 5,
// //               repeat: Infinity,
// //               ease: "linear"
// //             }}
// //             style={{ 
// //               backgroundSize: "200% auto"
// //             }}
// //           >
// //             ATISHA
// //           </motion.h1>
// //         </motion.div>

// //         {!isInputVisible && (
// //           <motion.button
// //             className="group relative px-8 py-4 text-lg font-medium text-white overflow-hidden"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.5 }}
// //             onClick={() => setIsInputVisible(true)}
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-y-0 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:translate-y-1 group-hover:opacity-90 rounded-xl">
// //             </span>
// //             <span className="absolute inset-0 w-full h-full border-2 border-purple-600 rounded-xl">
// //             </span>
// //             <span className="relative flex items-center justify-center gap-2">
// //               Explore Your Future
// //               <Sparkles className="w-4 h-4" />
// //             </span>
// //             <motion.span
// //               className="absolute inset-0 rounded-xl bg-white"
// //               initial={{ scale: 0, opacity: 0.3 }}
// //               whileHover={{ scale: 2, opacity: 0 }}
// //               transition={{ duration: 0.4 }}
// //             />
// //           </motion.button>
// //         )}

// //         <AnimatePresence>
// //           {isInputVisible && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
// //                 <input
// //                   type="text"
// //                   value={career}
// //                   onChange={(e) => setCareer(e.target.value)}
// //                   placeholder="Enter a career path..."
// //                   className="w-full px-6 py-4 text-lg rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
// //                 />
// //                 <motion.button
// //                   type="submit"
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <motion.span
// //                     animate={{ 
// //                       background: [
// //                         "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
// //                         "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)"
// //                       ]
// //                     }}
// //                     transition={{ duration: 1, repeat: Infinity }}
// //                     className="absolute inset-0 rounded-lg"
// //                   />
// //                   <span className="relative z-10">Explore</span>
// //                   <motion.span
// //                     className="absolute inset-0 rounded-lg bg-white"
// //                     initial={{ scale: 0, opacity: 0.3 }}
// //                     whileHover={{ scale: 2, opacity: 0 }}
// //                     transition={{ duration: 0.4 }}
// //                   />
// //                 </motion.button>
// //               </form>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>

// //         <motion.p
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 0.8 }}
// //           className="mt-6 text-gray-600 text-lg"
// //         >
// //           Discover your perfect career path with AI-powered insights
// //         </motion.p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CareerLens;

// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Search } from 'lucide-react';

// // const CareerLens = () => {
// //   const [career, setCareer] = useState('');
// //   const [isInputVisible, setIsInputVisible] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Submitting career:', career);
// //     // Add your logic here to handle the career submission
// //   };

// //   const illustrations = [
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-indigo-500">
// //           <circle cx="12" cy="12" r="10" />
// //           <line x1="2" y1="12" x2="22" y2="12" />
// //           <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
// //         </svg>
// //       ),
// //       position: "top-0 left-0",
// //       animation: { x: ["-100%", "0%"], y: ["-100%", "0%"], rotate: [-15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-pink-500">
// //           <polygon points="12 2 2 7 12 12 22 7 12 2" />
// //           <polyline points="2 17 12 22 22 17" />
// //           <polyline points="2 12 12 17 22 12" />
// //         </svg>
// //       ),
// //       position: "top-0 right-0",
// //       animation: { x: ["100%", "0%"], y: ["-100%", "0%"], rotate: [15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-yellow-500">
// //           <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
// //           <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
// //           <line x1="6" y1="1" x2="6" y2="4" />
// //           <line x1="10" y1="1" x2="10" y2="4" />
// //           <line x1="14" y1="1" x2="14" y2="4" />
// //         </svg>
// //       ),
// //       position: "bottom-0 left-0",
// //       animation: { x: ["-100%", "0%"], y: ["100%", "0%"], rotate: [15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-green-500">
// //           <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
// //           <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
// //           <line x1="12" y1="22.08" x2="12" y2="12" />
// //         </svg>
// //       ),
// //       position: "bottom-0 right-0",
// //       animation: { x: ["100%", "0%"], y: ["100%", "0%"], rotate: [-15, 0] }
// //     }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden flex flex-col items-center justify-center">
// //       {illustrations.map((item, index) => (
// //         <motion.div
// //           key={index}
// //           initial={{ opacity: 0 }}
// //           animate={{ 
// //             opacity: 1,
// //             ...item.animation
// //           }}
// //           transition={{
// //             duration: 1.5,
// //             delay: index * 0.2,
// //             type: "spring",
// //             stiffness: 100
// //           }}
// //           className={`absolute ${item.position} w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-20`}
// //         >
// //           {item.svg}
// //         </motion.div>
// //       ))}

// //       <div className="z-10 text-center px-4">
// //         <motion.h1 
// //           className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-8"
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           ATISHA
// //         </motion.h1>

// //         <AnimatePresence>
// //           {!isInputVisible ? (
// //             <motion.button
// //               className="bg-white text-indigo-600 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.5 }}
// //               onClick={() => setIsInputVisible(true)}
// //             >
// //               Explore Your Future
// //             </motion.button>
// //           ) : (
// //             <motion.form
// //               onSubmit={handleSubmit}
// //               className="relative max-w-2xl mx-auto"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.5 }}
// //             >
// //               <input
// //                 type="text"
// //                 value={career}
// //                 onChange={(e) => setCareer(e.target.value)}
// //                 placeholder="Enter a career path..."
// //                 className="w-full px-6 py-4 text-lg rounded-full bg-white shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
// //               />
// //               <button
// //                 type="submit"
// //                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
// //               >
// //                 <Search size={24} />
// //               </button>
// //             </motion.form>
// //           )}
// //         </AnimatePresence>

// //         <motion.p
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 0.8 }}
// //           className="mt-6 text-gray-600 text-lg max-w-md mx-auto"
// //         >
// //           Discover your perfect career path with AI-powered insights
// //         </motion.p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CareerLens;


// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Search } from 'lucide-react';

// // const CareerLens = () => {
// //   const [career, setCareer] = useState('');
// //   const [isInputVisible, setIsInputVisible] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Submitting career:', career);
// //     // Add your logic here to handle the career submission
// //   };

// //   const illustrations = [
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-indigo-500">
// //           <circle cx="12" cy="12" r="10" />
// //           <line x1="2" y1="12" x2="22" y2="12" />
// //           <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
// //         </svg>
// //       ),
// //       position: "top-16 left-16",
// //       animation: { x: ["-25%", "0%"], y: ["-25%", "0%"], rotate: [-15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-pink-500">
// //           <polygon points="12 2 2 7 12 12 22 7 12 2" />
// //           <polyline points="2 17 12 22 22 17" />
// //           <polyline points="2 12 12 17 22 12" />
// //         </svg>
// //       ),
// //       position: "top-16 right-16",
// //       animation: { x: ["25%", "0%"], y: ["-25%", "0%"], rotate: [15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-yellow-500">
// //           <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
// //           <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
// //           <line x1="6" y1="1" x2="6" y2="4" />
// //           <line x1="10" y1="1" x2="10" y2="4" />
// //           <line x1="14" y1="1" x2="14" y2="4" />
// //         </svg>
// //       ),
// //       position: "bottom-16 left-16",
// //       animation: { x: ["-25%", "0%"], y: ["25%", "0%"], rotate: [15, 0] }
// //     },
// //     {
// //       svg: (
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-green-500">
// //           <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
// //           <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
// //           <line x1="12" y1="22.08" x2="12" y2="12" />
// //         </svg>
// //       ),
// //       position: "bottom-16 right-16",
// //       animation: { x: ["25%", "0%"], y: ["25%", "0%"], rotate: [-15, 0] }
// //     }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden flex flex-col items-center justify-center">
// //       {illustrations.map((item, index) => (
// //         <motion.div
// //           key={index}
// //           initial={{ opacity: 0 }}
// //           animate={{ 
// //             opacity: 1,
// //             ...item.animation
// //           }}
// //           transition={{
// //             duration: 1.5,
// //             delay: index * 0.2,
// //             type: "spring",
// //             stiffness: 100
// //           }}
// //           className={`absolute ${item.position} w-64 h-64 md:w-80 md:h-80 pointer-events-none opacity-30`}
// //         >
// //           <motion.div
// //             animate={{
// //               x: [0, Math.random() * 60 - 30, 0],
// //               y: [0, Math.random() * 60 - 30, 0],
// //               rotate: [0, Math.random() * 20 - 10, 0],
// //               scale: [1, 1.1, 1],
// //             }}
// //             transition={{
// //               duration: 15 + Math.random() * 5,
// //               repeat: Infinity,
// //               repeatType: "reverse",
// //               ease: "easeInOut",
// //             }}
// //           >
// //             <motion.div
// //               animate={{
// //                 scale: [1, 1.05, 1],
// //                 opacity: [0.7, 1, 0.7],
// //               }}
// //               transition={{
// //                 duration: 3,
// //                 repeat: Infinity,
// //                 repeatType: "reverse",
// //                 ease: "easeInOut",
// //               }}
// //             >
// //               {item.svg}
// //             </motion.div>
// //           </motion.div>
// //         </motion.div>
// //       ))}

// //       <div className="z-10 text-center px-4">
// //         <motion.h1 
// //           className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-8"
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           ATISHA
// //         </motion.h1>

// //         <AnimatePresence>
// //           {!isInputVisible ? (
// //             <motion.button
// //               className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.5 }}
// //               onClick={() => setIsInputVisible(true)}
// //             >
// //               <span className="relative z-10">Explore Your Future</span>
// //               <motion.div
// //                 className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// //                 initial={false}
// //                 animate={{ scale: [0.9, 1.1, 1] }}
// //                 transition={{ duration: 0.4 }}
// //               />
// //             </motion.button>
// //           ) : (
// //             <motion.form
// //               onSubmit={handleSubmit}
// //               className="relative max-w-2xl mx-auto"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.5 }}
// //             >
// //               <input
// //                 type="text"
// //                 value={career}
// //                 onChange={(e) => setCareer(e.target.value)}
// //                 placeholder="Enter a career path..."
// //                 className="w-full px-6 py-4 text-lg rounded-full bg-white shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
// //               />
// //               <button
// //                 type="submit"
// //                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
// //               >
// //                 <Search size={24} />
// //               </button>
// //             </motion.form>
// //           )}
// //         </AnimatePresence>

// //         <motion.p
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 0.8 }}
// //           className="mt-6 text-gray-600 text-lg max-w-md mx-auto"
// //         >
// //           Discover your perfect career path with AI-powered insights
// //         </motion.p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CareerLens;



// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, AlertCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const CareerLens = () => {
//   const [career, setCareer] = useState('');
//   const [isInputVisible, setIsInputVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:4000/api/careerLens/data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ career_name: career }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Received data:', data);

//       // Check if the received data is valid
//       if (!isValidCareerData(data)) {
//         throw new Error('Invalid career data received');
//       }

//       navigate('/lens-details', { state: { careerData: data } });
//     } catch (error) {
//       console.error('Error fetching career data:', error);
//       setError(error.message);
//       // Use fallback data if API call fails or returns invalid data
//       navigate('/lens-details', { state: { careerData: getFallbackData(career) } });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isValidCareerData = (data) => {
//     return (
//       data &&
//       typeof data === 'object' &&
//       data.name &&
//       data.description &&
//       Array.isArray(data.pros) &&
//       Array.isArray(data.cons) &&
//       Array.isArray(data.skills) &&
//       data.salary &&
//       Array.isArray(data.trend)
//     );
//   };

//   const getFallbackData = (careerName) => {
//     // Hardcoded fallback data
//     return {
//       name: careerName,
//       description: `This is a fallback description for ${careerName}.`,
//       pros: ["Fallback pro 1", "Fallback pro 2"],
//       cons: ["Fallback con 1", "Fallback con 2"],
//       skills: ["Fallback skill 1", "Fallback skill 2"],
//       salary: {
//         min_salary: 300000,
//         max_salary: 1000000,
//         median_salary: 600000,
//         currency: "INR",
//         period: "YEAR",
//       },
//       trend: [
//         { year: "2020", percentage: 5 },
//         { year: "2021", percentage: 6 },
//         { year: "2022", percentage: 7 },
//       ],
//       related_careers: ["Related Career 1", "Related Career 2"],
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden flex flex-col items-center justify-center">
//       <div className="z-10 text-center px-4">
//         <motion.h1 
//           className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Career Lens
//         </motion.h1>

//         <AnimatePresence>
//           {!isInputVisible ? (
//             <motion.button
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               onClick={() => setIsInputVisible(true)}
//             >
//               <span className="relative z-10">Explore Your Future</span>
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 initial={false}
//                 animate={{ scale: [0.9, 1.1, 1] }}
//                 transition={{ duration: 0.4 }}
//               />
//             </motion.button>
//           ) : (
//             <motion.form
//               onSubmit={handleSubmit}
//               className="relative max-w-2xl mx-auto"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//             >
//               <input
//                 type="text"
//                 value={career}
//                 onChange={(e) => setCareer(e.target.value)}
//                 placeholder="Enter a career path..."
//                 className="w-full px-6 py-4 text-lg rounded-full bg-white shadow-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
//                 disabled={isLoading}
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   >
//                     <Search size={24} />
//                   </motion.div>
//                 ) : (
//                   <Search size={24} />
//                 )}
//               </button>
//             </motion.form>
//           )}
//         </AnimatePresence>

//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-center"
//           >
//             <AlertCircle className="mr-2" size={20} />
//             <span>{error}</span>
//           </motion.div>
//         )}

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mt-6 text-gray-600 text-lg max-w-md mx-auto"
//         >
//           Discover your perfect career path with AI-powered insights
//         </motion.p>
//       </div>
//     </div>
//   );
// };

// export default CareerLens;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CareerLens = () => {
  const [career, setCareer] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/careerLens/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ career_name: career }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);

      if (!isValidCareerData(data)) {
        throw new Error('Invalid career data received');
      }

      navigate('/lens-details', { state: { careerData: data } });
    } catch (error) {
      console.error('Error fetching career data:', error);
      setError(error.message);
      navigate('/lens-details', { state: { careerData: getFallbackData(career) } });
    } finally {
      setIsLoading(false);
    }
  };

  const isValidCareerData = (data) => {
    return data && typeof data === 'object' && data.name;
  };

  const getFallbackData = (careerName) => {
    return {
      name: careerName,
      description: `Fallback description for ${careerName}.`,
      pros: ["Fallback pro 1", "Fallback pro 2"],
      cons: ["Fallback con 1", "Fallback con 2"],
      skills: ["Fallback skill 1", "Fallback skill 2"],
      salary: {
        min_salary: 300000,
        max_salary: 1000000,
        median_salary: 600000,
        currency: "INR",
        period: "YEAR",
      },
      trend: [
        { year: "2020", percentage: 5 },
        { year: "2021", percentage: 6 },
        { year: "2022", percentage: 7 },
      ],
      related_careers: ["Related Career 1", "Related Career 2"],
    };
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
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Search size={24} />
                  </motion.div>
                ) : (
                  <Search size={24} />
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-center"
          >
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </motion.div>
        )}

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

