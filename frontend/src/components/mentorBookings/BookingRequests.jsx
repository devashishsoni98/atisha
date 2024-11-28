import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchBookingsForApproval, updateBookingStatus } from '../../api/MentorBookingApi.jsx';
import { formatTime, formatDate } from '../../utils/dateUtils.jsx';

export const BookingRequests = ({ mentorId }) => {
    const [bookingRequests, setBookingRequests] = useState([]);

    useEffect(() => {
        fetchBookingsForApproval(mentorId).then(setBookingRequests);
    }, [mentorId]);

    const handleApproveBooking = async (id) => {
        await updateBookingStatus(id, 'approved');
        setBookingRequests(prev => prev.filter(request => request.id !== id));
    };

    const handleRejectBooking = async (id) => {
        await updateBookingStatus(id, 'rejected');
        setBookingRequests(prev => prev.filter(request => request.id !== id));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {bookingRequests.map((request) => (
                    <motion.div
                        key={request.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold">Booking Request</h3>
                            <p className="text-sm text-gray-500">{formatDate(request.date)} at {formatTime(request.start_time)}</p>
                        </div>
                        <div className="p-4">
                            <p className="font-medium">{request.student.name}</p>
                            <p className="text-sm text-gray-500">{request.student.email}</p>
                        </div>
                        <div className="p-4 bg-gray-50 flex justify-between">
                            <button
                                onClick={() => handleRejectBooking(request.id)}
                                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleApproveBooking(request.id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Approve
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

