import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { formatTime, formatDate } from '../../utils/dateUtils.jsx';
import {fetchBookingsForStarting} from "../../api/CounselorBookingApi.jsx";

export const ExistingBookings = ({ counselorId }) => {
    const [existingBookings, setExistingBookings] = useState([]);
    const [bookingFilter, setBookingFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookingsForStarting(counselorId).then(setExistingBookings);
    }, [counselorId]);

    const filteredBookings = existingBookings.filter(booking =>
        (bookingFilter === 'all' || booking.status.toLowerCase() === bookingFilter) &&
        (booking.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Existing Bookings</h2>
                <div className="flex gap-4">
                    <select
                        value={bookingFilter}
                        onChange={(e) => setBookingFilter(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="all">All Bookings</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
            </div>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {filteredBookings.map((booking) => (
                    <motion.div
                        key={booking.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-semibold">Booking</h3>
                            <p className="text-sm text-gray-500">{formatDate(booking.date)} at {formatTime(booking.start_time)}</p>
                        </div>
                        <div className="p-4">
                            <p className="font-medium">{booking.student.name}</p>
                            <p className="text-sm text-gray-500">{booking.student.email}</p>
                            <p className="mt-2 text-sm font-semibold">Status: {booking.status}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

