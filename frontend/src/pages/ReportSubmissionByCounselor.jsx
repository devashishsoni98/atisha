import { useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";


const ReportSubmissionByCounselor = () => {
    
  const userId = useSelector((state) => state.user.id) || localStorage.getItem("userId");
    const [report, setReport] = useState({
        student_id: 6,
        counselor_id: userId,
        mentor_id: null,
        session_date: '',
        session_time: '',
        student_name: '',
        counselor_name: null,
        duration: 0,
        objective: '',
        topics_discussed: '',
        student_concerns: null,
        strengths_identified: null,
        areas_for_improvement: null,
        career_alignment: null,
        action_items: [''],
        recommendations: [''],
        follow_up_plan: null,
        additional_notes: null,
        created_at: new Date().toISOString(),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'session_date') {
            const formattedDate = new Date(value).toISOString();
            setReport(prev => ({ ...prev, [name]: formattedDate }));
        } else if (name === 'session_time') {
            const combinedDateTime = new Date(`${report.session_date.split('T')[0]}T${value}`);
            setReport(prev => ({ ...prev, [name]: combinedDateTime.toISOString() }));
        } else if (name === 'duration') {
            setReport(prev => ({ ...prev, [name]: parseInt(value) }));
        } else if (name.includes('action_items') || name.includes('recommendations')) {
            const [fieldName, index] = name.split('-');
            setReport(prev => ({
                ...prev,
                [fieldName]: prev[fieldName].map((item, i) => i === parseInt(index) ? value : item)
            }));
        } else {
            setReport(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayInputKeyDown = (e, fieldName, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setReport(prev => ({
                ...prev,
                [fieldName]: [
                    ...prev[fieldName].slice(0, index + 1),
                    '',
                    ...prev[fieldName].slice(index + 1)
                ]
            }));
            setTimeout(() => {
                document.getElementById(`${fieldName}-${index + 1}`).focus();
            }, 0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/session-reports', report);
            console.log('Report submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-6">Session Report</h1>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Basic Details</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="counselor_name" className="block text-sm font-medium text-gray-700">Counselor Name</label>
                                <input
                                    type="text"
                                    id="counselor_name"
                                    name="counselor_name"
                                    value={report.counselor_name || ''}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="student_name" className="block text-sm font-medium text-gray-700">Student Name</label>
                                <input
                                    type="text"
                                    id="student_name"
                                    name="student_name"
                                    value={report.student_name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="session_date" className="block text-sm font-medium text-gray-700">Session Date</label>
                                <input
                                    type="date"
                                    id="session_date"
                                    name="session_date"
                                    value={report.session_date.split('T')[0]}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="session_time" className="block text-sm font-medium text-gray-700">Session Time</label>
                                <input
                                    type="time"
                                    id="session_time"
                                    name="session_time"
                                    value={report.session_time.split('T')[1]?.substring(0, 5) || ''}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Session Duration (minutes)</label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    placeholder="e.g., 60"
                                    value={report.duration}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Session Overview */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Session Overview</h2>
                        {[
                            { label: "Objective", name: "objective", placeholder: "Briefly state the purpose of the session" },
                            { label: "Topics Discussed", name: "topics_discussed", placeholder: "List or describe the key topics covered during the session" },
                            { label: "Student Concerns/Queries", name: "student_concerns", placeholder: "Highlight specific concerns raised by the student, if any" }
                        ].map(({ label, name, placeholder }) => (
                            <div key={name}>
                                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                                <textarea
                                    id={name}
                                    name={name}
                                    rows={3}
                                    placeholder={placeholder}
                                    value={report[name] || ''}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                ></textarea>
                            </div>
                        ))}
                    </div>

                    {/* Counselor's Observations */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Counselor's Observations</h2>
                        {[
                            { label: "Strengths Identified", name: "strengths_identified", placeholder: "What are the student's strengths, based on the discussion?" },
                            { label: "Areas for Improvement", name: "areas_for_improvement", placeholder: "Highlight areas where the student can improve" },
                            { label: "Career Alignment", name: "career_alignment", placeholder: "How well does the student's current plan align with their skills and interests?" }
                        ].map(({ label, name, placeholder }) => (
                            <div key={name}>
                                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                                <textarea
                                    id={name}
                                    name={name}
                                    rows={3}
                                    placeholder={placeholder}
                                    value={report[name] || ''}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                ></textarea>
                            </div>
                        ))}
                    </div>

                    {/* Next Steps */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Next Steps</h2>
                        {[
                            { label: "Action Items for the Student", name: "action_items", placeholder: "Provide specific tasks or goals for the student to work on" },
                            { label: "Recommendations", name: "recommendations", placeholder: "Suggest courses, skills, or steps to take based on the session" },
                        ].map(({ label, name, placeholder }) => (
                            <div key={name}>
                                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                                {report[name].map((item, index) => (
                                    <input
                                        key={`${name}-${index}`}
                                        type="text"
                                        id={`${name}-${index}`}
                                        name={`${name}-${index}`}
                                        placeholder={placeholder}
                                        value={item}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => handleArrayInputKeyDown(e, name, index)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                ))}
                            </div>
                        ))}
                        <div>
                            <label htmlFor="follow_up_plan" className="block text-sm font-medium text-gray-700">Follow-Up Plan</label>
                            <textarea
                                id="follow_up_plan"
                                name="follow_up_plan"
                                rows={3}
                                placeholder="Mention if another session is required and proposed timelines"
                                value={report.follow_up_plan || ''}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            ></textarea>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                        <textarea
                            id="additional_notes"
                            name="additional_notes"
                            rows={3}
                            placeholder="Any other remarks, feedback, or observations not covered above"
                            value={report.additional_notes || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button type="button"
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                            Save Draft
                        </button>
                        <button type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Submit Report
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReportSubmissionByCounselor;



