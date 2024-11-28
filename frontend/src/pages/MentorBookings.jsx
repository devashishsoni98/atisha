import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSelector } from "react-redux";
import {Availability} from "../components/mentorBookings/Availability.jsx";
import {BookingRequests} from "../components/mentorBookings/BookingRequests.jsx";
import {ExistingBookings} from "../components/mentorBookings/ExistingBookings.jsx";

const MentorBookings = () => {
    const mentorId = useSelector((state) => state.user.id) || localStorage.getItem('userId');
    const [activeTab, setActiveTab] = useState('availability');

    console.log(mentorId);

    const tabContent = {
        availability: <Availability mentorId={mentorId} />,
        requests: <BookingRequests mentorId={mentorId} />,
        bookings: <ExistingBookings mentorId={mentorId} />
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-600 text-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    {['availability', 'requests', 'bookings'].map((tab) => (
                        <button
                            key={tab}
                            className={`mr-4 pb-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tabContent[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default MentorBookings;

