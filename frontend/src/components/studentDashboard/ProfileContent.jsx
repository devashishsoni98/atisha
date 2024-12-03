import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommonFunctions } from '../../utils/commonFunctions';
import axios from 'axios';
import { User, Mail, Calendar, MapPin, Phone, School, GraduationCap, LogOut, Bell, Home, LineChart, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';
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

const ProfileContent = ({studentData}) => (

    
    studentData ? (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden" variants={slideIn}>
                <div className="p-8">
                    <motion.h1 className="text-3xl font-bold text-gray-800 mb-6" variants={fadeIn}>Student Profile
                    </motion.h1>
                    <div className="grid md:grid-cols-2 gap-6">
                        <ProfileItem icon={<User className="text-blue-500"/>} label="Full Name"
                                     value={studentData.name}/>
                        <ProfileItem icon={<Mail className="text-blue-500"/>} label="Email" value={studentData.email}/>
                        <ProfileItem icon={<Calendar className="text-blue-500"/>} label="Date of Birth"
                                     value={new Date(studentData.student_personal_info.dob).toLocaleDateString()}/>
                        <ProfileItem icon={<User className="text-blue-500"/>} label="Gender"
                                     value={studentData.student_personal_info.gender}/>
                        <ProfileItem icon={<MapPin className="text-blue-500"/>} label="Location"
                                     value={studentData.student_personal_info.location}/>
                        <ProfileItem icon={<Phone className="text-blue-500"/>} label="Contact Number"
                                     value={studentData.student_personal_info.contact_number}/>
                        <ProfileItem icon={<School className="text-blue-500"/>} label="School Name"
                                     value={studentData.student_education.school_name}/>
                        <ProfileItem icon={<GraduationCap className="text-blue-500"/>} label="Class"
                                     value={studentData.student_education.class.toString()}/>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    ) : null // Render nothing if studentData is null
);

export default ProfileContent