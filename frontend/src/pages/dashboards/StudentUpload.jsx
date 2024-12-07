import React, { useState } from 'react';
import Papa from 'papaparse';  // Add the papaparse library to parse CSV

function StudentsUpload() {
    const [file, setFile] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [error, setError] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError("Please select a valid CSV file.");
        }
    };

    // Handle CSV file upload and parsing
    const handleFileUpload = () => {
        if (!file) {
            setError("No file selected.");
            return;
        }

        Papa.parse(file, {
            complete: (result) => {
                // Assuming CSV headers are 'Student Name', 'Class', 'Roll Number'
                const parsedData = result.data;
                
                // Check if the required columns are present in the CSV
                const requiredHeaders = ['name', 'mobileNo', 'regNo', 'class', 'schoolId'];
                const fileHeaders = Object.keys(parsedData[0]);

                if (!requiredHeaders.every(header => fileHeaders.includes(header))) {
                    setError('The CSV file does not have the required headers.');
                    return;
                }

                setStudentsData(parsedData);
            },
            header: true, // Assuming CSV has headers
            skipEmptyLines: true,
        });
    };

    // Download the template CSV file
    const downloadTemplate = () => {
        const templateData = [
            ['name', 'mobileNo', 'regNo', 'class', 'schoolId'],
            ['', '', '', '', '']
        ];

        const csvContent = templateData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students_template.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Students Data</h1>
                
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                    <button
                        onClick={downloadTemplate}
                        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
                    >
                        Download Template (CSV)
                    </button>

                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="border rounded px-4 py-2"
                    />
                </div>

                <button
                    onClick={handleFileUpload}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Upload and Parse CSV
                </button>
            </div>

            {studentsData.length > 0 && (
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Data</h2>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Mobile No</th>
                                <th className="border px-4 py-2">Reg No</th>
                                <th className="border px-4 py-2">Class</th>
                                <th className="border px-4 py-2">School ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData.map((student, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{student['name']}</td>
                                    <td className="border px-4 py-2">{student['mobileNo']}</td>
                                    <td className="border px-4 py-2">{student['regNo']}</td>
                                    <td className="border px-4 py-2">{student['class']}</td>
                                    <td className="border px-4 py-2">{student['schoolId']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default StudentsUpload;
