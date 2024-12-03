import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from "../store/userActions.js"; // Import useSelector to access Redux state

export default function StudentOnboarding() {

  const token = localStorage.getItem('token');
  console.log(token);
  const userId =localStorage.getItem('userId'); // Retrieve user ID from Redux store
  console.log(userId);
  const roleType =  localStorage.getItem('userType');
  console.log(roleType);
    // Determine the dashboard link based on role type
    const dashboardLink = () => {
      switch (roleType) {
      case 'institute':
      return `/dashboard/institute/${userId}`;
      case 'counselor':
      return `/dashboard/counselor/${userId}`;
      case 'mentor':
      return `/dashboard/mentor/${userId}`;
      default:
      return `/dashboard/student/${userId}`;
      }
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex flex-col">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-blue-600">Welcome to Career Counseling</h1>
            <Link
              to={dashboardLink()} // Use userId in the URL
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Let's Get Started!</h2>
            <p className="text-xl text-blue-600 max-w-2xl">
              We're excited to help you on your career journey. Complete your profile and explore our services to make the most of your experience.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: 'Complete Your Profile', icon: '👤' },
                { title: 'Explore Career Paths', icon: '🚀' },
                { title: 'Book a Counseling Session', icon: '📅' },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 inline-block">{step.icon}</span>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Step {index + 1}</h3>
                    <p className="text-blue-600">{step.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <footer className="bg-white shadow-lg mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-600">Need help? Contact our support team at support@careercounseling.com</p>
        </div>
      </footer>
    </div>
  );
}
