

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from "react-redux";
import { Availability } from "../components/mentorBookings/Availability.jsx";
import { BookingRequests } from "../components/mentorBookings/BookingRequests.jsx";
import { ExistingBookings } from "../components/mentorBookings/ExistingBookings.jsx";
import CustomTabs from "../ui/Tabs.jsx";


const MentorBookings = () => {
    const mentorId = useSelector((state) => state.user.id) || localStorage.getItem('userId');
    const [activeTab, setActiveTab] = useState('availability');

    console.log(mentorId);

    const tabs = [
        { label: 'Availability', content: 'availability' },
        { label: 'Requests', content: 'requests' },
        { label: 'Bookings', content: 'bookings' },

    ];

    const handleTabChange = (index) => {
        setActiveTab(tabs[index].content);
    };

    const tabContent = {
        availability: <Availability mentorId={mentorId} />,
        requests: <BookingRequests mentorId={mentorId} />,
        bookings: <ExistingBookings mentorId={mentorId} />,

    };

    return (
        <div className="min-h-screen bg-gray-50 rounded-3xl">


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    <CustomTabs tabs={tabs} onTabChange={handleTabChange} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tabContent[activeTab]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default MentorBookings;

