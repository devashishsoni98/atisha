import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import lines from "../assets/lines-pattern.png";
import hiya from "../assets/hiya.png";
import lavina from "../assets/lavina.jpg";
import jatin from "../assets/jatin.jpg";
import devashish from "../assets/devashish.jpg";
import aman from "../assets/aman.jpg";
import karan from "../assets/karan.jpg";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const teamMembers = [
    { name: "Hiya Gurbani", role: "Full Stack Developer", image: hiya },
    { name: "Lavina Sevani", role: "Full Stack Developer", image: lavina },
    { name: "Jatin Nama", role: "AI/ML Developer", image: jatin },
    { name: "Devashish Soni", role: "Full Stack Developer", image: devashish },
    { name: "Aman Jain", role: "Full Stack Developer", image: aman },
    { name: "Karan Sukhwal", role: "Research and Development", image: karan },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 2) % teamMembers.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 2 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-teal-800 via-teal-700 to-teal-800 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, opacity }}
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
          style={{
            backgroundImage: `url(${lines})`,
            backgroundSize: "cover",
          }}
          className="w-full h-full opacity-10"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
      >
        {[...Array(12)].map((_, i) => {
          const shapeType = i % 3;
          return (
            <motion.div
              key={i}
              className={`absolute bg-gradient-to-br from-white to-transparent mix-blend-overlay ${
                shapeType === 0
                  ? "clip-path-triangle"
                  : shapeType === 1
                  ? "clip-path-star"
                  : "rounded-full"
              }`}
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [Math.random() * 100, Math.random() * -100],
                y: [Math.random() * 100, Math.random() * -100],
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
              }}
            />
          );
        })}
      </motion.div>

      <div className="relative z-10">
        <section className="min-h-[100vh] flex items-center justify-center overflow-hidden relative">
          <div className="container mx-auto px-4 py-20 relative mb-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto mb-24"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Shaping Future
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    Careers
                  </motion.span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto mb-12"
              >
                Empowering students to make informed career decisions through
                innovative guidance and personalized support.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-teal-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:shadow-2xl"
                >
                  Start Your Journey
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        <section className="bg-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-teal-100 via-cyan-100 to-teal-200 rounded-3xl transform rotate-3 scale-105"
                  animate={{
                    rotate: [3, -3, 3],
                    scale: [1.05, 1.07, 1.05],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  className="relative bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-3xl shadow-xl"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <h2 className="text-4xl font-bold text-teal-800 mb-6">
                    Our Mission
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We are dedicated to providing innovative solutions that
                    empower students to thrive in their chosen careers. By leveraging advanced
                    technologies, such as AI-driven recommendations and data
                    analytics, we ensure that students receive personalized
                    career paths aligned with their unique skills, interests,
                    and goals. Our mission is to bridge the gap between
                    education and industry demands, equipping students with the
                    tools, resources, and confidence to succeed in competitive
                    environments.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-bl from-cyan-100 via-teal-100 to-cyan-200 rounded-3xl transform -rotate-3 scale-105"
                  animate={{
                    rotate: [-3, 3, -3],
                    scale: [1.05, 1.07, 1.05],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  className="relative bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-3xl shadow-xl"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3 className="text-3xl font-bold text-teal-800 mb-6">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-6">
                    {[
                      { icon: FaGraduationCap, text: "Expert Career Guidance" },
                      { icon: FaUsers, text: "Personalized Approach" },
                      { icon: FaChartLine, text: "Industry Insights" },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 * index }}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl"
                        whileHover={{
                          scale: 1.02,
                          x: 10,
                          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        <item.icon className="text-teal-600 text-2xl" />
                        <span className="text-lg font-medium text-gray-800">
                          {item.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-teal-50 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold text-center text-teal-800 mb-16"
            >
              Meet Our Team
            </motion.h2>

            <div className="flex items-center justify-center space-x-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition-all duration-300"
              >
                <FaChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="flex space-x-8">
                {[0, 1].map((offset) => (
                  <AnimatePresence key={offset} mode="wait">
                    <motion.div
                      key={(activeIndex + offset) % teamMembers.length}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      transition={{ duration: 0.6 }}
                      className="w-72 p-4"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden p-6"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className="relative w-40 h-40 mx-auto mb-4"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full transform rotate-6"></div>
                          <motion.div
                            className="relative rounded-full w-full h-full overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <img
                              src={
                                teamMembers[
                                  (activeIndex + offset) % teamMembers.length
                                ].image
                              }
                              alt={
                                teamMembers[
                                  (activeIndex + offset) % teamMembers.length
                                ].name
                              }
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          className="text-xl font-bold text-center text-teal-800 mb-2"
                        >
                          {
                            teamMembers[
                              (activeIndex + offset) % teamMembers.length
                            ].name
                          }
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                          className="text-center text-teal-600 font-medium"
                        >
                          {
                            teamMembers[
                              (activeIndex + offset) % teamMembers.length
                            ].role
                          }
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition-all duration-300"
              >
                <FaChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </section>

        <section className="relative py-16 bg-gradient-to-b from-teal-50 to-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4"
          >
            <div className="max-w-4xl mx-auto text-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-3xl transform rotate-1 scale-105"
              ></motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-white p-12 rounded-3xl shadow-xl"
              >
                <h2 className="text-4xl font-bold text-teal-800 mb-6">
                  Ready to Shape Your Future?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Let us help you navigate your career journey with confidence
                  and clarity.
                </p>
                <Link to="/">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(13, 148, 136, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                >
                  Get Started Today
                </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
