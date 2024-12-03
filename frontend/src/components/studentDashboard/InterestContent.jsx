import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommonFunctions } from '../../utils/commonFunctions';
import axios from 'axios';
import { User, Mail, Calendar, MapPin, Phone, School, GraduationCap, LogOut, Bell, Home, LineChart, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';
const InterestContent = ({ interests }) => {
    if (!interests) {
        return <div>No interests available</div>; // Handle case where interests are not available
    }

    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
                <motion.h2 className="text-2xl font-bold mb-6 text-blue-800" variants={fadeIn}>Interests</motion.h2>

                {/* Subjects Section */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-blue-700">Subjects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {interests.subjects.map((subject) => (
                            <motion.div key={`subject-${subject.id}`} className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <motion.h4 className="font-medium text-blue-700">{subject.subject_name}</motion.h4>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Hobbies Section */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-blue-700">Hobbies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {interests.hobbies.map((hobby) => (
                            <motion.div key={`hobby-${hobby.id}`} className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <motion.h4 className="font-medium text-blue-700">{hobby.hobby_name}</motion.h4>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sports Section */}
                <div>
                    <h3 className="text-xl font-semibold text-blue-700">Sports</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {interests.sports.map((sport) => (
                            <motion.div key={`sport-${sport.id}`} className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <motion.h4 className="font-medium text-blue-700">{sport.sport_name}</motion.h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
export default InterestContent