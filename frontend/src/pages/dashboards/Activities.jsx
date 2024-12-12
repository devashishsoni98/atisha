import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, Users, Plus, BookOpen, Briefcase, Heart, Video } from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

const slideIn = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
};

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [activityType, setActivityType] = useState('webinar');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        speaker: '',
        instructor: '',
        quizTitle: '',
        quizDescription: '',
        questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '' }],
        activityType: '',
    });

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/activities');
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    useEffect(() => {
        // Fetch activities from API

        fetchActivities();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '' }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    type: activityType,
                }),
            });

            if (response.ok) {
                const newActivity = await response.json();
                setActivities([...activities, newActivity]);
                setFormData({
                    title: '',
                    description: '',
                    date: '',
                    speaker: '',
                    instructor: '',
                    quizTitle: '',
                    quizDescription: '',
                    questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '' }],
                    activityType: '',
                });
                setShowForm(false);
                fetchActivities();
            } else {
                console.error('Failed to create activity');
            }
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };

    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden" variants={slideIn}>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <motion.h1 className="text-3xl font-bold text-gray-800" variants={fadeIn}>Activities</motion.h1>
                        <motion.button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Activity
                        </motion.button>
                    </div>
                    <AnimatePresence>
                        {showForm && (
                            <motion.form
                                onSubmit={handleSubmit}
                                className="bg-blue-50 p-6 rounded-lg mb-6"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Activity Type</label>
                                    <div className="mt-1 flex space-x-2">
                                        {['webinar', 'quiz', 'workshop', 'physical'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setActivityType(type)}
                                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                    activityType === type
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                            Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="date"
                                            id="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    {activityType === 'webinar' && (
                                        <div>
                                            <label htmlFor="speaker" className="block text-sm font-medium text-gray-700">
                                                Speaker
                                            </label>
                                            <input
                                                type="text"
                                                name="speaker"
                                                id="speaker"
                                                value={formData.speaker}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    )}
                                    {activityType === 'workshop' && (
                                        <div>
                                            <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                                                Instructor
                                            </label>
                                            <input
                                                type="text"
                                                name="instructor"
                                                id="instructor"
                                                value={formData.instructor}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    )}
                                    {activityType === 'quiz' && (
                                        <>
                                            <div>
                                                <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700">
                                                    Quiz Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="quizTitle"
                                                    id="quizTitle"
                                                    value={formData.quizTitle}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="quizDescription" className="block text-sm font-medium text-gray-700">
                                                    Quiz Description
                                                </label>
                                                <textarea
                                                    name="quizDescription"
                                                    id="quizDescription"
                                                    value={formData.quizDescription}
                                                    onChange={handleInputChange}
                                                    rows="3"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                ></textarea>
                                            </div>
                                            {formData.questions.map((question, index) => (
                                                <div key={index} className="border border-gray-200 p-4 rounded-md">
                                                    <h4 className="text-lg font-medium mb-2">Question {index + 1}</h4>
                                                    <div className="space-y-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Question"
                                                            value={question.question}
                                                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Option A"
                                                            value={question.optionA}
                                                            onChange={(e) => handleQuestionChange(index, 'optionA', e.target.value)}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Option B"
                                                            value={question.optionB}
                                                            onChange={(e) => handleQuestionChange(index, 'optionB', e.target.value)}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Option C"
                                                            value={question.optionC}
                                                            onChange={(e) => handleQuestionChange(index, 'optionC', e.target.value)}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Option D"
                                                            value={question.optionD}
                                                            onChange={(e) => handleQuestionChange(index, 'optionD', e.target.value)}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        />
                                                        <select
                                                            value={question.correctOption}
                                                            onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
                                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        >
                                                            <option value="">Select Correct Option</option>
                                                            <option value="A">A</option>
                                                            <option value="B">B</option>
                                                            <option value="C">C</option>
                                                            <option value="D">D</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addQuestion}
                                                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Add Question
                                            </button>
                                        </>
                                    )}
                                    {activityType === 'physical' && (
                                        <div>
                                            <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">
                                                Physical Activity Type
                                            </label>
                                            <input
                                                type="text"
                                                name="activityType"
                                                id="activityType"
                                                value={formData.activityType}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Yoga, Exercise, Sports"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Create Activity
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {activities.map((activity) => (
                            <motion.div
                                key={activity.id}
                                className="bg-white overflow-hidden shadow rounded-lg"
                                variants={slideIn}
                            >
                                <div className="p-5">
                                    <div className="flex items-center">
                                        {activity.type === 'webinar' && <Video className="h-8 w-8 text-blue-600" />}
                                        {activity.type === 'quiz' && <BookOpen className="h-8 w-8 text-blue-600" />}
                                        {activity.type === 'workshop' && <Briefcase className="h-8 w-8 text-blue-600" />}
                                        {activity.type === 'physical' && <Heart className="h-8 w-8 text-blue-600" />}
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">{activity.title}</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">{activity.type}</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3">
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            View details
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

