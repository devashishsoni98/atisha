// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const StudentsUpload = () => {
//   const [files, setFiles] = useState({});
//   const [studentsData, setStudentsData] = useState({});
//   const [error, setError] = useState(null);

//   const handleFileChange = (e, classNumber) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
//       setFiles(prevFiles => ({ ...prevFiles, [classNumber]: file }));
//       setError(null);
//     } else {
//       setError(`Please select a valid Excel file for Class ${classNumber}.`);
//     }
//   };

//   const handleUpload = async () => {
//     setError(null);
//     setStudentsData({});

//     for (const [classNumber, file] of Object.entries(files)) {
//       const data = await readExcelFile(file);
//       if (data.error) {
//         setError(`Error in Class ${classNumber} file: ${data.error}`);
//         return;
//       }
//       setStudentsData(prevData => ({ ...prevData, [classNumber]: data }));
//     }
//   };

//   const readExcelFile = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);

//         const requiredHeaders = ['name', 'enrolNo', 'schoolId'];
//         const fileHeaders = Object.keys(jsonData[0] || {});

//         if (!requiredHeaders.every(header => fileHeaders.includes(header))) {
//           resolve({ error: 'The Excel file does not have the required headers.' });
//         } else {
//           resolve(jsonData);
//         }
//       };
//       reader.onerror = (error) => resolve({ error: 'Error reading file.' });
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const downloadTemplate = () => {
//     const templateData = [
//       ['name', 'enrolNo', 'schoolId'],
//       ['John Doe', 'EN001', 'SCHOOL001']
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(templateData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//     const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     saveAs(data, 'students_template.xlsx');
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Upload Students Data (Classes 8-12)</h1>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {error}</span>
//         </div>
//       )}

//       <div className="space-y-4 mb-6">
//         <button
//           onClick={downloadTemplate}
//           className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//         >
//           Download Template (Excel)
//         </button>

//         {[8, 9, 10, 11, 12].map((classNumber) => (
//           <div key={classNumber} className="flex items-center space-x-4">
//             <label htmlFor={`file-${classNumber}`} className="w-24">Class {classNumber}:</label>
//             <input
//               id={`file-${classNumber}`}
//               type="file"
//               accept=".xlsx, .xls"
//               onChange={(e) => handleFileChange(e, classNumber)}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-full file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//             />
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleUpload}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6"
//       >
//         Upload and Parse Excel Files
//       </button>

//       {Object.entries(studentsData).map(([classNumber, data]) => (
//         <div key={classNumber} className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Class {classNumber} Data</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="py-2 px-4 border-b text-left">Name</th>
//                   <th className="py-2 px-4 border-b text-left">Enrol No</th>
//                   <th className="py-2 px-4 border-b text-left">School ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((student, index) => (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="py-2 px-4 border-b">{student.name}</td>
//                     <td className="py-2 px-4 border-b">{student.enrolNo}</td>
//                     <td className="py-2 px-4 border-b">{student.schoolId}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentsUpload;

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

const StudentUpload = () => {
  const [files, setFiles] = useState({});
  const [studentsData, setStudentsData] = useState({});
  const [error, setError] = useState(null);
  const [searchTerms, setSearchTerms] = useState({});

  // Handle file change (when user selects an Excel file)
  const handleFileChange = (e, classNumber) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setFiles(prevFiles => ({ ...prevFiles, [classNumber]: file }));
      setError(null);
    } else {
      setError(`Please select a valid Excel file for Class ${classNumber}.`);
    }
  };

  // Handle file upload to the server
  const handleUpload = async () => {
    setError(null);
    setStudentsData({});

    const formData = new FormData();

    for (const [classNumber, file] of Object.entries(files)) {
      // Append the file and class number to FormData
      formData.append('file', file);
      formData.append('classNumber', classNumber);

      try {
        // Send the request to the backend
        // const response = await axios.post('http://localhost:4000/uploadStudents', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });                             /api/school-students/upload
        const response = await axios.post('http://localhost:4000/api/school-students/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // If the response contains student data, update state
        if (response.data && response.data.students) {
          setStudentsData((prevData) => ({
            ...prevData,
            [classNumber]: response.data.students,
          }));
        }
      } catch (error) {
        setError(`Error uploading Class ${classNumber} file: ${error.message}`);
      }
    }
  };

  // Read and validate the Excel file content
  const readExcelFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const requiredHeaders = ['name', 'enrollNo', 'schoolId'];
        const fileHeaders = Object.keys(jsonData[0] || {});

        // Check if the required headers exist in the file
        if (!requiredHeaders.every(header => fileHeaders.includes(header))) {
          resolve({ error: 'The Excel file does not have the required headers.' });
        } else {
          resolve(jsonData);
        }
      };
      reader.onerror = () => resolve({ error: 'Error reading file.' });
      reader.readAsArrayBuffer(file);
    });
  };

  // Download an Excel template
  const downloadTemplate = () => {
    const templateData = [
      ['name', 'enrolNo', 'schoolId'],
      ['John Doe', 'EN001', 'SCHOOL001'],
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'students_template.xlsx');
  };

  const handleSearch = (classNumber, term) => {
    setSearchTerms(prevTerms => ({ ...prevTerms, [classNumber]: term }));
  };

  const getFilteredStudents = (classNumber) => {
    const students = studentsData[classNumber] || [];
    const searchTerm = searchTerms[classNumber] || '';
    
    if (!searchTerm) return students;

    return students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrolNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.schoolId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Students Data (Classes 8-12)</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <button
          onClick={downloadTemplate}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Download Template (Excel)
        </button>

        {[8, 9, 10, 11, 12].map((classNumber) => (
          <div key={classNumber} className="flex items-center space-x-4">
            <label htmlFor={`file-${classNumber}`} className="w-24">Class {classNumber}:</label>
            <input
              id={`file-${classNumber}`}
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileChange(e, classNumber)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-6"
      >
        Upload and Parse Excel Files
      </button>

      {Object.entries(studentsData).map(([classNumber, data]) => (
        <div key={classNumber} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Class {classNumber} Data</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder={`Search Class ${classNumber} students...`}
              onChange={(e) => handleSearch(classNumber, e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrol No</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School ID</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredStudents(classNumber).map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.enrolNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.schoolId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentUpload;

