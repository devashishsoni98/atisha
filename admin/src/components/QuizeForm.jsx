import React, { useState } from 'react';

const QuizForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        quizTitle: '',
        quizDescription: '',
        questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: '' }],
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = new Date(formData.date).toISOString();
        const quizData = {
            title: formData.title,
            description: formData.description,
            type: 'quiz',
            date: formattedDate,
            quizData: {
                title: formData.quizTitle,
                description: formData.quizDescription,
                questions: formData.questions,
            },
        };
        onSubmit(quizData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Activity Title
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
                        Activity Description
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
                        required
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
                        required
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
                    Create Quiz
                </button>
            </div>
        </form>
    );
};

export default QuizForm;

