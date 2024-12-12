import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentTimeline() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/69');
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setStudentData(null);
      }
    };

    fetchStudentData();
  }, []);

  if (!studentData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Timeline</h2>
        <p className="text-gray-600">Unable to load student data. Please try again later.</p>
      </div>
    );
  }

  // rest of the code to display studentData
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Timeline</h2>
      {/* Display studentData here */}
      <pre>{JSON.stringify(studentData, null, 2)}</pre>
    </div>
  );
}

export default StudentTimeline;

