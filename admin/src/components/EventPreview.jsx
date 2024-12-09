// import React, { useEffect } from "react";
// import { motion } from 'framer-motion';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../store/authSlice';

// const EventPreview = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { user, isAuthenticated } = useSelector((state) => state.auth);
//     const { formData, apiResponse } = location.state || {};

//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate("/login");
//         } else if (!formData || !apiResponse) {
//             // navigate("/dashboard");
//         }
//     }, [formData, apiResponse, navigate, isAuthenticated]);

//     if (!formData || !apiResponse) {
//         return null;
//     }

//     const { recommendations } = apiResponse;

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate('/login');
//     };

//     const handleBack = () => {
//         navigate('/dashboard');
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <header className="bg-white shadow-lg">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16">
//                         <div className="flex">
//                             <div className="flex-shrink-0 flex items-center">
//                                 <span className="font-semibold text-xl text-gray-800">Event Preview</span>
//                             </div>
//                         </div>
//                         <div className="hidden sm:ml-6 sm:flex sm:items-center">
//                             <span className="text-sm font-medium text-gray-500 mr-4">{user?.name}</span>
//                             <button
//                                 onClick={handleLogout}
//                                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
//             >
//                 <div className="mb-6 flex justify-between items-center">
//                     <button
//                         onClick={handleBack}
//                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                         Back to Dashboard
//                     </button>
//                     <h2 className="text-2xl font-bold text-center">Event Preview</h2>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <h3 className="text-xl font-semibold mb-4">Event Details</h3>
//                         <ul className="space-y-2">
//                             <li><strong>Name:</strong> {formData.name}</li>
//                             <li><strong>Description:</strong> {formData.description}</li>
//                             <li><strong>Type:</strong> {formData.event_type}</li>
//                             <li><strong>Start Date:</strong> {new Date(formData.start_date).toLocaleString()}</li>
//                             <li><strong>End Date:</strong> {new Date(formData.end_date).toLocaleString()}</li>
//                             <li><strong>Duration:</strong> {formData.duration} hours</li>
//                             <li><strong>Capacity:</strong> {formData.capacity}</li>
//                             <li><strong>Mode:</strong> {formData.event_mode}</li>
//                             <li><strong>City:</strong> {formData.city}</li>
//                             <li><strong>State:</strong> {formData.state}</li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
//                         <div className="space-y-4">
//                             <div>
//                                 <h4 className="text-lg font-medium mb-2">Counselors</h4>
//                                 <ul className="list-disc list-inside">
//                                     {recommendations.counselors_and_mentors.counselors.map((counselor, index) => (
//                                         <li key={index}>{counselor.counselor_name} - {counselor.career_specialization}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div>
//                                 <h4 className="text-lg font-medium mb-2">Mentors</h4>
//                                 <ul className="list-disc list-inside">
//                                     {recommendations.counselors_and_mentors.mentors.map((mentor, index) => (
//                                         <li key={index}>{mentor.mentor_name} - {mentor.expertise}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div>
//                                 <h4 className="text-lg font-medium mb-2">Institutes</h4>
//                                 <ul className="list-disc list-inside">
//                                     {recommendations.institutes.map((institute, index) => (
//                                         <li key={index}>{institute.name} - {institute.city}, {institute.state}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default EventPreview;



import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../store/authSlice';
import { Calendar, Clock, Users, MapPin, Tag, Monitor, ArrowLeft, LogOut } from 'lucide-react';

const EventPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { event, recommendations } = location.state || {};
    const [requestStatus, setRequestStatus] = useState({});

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else if (!event || !recommendations) {
            navigate("/dashboard");
        }
    }, [event, recommendations, navigate, isAuthenticated]);

    if (!event || !recommendations) {
        return null;
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    const sendRequest = async (userId, role) => {
        try {
            const response = await axios.post('http://localhost:7000/events/send_request', {
                event_id: event.id,
                user_id: userId,
                role: role
            });
            console.log(response.data);
            

            if(response.status === 201)
            setRequestStatus({ ...requestStatus, [`${role}-${userId}`]: 'Request sent successfully' });
        } catch (error) {
            setRequestStatus({ ...requestStatus, [`${role}-${userId}`]: 'Failed to send request' });
        }
    };

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-indigo-700 hover:text-indigo-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
                    <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 mr-4">{user?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                    className="max-w-7xl mx-auto"
                >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-8">
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Event Details</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { icon: Calendar, label: "Date", value: `${new Date(event.start_date).toLocaleDateString()} - ${new Date(event.end_date).toLocaleDateString()}` },
                                                { icon: Clock, label: "Time", value: `${new Date(event.start_date).toLocaleTimeString()} - ${new Date(event.end_date).toLocaleTimeString()}` },
                                                { icon: Tag, label: "Type", value: event.event_type },
                                                { icon: Users, label: "Capacity", value: event.capacity },
                                                { icon: Monitor, label: "Mode", value: event.event_mode },
                                                { icon: MapPin, label: "Location", value: `${event.city}, ${event.state}` },
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                                                    <item.icon className="w-6 h-6 text-indigo-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                                        <p className="text-base text-gray-900">{item.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <section>
                                        <h3 className="text-xl font-semibold mb-2 text-indigo-700">Description</h3>
                                        <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
                                    </section>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Recommendations</h2>
                                    <div className="space-y-6">
                                        {['counselors', 'mentors', 'institutes'].map((category) => (
                                            <div key={category}>
                                                <h3 className="text-lg font-medium mb-2 text-gray-800 capitalize">{category}</h3>
                                                <ul className="space-y-3">
                                                    {(category === 'institutes' ? recommendations[category] : recommendations.counselors_and_mentors[category]).map((item, index) => (
                                                        <li key={index} className="bg-gray-50 p-3 rounded-lg">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <span className="font-medium text-indigo-700">{item[`${category.slice(0, -1)}_name`] || item.name}</span>
                                                                    <p className="text-sm text-gray-600">
                                                                        {category === 'institutes' 
                                                                            ? `${item.city}, ${item.state} - Student Body: ${item.student_body}`
                                                                            : `${item[category === 'counselors' ? 'career_specialization' : 'expertise'] || 'N/A'} - ${item.location}`
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <button
                                                                    onClick={() => sendRequest(item.user_id, category.slice(0, -1))}
                                                                    className="px-3 py-1 text-sm text-white bg-indigo-700 rounded-full hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                                                >
                                                                    Request
                                                                </button>
                                                            </div>
                                                            {requestStatus[`${category.slice(0, -1)}-${item.user_id}`] && (
                                                                <p className="mt-2 text-sm text-green-600">{requestStatus[`${category.slice(0, -1)}-${item.user_id}`]}</p>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default EventPreview;

