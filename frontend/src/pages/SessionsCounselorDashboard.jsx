import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SessionsCounselorDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/counselor-booking/get_bookings_for_completion/${userId}`);
        setSessions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sessions. Please try again later.');
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewReport = (sessionId) => {
    // Implement the logic to view the report for the specific session
    console.log(`View report for session ${sessionId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="text-blue-600 text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 sm:mb-8">Completed Sessions</h1>
      {sessions.length === 0 ? (
        <div className="text-xl text-blue-600">No completed sessions found.</div>
      ) : (
        <div className="space-y-6">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-700 mb-2 sm:mb-0">Session with {session.student.name}</h2>
                <button
                  onClick={() => handleViewReport(session.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 mt-2 sm:mt-0"
                >
                  View Report
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-blue-600">
                <p><span className="font-medium">Date:</span> {formatDate(session.date)}</p>
                <p><span className="font-medium">Time:</span> {formatTime(session.start_time)} - {formatTime(session.end_time)}</p>
                <p><span className="font-medium">Student Email:</span> {session.student.email}</p>
                <p><span className="font-medium">Status:</span> <span className="capitalize">{session.status}</span></p>
                {session.type && <p><span className="font-medium">Type:</span> {session.type}</p>}
                {session.location && <p><span className="font-medium">Location:</span> {session.location}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionsCounselorDashboard;

