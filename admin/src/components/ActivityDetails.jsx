import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ActivityDetails = ({ activity, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{activity.title}</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold">Type</h4>
                    <p>{activity.type}</p>
                </div>
                <div>
                    <h4 className="font-semibold">Date</h4>
                    <p>{new Date(activity.date).toLocaleString()}</p>
                </div>
                {activity.speaker && (
                    <div>
                        <h4 className="font-semibold">Speaker</h4>
                        <p>{activity.speaker}</p>
                    </div>
                )}
                {activity.instructor && (
                    <div>
                        <h4 className="font-semibold">Instructor</h4>
                        <p>{activity.instructor}</p>
                    </div>
                )}
            </div>
            {activity.type === 'quiz' && activity.quizData && (
                <div className="mt-6">
                    <h4 className="text-xl font-semibold mb-2">Quiz Details</h4>
                    <p className="mb-4">{activity.quizData.description}</p>
                    <h5 className="font-semibold mb-2">Questions:</h5>
                    <ul className="list-decimal pl-6">
                        {activity.quizData.questions.map((question, index) => (
                            <li key={index} className="mb-4">
                                <p className="font-medium">{question.question}</p>
                                <ul className="list-disc pl-6 mt-2">
                                    <li>A: {question.optionA}</li>
                                    <li>B: {question.optionB}</li>
                                    <li>C: {question.optionC}</li>
                                    <li>D: {question.optionD}</li>
                                </ul>
                                <p className="mt-2 text-sm text-gray-600">Correct Answer: {question.correctOption}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
};

export default ActivityDetails;

