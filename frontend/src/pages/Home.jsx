// import React from "react";
// import {Link } from 'react-router-dom'
// import { ArrowRight, MessageCircle, BookOpen, Zap, Calendar, Users, ChevronRight } from 'lucide-react';



// export default function Home() {
//   const features = [
//     { 
//       title: "Interactive Content", 
//       description: "Engage with our AI-powered quizzes and assessments to discover your ideal career path.",
//       icon: <Zap className="w-8 h-8 text-blue-500" />,
//       color: "bg-blue-100",
//     },
//     { 
//       title: "AI-Powered Chatbot", 
//       description: "Get instant answers to your career questions from our intelligent chatbot assistant.",
//       icon: <MessageCircle className="w-8 h-8 text-green-500" />,
//       color: "bg-green-100",
//     },
//     { 
//       title: "Digital Career Library", 
//       description: "Access a vast collection of resources, guides, and information on various career paths.",
//       icon: <BookOpen className="w-8 h-8 text-purple-500" />,
//       color: "bg-purple-100",
//     },
//   ];

//   const events = [
//     { title: "Career Fair 2024", date: "March 15, 2024", attendees: 500 },
//     { title: "Resume Writing Workshop", date: "April 2, 2024", attendees: 100 },
//     { title: "Industry Expert Panel", date: "April 20, 2024", attendees: 250 },
//   ];

//   const testimonials = [
//     { name: "Sarah L.", text: "This platform helped me discover my true passion. I'm now pursuing a career I love!" },
//     { name: "Michael R.", text: "The AI chatbot provided invaluable guidance when I was at a career crossroads." },
//   ];

//   return (
//     <div className="bg-gray-50 overflow-hidden">
//       {/* Hero Section */}
//       <section className={`heroSection relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-32 px-4 sm:px-6 lg:px-8`}>
//         <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-8 md:mb-0">
//             <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
//               Discover Your Ideal Career Path
//             </h1>
//             <p className="text-xl sm:text-2xl mb-10 max-w-3xl">
//               Unlock your potential with AI-powered career guidance and expert counseling. Start your journey to professional success today.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link href="#" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105">
//                 Take Your Career Quiz
//               </Link>
//               <Link href="#" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
//                 Explore Careers
//               </Link>
//             </div>
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <img
//               src="/placeholder.svg?height=400&width=400"
//               alt="Career guidance illustration"
//               width={400}
//               height={400}
//               className="max-w-full h-auto"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-7xl mx-auto relative z-10">
//           <h2 className="text-4xl font-bold text-center mb-16">
//             Empower Your Career Journey
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className={`${feature.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative overflow-hidden`}
//               >
//                 <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-12 -mt-12" />
//                 <div className="relative z-10">
//                   <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-md">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
//                   <p className="text-gray-700">{feature.description}</p>
//                   <Link href="#" className="mt-6 inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300 ease-in-out">
//                     Learn More
//                     <ArrowRight className="ml-2 w-4 h-4" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Explore Careers Section */}
//       <section className="bg-blue-50 py-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-8 md:mb-0">
//             <h2 className="text-4xl font-bold mb-6">Explore Exciting Career Paths</h2>
//             <p className="text-xl text-gray-600 mb-8">Discover a world of opportunities and find the perfect career match for your skills and passions.</p>
//             <Link href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center">
//               Explore Careers
//               <ArrowRight className="ml-2" />
//             </Link>
//           </div>
//           <div className="md:w-1/2">
//             <img
//               src="/placeholder.svg?height=300&width=400"
//               alt="Career exploration illustration"
//               width={400}
//               height={300}
//               className="max-w-full h-auto"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Workshops and Events Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-7xl mx-auto relative z-10">
//           <h2 className="text-4xl font-bold text-center mb-16">
//             Upcoming Workshops & Events
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             {events.map((event, index) => (
//               <div 
//                 key={index}
//                 className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
//               >
//                 <Calendar className="w-8 h-8 text-blue-500 mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
//                 <p className="text-gray-600 mb-2">{event.date}</p>
//                 <div className="flex items-center text-sm text-gray-500 mb-4">
//                   <Users className="w-4 h-4 mr-1" />
//                   {event.attendees} attendees
//                 </div>
//                 <Link href="#" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-200 transition duration-300 ease-in-out inline-flex items-center">
//                   Learn More
//                   <ChevronRight className="ml-1 w-4 h-4" />
//                 </Link>
//               </div>
//             ))}
//           </div>
//           <div className="text-center">
//             <Link href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center">
//               View All Events
//               <ArrowRight className="ml-2" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* About Us and Testimonials Section */}
//       <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             <div>
//               <h2 className="text-3xl font-bold mb-6">About Us</h2>
//               <p className="text-gray-600 mb-6">
//                 We are dedicated to helping individuals discover their ideal career paths through innovative AI-powered tools and expert guidance. Our mission is to empower you to make informed decisions about your professional future.
//               </p>
//               <Link href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center">
//                 Learn More
//                 <ArrowRight className="ml-2" />
//               </Link>
//               <img
//                 src="/placeholder.svg?height=200&width=300"
//                 alt="About us illustration"
//                 width={300}
//                 height={200}
//                 className="mt-8 max-w-full h-auto"
//               />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
//               {testimonials.map((testimonial, index) => (
//                 <div 
//                   key={index}
//                   className="bg-white p-6 rounded-lg shadow-md mb-6"
//                 >
//                   <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
//                     <p className="font-semibold">{testimonial.name}</p>
//                   </div>
//                 </div>
//               ))}
//               <Link href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center mt-4">
//                 Read More Stories
//                 <ArrowRight className="ml-2" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Career Counseling</h3>
//             <p className="text-gray-400">Empowering your career journey</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li><Link href="#" className="text-gray-400 hover:text-white transition">Home</Link></li>
//               <li><Link href="#" className="text-gray-400 hover:text-white transition">About Us</Link></li>
//               <li><Link href="#" className="text-gray-400 hover:text-white transition">Services</Link></li>
//               <li><Link href="#" className="text-gray-400 hover:text-white transition">Contact</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Resources</h4>
//             <ul className="space-y-2">
//               <li><Link href="#" className="text-gray-400 hover:text-white transition">Career Quiz</Link></li>
//               <li><Link href="#" className="text-gray-400 hover:text-white transition">Blog</Link></li>
//               <li><Link href="#" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
//             <div className="flex space-x-4">
//               <Link href="#" className="text-gray-400 hover:text-white transition">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//                 </svg>
//               </Link>
//               <Link href="#" className="text-gray-400 hover:text-white transition">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//                 </svg>
//               </Link>
//               <Link href="#" className="text-gray-400 hover:text-white transition">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
//           <p>&copy; 2024 Career Counseling. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }


'use client'

import React from "react";
import {Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, BookOpen, Zap, Calendar, Users, ChevronRight } from 'lucide-react';



export default function Home() {
  const features = [
    { 
      title: "Interactive Content", 
      description: "Engage with our AI-powered quizzes and assessments to discover your ideal career path.",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-100",
    },
    { 
      title: "AI-Powered Chatbot", 
      description: "Get instant answers to your career questions from our intelligent chatbot assistant.",
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      color: "bg-green-100",
    },
    { 
      title: "Digital Career Library", 
      description: "Access a vast collection of resources, guides, and information on various career paths.",
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-100",
    },
  ];

  const events = [
    { title: "Career Fair 2024", date: "March 15, 2024", attendees: 500 },
    { title: "Resume Writing Workshop", date: "April 2, 2024", attendees: 100 },
    { title: "Industry Expert Panel", date: "April 20, 2024", attendees: 250 },
  ];

  const testimonials = [
    { name: "Sarah L.", text: "This platform helped me discover my true passion. I'm now pursuing a career I love!" },
    { name: "Michael R.", text: "The AI chatbot provided invaluable guidance when I was at a career crossroads." },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`heroSection relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-32 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6"
              variants={fadeInUp}
            >
              Discover Your Ideal Career Path
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl mb-10 max-w-3xl"
              variants={fadeInUp}
            >
              Unlock your potential with AI-powered career guidance and expert counseling. Start your journey to professional success today.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <Link href="#" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105">
                Take Your Career Quiz
              </Link>
              <Link href="#" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                Explore Careers
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Career guidance illustration"
              width={400}
              height={400}
              className="max-w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empower Your Career Journey
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className={`${feature.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative overflow-hidden`}
                variants={fadeInUp}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-12 -mt-12" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                  <Link href="#" className="mt-6 inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300 ease-in-out group">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore Careers Section */}
      <motion.section 
        className="bg-blue-50 py-20 px-4 sm:px-6 lg:px-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Explore Exciting Career Paths
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Discover a world of opportunities and find the perfect career match for your skills and passions.
            </motion.p>
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Link href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center group">
                Explore Careers
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Career exploration illustration"
              width={400}
              height={300}
              className="max-w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Workshops and Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Upcoming Workshops & Events
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {events.map((event, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                variants={fadeInUp}
              >
                <Calendar className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.date}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  {event.attendees} attendees
                </div>
                <Link href="#" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-200 transition duration-300 ease-in-out inline-flex items-center group">
                  Learn More
                  <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Link href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center group">
              View All Events
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Us and Testimonials Section */}
      <motion.section 
        className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 mb-6">
                We are dedicated to helping individuals discover their ideal career paths through innovative AI-powered tools and expert guidance. Our mission is to empower you to make informed decisions about your professional future.
              </p>
              <Link href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center group">
                Learn More
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="About us illustration"
                  width={300}
                  height={200}
                  className="mt-8 max-w-full h-auto"
                />
              </motion.div>
            </motion.div>
            <div>
              <motion.h2 
                className="text-3xl font-bold mb-6"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                Testimonials
              </motion.h2>
              <motion.div
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md mb-6"
                    variants={fadeInUp}
                  >
                    <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
                <Link href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center mt-4 group">
                  Read More Stories
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Career Counseling</h3>
            <p className="text-gray-400">Empowering your career journey</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Services</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Career Quiz</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Career Counseling. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}