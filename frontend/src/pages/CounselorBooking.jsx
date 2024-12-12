// import  { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {Availability} from "../components/couselorBooking/Availability.jsx";
// import {BookingRequests} from "../components/couselorBooking/BoookingRequests.jsx";
// import {ExistingBookings} from "../components/couselorBooking/ExistingBookings.jsx";
// import {useSelector} from "react-redux";
//
//
// const CounselorBooking = () => {
//     const counselorId =  useSelector((state) => state.user.id) || localStorage.getItem('userId') ; // Hardcoded for this example
//     const [activeTab, setActiveTab] = useState('availability');
//
//     const tabContent = {
//         availability: <Availability counselorId={counselorId} />,
//         requests: <BookingRequests counselorId={counselorId} />,
//         bookings: <ExistingBookings counselorId={counselorId} />
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50 rounded-3xl ">
//             {/* <header className="bg-blue-600 text-white py-6 rounded-t-3xl">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold">Counselor Dashboard</h1>
//                 </div>
//             </header> */}
//
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="mb-8">
//                     {['availability', 'requests', 'bookings'].map((tab) => (
//                         <button
//                             key={tab}
//                             className={`mr-4 pb-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
//                             onClick={() => setActiveTab(tab)}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     ))}
//                 </div>
//
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={activeTab}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         {tabContent[activeTab]}
//                     </motion.div>
//                 </AnimatePresence>
//             </main>
//         </div>
//     );
// };
//
// export default CounselorBooking;
//


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Availability } from "../components/couselorBooking/Availability.jsx";
import { BookingRequests } from "../components/couselorBooking/BoookingRequests.jsx";
import { ExistingBookings } from "../components/couselorBooking/ExistingBookings.jsx";
import { useSelector } from "react-redux";
import CustomTabs from "../ui/Tabs.jsx";


const CounselorBooking = () => {
    const counselorId = useSelector((state) => state.user.id) || localStorage.getItem('userId');
    const [activeTab, setActiveTab] = useState('availability');

    const tabs = [
        { label: 'Availability', content: 'availability' },
        { label: 'Requests', content: 'requests' },
        { label: 'Bookings', content: 'bookings' },

    ];

    const handleTabChange = (index) => {
        setActiveTab(tabs[index].content);
    };

    const tabContent = {
        availability: <Availability counselorId={counselorId} />,
        requests: <BookingRequests counselorId={counselorId} />,
        bookings: <ExistingBookings counselorId={counselorId} />,
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

export default CounselorBooking;

