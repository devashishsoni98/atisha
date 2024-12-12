// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Mock data
// const mockStudentData = {
//   id: 24,
//   name: "studenttt",
//   email: "std@gmail.com",
//   password: "$2b$10$57NRm0uKcMR7hGQNgTI7fev0xodvPUaplWApMF.YclQ5qUl86PZHK",
//   role_id: 1,
//   created_at: "2024-12-01T16:12:04.103Z",
//   updated_at: "2024-12-01T16:12:04.103Z",
//   student_personal_info: {
//     user_id: 24,
//     image: "https://example.com/image.jpg",
//     dob: "2000-01-01T00:00:00.000Z",
//     gender: "male",
//     location: "New York",
//     contact_number: "1234567890"
//   },
//   student_education: {
//     user_id: 24,
//     school_name: "Springfield High School",
//     class: 10
//   },
//   student_interest: {
//     user_id: 24,
//     subjects: [],
//     hobbies: [
//       {
//         id: 3,
//         hobby_name: "Sapsanish"
//       }
//     ],
//     sports: []
//   }
// };

// const mockTraitsData = {
//   id: 1,
//   user_id: 24,
//   holland_code_traits: ["Realistic", "Investigative", "Artistic"],
//   big_five_traits: ["Openness", "Conscientiousness", "Extraversion"],
//   aptitude_status: "High",
//   iq_status: "Above Average",
//   created_at: "2024-12-01T16:12:04.103Z",
//   traits_counter: 3
// };

// const mockCareersData = {
//   id: 1,
//   user_id: 24,
//   career1: "Software Developer",
//   career2: "Data Scientist",
//   career3: "UX Designer",
//   created_at: "2024-12-01T16:12:04.103Z"
// };

// const StudentTimeline = () => {
//   const [isPanelOpen, setIsPanelOpen] = useState(false);

//   const togglePanel = () => {
//     setIsPanelOpen(!isPanelOpen);
//   };

//   const panelVariants = {
//     closed: { x: '100%', opacity: 0 },
//     open: { x: 0, opacity: 1 },
//   };

//   const lineVariants = {
//     hidden: { pathLength: 0 },
//     visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } },
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={togglePanel}
//         className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//       >
//         {isPanelOpen ? 'Close' : 'Open'} Timeline
//       </button>

//       <AnimatePresence>
//         {isPanelOpen && (
//           <motion.div
//             initial="closed"
//             animate="open"
//             exit="closed"
//             variants={panelVariants}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//             className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg overflow-y-auto z-40"
//           >
//             <div className="p-8">
//               <h2 className="text-2xl font-bold mb-6">Student Timeline</h2>
              
//               <div className="relative">
//                 <svg className="absolute top-0 left-12 h-full" width="2" height="100%">
//                   <motion.path
//                     d="M 1 0 V 4000"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     fill="none"
//                     className="text-gray-300"
//                     variants={lineVariants}
//                     initial="hidden"
//                     animate="visible"
//                   />
//                 </svg>

//                 <div className="relative z-10">
//                   {/* Student Image */}
//                   <div className="mb-8 flex items-center">
//                     <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
//                       <img src={mockStudentData.student_personal_info.image} alt={mockStudentData.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="ml-4">
//                       <h3 className="text-xl font-semibold">{mockStudentData.name}</h3>
//                       <p className="text-gray-600">{mockStudentData.email}</p>
//                     </div>
//                   </div>

//                   {/* Personal Info */}
//                   <TimelineItem title="Personal Information">
//                     <p>Date of Birth: {new Date(mockStudentData.student_personal_info.dob).toLocaleDateString()}</p>
//                     <p>Gender: {mockStudentData.student_personal_info.gender}</p>
//                     <p>Location: {mockStudentData.student_personal_info.location}</p>
//                     <p>Contact: {mockStudentData.student_personal_info.contact_number}</p>
//                   </TimelineItem>

//                   {/* Education */}
//                   <TimelineItem title="Education">
//                     <p>School: {mockStudentData.student_education.school_name}</p>
//                     <p>Class: {mockStudentData.student_education.class}</p>
//                   </TimelineItem>

//                   {/* Interests */}
//                   <TimelineItem title="Interests">
//                     <p>Hobbies: {mockStudentData.student_interest.hobbies.map(hobby => hobby.hobby_name).join(', ')}</p>
//                     <p>Subjects: {mockStudentData.student_interest.subjects.length > 0 ? mockStudentData.student_interest.subjects.join(', ') : 'None specified'}</p>
//                     <p>Sports: {mockStudentData.student_interest.sports.length > 0 ? mockStudentData.student_interest.sports.join(', ') : 'None specified'}</p>
//                   </TimelineItem>

//                   {/* Traits */}
//                   <TimelineItem title="Personality Traits">
//                     <p>Holland Code: {mockTraitsData.holland_code_traits.join(', ')}</p>
//                     <p>Big Five: {mockTraitsData.big_five_traits.join(', ')}</p>
//                     <p>Aptitude: {mockTraitsData.aptitude_status || 'Not assessed'}</p>
//                     <p>IQ: {mockTraitsData.iq_status || 'Not assessed'}</p>
//                   </TimelineItem>

//                   {/* Recommended Careers */}
//                   <TimelineItem title="Recommended Careers">
//                     <ul className="list-disc list-inside">
//                       {mockCareersData.career1 && <li>{mockCareersData.career1}</li>}
//                       {mockCareersData.career2 && <li>{mockCareersData.career2}</li>}
//                       {mockCareersData.career3 && <li>{mockCareersData.career3}</li>}
//                     </ul>
//                   </TimelineItem>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const TimelineItem = ({ title, children }) => (
//   <div className="mb-8 ml-16">
//     <div className="flex items-center mb-2">
//       <div className="w-4 h-4 rounded-full bg-blue-500 mr-4"></div>
//       <h4 className="text-lg font-semibold">{title}</h4>
//     </div>
//     <div className="ml-8 bg-gray-100 p-4 rounded-md">
//       {children}
//     </div>
//   </div>
// );

// export default StudentTimeline;



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentTimeline = () => {
  const [studentData, setStudentData] = useState(null);
  const [traitsData, setTraitsData] = useState(null);
  const [careersData, setCareersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const student = await fetchStudentData(userId);
        setStudentData(student);

        const traits = await fetchTraitsData(userId);
        setTraitsData(traits);

        const careers = await fetchRecommendedCareers(userId);
        setCareersData(careers);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const panelVariants = {
    closed: { x: '100%', opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } },
  };

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {isPanelOpen ? 'Close' : 'Open'} Timeline
      </button>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg overflow-y-auto z-40"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Student Timeline</h2>

              <div className="relative">
                <svg className="absolute top-0 left-12 h-full" width="2" height="100%">
                  <motion.path
                    d="M 1 0 V 4000"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    className="text-gray-300"
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>

                <div className="relative z-10">
                  {/* Student Image */}
                  <div className="mb-8 flex items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                      <img src={studentData.student_personal_info.image} alt={studentData.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">{studentData.name}</h3>
                      <p className="text-gray-600">{studentData.email}</p>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <TimelineItem title="Personal Information">
                    <p>Date of Birth: {new Date(studentData.student_personal_info.dob).toLocaleDateString()}</p>
                    <p>Gender: {studentData.student_personal_info.gender}</p>
                    <p>Location: {studentData.student_personal_info.location}</p>
                    <p>Contact: {studentData.student_personal_info.contact_number}</p>
                  </TimelineItem>

                  {/* Education */}
                  <TimelineItem title="Education">
                    <p>School: {studentData.student_education.school_name}</p>
                    <p>Class: {studentData.student_education.class}</p>
                  </TimelineItem>

                  {/* Interests */}
                  <TimelineItem title="Interests">
                    <p>Hobbies: {studentData.student_interest.hobbies.map(hobby => hobby.hobby_name).join(', ')}</p>
                    <p>Subjects: {studentData.student_interest.subjects.join(', ') || 'None specified'}</p>
                    <p>Sports: {studentData.student_interest.sports.join(', ') || 'None specified'}</p>
                  </TimelineItem>

                  {/* Traits */}
                  <TimelineItem title="Personality Traits">
                    <p>Holland Code: {traitsData.holland_code_traits.join(', ')}</p>
                    <p>Big Five: {traitsData.big_five_traits.join(', ')}</p>
                    <p>Aptitude: {traitsData.aptitude_status || 'Not assessed'}</p>
                    <p>IQ: {traitsData.iq_status || 'Not assessed'}</p>
                  </TimelineItem>

                  {/* Recommended Careers */}
                  <TimelineItem title="Recommended Careers">
                    <ul className="list-disc list-inside">
                      {careersData.career1 && <li>{careersData.career1}</li>}
                      {careersData.career2 && <li>{careersData.career2}</li>}
                      {careersData.career3 && <li>{careersData.career3}</li>}
                    </ul>
                  </TimelineItem>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelineItem = ({ title, children }) => (
  <div className="mb-8 ml-16">
    <div className="flex items-center mb-2">
      <div className="w-4 h-4 rounded-full bg-blue-500 mr-4"></div>
      <h4 className="text-lg font-semibold">{title}</h4>
    </div>
    <div className="ml-8 bg-gray-100 p-4 rounded-md">
      {children}
    </div>
  </div>
);

export default StudentTimeline;

import axios from 'axios';
import { useSelector } from 'react-redux';

export const fetchStudentData = async (studentId) => {
  const response = await axios.get(`http://localhost:4000/api/student/${studentId}`);
  return response.data;
};

export const fetchTraitsData = async (traitsId) => {
  const response = await axios.get(`http://localhost:4000/api/student-traits/${traitsId}`);
  return response.data;
};

export const fetchRecommendedCareers = async (userId) => {
  const response = await axios.post('http://localhost:4000/api/career/recommend', {
    user_id: userId
  });
  return response.data;
};

