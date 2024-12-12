import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, BookOpen, Zap, Calendar, Users, ChevronRight } from 'lucide-react';
import { GoProjectRoadmap } from "react-icons/go";
import lines from "../assets/bg.jpg";
import illus2 from "../assets/home2.png";
import illus3 from "../assets/home3.png";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    { 
      title: "AI-Powered Personalized Career Guidance",
      description: "Unlock your perfect career path with AI-driven insights that understand your unique strengths, interests, and ambitions.",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-100",
    },
    { 
      title: "Career Roadmaps with Interactive Tools",
      description: "Explore clear, interactive roadmaps that guide you step-by-step toward your dream career—each path designed to make your journey easier and more exciting!",
      icon: <GoProjectRoadmap className="w-8 h-8 text-green-500" />,
      color: "bg-green-100",
    },
    { 
      title: "AI-Powered Career Chatbot",
      description: "Have questions? Get instant answers from our AI-powered chatbot, always ready to guide you through your career exploration journey.",
      icon: <MessageCircle className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-100",
    },
  ];

  const events = [
    { title: "Career Fair 2024", date: "March 15, 2024", attendees: 500, color: "bg-blue-500" },
    { title: "Resume Writing Workshop", date: "April 2, 2024", attendees: 100, color: "bg-green-500" },
    { title: "Industry Expert Panel", date: "April 20, 2024", attendees: 250, color: "bg-purple-500" },
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
    <motion.div 
      className="bg-gray-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <img src={lines} alt="Background Pattern" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Continuous Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <motion.path 
              fill="#f9fafb" 
              fillOpacity="1" 
              initial={{ d: "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,186.7C960,171,1056,149,1152,144C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col justify-center items-center h-full">
          <motion.h1 
            className="text-5xl sm:text-6xl font-extrabold text-center mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Where Dreams Meet Guidance: Shape Your Future
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-center mb-12 max-w-3xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            AI-Powered Career Tools, Expert Guidance, Endless Opportunities
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <Link to="/quiz">
              <motion.button
                className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Your Journey
              </motion.button>
            </Link>
            <motion.button
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>
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
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
                onHoverStart={() => setActiveFeature(index)}
                onHoverEnd={() => setActiveFeature(null)}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-12 -mt-12"
                  animate={{
                    scale: activeFeature === index ? [1, 1.2, 1] : 1,
                    rotate: activeFeature === index ? [0, 90, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-md"
                    animate={{
                      rotate: activeFeature === index ? [0, 360] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
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
              <Link to="/carrer/roadmaps/explore" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center group">
                Explore Careers
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight />
                </motion.span>
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
              src={illus2}
              alt="Career exploration illustration"
              className="max-w-full h-auto ml-6"
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
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${event.color} h-2`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.date}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Users className="w-4 h-4 mr-1" />
                    {event.attendees} attendees
                  </div>
                  <Link to="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-300 ease-in-out group">
                    Learn More
                    <motion.span
                      className="ml-1"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Link to="/sessions/explore" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center group">
              View All Events
              <motion.span
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight />
              </motion.span>
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
                At the heart of our mission, we are committed to empowering students with the guidance and resources they need to make informed career choices. In alignment with the vision of NEP 2020, we aim to provide holistic education by integrating career guidance into the school curriculum. Our platform is developed in collaboration with the Ministry of Education, under the Samagra Shiksha Abhiyan, Department of School Education & Literacy (DoSEL), ensuring that every student receives the support necessary to unlock their full potential.
              </p>
              <Link to="/about" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center group">
                Learn More
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight />
                </motion.span>
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={illus3}
                  alt="About us illustration"
                  width={300}
                  height={200}
                  className="max-w-full h-auto mt-8"
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
                    whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
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
                <Link to="/testimonials" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-flex items-center mt-4 group">
                  Read More Stories
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight />
                  </motion.span>
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
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Services</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Career Quiz</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition">
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
    </motion.div>
  );
}

