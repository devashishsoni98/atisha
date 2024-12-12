import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCounselorsData, fetchStudentCounselorBookings } from "../api/CounselorBookingApi.jsx";
import CounselorListings from "../components/studentBrowsing/CounselorListings.jsx";
import SessionsLists from "../components/studentBrowsing/SessionLists.jsx";
import { fetchMentorsData, fetchStudentMentorBookings } from "../api/MentorBookingApi.jsx";
import MentorListings from "../components/studentBrowsing/MentorListings.jsx"; // Import MentorListings

const StudentBrowsing = () => {
    const [counselors, setCounselors] = useState([]);
    const [mentors, setMentors] = useState([]); // State for mentors
    const [studentSessions, setStudentSessions] = useState([]);
    const [studentRequests, setStudentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('browse counselor');

    const studentId = useSelector((state) => state.user.id) || localStorage.getItem('userId') ;

    console.log(studentId);
    

    useEffect(() => {
        async function loadCounselorData() {
            setLoading(true);
            try {
                const counselorsData = await fetchCounselorsData();
                const counselorBookingsData = await fetchStudentCounselorBookings(studentId);

                setCounselors(counselorsData || []);
                setStudentSessions(counselorBookingsData?.filter(booking => booking.status === 'approved' || booking.status === 'completed') || []);
                setStudentRequests(counselorBookingsData?.filter(booking => booking.status === 'pending') || []);
            } catch (error) {
                console.error("Error fetching counselor data:", error);
            } finally {
                setLoading(false);
            }
        }

        async function loadMentorData() {
            setLoading(true);
            try {
                const mentorsData = await fetchMentorsData();
                const mentorBookingsData = await fetchStudentMentorBookings(studentId);

                console.log("mentor: ",mentorsData)

                setMentors(mentorsData || []); // Set mentors data
                // Combine sessions and requests for mentors
                setStudentSessions(prevSessions => [
                    ...prevSessions,
                    ...mentorBookingsData?.filter(booking => booking.status === 'approved' || booking.status === 'completed') || []
                ]);
                setStudentRequests(prevRequests => [
                    ...prevRequests,
                    ...mentorBookingsData?.filter(booking => booking.status === 'pending') || []
                ]);
            } catch (error) {
                console.error("Error fetching mentor data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadCounselorData();
        loadMentorData();
    }, [studentId]);

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gray-100 px-6">
            <header className="text-blue-600 pt-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">Student Counseling Portal</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="mb-8 flex space-x-4">
                    {['browse counselor', 'browse mentors', 'sessions'].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={tabVariants}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'browse counselor' && (
                            <CounselorListings counselors={counselors} loading={loading} />
                        )}
                        {activeTab === 'browse mentors' && (
                            <MentorListings mentors={mentors} loading={loading} />
                        )}
                        {activeTab === 'sessions' && (
                            <SessionsLists sessions={studentSessions} loading={loading} />
                        )}
                        {/* Uncomment if you have a RequestsList component */}
                        {/*{activeTab === 'requests' && <RequestsList requests={studentRequests} loading={loading} />}*/}
                    </motion.div>
                </AnimatePresence>
            </main>


        </div>
    );
};

export default StudentBrowsing;