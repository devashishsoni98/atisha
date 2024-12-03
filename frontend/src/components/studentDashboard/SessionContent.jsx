import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommonFunctions } from '../../utils/commonFunctions';
import axios from 'axios';
import { User, Mail, Calendar, MapPin, Phone, School, GraduationCap, LogOut, Bell, Home, LineChart, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';
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
export default SessionContent