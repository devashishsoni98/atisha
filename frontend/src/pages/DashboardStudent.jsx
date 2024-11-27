import  { useEffect, useState } from 'react';
import { User, Mail, Calendar, MapPin, Phone, School, GraduationCap, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

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

const DashboardStudent = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [studentData, setStudentData] = useState();

    const [loading, setLoading] = useState(true);

    const token = useSelector((state) => state.user.token) || localStorage.getItem('token')
    const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId')
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Token:', token, 'UserID:', userId);
        if (!token) {
            console.error("No token found. Redirecting to signup.")
            navigate('/signup')
            return
        }

        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/student/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json()
                console.log("Fetched student data:", data)
                setStudentData(data)
                setLoading(false);
            } catch (err) {
                console.error("Error fetching student data:", err)
                // setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchStudentData()
    }, [token, userId, navigate])
    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return <ProfileContent studentData={studentData} />;
            case 'Interest':
                return <InterestContent interests={studentData.studentInterest} />;
            case 'Session':
                return <SessionContent sessions={[]} />;
            case 'Activities':
                return <ActivitiesContent activities={[]} />;
            default:
                return <ProfileContent studentData={studentData} />;
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
                            src={studentData.studentPersonalInfo.image}
                            alt={studentData.name}
                            className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        />
                        <motion.h2 className="text-xl font-bold text-blue-800" variants={fadeIn}>{studentData.name}</motion.h2>
                        <motion.p className="text-blue-600" variants={fadeIn}>Student</motion.p>
                    </div>

                    <nav className="space-y-2">
                        {['Profile', 'Interest', 'Session', 'Activities'].map((tab) => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full py-3 px-4 rounded-xl text-left transition-colors ${
                                    activeTab === tab
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-blue-100 text-gray-700'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tab}
                            </motion.button>
                        ))}
                        <Link
                            to="/"
                            onClick={() => console.log('Logout clicked')}
                            className="w-full py-3 px-4 rounded-xl text-left text-red-500 hover:bg-red-50 mt-4 flex items-center"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Link>
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
};

const ProfileItem = ({ icon, label, value }) => (
    <motion.div className="flex items-center p-4 bg-blue-50 rounded-lg" variants={slideIn}>
        <div className="flex-shrink-0 mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
    </motion.div>
);

const ProfileContent = ({ studentData }) => (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
        <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden" variants={slideIn}>
            <div className="p-8">
                <motion.h1 className="text-3xl font-bold text-gray-800 mb-6" variants={fadeIn}>Student Profile</motion.h1>
                <div className="grid md:grid-cols-2 gap-6">
                    <ProfileItem icon={<User className="text-blue-500" />} label="Full Name" value={studentData.name} />
                    <ProfileItem icon={<Mail className="text-blue-500" />} label="Email" value={studentData.email} />
                    <ProfileItem icon={<Calendar className="text-blue-500" />} label="Date of Birth" value={new Date(studentData.studentPersonalInfo.dob).toLocaleDateString()} />
                    <ProfileItem icon={<User className="text-blue-500" />} label="Gender" value={studentData.studentPersonalInfo.gender} />
                    <ProfileItem icon={<MapPin className="text-blue-500" />} label="Location" value={studentData.studentPersonalInfo.location} />
                    <ProfileItem icon={<Phone className="text-blue-500" />} label="Contact Number" value={studentData.studentPersonalInfo.contactNumber} />
                    <ProfileItem icon={<School className="text-blue-500" />} label="School Name" value={studentData.studentEducation.schoolName} />
                    <ProfileItem icon={<GraduationCap className="text-blue-500" />} label="Class" value={studentData.studentEducation.class.toString()} />
                </div>
            </div>
        </motion.div>
    </motion.div>
);

const InterestContent = ({ interests }) => (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
        <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
            <motion.h2 className="text-2xl font-bold mb-6 text-blue-800" variants={fadeIn}>Interests</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interests.subjectIds.map((subjectId) => (
                    <motion.div
                        key={`subject-${subjectId}`}
                        className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.h3 className="font-medium text-blue-700" variants={fadeIn}>Subject {subjectId}</motion.h3>
                    </motion.div>
                ))}
                {interests.sportIds.map((sportId) => (
                    <motion.div
                        key={`sport-${sportId}`}
                        className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.h3 className="font-medium text-blue-700" variants={fadeIn}>Sport {sportId}</motion.h3>
                    </motion.div>
                ))}
                {interests.hobbyIds.map((hobbyId) => (
                    <motion.div
                        key={`hobby-${hobbyId}`}
                        className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.h3 className="font-medium text-blue-700" variants={fadeIn}>Hobby {hobbyId}</motion.h3>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </motion.div>
);

const SessionContent = ({ sessions }) => (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
        <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
            <motion.h2 className="text-2xl font-bold mb-6 text-blue-800" variants={fadeIn}>Book a Session today</motion.h2>
            <div className="flex items-center justify-between mb-8">
                <div className="w-1/3">
                    <motion.img
                        src="/placeholder.svg"
                        alt="Study illustration"
                        className="w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    />
                </div>
                <div className="w-2/3 pl-8">
                    <motion.button
                        className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book Session
                    </motion.button>
                </div>
            </div>
            <motion.div className="space-y-4" variants={fadeIn}>
                {sessions.map((session, index) => (
                    <motion.div
                        key={index}
                        className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
                        variants={slideIn}
                    >
                        <div>
                            <h3 className="font-medium text-blue-700">{session.title}</h3>
                            <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                        </div>
                        <motion.button
                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </motion.div>
);

const ActivitiesContent = ({ activities }) => (
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



export default DashboardStudent;

