import  React, {useEffect, useState} from 'react';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Phone,
    School,
    GraduationCap,
    LogOut,
    DownloadIcon,
    CalendarIcon, ClockIcon, UserIcon, XIcon
} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {motion, AnimatePresence} from 'framer-motion';
import {useCommonFunctions} from '../../utils/commonFunctions';
import axios from 'axios';


const sampleSessions = {
    upcoming: [
        {
            title: "Career Planning Session",
            date: "2023-06-15",
            time: "14:00",
            duration: 60,
            counselor_name: "Dr. Emily Johnson"
        },
        {
            title: "Study Skills Workshop",
            date: "2023-06-18",
            time: "10:00",
            duration: 90,
            counselor_name: "Prof. Michael Brown"
        },
    ],
    attended: [
        {
            title: "Academic Progress Review",
            date: "2023-06-01",
            time: "11:00",
            counselor_name: "Dr. Jane Smith",
            student_name: "John Doe",
            session_date: "2023-06-01",
            session_time: "11:00",
            duration: 60,
            objective: "Review academic progress and set goals for the upcoming semester",
            topics_discussed: "GPA improvement, course selection, study habits",
            strengths_identified: "Strong analytical skills, good time management",
            areas_for_improvement: "Participation in class discussions, seeking help when needed",
            career_alignment: "Current course load aligns well with career goals in data science",
            action_items: [
                "Create a study schedule for the upcoming exams",
                "Meet with academic advisor to discuss course selection",
                "Join a study group for challenging courses"
            ],
            recommendations: [
                "Consider taking an advanced statistics course next semester",
                "Explore internship opportunities in data analysis",
                "Attend upcoming career fair to network with potential employers"
            ],
            follow_up_plan: "Schedule a follow-up session in 4 weeks to review progress on action items"
        },
        {
            title: "Personal Development Session",
            date: "2023-05-25",
            time: "15:30",
            counselor_name: "Prof. John Doe",
            student_name: "Jane Smith",
            session_date: "2023-05-25",
            session_time: "15:30",
            duration: 45,
            objective: "Address time management concerns and reduce stress levels",
            topics_discussed: "Time management techniques, stress reduction strategies, work-life balance",
            strengths_identified: "High motivation, clear long-term goals",
            areas_for_improvement: "Prioritization of tasks, setting realistic expectations",
            career_alignment: "Current extracurricular activities support career goals in marketing",
            action_items: [
                "Implement a daily planning routine",
                "Practice mindfulness exercises for 10 minutes each day",
                "Break large projects into smaller, manageable tasks"
            ],
            recommendations: [
                "Use a digital calendar to track assignments and deadlines",
                "Join a student organization related to marketing to gain practical experience",
                "Consider reducing course load if stress levels remain high"
            ],
            follow_up_plan: "Check-in via email in 2 weeks, schedule another session if needed"
        },
    ],
};

const fadeIn = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
};

const slideIn = {
    initial: {x: -20, opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: 20, opacity: 0}
};

const DashboardStudent = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [studentData, setStudentData] = useState(null); // Initialize as null

    const [loading, setLoading] = useState(true);
    const {handleLogout} = useCommonFunctions();

    const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
    const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.error("No token found. Redirecting to signup.");
            navigate('/signup');
            return;
        }

        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/student/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': ` Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`errorData.message || HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched student data:", data);
                setStudentData(data); // Set fetched data
            } catch (err) {
                console.error("Error fetching student data:", err);
            } finally {
                setLoading(false); // Set loading to false here
            }
        };

        fetchStudentData();
    }, [token, userId, navigate]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return <ProfileContent studentData={studentData}/>;
            case 'Interest':
                return <InterestContent interests={studentData?.student_interest}/>;
            case 'Session':
                return <SessionContent sessions={sampleSessions}/>;
            case 'Activities':
                return <ActivitiesContent activities={[]}/>;
            default:
                return <ProfileContent studentData={studentData}/>;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div className="min-h-screen bg-blue-50" initial="initial" animate="animate" exit="exit"
                    variants={fadeIn}>
            <div className="flex">
                {/* Sidebar */}
                <motion.div className="w-64 min-h-screen bg-white p-6 shadow-lg" variants={slideIn}>
                    <div className="flex flex-col items-center mb-8">
                        <motion.img
                            src={studentData?.student_personal_info.image}
                            alt={studentData?.name}
                            className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4"
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{type: 'spring', stiffness: 260, damping: 20}}
                        />
                        <motion.h2 className="text-xl font-bold text-blue-800"
                                   variants={fadeIn}>{studentData?.name}</motion.h2>
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
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                {tab}
                            </motion.button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 px-4 rounded-xl text-left text-red-500 hover:bg-red-50 mt-4 flex items-center"
                        >
                            <LogOut className="w-4 h-4 mr-2"/>
                            Logout
                        </button>
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

const ProfileItem = ({icon, label, value}) => (
    <motion.div className="flex items-center p-4 bg-blue-50 rounded-lg" variants={slideIn}>
        <div className="flex-shrink-0 mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
    </motion.div>
);

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

const InterestContent = ({interests}) => (
    interests ? (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
                <motion.h2 className="text-2xl font-bold mb-6 text-blue-800" variants={fadeIn}>Interests</motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {interests.subject_ids?.map((subject_id) => (
                        <motion.div
                            key={`subject-${subject_id}`}
                            className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <motion.h3 className="font-medium text-blue-700">Subject {subject_id}</motion.h3>
                        </motion.div>
                    ))}
                    {interests.sport_ids.map((sport_id) => (
                        <motion.div
                            key={`sport-${sport_id}`}
                            className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <motion.h3 className="font-medium text-blue-700">Sport {sport_id}</motion.h3>
                        </motion.div>
                    ))}
                    {interests.hobby_ids.map((hobby_id) => (
                        <motion.div
                            key={`hobby-${hobby_id}`}
                            className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue300 transition-colors"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <motion.h3 className="font-medium text-blue-700">Hobby {hobby_id}</motion.h3>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    ) : null // Render nothing if interests is null
);


const SessionContent = () => {
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [sessions, setSessions] = useState([]);
    const userId = useSelector((state) => state.user.userId || localStorage.getItem('userId'));

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/counselor-booking/get_bookings_for_student/${userId}`);
                console.log(response.data);

                setSessions(response.data);
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };
        fetchSessions();
    }, [userId]);

    const openReportDialog = async (report) => {
        console.log("report", report);

        try {
            const response = await axios.get(`http://localhost:4000/api/session-reports/counselor-booking/${report.id}`);
            console.log("report i wanted:", response.data);
            setSelectedReport(response.data);
            setIsReportDialogOpen(true);
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    };

    const formatTime = (timeString) => {
        return new Date(timeString).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    };

    const upcomingSessions = sessions.filter(session => session.status === 'approved');
    const attendedSessions = sessions.filter(session => session.status === 'completed');

    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
                <div className="flex justify-between items-center mb-6">
                    <motion.h2 className="text-2xl font-bold text-blue-800" variants={fadeIn}>Your Sessions</motion.h2>
                    <Link to="/student-browsing"
                          className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-xl transition-colors">
                        Book New Session
                    </Link>
                </div>

                <motion.div className="space-y-4" variants={fadeIn}>
                    <h3 className="font-semibold text-lg text-blue-700 mb-2">Upcoming Sessions</h3>
                    {upcomingSessions.map((session) => (
                        <motion.div
                            key={session.id}
                            className="bg-blue-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                            variants={slideIn}
                        >
                            <div>
                                <h4 className="font-medium text-blue-700">Session with {session.counselor.name}</h4>
                                <p className="text-sm text-gray-600">{formatDate(session.date)} at {formatTime(session.start_time)}</p>
                                <p className="text-sm text-gray-600">Duration: {
                                    Math.round((new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / (1000 * 60))
                                } minutes</p>
                            </div>
                            <motion.button
                                className="mt-2 md:mt-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                Join
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div className="space-y-4 mt-8" variants={fadeIn}>
                    <h3 className="font-semibold text-lg text-blue-700 mb-2">Attended Sessions</h3>
                    {attendedSessions.map((session) => (
                        <motion.div
                            key={session.id}
                            className="bg-green-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                            variants={slideIn}
                        >
                            <div>
                                <span>{session.id}</span>
                                <h4 className="font-medium text-green-700">Session with {session.counselor.name}</h4>
                                <p className="text-sm text-gray-600">{formatDate(session.date)} at {formatTime(session.start_time)}</p>
                                <p className="text-sm text-gray-600">Counselor: {session.counselor.name}</p>
                            </div>
                            <motion.button
                                className="mt-2 md:mt-0 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={() => openReportDialog(session)}
                            >
                                View Report
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {isReportDialogOpen && (
                    <ReportDialog
                        report={selectedReport}
                        onClose={() => setIsReportDialogOpen(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ReportDialog = ({ onClose, report }) => {
    if (!report) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (timeString) => {
        return new Date(timeString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const printReport = () => {
        const printContents = document.getElementById('report-content').innerHTML; // Get the content to print
        const originalContents = document.body.innerHTML; // Store original contents

        // Create a new window for printing
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Report</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>'); // Add any styles you need
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContents); // Write the content to the new window
        printWindow.document.write('</body></html>');
        printWindow.document.close(); // Close the document for writing
        printWindow.print(); // Trigger the print dialog
        document.body.innerHTML = originalContents; // Restore original contents
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 space-y-6"  id="report-content">
                    <div className="border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Counseling Session Report</h1>
                        <p className="text-gray-600">Generated on: {formatDate(new Date().toISOString())}</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Session Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p><strong>Date:</strong> {formatDate(report.session_date)}</p>
                                <p><strong>Time:</strong> {formatTime(report.counselor_bookings.start_time)} - {formatTime(report.counselor_bookings.end_time)}</p>
                                <p><strong>Duration:</strong> {report.duration} minutes</p>
                            </div>
                            <div>
                                <p><strong>Counselor:</strong> {report.counselor_name}</p>
                                <p><strong>Student:</strong> {report.student_name}</p>
                                <p><strong>Status:</strong> {report.counselor_bookings.status}</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Session Overview</h2>
                        <div>
                            <p><strong>Objective:</strong> {report.objective}</p>
                            <p><strong>Topics Discussed:</strong> {report.topics_discussed}</p>
                            <p><strong>Student Concerns:</strong> {report.student_concerns}</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Assessment</h2>
                        <div>
                            <p><strong>Strengths Identified:</strong> {report.strengths_identified}</p>
                            <p><strong>Areas for Improvement:</strong> {report.areas_for_improvement}</p>
                            <p><strong>Career Alignment:</strong> {report.career_alignment}</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Action Items</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            {report.action_items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Recommendations</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            {report.recommendations.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Follow-up Plan</h2>
                        <p>{report.follow_up_plan}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Additional Notes</h2>
                        <p>{report.additional_notes}</p>
                    </section>

                </div>
                    <div className="flex justify-end space-x-4 mt-8 ">
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            onClick={() => printReport()}
                        >
                            Print Report
                        </button>
                    </div>
            </motion.div>
        </motion.div>
    );
};


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


export default DashboardStudent;
