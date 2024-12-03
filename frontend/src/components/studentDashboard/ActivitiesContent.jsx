import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommonFunctions } from '../../utils/commonFunctions';
import axios from 'axios';
import { User, Mail, Calendar, MapPin, Phone, School, GraduationCap, LogOut, Bell, Home, LineChart, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';

const ActivitiesContent = ({activities}) => (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
        <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
            <motion.h2 className="text-2xl font-bold mb-6 text-blue-800" variants={fadeIn}>Your Activities</motion.h2>
            <motion.div className="space-y-4" variants={fadeIn}>
                {activities.map((activity, index) => (
                    <motion.div
                        key={index}
                        className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
                        variants={slideIn}
                    >
                        <div>
                            <h3 className="font-medium text-blue-700">{activity.title}</h3>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            activity.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                activity.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-blue-100 text-blue-600'
                        }`}>
              {activity.status}
            </span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </motion.div>
);
export default ActivitiesContent