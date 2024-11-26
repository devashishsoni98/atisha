import React, { useEffect, useState } from 'react';
import { Building2, Calendar, PieChart, GraduationCap, LogOut, MapPin, Phone, Mail, Clock, Users, BookOpen, School } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommonFunctions } from '../../utils/commonFunctions';

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

export default function InstituteDashboard() {
    const [activeTab, setActiveTab] = useState('Profile');
    const [instituteData, setInstituteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { handleLogout } = useCommonFunctions();

    const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
    const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Token:', token, 'UserID:', userId);
        if (!token) {
            console.error("No token found. Redirecting to signup.");
            navigate('/signup');
            return;
        }

        const fetchInstituteData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/institute/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched institute data:", data);
                setInstituteData(data);
            } catch (err) {
                console.error("Error fetching institute data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInstituteData();
    }, [token, userId, navigate]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return <ProfileContent instituteData={instituteData} />;
            case 'Institute Details':
                return <DetailsContent instituteData={instituteData} />;
            case 'Activities':
                return <ActivitiesContent activities={[]} />;
            case 'Analysis':
                return <AnalysisContent analysisData={[]} />;
            default:
                return <ProfileContent instituteData={instituteData} />;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div className="min-h-screen bg-blue-50" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <div className="flex">
                {/* Sidebar */}
                <motion.div className="w-64 min-h-screen bg-white p-6 shadow-lg" variants={slideIn}>
                    <div className="flex flex-col items-center mb-8">
                        <motion.img
                            src={instituteData?.image_url || "/placeholder.svg?height=128&width=128"}
                            alt={instituteData?.name}
                            className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        />
                        <motion.h2 className="text-xl font-bold text-blue-800" variants={fadeIn}>{instituteData?.name}</motion.h2>
                        <motion.p className="text-blue-600" variants={fadeIn}>Educational Institute</motion.p>
                    </div>
                    
                    <nav className="space-y-2">
                        {[
                            { name: 'Profile', icon: <Building2 className="w-4 h-4" /> },
                            { name: 'Institute Details', icon: <School className="w-4 h-4" /> },
                            { name: 'Activities', icon: <Calendar className="w-4 h-4" /> },
                            { name: 'Analysis', icon: <PieChart className="w-4 h-4" /> }
                        ].map((item) => (
                            <motion.button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full py-3 px-4 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                                    activeTab === item.name
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-blue-100 text-gray-700'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </motion.button>
                        ))}
                        <motion.button
                            onClick={handleLogout}
                            className="w-full py-3 px-4 rounded-xl text-left text-red-500 hover:bg-red-50 mt-4 flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </motion.button>
                    </nav>
                </motion.div>

                {/* Main Content */}
                <motion.div className="flex-1 p-8" variants={fadeIn}>
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}

function ProfileContent({ instituteData }) {
    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden" variants={slideIn}>
                <div className="p-8">
                    <motion.h1 className="text-3xl font-bold text-gray-800 mb-6" variants={fadeIn}>Institute Profile</motion.h1>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Accessing institute data according to the new structure */}
                        <ProfileItem icon={<Building2 className="text-blue-500" />} label="Institute Name" value={instituteData?.name} />
                        <ProfileItem icon={<Mail className="text-blue-500" />} label="Email" value={instituteData?.user.email} />
                        <ProfileItem icon={<MapPin className="text-blue-500" />} label="Address" value={instituteData?.address || 'N/A'} />
                        <ProfileItem icon={<Phone className="text-blue-500" />} label="Contact Number" value={instituteData?.contact_number || 'N/A'} />
                        <ProfileItem icon={<Clock className="text-blue-500" />} label="Established Year" value={instituteData?.establish_year ? instituteData.establish_year.toString() : 'N/A'} />
                        <ProfileItem icon={<Building2 className="text-blue-500" />} label="Type" value={instituteData?.institute_type || 'N/A'} />
                        <ProfileItem icon={<Users className="text-blue-500" />} label="Student Body Size" value={instituteData?.student_body || 'N/A'} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function DetailsContent({ instituteData }) {
    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            {/* Additional details content can be added here */}
        </motion.div>
    );
}

function ActivitiesContent({ activities }) {
    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            {/* Activities content can be added here */}
        </motion.div>
    );
}

function AnalysisContent({ analysisData }) {
    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            {/* Analysis content can be added here */}
        </motion.div>
    );
}

function ProfileItem({ icon, label, value }) {
    return (
        <motion.div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0 mr-4">{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-lg font-semibold text-gray-800">{value}</p>
            </div>
        </motion.div>
    );
}