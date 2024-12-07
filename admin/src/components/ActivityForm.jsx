import React, { useState } from 'react';

const ActivityForm = ({ activityType, setActivityType, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        speaker: '',
        instructor: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = new Date(formData.date).toISOString();
        onSubmit({ ...formData, date: formattedDate, type: activityType });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Type</label>
                <div className="mt-1 flex space-x-2">
                    {['webinar', 'workshop', 'quiz'].map((type) => (
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
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Activity
                </button>
            </div>
        </form>
    );
};

export default ActivityForm;
