import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const EventPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, apiResponse } = location.state || {};

    if (!formData || !apiResponse) {
        navigate('/');
        return null;
    }

    const { recommendations } = apiResponse;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Event Preview</h2>
            <div className="grid grid-cols-2 gap-6">
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
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Back to Form
            </motion.button>
        </motion.div>
    );
};

export default EventPreview;

