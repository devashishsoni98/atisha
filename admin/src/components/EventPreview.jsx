import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const EventPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { formData, apiResponse } = location.state || {};

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else if (!formData || !apiResponse) {
            // navigate("/dashboard");
        }
    }, [formData, apiResponse, navigate, isAuthenticated]);

    if (!formData || !apiResponse) {
        return null;
    }

    const { recommendations } = apiResponse;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="font-semibold text-xl text-gray-800">Event Preview</span>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <span className="text-sm font-medium text-gray-500 mr-4">{user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="mb-6 flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back to Dashboard
                    </button>
                    <h2 className="text-2xl font-bold text-center">Event Preview</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                        <ul className="space-y-2">
                            <li><strong>Name:</strong> {formData.name}</li>
                            <li><strong>Description:</strong> {formData.description}</li>
                            <li><strong>Type:</strong> {formData.event_type}</li>
                            <li><strong>Start Date:</strong> {new Date(formData.start_date).toLocaleString()}</li>
                            <li><strong>End Date:</strong> {new Date(formData.end_date).toLocaleString()}</li>
                            <li><strong>Duration:</strong> {formData.duration} hours</li>
                            <li><strong>Capacity:</strong> {formData.capacity}</li>
                            <li><strong>Mode:</strong> {formData.event_mode}</li>
                            <li><strong>City:</strong> {formData.city}</li>
                            <li><strong>State:</strong> {formData.state}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-medium mb-2">Counselors</h4>
                                <ul className="list-disc list-inside">
                                    {recommendations.counselors_and_mentors.counselors.map((counselor, index) => (
                                        <li key={index}>{counselor.counselor_name} - {counselor.career_specialization}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2">Mentors</h4>
                                <ul className="list-disc list-inside">
                                    {recommendations.counselors_and_mentors.mentors.map((mentor, index) => (
                                        <li key={index}>{mentor.mentor_name} - {mentor.expertise}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2">Institutes</h4>
                                <ul className="list-disc list-inside">
                                    {recommendations.institutes.map((institute, index) => (
                                        <li key={index}>{institute.name} - {institute.city}, {institute.state}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EventPreview;

