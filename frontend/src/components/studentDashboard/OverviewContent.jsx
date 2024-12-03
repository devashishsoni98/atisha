import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 }
};


const OverviewContent = ({ studentData }) => {
  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
      <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
        <motion.h2 className="text-2xl font-bold mb-6 text-blue-800" variants={fadeIn}>Overview</motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">75% Complete</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-600">Sessions scheduled this week</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <ul className="list-disc list-inside">
              <li>Completed Career Aptitude Test</li>
              <li>Attended Virtual Career Fair</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition-colors">Book Session</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Update Profile</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OverviewContent;

