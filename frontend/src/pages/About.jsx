"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Users, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import image1 from "../assets/logo1.png"
import image2 from "../assets/logo1.png"
import karan from "../assets/karan.jpg"
import aman from "../assets/aman.jpg"
import hiya from "../assets/hiya.png"
import jatin from "../assets/jatin.jpg"
import lavina from "../assets/lavina.jpg"
import devashish from "../assets/devashish.jpg"




export default function About() {
  const [activeIndex, setActiveIndex] = useState(0)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const teamMembers = [
    { name: "Hiya Gurbani", role: "Career Counselor", image: hiya },
    { name: "Lavina Sevani", role: "Industry Liaison", image: lavina },
    { name: "Jatin Nama", role: "Student Advisor", image: jatin },
    { name: "Devashish Soni", role: "Workshop Facilitator", image: devashish },
    { name: "Aman Jain", role: "Data Analyst", image: aman },
    { name: "Karan Sukhwal", role: "Marketing Specialist", image: karan }
  ]

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 2) % teamMembers.length)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 2 + teamMembers.length) % teamMembers.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-blue-800"
          {...fadeInUp}
        >
          About Our Career Counseling
        </motion.h1>

        <motion.p 
          className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto"
          {...fadeInUp}
        >
          Empowering students to make informed career decisions and achieve their professional goals since 2015.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            {...fadeInUp}
          >
            <img
              src={image1}
              alt="Career counseling session"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                We are dedicated to providing innovative solutions that empower students to thrive in their chosen careers. Our experienced team combines technical expertise with a deep understanding of the ever-evolving job market to offer tailored guidance and support.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            {...fadeInUp}
          >
            <img
              src={image2}
              alt="Students discussing career options"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Approach</h2>
              <p className="text-gray-600">
                We believe in the power of collaboration and innovation. Our agile approach and dedication to continuous improvement allow us to adapt to changing market conditions and deliver exceptional value to our students, helping them navigate their career paths with confidence.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          {...fadeInUp}
        >
          {[
            { icon: GraduationCap, title: "Expert Guidance", description: "Personalized advice from industry professionals" },
            { icon: Users, title: "Diverse Network", description: "Connect with peers and mentors across industries" },
            { icon: Award, title: "Success Stories", description: "Proven track record of student achievements" },
            { icon: TrendingUp, title: "Career Growth", description: "Strategies for long-term professional development" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-blue-800"
          {...fadeInUp}
        >
          Meet Our Team
        </motion.h2>

        <motion.div 
          className="mb-16 w-full max-w-6xl mx-auto"
          {...fadeInUp}
        >
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={prevSlide} 
              className="flex-shrink-0 bg-white rounded-full p-4 shadow-md hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous team members"
            >
              <ChevronLeft className="w-8 h-8 text-blue-800" />
            </button>

            <div className="flex-grow flex justify-center items-center">
              <AnimatePresence mode="popLayout">
                {teamMembers.slice(activeIndex, activeIndex + 2).map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="w-[calc(50%-1rem)] h-80 mx-2"
                    initial={{ opacity: 0, x: index === 0 ? -100 : 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: index === 0 ? 100 : -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full h-full p-4 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button 
              onClick={nextSlide} 
              className="flex-shrink-0 bg-white rounded-full p-4 shadow-md hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next team members"
            >
              <ChevronRight className="w-8 h-8 text-blue-800" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-blue-800 text-white rounded-lg shadow-xl p-8 text-center"
          {...fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Shape Your Future?</h2>
          <p className="text-xl mb-6">Let us help you navigate your career journey with confidence and clarity.</p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </div>
  )
}