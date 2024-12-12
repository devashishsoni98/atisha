import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import man from "../assets/man.png";
import man1 from "../assets/man2.png";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Computer Science Graduate",
    image: man,
    quote:
      "The career guidance I received was invaluable. It helped me land my dream job at a top tech company!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Administration Student",
    image: man1,
    quote:
      "The counselors here truly care about your success. They provided personalized advice that changed my career trajectory.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Recent Law School Graduate",
    image: man,
    quote:
      "I was unsure about my career path after law school, but the guidance I received here gave me clarity and confidence.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Patel",
    role: "Engineering Professional",
    image: man1,
    quote:
      "Even as an experienced professional, I found the career counseling incredibly helpful for planning my next career move.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between ${
      index % 2 === 0 ? "lg:translate-y-8" : ""
    }`}
  >
    <div>
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <Quote className="w-8 h-8 text-indigo-400 mb-2" />
      <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <span className="text-sm text-gray-500">Verified Graduate</span>
    </div>
  </motion.div>
);

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-indigo-900"
        >
          Voices of Success
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto"
        >
          Hear from our students who have transformed their careers with our
          guidance
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who have found their path with our expert
            guidance.
          </p>
            <Link to="/">
          <button className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
            </Link>
        </motion.div>
      </div>
    </div>
  );
}
