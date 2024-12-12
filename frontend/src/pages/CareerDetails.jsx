// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react';
// // // // // // import { Link, useParams, useLocation } from 'react-router-dom';
// // // // // // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// // // // // // import FloatingShapes from './FloatingShapes';

// // // // // // // Hardcoded data for all sections
// // // // // // const hardcodedData = [
// // // // // //   {
// // // // // //     name: 'Software Engineer',
// // // // // //     salary: [
// // // // // //       { name: 'Minimum', salary: 300000 },
// // // // // //       { name: 'Median', salary: 800000 },
// // // // // //       { name: 'Maximum', salary: 2500000 }
// // // // // //     ],
// // // // // //     trend: [
// // // // // //       { year: 2018, percentage: 5 },
// // // // // //       { year: 2019, percentage: 8 },
// // // // // //       { year: 2020, percentage: 3 },
// // // // // //       { year: 2021, percentage: 10 },
// // // // // //       { year: 2022, percentage: 15 }
// // // // // //     ],
// // // // // //     pros: [
// // // // // //       'High demand in job market',
// // // // // //       'Competitive salaries',
// // // // // //       'Opportunity for remote work',
// // // // // //       'Constant learning and growth',
// // // // // //       'Diverse career paths'
// // // // // //     ],
// // // // // //     cons: [
// // // // // //       'Rapidly changing technology landscape',
// // // // // //       'Potential for high stress and long hours',
// // // // // //       'Sedentary work environment',
// // // // // //       'Continuous need for skill updates',
// // // // // //       'Possible outsourcing of jobs'
// // // // // //     ],
// // // // // //     skills: [
// // // // // //       'JavaScript',
// // // // // //       'Python',
// // // // // //       'Java',
// // // // // //       'SQL',
// // // // // //       'Git',
// // // // // //       'Problem Solving',
// // // // // //       'Agile Methodologies'
// // // // // //     ],
// // // // // //     related_careers: [
// // // // // //       'Frontend Developer',
// // // // // //       'Backend Developer',
// // // // // //       'DevOps Engineer',
// // // // // //       'Data Engineer',
// // // // // //       'Mobile App Developer'
// // // // // //     ]
// // // // // //   },
// // // // // //   {
// // // // // //     name: 'Data Scientist',
// // // // // //     salary: [
// // // // // //       { name: 'Minimum', salary: 500000 },
// // // // // //       { name: 'Median', salary: 1200000 },
// // // // // //       { name: 'Maximum', salary: 3000000 }
// // // // // //     ],
// // // // // //     trend: [
// // // // // //       { year: 2018, percentage: 12 },
// // // // // //       { year: 2019, percentage: 18 },
// // // // // //       { year: 2020, percentage: 8 },
// // // // // //       { year: 2021, percentage: 22 },
// // // // // //       { year: 2022, percentage: 28 }
// // // // // //     ],
// // // // // //     pros: [
// // // // // //       'Growing field with high demand',
// // // // // //       'Intellectually stimulating work',
// // // // // //       'High earning potential',
// // // // // //       'Opportunity to work across various industries',
// // // // // //       'Potential to make significant impact through data-driven decisions'
// // // // // //     ],
// // // // // //     cons: [
// // // // // //       'Requires extensive education and skills',
// // // // // //       'Can be isolating due to focus on data',
// // // // // //       'Pressure to deliver actionable insights',
// // // // // //       'Data quality and accessibility challenges',
// // // // // //       'Ethical concerns around data usage and privacy'
// // // // // //     ],
// // // // // //     skills: [
// // // // // //       'Python',
// // // // // //       'R',
// // // // // //       'SQL',
// // // // // //       'Machine Learning',
// // // // // //       'Statistical Analysis',
// // // // // //       'Data Visualization',
// // // // // //       'Big Data Technologies'
// // // // // //     ],
// // // // // //     related_careers: [
// // // // // //       'Machine Learning Engineer',
// // // // // //       'Data Analyst',
// // // // // //       'Business Intelligence Analyst',
// // // // // //       'Quantitative Researcher',
// // // // // //       'AI Specialist'
// // // // // //     ]
// // // // // //   },
// // // // // //   {
// // // // // //     name: 'UX Designer',
// // // // // //     salary: [
// // // // // //       { name: 'Minimum', salary: 400000 },
// // // // // //       { name: 'Median', salary: 900000 },
// // // // // //       { name: 'Maximum', salary: 2000000 }
// // // // // //     ],
// // // // // //     trend: [
// // // // // //       { year: 2018, percentage: 7 },
// // // // // //       { year: 2019, percentage: 11 },
// // // // // //       { year: 2020, percentage: 5 },
// // // // // //       { year: 2021, percentage: 14 },
// // // // // //       { year: 2022, percentage: 20 }
// // // // // //     ],
// // // // // //     pros: [
// // // // // //       'Creative and rewarding work',
// // // // // //       'Growing demand across industries',
// // // // // //       'Opportunity to improve user experiences',
// // // // // //       'Collaborative work environment',
// // // // // //       'Potential for freelance and remote work'
// // // // // //     ],
// // // // // //     cons: [
// // // // // //       'Keeping up with rapidly evolving design trends',
// // // // // //       'Balancing user needs with business goals',
// // // // // //       'Potential for design fatigue',
// // // // // //       'Difficulty in measuring impact',
// // // // // //       'Dealing with subjective feedback'
// // // // // //     ],
// // // // // //     skills: [
// // // // // //       'User Research',
// // // // // //       'Wireframing',
// // // // // //       'Prototyping',
// // // // // //       'UI Design',
// // // // // //       'Usability Testing',
// // // // // //       'Information Architecture',
// // // // // //       'Design Thinking'
// // // // // //     ],
// // // // // //     related_careers: [
// // // // // //       'UI Designer',
// // // // // //       'Product Designer',
// // // // // //       'Interaction Designer',
// // // // // //       'Information Architect',
// // // // // //       'User Researcher'
// // // // // //     ]
// // // // // //   }
// // // // // // ];

// // // // // // const CareerDetails = () => {
// // // // // //   const { careerId } = useParams();
// // // // // //   const location = useLocation();
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [careerData, setCareerData] = useState(null);
// // // // // //   const [salaryType, setSalaryType] = useState('yearly');

// // // // // //   useEffect(() => {
// // // // // //     const fetchCareerData = async () => {
// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         if (location.state && location.state.careerData) {
// // // // // //           setCareerData(location.state.careerData);
// // // // // //         } else {
// // // // // //           const response = await fetch(`http://localhost:4000/api/careerLens/data/${careerId}`);
// // // // // //           if (!response.ok) {
// // // // // //             throw new Error(`HTTP error! status: ${response.status}`);
// // // // // //           }
// // // // // //           const data = await response.json();
// // // // // //           setCareerData(data);
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error('Error fetching career data:', error);
// // // // // //         setError('Failed to fetch career data. Please try again later.');
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchCareerData();
// // // // // //   }, [careerId, location.state]);

// // // // // //   const formatSalary = (amount, type = 'yearly') => {
// // // // // //     const formatter = new Intl.NumberFormat('en-IN', {
// // // // // //       style: 'currency',
// // // // // //       currency: 'INR',
// // // // // //       maximumFractionDigits: 0
// // // // // //     });

// // // // // //     if (type === 'monthly') {
// // // // // //       amount = Math.round(amount / 12);
// // // // // //     }

// // // // // //     return formatter.format(amount);
// // // // // //   };

// // // // // //   const fadeInUp = {
// // // // // //     initial: { opacity: 0, y: 20 },
// // // // // //     animate: { opacity: 1, y: 0 },
// // // // // //     transition: { duration: 0.6 }
// // // // // //   };

// // // // // //   // Function to get random hardcoded data
// // // // // //   const getRandomHardcodedData = () => {
// // // // // //     return hardcodedData[Math.floor(Math.random() * hardcodedData.length)];
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex flex-col items-center justify-center">
// // // // // //         <p className="text-red-600 mb-4">{error}</p>
// // // // // //         <Link to="/lens" className="text-blue-600 hover:underline">
// // // // // //           Return to Career Lens
// // // // // //         </Link>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!careerData) {
// // // // // //     return null;
// // // // // //   }

// // // // // //   // Use hardcoded data if any field is null, undefined, or empty
// // // // // //   const randomHardcodedData = getRandomHardcodedData();

// // // // // //   const name = careerData.name || randomHardcodedData.name;

// // // // // //   const salaryData = (careerData.min_salary && careerData.median_salary && careerData.max_salary)
// // // // // //     ? [
// // // // // //         { name: 'Minimum', salary: careerData.min_salary },
// // // // // //         { name: 'Median', salary: careerData.median_salary },
// // // // // //         { name: 'Maximum', salary: careerData.max_salary }
// // // // // //       ]
// // // // // //     : randomHardcodedData.salary;

// // // // // //   const trendData = randomHardcodedData.trend;

// // // // // //   const pros = (careerData.pros && Array.isArray(careerData.pros) && careerData.pros.length > 0)
// // // // // //     ? careerData.pros
// // // // // //     : randomHardcodedData.pros;

// // // // // //   const cons = (careerData.cons && Array.isArray(careerData.cons) && careerData.cons.length > 0)
// // // // // //     ? careerData.cons
// // // // // //     : randomHardcodedData.cons;

// // // // // //   const skills = (careerData.skills && Array.isArray(careerData.skills) && careerData.skills.length > 0)
// // // // // //     ? careerData.skills
// // // // // //     : randomHardcodedData.skills;

// // // // // //   const relatedCareers = (careerData.related_careers && Array.isArray(careerData.related_careers) && careerData.related_careers.length > 0)
// // // // // //     ? careerData.related_careers
// // // // // //     : randomHardcodedData.related_careers;

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// // // // // //       <FloatingShapes />

// // // // // //       <div className="max-w-5xl mx-auto relative">
// // // // // //         <motion.div {...fadeInUp} className="mb-8">
// // // // // //           <motion.div
// // // // // //             whileHover={{ x: -5 }}
// // // // // //             whileTap={{ scale: 0.95 }}
// // // // // //           >
// // // // // //             <Link to="/lens" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
// // // // // //               <ArrowLeft className="mr-2" size={24} />
// // // // // //               <span className="text-xl font-semibold">Back to Career Lens</span>
// // // // // //             </Link>
// // // // // //           </motion.div>
// // // // // //         </motion.div>

// // // // // //         <motion.h1
// // // // // //           className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center"
// // // // // //           initial={{ opacity: 0, y: -20 }}
// // // // // //           animate={{ opacity: 1, y: 0 }}
// // // // // //           transition={{ duration: 0.8 }}
// // // // // //         >
// // // // // //           {name}
// // // // // //         </motion.h1>

// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // // //           <motion.section
// // // // // //             className="bg-white rounded-lg shadow-lg p-8"
// // // // // //             {...fadeInUp}
// // // // // //             whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// // // // // //           >
// // // // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
// // // // // //             <ul className="space-y-4">
// // // // // //               {pros.map((pro, index) => (
// // // // // //                 <motion.li
// // // // // //                   key={index}
// // // // // //                   className="flex items-start"
// // // // // //                   initial={{ opacity: 0, x: -20 }}
// // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // //                   transition={{ delay: index * 0.1 }}
// // // // // //                   whileHover={{ scale: 1.02, x: 5 }}
// // // // // //                 >
// // // // // //                   <ThumbsUp className="text-green-500 mr-2 flex-shrink-0" size={24} />
// // // // // //                   <span className="text-gray-700">{pro}</span>
// // // // // //                 </motion.li>
// // // // // //               ))}
// // // // // //             </ul>
// // // // // //           </motion.section>

// // // // // //           <motion.section
// // // // // //             className="bg-white rounded-lg shadow-lg p-8"
// // // // // //             {...fadeInUp}
// // // // // //             whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// // // // // //           >
// // // // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
// // // // // //             <ul className="space-y-4">
// // // // // //               {cons.map((con, index) => (
// // // // // //                 <motion.li
// // // // // //                   key={index}
// // // // // //                   className="flex items-start"
// // // // // //                   initial={{ opacity: 0, x: -20 }}
// // // // // //                   animate={{ opacity: 1, x: 0 }}
// // // // // //                   transition={{ delay: index * 0.1 }}
// // // // // //                   whileHover={{ scale: 1.02, x: 5 }}
// // // // // //                 >
// // // // // //                   <ThumbsDown className="text-red-500 mr-2 flex-shrink-0" size={24} />
// // // // // //                   <span className="text-gray-700">{con}</span>
// // // // // //                 </motion.li>
// // // // // //               ))}
// // // // // //             </ul>
// // // // // //           </motion.section>
// // // // // //         </div>

// // // // // //         <motion.section
// // // // // //           className="bg-white rounded-lg shadow-lg p-8 my-8"
// // // // // //           {...fadeInUp}
// // // // // //           whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// // // // // //         >
// // // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Skills</h2>
// // // // // //           <div className="flex flex-wrap gap-4">
// // // // // //             {skills.map((skill, index) => (
// // // // // //               <motion.div
// // // // // //                 key={index}
// // // // // //                 className="bg-gray-100 rounded-full px-4 py-2"
// // // // // //                 initial={{ opacity: 0, scale: 0.9 }}
// // // // // //                 animate={{ opacity: 1, scale: 1 }}
// // // // // //                 transition={{ delay: index * 0.1 }}
// // // // // //                 whileHover={{ scale: 1.1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
// // // // // //               >
// // // // // //                 <span className="text-gray-800">{skill}</span>
// // // // // //               </motion.div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </motion.section>

// // // // // //         <motion.section
// // // // // //           className="bg-white rounded-lg shadow-lg p-8 mb-8"
// // // // // //           {...fadeInUp}
// // // // // //           whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// // // // // //         >
// // // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Career Trend</h2>
// // // // // //           <motion.div
// // // // // //             className="h-64 w-full"
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ delay: 0.3 }}
// // // // // //           >
// // // // // //             <ResponsiveContainer width="100%" height="100%">
// // // // // //               <LineChart data={trendData}>
// // // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // // //                 <XAxis dataKey="year" />
// // // // // //                 <YAxis />
// // // // // //                 <Tooltip
// // // // // //                   formatter={(value) => `${value}%`}
// // // // // //                   labelStyle={{ color: '#374151' }}
// // // // // //                   contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0, 0, 0.1)' }}
// // // // // //                 />
// // // // // //                 <Line type="monotone" dataKey="percentage" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
// // // // // //               </LineChart>
// // // // // //             </ResponsiveContainer>
// // // // // //           </motion.div>
// // // // // //         </motion.section>

// // // // // //         <motion.section
// // // // // //           className="bg-white rounded-lg shadow-lg p-8 mb-8"
// // // // // //           {...fadeInUp}
// // // // // //           whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// // // // // //         >
// // // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Salary Information</h2>
// // // // // //           <div className="mb-4">
// // // // // //             <label className="mr-4 text-lg">
// // // // // //               <input
// // // // // //                 type="radio"
// // // // // //                 value="yearly"
// // // // // //                 checked={salaryType === 'yearly'}
// // // // // //                 onChange={() => setSalaryType('yearly')}
// // // // // //                 className="mr-2"
// // // // // //               />
// // // // // //               Yearly
// // // // // //             </label>
// // // // // //             <label className="text-lg">
// // // // // //               <input
// // // // // //                 type="radio"
// // // // // //                 value="monthly"
// // // // // //                 checked={salaryType === 'monthly'}
// // // // // //                 onChange={() => setSalaryType('monthly')}
// // // // // //                 className="mr-2"
// // // // // //               />
// // // // // //               Monthly
// // // // // //             </label>
// // // // // //           </div>
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // // // //             {salaryData.map((item, index) => (
// // // // // //               <motion.div
// // // // // //                 key={index}
// // // // // //                 className="bg-blue-50 p-4 rounded-lg text-center"
// // // // // //                 whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
// // // // // //               >
// // // // // //                 <p className="text-sm text-blue-800 mb-1">{item.name}</p>
// // // // // //                 <p className="text-2xl font-bold text-blue-600">{formatSalary(item.salary, salaryType)}</p>
// // // // // //               </motion.div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //           <motion.div
// // // // // //             className="h-64 w-full"
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ delay: 0.3 }}
// // // // // //           >
// // // // // //             <ResponsiveContainer width="100%" height="100%">
// // // // // //               <LineChart data={salaryData}>
// // // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // // //                 <XAxis dataKey="name" />
// // // // // //                 <YAxis />
// // // // // //                 <Tooltip
// // // // // //                   formatter={(value) => formatSalary(value, salaryType)}
// // // // // //                   labelStyle={{ color: '#374151' }}
// // // // // //                   contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0, 0, 0.1)' }}
// // // // // //                 />
// // // // // //                 <Line type="monotone" dataKey="salary" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
// // // // // //               </LineChart>
// // // // // //             </ResponsiveContainer>
// // // // // //           </motion.div>
// // // // // //         </motion.section>

// // // // // //         <motion.section
// // // // // //           className="bg-white rounded-lg shadow-lg p-8 mb-8"
// // // // // //           {...fadeInUp}
// // // // // //           whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// // // // // //         >
// // // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Related Careers</h2>
// // // // // //           <div className="flex flex-wrap gap-4">
// // // // // //             {relatedCareers.map((relatedCareer, index) => (
// // // // // //               <motion.div
// // // // // //                 key={index}
// // // // // //                 className="bg-gray-100 rounded-full px-4 py-2"
// // // // // //                 initial={{ opacity: 0, scale: 0.9 }}
// // // // // //                 animate={{ opacity: 1, scale: 1 }}
// // // // // //                 transition={{ delay: index * 0.1 }}
// // // // // //                 whileHover={{ scale: 1.1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
// // // // // //               >
// // // // // //                 <span className="text-gray-800">{relatedCareer}</span>
// // // // // //               </motion.div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </motion.section>

// // // // // //         <motion.section
// // // // // //           {...fadeInUp}
// // // // // //           className="bg-white rounded-lg shadow-lg p-8"
// // // // // //           whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
// // // // // //         >
// // // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Next Steps</h2>
// // // // // //           <p className="text-xl text-gray-600 leading-relaxed mb-6">
// // // // // //             Ready to pursue a career as a {name}? Here are some steps you can take:
// // // // // //           </p>
// // // // // //           <ul className="space-y-4">
// // // // // //             <motion.li
// // // // // //               className="flex items-center"
// // // // // //               whileHover={{ scale: 1.05, x: 10 }}
// // // // // //             >
// // // // // //               <Book className="text-blue-500 mr-4" size={24} />
// // // // // //               <span className="text-gray-700">Research certification programs and educational requirements</span>
// // // // // //             </motion.li>
// // // // // //             <motion.li
// // // // // //               className="flex items-center"
// // // // // //               whileHover={{ scale: 1.05, x: 10 }}
// // // // // //             >
// // // // // //               <Users className="text-blue-500 mr-4" size={24} />
// // // // // //               <span className="text-gray-700">Network with professionals in the industry</span>
// // // // // //             </motion.li>
// // // // // //             <motion.li
// // // // // //               className="flex items-center"
// // // // // //               whileHover={{ scale: 1.05, x: 10 }}
// // // // // //             >
// // // // // //               <TrendingUp className="text-blue-500 mr-4" size={24} />
// // // // // //               <span className="text-gray-700">Gain experience through internships or entry-level positions</span>
// // // // // //             </motion.li>
// // // // // //           </ul>
// // // // // //           <motion.div
// // // // // //             className="mt-8"
// // // // // //             whileHover={{ scale: 1.05 }}
// // // // // //             whileTap={{ scale: 0.95 }}
// // // // // //           >
// // // // // //             <Link
// // // // // //               to={`/career-roadmap/${careerId}`}
// // // // // //               className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center"
// // // // // //             >
// // // // // //               Explore Career Roadmap
// // // // // //               <ArrowRight className="ml-2" size={20} />
// // // // // //             </Link>
// // // // // //           </motion.div>
// // // // // //         </motion.section>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CareerDetails;

// // // // // import React, { useState, useEffect } from 'react'
// // // // // import { Link, useParams } from 'react-router-dom'
// // // // // import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'
// // // // // import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// // // // // import FloatingShapes from './FloatingShapes'
// // // // // import CareerInterestPopup from './CareerInterestPopup'
// // // // // import axios from 'axios'

// // // // // const fallbackData = {
// // // // //   career: "Software Engineer",
// // // // //   career_id: 44,
// // // // //   description: "Software Engineers design, develop, and maintain software systems and applications. They work on a variety of projects, from web and mobile applications to operating systems and embedded software.",
// // // // //   cons: [
// // // // //     "Long hours, especially during project deadlines.",
// // // // //     "Competitive field requiring constant learning and skill development.",
// // // // //     "Limited creativity as compared to other software-related roles like UX design.",
// // // // //     "Can involve repetitive tasks, depending on the specific role.",
// // // // //     "Requires a high level of problem-solving abilities, which can be stressful."
// // // // //   ],
// // // // //   pros: [
// // // // //     "High demand for skilled professionals in a rapidly growing industry.",
// // // // //     "Competitive salaries and excellent benefits packages.",
// // // // //     "Opportunities for continuous learning, innovation, and career advancement.",
// // // // //     "Job security and long-term career prospects due to the increasing reliance on technology.",
// // // // //     "Prestigious and rewarding profession with opportunities to make a positive impact."
// // // // //   ],
// // // // //   related_careers: [
// // // // //     "Product Manager",
// // // // //     "Web Developer",
// // // // //     "Backend Developer",
// // // // //     "Data Scientist",
// // // // //     "Machine Learning Engineer",
// // // // //     "Cloud Architect",
// // // // //     "Technical Writer",
// // // // //     "Software Architect",
// // // // //     "Systems Analyst"
// // // // //   ],
// // // // //   skills: [
// // // // //     "Programming Languages",
// // // // //     "Data Structures",
// // // // //     "Algorithms",
// // // // //     "Software Design",
// // // // //     "Debugging",
// // // // //     "Version Control",
// // // // //     "Databases",
// // // // //     "Agile Development",
// // // // //     "Cloud Computing",
// // // // //     "Communication"
// // // // //   ],
// // // // //   trend: [
// // // // //     "2020: 10%",
// // // // //     "2021: 8%",
// // // // //     "2022: 6%",
// // // // //     "2023: 4%",
// // // // //     "2024: 2%"
// // // // //   ],
// // // // //   salary: {
// // // // //     min_salary: 420000,
// // // // //     max_salary: 1100000,
// // // // //     median_salary: 650000,
// // // // //     currency: "INR",
// // // // //     period: "YEAR"
// // // // //   }
// // // // // }

// // // // // const CareerDetails = () => {
// // // // //   const { career } = useParams()
// // // // //   const [careerData, setCareerData] = useState(null)
// // // // //   const [loading, setLoading] = useState(true)
// // // // //   const [error, setError] = useState(null)
// // // // //   const [salaryType, setSalaryType] = useState('yearly')
// // // // //   const [timeSpent, setTimeSpent] = useState(0)

// // // // //   useEffect(() => {
// // // // //     const fetchCareerData = async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         if (location.state && location.state.careerData) {
// // // // //           setCareerData(location.state.careerData);
// // // // //         } else {
// // // // //           const response = await fetch(`http://localhost:4000/api/careerLens/data/${careerId}`);
// // // // //           if (!response.ok) {
// // // // //             throw new Error(`HTTP error! status: ${response.status}`);
// // // // //           }
// // // // //           const data = await response.json();
// // // // //           setCareerData(data);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching career data:', error);
// // // // //         setError('Failed to fetch career data. Please try again later.');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchCareerData();
// // // // //   }, [careerId, location.state]);

// // // // //     // Start tracking time spent
// // // // //     const startTime = Date.now()
// // // // //     const timer = setInterval(() => {
// // // // //       setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
// // // // //     }, 1000)

// // // // //     // Clean up timer on component unmount
// // // // //     return () => clearInterval(timer)
// // // // //   }, [career])

// // // // //   const formatSalary = (amount, type = 'yearly') => {
// // // // //     const formatter = new Intl.NumberFormat('en-IN', {
// // // // //       style: 'currency',
// // // // //       currency: 'INR',
// // // // //       maximumFractionDigits: 0
// // // // //     })

// // // // //     if (type === 'monthly') {
// // // // //       amount = Math.round(amount / 12)
// // // // //     }

// // // // //     return formatter.format(amount)
// // // // //   }

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // // // //         <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   if (!careerData) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // // // //         <div className="text-center">
// // // // //           <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Career Not Found</h2>
// // // // //           <p className="text-xl text-gray-600 mb-8">We couldn't find the career you're looking for. Let's try again!</p>
// // // // //           <Link to="/career-lens" className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
// // // // //             Back to Career Lens
// // // // //           </Link>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// // // // //       <FloatingShapes />

// // // // //       <div className="max-w-5xl mx-auto relative">
// // // // //         <div className="mb-8">
// // // // //           <Link to="/career-lens" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
// // // // //             <ArrowLeft className="mr-2" size={24} />
// // // // //             <span className="text-xl font-semibold">Back to Career Lens</span>
// // // // //           </Link>
// // // // //         </div>

// // // // //         <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
// // // // //           {careerData.career}
// // // // //         </h1>

// // // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Career Overview</h2>
// // // // //           <p className="text-xl text-gray-600 leading-relaxed">{careerData.description}</p>
// // // // //         </section>

// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
// // // // //             <ul className="space-y-4">
// // // // //               {careerData.pros.map((pro, index) => (
// // // // //                 <li key={index} className="flex items-start">
// // // // //                   <ThumbsUp className="text-green-500 mr-2 flex-shrink-0" size={24} />
// // // // //                   <span className="text-gray-700">{pro}</span>
// // // // //                 </li>
// // // // //               ))}
// // // // //             </ul>
// // // // //           </section>

// // // // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
// // // // //             <ul className="space-y-4">
// // // // //               {careerData.cons.map((con, index) => (
// // // // //                 <li key={index} className="flex items-start">
// // // // //                   <ThumbsDown className="text-red-500 mr-2 flex-shrink-0" size={24} />
// // // // //                   <span className="text-gray-700">{con}</span>
// // // // //                 </li>
// // // // //               ))}
// // // // //             </ul>
// // // // //           </section>
// // // // //         </div>

// // // // //         <section className="bg-white rounded-lg shadow-lg p-8 my-8">
// // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Skills</h2>
// // // // //           <div className="flex flex-wrap gap-4">
// // // // //             {careerData.skills.map((skill, index) => (
// // // // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // // // //                 <span className="text-gray-800">{skill}</span>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section>

// // // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Salary Information</h2>
// // // // //           <div className="mb-4">
// // // // //             <label className="mr-4 text-lg">
// // // // //               <input
// // // // //                 type="radio"
// // // // //                 value="yearly"
// // // // //                 checked={salaryType === 'yearly'}
// // // // //                 onChange={() => setSalaryType('yearly')}
// // // // //                 className="mr-2"
// // // // //               />
// // // // //               Yearly
// // // // //             </label>
// // // // //             <label className="text-lg">
// // // // //               <input
// // // // //                 type="radio"
// // // // //                 value="monthly"
// // // // //                 checked={salaryType === 'monthly'}
// // // // //                 onChange={() => setSalaryType('monthly')}
// // // // //                 className="mr-2"
// // // // //               />
// // // // //               Monthly
// // // // //             </label>
// // // // //           </div>
// // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // // //               <p className="text-sm text-blue-800 mb-1">Minimum</p>
// // // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.min_salary, salaryType)}</p>
// // // // //             </div>
// // // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // // //               <p className="text-sm text-blue-800 mb-1">Median</p>
// // // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.median_salary, salaryType)}</p>
// // // // //             </div>
// // // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // // //               <p className="text-sm text-blue-800 mb-1">Maximum</p>
// // // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.max_salary, salaryType)}</p>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="h-64 w-full">
// // // // //             <ResponsiveContainer width="100%" height="100%">
// // // // //               <LineChart data={[
// // // // //                 { name: 'Minimum', salary: careerData.salary.min_salary },
// // // // //                 { name: 'Median', salary: careerData.salary.median_salary },
// // // // //                 { name: 'Maximum', salary: careerData.salary.max_salary }
// // // // //               ]}>
// // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // //                 <XAxis dataKey="name" />
// // // // //                 <YAxis />
// // // // //                 <Tooltip
// // // // //                   formatter={(value) => formatSalary(value, salaryType)}
// // // // //                   labelStyle={{ color: '#374151' }}
// // // // //                   contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0, 0, 0.1)' }}
// // // // //                 />
// // // // //                 <Line type="monotone" dataKey="salary" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
// // // // //               </LineChart>
// // // // //             </ResponsiveContainer>
// // // // //           </div>
// // // // //         </section>

// // // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Career Trend</h2>
// // // // //           <div className="h-64 w-full">
// // // // //             <ResponsiveContainer width="100%" height="100%">
// // // // //               <BarChart data={careerData.trend.map(item => {
// // // // //                 const [year, percentage] = item.split(': ')
// // // // //                 return { year, percentage: parseFloat(percentage) }
// // // // //               })}>
// // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // //                 <XAxis dataKey="year" />
// // // // //                 <YAxis />
// // // // //                 <Tooltip />
// // // // //                 <Bar dataKey="percentage" fill="#3B82F6" />
// // // // //               </BarChart>
// // // // //             </ResponsiveContainer>
// // // // //           </div>
// // // // //         </section>

// // // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Related Careers</h2>
// // // // //           <div className="flex flex-wrap gap-4">
// // // // //             {careerData.related_careers.map((relatedCareer, index) => (
// // // // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // // // //                 <span className="text-gray-800">{relatedCareer}</span>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section>

// // // // //         <section className="bg-white rounded-lg shadow-lg p-8">
// // // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Next Steps</h2>
// // // // //           <p className="text-xl text-gray-600 leading-relaxed mb-6">
// // // // //             Ready to pursue a career as a {careerData.career}? Here are some steps you can take:
// // // // //           </p>
// // // // //           <ul className="space-y-4">
// // // // //             <li className="flex items-center">
// // // // //               <Book className="text-blue-500 mr-4" size={24} />
// // // // //               <span className="text-gray-700">Research certification programs and educational requirements</span>
// // // // //             </li>
// // // // //             <li className="flex items-center">
// // // // //               <Users className="text-blue-500 mr-4" size={24} />
// // // // //               <span className="text-gray-700">Network with professionals in the industry</span>
// // // // //             </li>
// // // // //             <li className="flex items-center">
// // // // //               <TrendingUp className="text-blue-500 mr-4" size={24} />
// // // // //               <span className="text-gray-700">Gain experience through internships or entry-level positions</span>
// // // // //             </li>
// // // // //           </ul>
// // // // //           <div className="mt-8">
// // // // //             <Link
// // // // //               to={`/career-roadmap/${careerData.career_id}`}
// // // // //               className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center">
// // // // //               Explore Career Roadmap
// // // // //               <ArrowRight className="ml-2" size={20} />
// // // // //             </Link>
// // // // //           </div>
// // // // //         </section>

// // // // //         {timeSpent > 60 && <CareerInterestPopup careerName={careerData.career} />}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default CareerDetails

// // // // import React, { useState, useEffect } from 'react'
// // // // import { Link, useParams } from 'react-router-dom'
// // // // import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'
// // // // import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// // // // import FloatingShapes from './FloatingShapes'
// // // // import CareerInterestPopup from './CareerInterestPopup'
// // // // import axios from 'axios'

// // // // const fallbackData = {
// // // //   career: "Software Engineer",
// // // //   career_id: 44,
// // // //   description: "Software Engineers design, develop, and maintain software systems and applications. They work on a variety of projects, from web and mobile applications to operating systems and embedded software.",
// // // //   cons: [
// // // //     "Long hours, especially during project deadlines.",
// // // //     "Competitive field requiring constant learning and skill development.",
// // // //     "Limited creativity as compared to other software-related roles like UX design.",
// // // //     "Can involve repetitive tasks, depending on the specific role.",
// // // //     "Requires a high level of problem-solving abilities, which can be stressful."
// // // //   ],
// // // //   pros: [
// // // //     "High demand for skilled professionals in a rapidly growing industry.",
// // // //     "Competitive salaries and excellent benefits packages.",
// // // //     "Opportunities for continuous learning, innovation, and career advancement.",
// // // //     "Job security and long-term career prospects due to the increasing reliance on technology.",
// // // //     "Prestigious and rewarding profession with opportunities to make a positive impact."
// // // //   ],
// // // //   related_careers: [
// // // //     "Product Manager",
// // // //     "Web Developer",
// // // //     "Backend Developer",
// // // //     "Data Scientist",
// // // //     "Machine Learning Engineer",
// // // //     "Cloud Architect",
// // // //     "Technical Writer",
// // // //     "Software Architect",
// // // //     "Systems Analyst"
// // // //   ],
// // // //   skills: [
// // // //     "Programming Languages",
// // // //     "Data Structures",
// // // //     "Algorithms",
// // // //     "Software Design",
// // // //     "Debugging",
// // // //     "Version Control",
// // // //     "Databases",
// // // //     "Agile Development",
// // // //     "Cloud Computing",
// // // //     "Communication"
// // // //   ],
// // // //   trend: [
// // // //     "2020: 10%",
// // // //     "2021: 8%",
// // // //     "2022: 6%",
// // // //     "2023: 4%",
// // // //     "2024: 2%"
// // // //   ],
// // // //   salary: {
// // // //     min_salary: 420000,
// // // //     max_salary: 1100000,
// // // //     median_salary: 650000,
// // // //     currency: "INR",
// // // //     period: "YEAR"
// // // //   }
// // // // }

// // // // const CareerDetails = () => {
// // // //   const { career } = useParams()
// // // //   const [careerData, setCareerData] = useState(null)
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)
// // // //   const [salaryType, setSalaryType] = useState('yearly')
// // // //   const [timeSpent, setTimeSpent] = useState(0)

// // // //   useEffect(() => {
// // // //     const fetchCareerData = async () => {
// // // //       try {
// // // //         setLoading(true)
// // // //         const response = await axios.get(`http://localhost:4000/api/careerLens/data/${career}`)
// // // //         setCareerData(response.data)
// // // //       } catch (error) {
// // // //         console.error('Error fetching career data:', error)
// // // //         setCareerData(fallbackData)
// // // //         setError('Failed to fetch career data. Using fallback data.')
// // // //       } finally {
// // // //         setLoading(false)
// // // //       }
// // // //     }

// // // //     fetchCareerData()

// // // //     const startTime = Date.now()
// // // //     const timer = setInterval(() => {
// // // //       setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
// // // //     }, 1000)

// // // //     return () => clearInterval(timer)
// // // //   }, [career])

// // // //   const formatSalary = (amount, type = 'yearly') => {
// // // //     const formatter = new Intl.NumberFormat('en-IN', {
// // // //       style: 'currency',
// // // //       currency: 'INR',
// // // //       maximumFractionDigits: 0
// // // //     })

// // // //     if (type === 'monthly') {
// // // //       amount = Math.round(amount / 12)
// // // //     }

// // // //     return formatter.format(amount)
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (!careerData) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="text-center">
// // // //           <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Career Not Found</h2>
// // // //           <p className="text-xl text-gray-600 mb-8">We couldn't find the career you're looking for. Let's try again!</p>
// // // //           <Link to="/career-lens" className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
// // // //             Back to Career Lens
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// // // //       <FloatingShapes />

// // // //       <div className="max-w-5xl mx-auto relative">
// // // //         <div className="mb-8">
// // // //           <Link to="/career-lens" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
// // // //             <ArrowLeft className="mr-2" size={24} />
// // // //             <span className="text-xl font-semibold">Back to Career Lens</span>
// // // //           </Link>
// // // //         </div>

// // // //         <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
// // // //           {careerData.career}
// // // //         </h1>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Career Overview</h2>
// // // //           <p className="text-xl text-gray-600 leading-relaxed">{careerData.description}</p>
// // // //         </section>

// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
// // // //             <ul className="space-y-4">
// // // //               {careerData.pros.map((pro, index) => (
// // // //                 <li key={index} className="flex items-start">
// // // //                   <ThumbsUp className="text-green-500 mr-2 flex-shrink-0" size={24} />
// // // //                   <span className="text-gray-700">{pro}</span>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           </section>

// // // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
// // // //             <ul className="space-y-4">
// // // //               {careerData.cons.map((con, index) => (
// // // //                 <li key={index} className="flex items-start">
// // // //                   <ThumbsDown className="text-red-500 mr-2 flex-shrink-0" size={24} />
// // // //                   <span className="text-gray-700">{con}</span>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           </section>
// // // //         </div>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 my-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Skills</h2>
// // // //           <div className="flex flex-wrap gap-4">
// // // //             {careerData.skills.map((skill, index) => (
// // // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // // //                 <span className="text-gray-800">{skill}</span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Salary Information</h2>
// // // //           <div className="mb-4">
// // // //             <label className="mr-4 text-lg">
// // // //               <input
// // // //                 type="radio"
// // // //                 value="yearly"
// // // //                 checked={salaryType === 'yearly'}
// // // //                 onChange={() => setSalaryType('yearly')}
// // // //                 className="mr-2"
// // // //               />
// // // //               Yearly
// // // //             </label>
// // // //             <label className="text-lg">
// // // //               <input
// // // //                 type="radio"
// // // //                 value="monthly"
// // // //                 checked={salaryType === 'monthly'}
// // // //                 onChange={() => setSalaryType('monthly')}
// // // //                 className="mr-2"
// // // //               />
// // // //               Monthly
// // // //             </label>
// // // //           </div>
// // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // //               <p className="text-sm text-blue-800 mb-1">Minimum</p>
// // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.min_salary, salaryType)}</p>
// // // //             </div>
// // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // //               <p className="text-sm text-blue-800 mb-1">Median</p>
// // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.median_salary, salaryType)}</p>
// // // //             </div>
// // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // //               <p className="text-sm text-blue-800 mb-1">Maximum</p>
// // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.max_salary, salaryType)}</p>
// // // //             </div>
// // // //           </div>
// // // //           <div className="h-64 w-full">
// // // //             <ResponsiveContainer width="100%" height="100%">
// // // //               <LineChart data={[
// // // //                 { name: 'Minimum', salary: careerData.salary.min_salary },
// // // //                 { name: 'Median', salary: careerData.salary.median_salary },
// // // //                 { name: 'Maximum', salary: careerData.salary.max_salary }
// // // //               ]}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="name" />
// // // //                 <YAxis />
// // // //                 <Tooltip
// // // //                   formatter={(value) => formatSalary(value, salaryType)}
// // // //                   labelStyle={{ color: '#374151' }}
// // // //                   contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0, 0, 0.1)' }}
// // // //                 />
// // // //                 <Line type="monotone" dataKey="salary" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
// // // //               </LineChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Career Trend</h2>
// // // //           <div className="h-64 w-full">
// // // //             <ResponsiveContainer width="100%" height="100%">
// // // //               <BarChart data={careerData.trend.map(item => {
// // // //                 const [year, percentage] = item.split(': ')
// // // //                 return { year, percentage: parseFloat(percentage) }
// // // //               })}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="year" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Bar dataKey="percentage" fill="#3B82F6" />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Related Careers</h2>
// // // //           <div className="flex flex-wrap gap-4">
// // // //             {careerData.related_careers.map((relatedCareer, index) => (
// // // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // // //                 <span className="text-gray-800">{relatedCareer}</span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Next Steps</h2>
// // // //           <p className="text-xl text-gray-600 leading-relaxed mb-6">
// // // //             Ready to pursue a career as a {careerData.career}? Here are some steps you can take:
// // // //           </p>
// // // //           <ul className="space-y-4">
// // // //             <li className="flex items-center">
// // // //               <Book className="text-blue-500 mr-4" size={24} />
// // // //               <span className="text-gray-700">Research certification programs and educational requirements</span>
// // // //             </li>
// // // //             <li className="flex items-center">
// // // //               <Users className="text-blue-500 mr-4" size={24} />
// // // //               <span className="text-gray-700">Network with professionals in the industry</span>
// // // //             </li>
// // // //             <li className="flex items-center">
// // // //               <TrendingUp className="text-blue-500 mr-4" size={24} />
// // // //               <span className="text-gray-700">Gain experience through internships or entry-level positions</span>
// // // //             </li>
// // // //           </ul>
// // // //           <div className="mt-8">
// // // //             <Link
// // // //               to={`/career-roadmap/${careerData.career_id}`}
// // // //               className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center">
// // // //               Explore Career Roadmap
// // // //               <ArrowRight className="ml-2" size={20} />
// // // //             </Link>
// // // //           </div>
// // // //         </section>

// // // //         {timeSpent > 60 && <CareerInterestPopup careerName={careerData.career} />}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default CareerDetails

// // // // import React, { useState, useEffect } from 'react'
// // // // import { Link, useParams } from 'react-router-dom'
// // // // import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'
// // // // import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// // // // import FloatingShapes from './FloatingShapes'
// // // // import CareerInterestPopup from './CareerInterestPopup'
// // // // import axios from 'axios'

// // // // const fallbackData = {
// // // //   career: "Software Engineer",
// // // //   career_id: 44,
// // // //   description: "Software Engineers design, develop, and maintain software systems and applications. They work on a variety of projects, from web and mobile applications to operating systems and embedded software.",
// // // //   cons: [
// // // //     "Long hours, especially during project deadlines.",
// // // //     "Competitive field requiring constant learning and skill development.",
// // // //     "Limited creativity as compared to other software-related roles like UX design.",
// // // //     "Can involve repetitive tasks, depending on the specific role.",
// // // //     "Requires a high level of problem-solving abilities, which can be stressful."
// // // //   ],
// // // //   pros: [
// // // //     "High demand for skilled professionals in a rapidly growing industry.",
// // // //     "Competitive salaries and excellent benefits packages.",
// // // //     "Opportunities for continuous learning, innovation, and career advancement.",
// // // //     "Job security and long-term career prospects due to the increasing reliance on technology.",
// // // //     "Prestigious and rewarding profession with opportunities to make a positive impact."
// // // //   ],
// // // //   related_careers: [
// // // //     "Product Manager",
// // // //     "Web Developer",
// // // //     "Backend Developer",
// // // //     "Data Scientist",
// // // //     "Machine Learning Engineer",
// // // //     "Cloud Architect",
// // // //     "Technical Writer",
// // // //     "Software Architect",
// // // //     "Systems Analyst"
// // // //   ],
// // // //   skills: [
// // // //     "Programming Languages",
// // // //     "Data Structures",
// // // //     "Algorithms",
// // // //     "Software Design",
// // // //     "Debugging",
// // // //     "Version Control",
// // // //     "Databases",
// // // //     "Agile Development",
// // // //     "Cloud Computing",
// // // //     "Communication"
// // // //   ],
// // // //   trend: [
// // // //     "2020: 10%",
// // // //     "2021: 8%",
// // // //     "2022: 6%",
// // // //     "2023: 4%",
// // // //     "2024: 2%"
// // // //   ],
// // // //   salary: {
// // // //     min_salary: 420000,
// // // //     max_salary: 1100000,
// // // //     median_salary: 650000,
// // // //     currency: "INR",
// // // //     period: "YEAR"
// // // //   }
// // // // }

// // // // const CareerDetails = () => {
// // // //   const { career } = useParams()
// // // //   const [careerData, setCareerData] = useState(null)
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)
// // // //   const [salaryType, setSalaryType] = useState('yearly')
// // // //   const [timeSpent, setTimeSpent] = useState(0)

// // // //   useEffect(() => {
// // // //     const fetchCareerData = async () => {
// // // //       try {
// // // //         setLoading(true)
// // // //         const response = await axios.get(`http://localhost:4000/api/careerLens/data/${career}`)
// // // //         setCareerData(response.data)
// // // //       } catch (error) {
// // // //         console.error('Error fetching career data:', error)
// // // //         setCareerData(fallbackData)
// // // //         setError('Failed to fetch career data. Using fallback data.')
// // // //       } finally {
// // // //         setLoading(false)
// // // //       }
// // // //     }

// // // //     fetchCareerData()

// // // //     const startTime = Date.now()
// // // //     const timer = setInterval(() => {
// // // //       setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
// // // //     }, 1000)

// // // //     return () => clearInterval(timer)
// // // //   }, [career])

// // // //   const formatSalary = (amount, type = 'yearly') => {
// // // //     const formatter = new Intl.NumberFormat('en-IN', {
// // // //       style: 'currency',
// // // //       currency: 'INR',
// // // //       maximumFractionDigits: 0
// // // //     })

// // // //     if (type === 'monthly') {
// // // //       amount = Math.round(amount / 12)
// // // //     }

// // // //     return formatter.format(amount)
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (!careerData) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // // //         <div className="text-center">
// // // //           <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Career Not Found</h2>
// // // //           <p className="text-xl text-gray-600 mb-8">We couldn't find the career you're looking for. Let's try again!</p>
// // // //           <Link to="/career-lens" className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
// // // //             Back to Career Lens
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// // // //       <FloatingShapes />

// // // //       <div className="max-w-5xl mx-auto relative">
// // // //         <div className="mb-8">
// // // //           <Link to="/career-lens" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
// // // //             <ArrowLeft className="mr-2" size={24} />
// // // //             <span className="text-xl font-semibold">Back to Career Lens</span>
// // // //           </Link>
// // // //         </div>

// // // //         <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
// // // //           {careerData.career}
// // // //         </h1>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Career Overview</h2>
// // // //           <p className="text-xl text-gray-600 leading-relaxed">{careerData.description}</p>
// // // //         </section>

// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
// // // //             <ul className="space-y-4">
// // // //               {careerData.pros.map((pro, index) => (
// // // //                 <li key={index} className="flex items-start">
// // // //                   <ThumbsUp className="text-green-500 mr-2 flex-shrink-0" size={24} />
// // // //                   <span className="text-gray-700">{pro}</span>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           </section>

// // // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
// // // //             <ul className="space-y-4">
// // // //               {careerData.cons.map((con, index) => (
// // // //                 <li key={index} className="flex items-start">
// // // //                   <ThumbsDown className="text-red-500 mr-2 flex-shrink-0" size={24} />
// // // //                   <span className="text-gray-700">{con}</span>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           </section>
// // // //         </div>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 my-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Skills</h2>
// // // //           <div className="flex flex-wrap gap-4">
// // // //             {careerData.skills.map((skill, index) => (
// // // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // // //                 <span className="text-gray-800">{skill}</span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Salary Information</h2>
// // // //           <div className="mb-4">
// // // //             <label className="mr-4 text-lg">
// // // //               <input
// // // //                 type="radio"
// // // //                 value="yearly"
// // // //                 checked={salaryType === 'yearly'}
// // // //                 onChange={() => setSalaryType('yearly')}
// // // //                 className="mr-2"
// // // //               />
// // // //               Yearly
// // // //             </label>
// // // //             <label className="text-lg">
// // // //               <input
// // // //                 type="radio"
// // // //                 value="monthly"
// // // //                 checked={salaryType === 'monthly'}
// // // //                 onChange={() => setSalaryType('monthly')}
// // // //                 className="mr-2"
// // // //               />
// // // //               Monthly
// // // //             </label>
// // // //           </div>
// // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // //               <p className="text-sm text-blue-800 mb-1">Minimum</p>
// // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.min_salary, salaryType)}</p>
// // // //             </div>
// // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // //               <p className="text-sm text-blue-800 mb-1">Median</p>
// // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.median_salary, salaryType)}</p>
// // // //             </div>
// // // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // // //               <p className="text-sm text-blue-800 mb-1">Maximum</p>
// // // //               <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.max_salary, salaryType)}</p>
// // // //             </div>
// // // //           </div>
// // // //           <div className="h-64 w-full">
// // // //             <ResponsiveContainer width="100%" height="100%">
// // // //               <LineChart data={[
// // // //                 { name: 'Minimum', salary: careerData.salary.min_salary },
// // // //                 { name: 'Median', salary: careerData.salary.median_salary },
// // // //                 { name: 'Maximum', salary: careerData.salary.max_salary }
// // // //               ]}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="name" />
// // // //                 <YAxis />
// // // //                 <Tooltip
// // // //                   formatter={(value) => formatSalary(value, salaryType)}
// // // //                   labelStyle={{ color: '#374151' }}
// // // //                   contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0, 0, 0.1)' }}
// // // //                 />
// // // //                 <Line type="monotone" dataKey="salary" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
// // // //               </LineChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Career Trend</h2>
// // // //           <div className="h-64 w-full">
// // // //             <ResponsiveContainer width="100%" height="100%">
// // // //               <BarChart data={careerData.trend.map(item => {
// // // //                 const [year, percentage] = item.split(': ')
// // // //                 return { year, percentage: parseFloat(percentage) }
// // // //               })}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="year" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Bar dataKey="percentage" fill="#3B82F6" />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Related Careers</h2>
// // // //           <div className="flex flex-wrap gap-4">
// // // //             {careerData.related_careers.map((relatedCareer, index) => (
// // // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // // //                 <span className="text-gray-800">{relatedCareer}</span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         <section className="bg-white rounded-lg shadow-lg p-8">
// // // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Next Steps</h2>
// // // //           <p className="text-xl text-gray-600 leading-relaxed mb-6">
// // // //             Ready to pursue a career as a {careerData.career}? Here are some steps you can take:
// // // //           </p>
// // // //           <ul className="space-y-4">
// // // //             <li className="flex items-center">
// // // //               <Book className="text-blue-500 mr-4" size={24} />
// // // //               <span className="text-gray-700">Research certification programs and educational requirements</span>
// // // //             </li>
// // // //             <li className="flex items-center">
// // // //               <Users className="text-blue-500 mr-4" size={24} />
// // // //               <span className="text-gray-700">Network with professionals in the industry</span>
// // // //             </li>
// // // //             <li className="flex items-center">
// // // //               <TrendingUp className="text-blue-500 mr-4" size={24} />
// // // //               <span className="text-gray-700">Gain experience through internships or entry-level positions</span>
// // // //             </li>
// // // //           </ul>
// // // //           <div className="mt-8">
// // // //             <Link
// // // //               to={`/career-roadmap/${careerData.career_id}`}
// // // //               className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center">
// // // //               Explore Career Roadmap
// // // //               <ArrowRight className="ml-2" size={20} />
// // // //             </Link>
// // // //           </div>
// // // //         </section>

// // // //         {timeSpent > 20 && <CareerInterestPopup careerName={careerData.career} />}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default CareerDetails

// // // import React, { useState, useEffect } from "react";
// // // import { Link, useLocation, useParams } from "react-router-dom";
// // // import {
// // //   ArrowLeft,
// // //   Book,
// // //   Users,
// // //   TrendingUp,
// // //   ThumbsUp,
// // //   ThumbsDown,
// // //   ArrowRight,
// // // } from "lucide-react";
// // // import {
// // //   LineChart,
// // //   Line,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // // } from "recharts";
// // // import FloatingShapes from "./FloatingShapes";
// // // import CareerInterestPopup from "./CareerInterestPopup";
// // // import axios from "axios";
// // // import StudentTimeline from "./StudentTimeline";

// // // const fallbackData = {
// // //   career: "Software Engineer",
// // //   career_id: 44,
// // //   description:
// // //     "Software Engineers design, develop, and maintain software systems and applications. They work on a variety of projects, from web and mobile applications to operating systems and embedded software.",
// // //   cons: [
// // //     "Long hours, especially during project deadlines.",
// // //     "Competitive field requiring constant learning and skill development.",
// // //     "Limited creativity as compared to other software-related roles like UX design.",
// // //     "Can involve repetitive tasks, depending on the specific role.",
// // //     "Requires a high level of problem-solving abilities, which can be stressful.",
// // //   ],
// // //   pros: [
// // //     "High demand for skilled professionals in a rapidly growing industry.",
// // //     "Competitive salaries and excellent benefits packages.",
// // //     "Opportunities for continuous learning, innovation, and career advancement.",
// // //     "Job security and long-term career prospects due to the increasing reliance on technology.",
// // //     "Prestigious and rewarding profession with opportunities to make a positive impact.",
// // //   ],
// // //   related_careers: [
// // //     "Product Manager",
// // //     "Web Developer",
// // //     "Backend Developer",
// // //     "Data Scientist",
// // //     "Machine Learning Engineer",
// // //     "Cloud Architect",
// // //     "Technical Writer",
// // //     "Software Architect",
// // //     "Systems Analyst",
// // //   ],
// // //   skills: [
// // //     "Programming Languages",
// // //     "Data Structures",
// // //     "Algorithms",
// // //     "Software Design",
// // //     "Debugging",
// // //     "Version Control",
// // //     "Databases",
// // //     "Agile Development",
// // //     "Cloud Computing",
// // //     "Communication",
// // //   ],
// // //   trend: ["2020: 10%", "2021: 8%", "2022: 6%", "2023: 4%", "2024: 2%"],
// // //   salary: {
// // //     min_salary: 420000,
// // //     max_salary: 1100000,
// // //     median_salary: 650000,
// // //     currency: "INR",
// // //     period: "YEAR",
// // //   },
// // // };

// // // const CareerDetails = () => {
// // //   const { careerId } = useParams();
// // //   const location = useLocation();
// // //   const [careerData, setCareerData] = useState(null);
// // //   const [mentors, setMentors] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [salaryType, setSalaryType] = useState("yearly");
// // //   const [timeSpent, setTimeSpent] = useState(0);
// // //   const [showMentors, setShowMentors] = useState(false);

// // //   // useEffect(() => {
// // //   //   const fetchCareerData = async () => {
// // //   //     try {
// // //   //       setLoading(true);
// // //   //       const response = await axios.post(
// // //   //         "http://localhost:4000/api/careerLens/data",
// // //   //         {
// // //   //           career_name: location.state,
// // //   //         }
// // //   //       );

// // //   //       if (!response) {
// // //   //         throw new Error(`HTTP error! status: ${response.status}`);
// // //   //       }

// // //   //       const data = await response.data;
// // //   //       console.log("Received data:", data);

// // //   //       if (!data || typeof data !== "object" || !data.name) {
// // //   //         console.error("Invalid data structure:", data);
// // //   //         throw new Error("Invalid career data received");
// // //   //       }

// // //   //       const parsedData = {
// // //   //         ...data,
// // //   //         trend: parseTrendData(data.trend),
// // //   //       };

// // //   //       setCareerData(parsedData);
// // //   //     } catch (error) {
// // //   //       console.error("Error fetching career data:", error);
// // //   //       setCareerData(fallbackData);
// // //   //       setError("Failed to fetch career data. Using fallback data.");
// // //   //     } finally {
// // //   //       setLoading(false);
// // //   //     }
// // //   //   };

// // //   //   const fetchMentors = async () => {
// // //   //     try {
// // //   //       const response = await axios.get("http://localhost:4000/api/mentor");
// // //   //       setMentors(response.data);
// // //   //     } catch (error) {
// // //   //       console.error("Error fetching mentor data:", error);
// // //   //       setError("Failed to fetch mentor data.");
// // //   //     }
// // //   //   };

// // //   //   fetchCareerData();
// // //   //   fetchMentors();

// // //   //   const startTime = Date.now();
// // //   //   const timer = setInterval(() => {
// // //   //     const newTimeSpent = Math.floor((Date.now() - startTime) / 1000);
// // //   //     setTimeSpent(newTimeSpent);
// // //   //     console.log("Time spent:", newTimeSpent);
// // //   //     if (newTimeSpent > 30 && !showMentors) {
// // //   //       setShowMentors(true);
// // //   //     }
// // //   //   }, 1000);

// // //   //   return () => clearInterval(timer);
// // //   // }, [location.state]);


  
  

// // //   useEffect(() => {
// // //     const fetchCareerData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         if (location.state && location.state.careerData) {
// // //           setCareerData(location.state.careerData);
// // //           console.log(careerData);
          
// // //         } else {
// // //           const response = await axios.post(`http://localhost:4000/api/careerLens/data`,{
// // //             career_name: location.state.careerData.name
// // //           });
// // //           if (!response) {
// // //             throw new Error(`HTTP error! status: ${response.status}`);
// // //           }
// // //           const data = await response.data;
// // //           setCareerData(data);
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching career data:', error);
// // //         setError('Failed to fetch career data. Please try again later.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCareerData();
// // //   }, [careerId, location.state]); 

// // //   const parseTrendData = (trendData) => {
// // //     try {
// // //       if (Array.isArray(trendData)) {
// // //         return trendData;
// // //       }

// // //       if (typeof trendData === "string") {
// // //         const cleanedTrendData = trendData.trim().replace(/'/g, '"');
// // //         const parsed = JSON.parse(cleanedTrendData);
// // //         if (typeof parsed === "object" && !Array.isArray(parsed)) {
// // //           return Object.entries(parsed).map(([year, percentage]) => ({
// // //             year,
// // //             percentage: parseFloat(percentage.toString().replace("%", "")),
// // //           }));
// // //         }
// // //       }

// // //       if (typeof trendData === "object" && !Array.isArray(trendData)) {
// // //         return Object.entries(trendData).map(([year, percentage]) => ({
// // //           year,
// // //           percentage: parseFloat(percentage.toString().replace("%", "")),
// // //         }));
// // //       }

// // //       console.error("Invalid trend data format:", trendData);
// // //       return [];
// // //     } catch (error) {
// // //       console.error("Error parsing trend data:", error);
// // //       return [];
// // //     }
// // //   };

// // //   const formatSalary = (amount, type = "yearly") => {
// // //     const formatter = new Intl.NumberFormat("en-IN", {
// // //       style: "currency",
// // //       currency: "INR",
// // //       maximumFractionDigits: 0,
// // //     });

// // //     if (type === "monthly") {
// // //       amount = Math.round(amount / 12);
// // //     }

// // //     return formatter.format(amount);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // //         <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!careerData) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// // //         <div className="text-center">
// // //           <h2 className="text-3xl font-bold text-gray-800 mb-4">
// // //             Oops! Career Not Found
// // //           </h2>
// // //           <p className="text-xl text-gray-600 mb-8">
// // //             We couldn't find the career you're looking for. Let's try again!
// // //           </p>
// // //           <Link
// // //             to="/career-lens"
// // //             className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
// // //           >
// // //             Back to Career Lens
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// // //       <FloatingShapes />
// // // <StudentTimeline/>
// // //       <div className="max-w-5xl mx-auto relative">
// // //         <div className="mb-8">
// // //           <Link
// // //             to="/career-lens"
// // //             className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
// // //           >
// // //             <ArrowLeft className="mr-2" size={24} />
// // //             <span className="text-xl font-semibold">Back to Career Lens</span>
// // //           </Link>
// // //         </div>

// // //         <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
// // //           {careerData.career}
// // //         </h1>

// // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // //           <h2 className="text-3xl font-semibold text-gray-800 mb-4">
// // //             Career Overview
// // //           </h2>
// // //           <p className="text-xl text-gray-600 leading-relaxed">
// // //             {careerData.description}
// // //           </p>
// // //         </section>

// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
// // //             <ul className="space-y-4">
// // //               {careerData.pros.map((pro, index) => (
// // //                 <li key={index} className="flex items-start">
// // //                   <ThumbsUp
// // //                     className="text-green-500 mr-2 flex-shrink-0"
// // //                     size={24}
// // //                   />
// // //                   <span className="text-gray-700">{pro}</span>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </section>

// // //           <section className="bg-white rounded-lg shadow-lg p-8">
// // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
// // //             <ul className="space-y-4">
// // //               {careerData.cons.map((con, index) => (
// // //                 <li key={index} className="flex items-start">
// // //                   <ThumbsDown
// // //                     className="text-red-500 mr-2 flex-shrink-0"
// // //                     size={24}
// // //                   />
// // //                   <span className="text-gray-700">{con}</span>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </section>
// // //         </div>

// // //         <section className="bg-white rounded-lg shadow-lg p-8 my-8">
// // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// // //             Key Skills
// // //           </h2>
// // //           <div className="flex flex-wrap gap-4">
// // //             {careerData.skills.map((skill, index) => (
// // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // //                 <span className="text-gray-800">{skill}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// // //             Salary Information
// // //           </h2>
// // //           <div className="mb-4">
// // //             <label className="mr-4 text-lg">
// // //               <input
// // //                 type="radio"
// // //                 value="yearly"
// // //                 checked={salaryType === "yearly"}
// // //                 onChange={() => setSalaryType("yearly")}
// // //                 className="mr-2"
// // //               />
// // //               Yearly
// // //             </label>
// // //             <label className="text-lg">
// // //               <input
// // //                 type="radio"
// // //                 value="monthly"
// // //                 checked={salaryType === "monthly"}
// // //                 onChange={() => setSalaryType("monthly")}
// // //                 className="mr-2"
// // //               />
// // //               Monthly
// // //             </label>
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // //               <p className="text-sm text-blue-800 mb-1">Minimum</p>
// // //               <p className="text-2xl font-bold text-blue-600">
// // //                 {formatSalary(careerData.salary.min_salary, salaryType)}
// // //               </p>
// // //             </div>
// // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // //               <p className="text-sm text-blue-800 mb-1">Median</p>
// // //               <p className="text-2xl font-bold text-blue-600">
// // //                 {formatSalary(careerData.salary.median_salary, salaryType)}
// // //               </p>
// // //             </div>
// // //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// // //               <p className="text-sm text-blue-800 mb-1">Maximum</p>
// // //               <p className="text-2xl font-bold text-blue-600">
// // //                 {formatSalary(careerData.salary.max_salary, salaryType)}
// // //               </p>
// // //             </div>
// // //           </div>
// // //           <div className="h-64 w-full">
// // //             <ResponsiveContainer width="100%" height="100%">
// // //               <LineChart
// // //                 data={[
// // //                   { name: "Minimum", salary: careerData.salary.min_salary },
// // //                   { name: "Median", salary: careerData.salary.median_salary },
// // //                   { name: "Maximum", salary: careerData.salary.max_salary },
// // //                 ]}
// // //               >
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="name" />
// // //                 <YAxis />
// // //                 <Tooltip
// // //                   formatter={(value) => formatSalary(value, salaryType)}
// // //                   labelStyle={{ color: "#374151" }}
// // //                   contentStyle={{
// // //                     backgroundColor: "#ffffff",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     boxShadow: "0 4px 6px rgba(0,0, 0, 0.1)",
// // //                   }}
// // //                 />
// // //                 <Line
// // //                   type="monotone"
// // //                   dataKey="salary"
// // //                   stroke="#3B82F6"
// // //                   strokeWidth={2}
// // //                   dot={{ fill: "#3B82F6", strokeWidth: 2 }}
// // //                 />
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </section>

// // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// // //             Career Trend
// // //           </h2>
// // //           <div className="h-64 w-full">
// // //             <ResponsiveContainer width="100%" height="100%">
// // //               <BarChart data={careerData.trend}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="year" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Bar dataKey="percentage" fill="#3B82F6" />
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </section>

// // //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// // //             Related Careers
// // //           </h2>
// // //           <div className="flex flex-wrap gap-4">
// // //             {careerData.related_careers.map((relatedCareer, index) => (
// // //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// // //                 <span className="text-gray-800">{relatedCareer}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         <section className="bg-white rounded-lg shadow-lg p-8">
// // //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// // //             Next Steps
// // //           </h2>
// // //           <p className="text-xl text-gray-600 leading-relaxed mb-6">
// // //             Ready to pursue a career as a {careerData.career}? Here are some
// // //             steps you can take:
// // //           </p>
// // //           <ul className="space-y-4">
// // //             <li className="flex items-center">
// // //               <Book className="text-blue-500 mr-4" size={24} />
// // //               <span className="text-gray-700">
// // //                 Research certification programs and educational requirements
// // //               </span>
// // //             </li>
// // //             <li className="flex items-center">
// // //               <Users className="text-blue-500 mr-4" size={24} />
// // //               <span className="text-gray-700">
// // //                 Network with professionals in the industry
// // //               </span>
// // //             </li>
// // //             <li className="flex items-center">
// // //               <TrendingUp className="text-blue-500 mr-4" size={24} />
// // //               <span className="text-gray-700">
// // //                 Gain experience through internships or entry-level positions
// // //               </span>
// // //             </li>
// // //           </ul>
// // //           <div className="mt-8">
// // //             <Link
// // //               to={`/career-roadmap/${careerData.career_id}`}
// // //               className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center"
// // //             >
// // //               Explore Career Roadmap
// // //               <ArrowRight className="ml-2" size={20} />
// // //             </Link>
// // //           </div>
// // //         </section>

// // //         {timeSpent > 30 && (
// // //           <CareerInterestPopup careerName={careerData.career} />
// // //         )}

// // //         {showMentors && (
// // //           <section className="bg-white rounded-lg shadow-lg p-8 mt-8">
// // //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// // //               Meet Our Mentors
// // //             </h2>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //               {mentors.map((mentor) => (
// // //                 <a href={`mentor-booking/${mentor.user_id}`}>

// // //                 <div
// // //                   key={mentor.user_id}
// // //                   className="bg-gray-50 rounded-lg p-4 shadow"
// // //                   >
// // //                   <img
// // //                     src={mentor.image_url}
// // //                     alt={mentor.user.name}
// // //                     className="w-24 h-24 rounded-full mx-auto mb-4"
// // //                   />
// // //                   <h3 className="text-xl font-semibold text-center mb-2">
// // //                     {mentor.user.name}
// // //                   </h3>
// // //                   <p className="text-gray-600 text-center mb-2">
// // //                     {mentor.expertise}
// // //                   </p>
// // //                   <p className="text-sm text-gray-500 text-center mb-4">
// // //                     {mentor.location}
// // //                   </p>
// // //                   <p className="text-sm text-gray-700">{mentor.bio}</p>
// // //                 </div>
// // //               </a>
// // //               ))}
// // //             </div>
// // //           </section>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CareerDetails;


// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useParams } from "react-router-dom";
// // import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react';
// // import {
// //   LineChart,
// //   Line,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";
// // import FloatingShapes from "./FloatingShapes";
// // import CareerInterestPopup from "./CareerInterestPopup";
// // import StudentTimeline from "./StudentTimeline";
// // import axios from "axios";

// // const careerData = {
// //   "Software Engineer": {
// //     career: "Software Engineer",
// //     career_id: 44,
// //     description: "Software Engineers design, develop, and maintain software systems and applications. They work on a variety of projects, from web and mobile applications to operating systems and embedded software.",
// //     cons: [
// //       "Long hours, especially during project deadlines.",
// //       "Competitive field requiring constant learning and skill development.",
// //       "Limited creativity as compared to other software-related roles like UX design.",
// //       "Can involve repetitive tasks, depending on the specific role.",
// //       "Requires a high level of problem-solving abilities, which can be stressful.",
// //     ],
// //     pros: [
// //       "High demand for skilled professionals in a rapidly growing industry.",
// //       "Competitive salaries and excellent benefits packages.",
// //       "Opportunities for continuous learning, innovation, and career advancement.",
// //       "Job security and long-term career prospects due to the increasing reliance on technology.",
// //       "Prestigious and rewarding profession with opportunities to make a positive impact.",
// //     ],
// //     related_careers: [
// //       "Product Manager",
// //       "Web Developer",
// //       "Backend Developer",
// //       "Data Scientist",
// //       "Machine Learning Engineer",
// //       "Cloud Architect",
// //       "Technical Writer",
// //       "Software Architect",
// //       "Systems Analyst",
// //     ],
// //     skills: [
// //       "Programming Languages",
// //       "Data Structures",
// //       "Algorithms",
// //       "Software Design",
// //       "Debugging",
// //       "Version Control",
// //       "Databases",
// //       "Agile Development",
// //       "Cloud Computing",
// //       "Communication",
// //     ],
// //     trend: [
// //       { year: "2020", percentage: 10 },
// //       { year: "2021", percentage: 8 },
// //       { year: "2022", percentage: 6 },
// //       { year: "2023", percentage: 4 },
// //       { year: "2024", percentage: 2 },
// //     ],
// //     salary: {
// //       min_salary: 420000,
// //       max_salary: 1100000,
// //       median_salary: 650000,
// //       currency: "INR",
// //       period: "YEAR",
// //     },
// //   },
// //   "Doctor": {
// //     career: "Doctor",
// //     career_id: 45,
// //     description: "Doctors diagnose and treat illnesses, injuries, and other health conditions. They work in various specialties and settings, from primary care to specialized fields like surgery or pediatrics.",
// //     cons: [
// //       "Long and irregular working hours, including nights and weekends.",
// //       "High levels of stress and responsibility.",
// //       "Extensive and ongoing education requirements.",
// //       "Risk of burnout and emotional exhaustion.",
// //       "Potential exposure to infectious diseases.",
// //     ],
// //     pros: [
// //       "Opportunity to make a significant impact on people's lives.",
// //       "High earning potential, especially in certain specialties.",
// //       "Respected and prestigious profession.",
// //       "Intellectual stimulation and continuous learning.",
// //       "Job security and diverse career opportunities.",
// //     ],
// //     related_careers: [
// //       "Nurse",
// //       "Pharmacist",
// //       "Medical Researcher",
// //       "Public Health Specialist",
// //       "Medical Administrator",
// //       "Physician Assistant",
// //       "Medical Technologist",
// //       "Therapist",
// //       "Nutritionist",
// //     ],
// //     skills: [
// //       "Medical Knowledge",
// //       "Diagnostic Skills",
// //       "Communication",
// //       "Empathy",
// //       "Critical Thinking",
// //       "Problem Solving",
// //       "Time Management",
// //       "Teamwork",
// //       "Attention to Detail",
// //       "Stress Management",
// //     ],
// //     trend: [
// //       { year: "2020", percentage: 7 },
// //       { year: "2021", percentage: 6 },
// //       { year: "2022", percentage: 5 },
// //       { year: "2023", percentage: 4 },
// //       { year: "2024", percentage: 3 },
// //     ],
// //     salary: {
// //       min_salary: 500000,
// //       max_salary: 5000000,
// //       median_salary: 1200000,
// //       currency: "INR",
// //       period: "YEAR",
// //     },
// //   },
// //   "Scientist": {
// //     career: "Scientist",
// //     career_id: 46,
// //     description: "Scientists conduct research and experiments to advance knowledge in various fields such as biology, chemistry, physics, and environmental science. They analyze data, develop theories, and contribute to scientific publications.",
// //     cons: [
// //       "Competitive job market, especially in academia.",
// //       "Long hours spent on research and experiments.",
// //       "Pressure to publish and secure funding.",
// //       "May require frequent relocation for career advancement.",
// //       "Some fields may have limited job opportunities outside of research.",
// //     ],
// //     pros: [
// //       "Opportunity to make groundbreaking discoveries.",
// //       "Intellectual stimulation and continuous learning.",
// //       "Potential to contribute to solving global challenges.",
// //       "Flexibility in research topics and methods.",
// //       "Collaboration with other experts in the field.",
// //     ],
// //     related_careers: [
// //       "Research Assistant",
// //       "Laboratory Technician",
// //       "Data Analyst",
// //       "Science Writer",
// //       "Environmental Consultant",
// //       "Biostatistician",
// //       "Science Educator",
// //       "Patent Examiner",
// //       "Clinical Research Coordinator",
// //     ],
// //     skills: [
// //       "Research Methodology",
// //       "Data Analysis",
// //       "Critical Thinking",
// //       "Scientific Writing",
// //       "Laboratory Techniques",
// //       "Problem Solving",
// //       "Statistical Analysis",
// //       "Attention to Detail",
// //       "Project Management",
// //       "Presentation Skills",
// //     ],
// //     trend: [
// //       { year: "2020", percentage: 5 },
// //       { year: "2021", percentage: 4 },
// //       { year: "2022", percentage: 3 },
// //       { year: "2023", percentage: 3 },
// //       { year: "2024", percentage: 2 },
// //     ],
// //     salary: {
// //       min_salary: 300000,
// //       max_salary: 2000000,
// //       median_salary: 800000,
// //       currency: "INR",
// //       period: "YEAR",
// //     },
// //   },
// // };

// // const CareerDetails = () => {
// //   const { careerId } = useParams();
// //   const location = useLocation();
// //   const [selectedCareer, setSelectedCareer] = useState(null);
// //   const [salaryType, setSalaryType] = useState("yearly");
// //   const [timeSpent, setTimeSpent] = useState(0);
// //   const [showMentors, setShowMentors] = useState(false);
// //     const [mentors, setMentors] = useState([]);


    
    
// //     useEffect(() => {
// //       const careerName = location.state || "Software Engineer";
// //       setSelectedCareer(careerData[careerName]);
// //       const fetchMentors = async () => {
// //               try {
// //                 const response = await axios.get("http://localhost:4000/api/mentor");
// //                 setMentors(response.data);
// //               } catch (error) {
// //                 console.error("Error fetching mentor data:", error);
// //                 setError("Failed to fetch mentor data.");
// //               }
// //             };
// // fetchMentors();
// //     const startTime = Date.now();
// //     // const timer = setInterval(() => {
// //     //   const newTimeSpent = Math.floor((Date.now() - startTime) / 1000);
// //     //   setTimeSpent(newTimeSpent);
// //     //   if (newTimeSpent > 10 && !showMentors) {
// //     //     setShowMentors(true);
// //     //   }
// //     // }, 10);
// //     const timer = setInterval(() => {
// //       const newTimeSpent = Math.floor((Date.now() - startTime) / 1000);
// //       setTimeSpent(newTimeSpent);
      
// //       // Show mentors after 10 seconds
// //       if (newTimeSpent >= 10 && !showMentors) {
// //           setShowMentors(true);
// //       }
// //   }, 1000); // Update every second

// //     return () => clearInterval(timer);
// //   }, [location.state]);

// //   const formatSalary = (amount, type = "yearly") => {
// //     const formatter = new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       maximumFractionDigits: 0,
// //     });

// //     if (type === "monthly") {
// //       amount = Math.round(amount / 12);
// //     }

// //     return formatter.format(amount);
// //   };

// //   if (!selectedCareer) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //         <div className="text-center">
// //           <h2 className="text-3xl font-bold text-gray-800 mb-4">
// //             Oops! Career Not Found
// //           </h2>
// //           <p className="text-xl text-gray-600 mb-8">
// //             We couldn't find the career you're looking for. Let's try again!
// //           </p>
// //           <Link
// //             to="/lens"
// //             className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
// //           >
// //             Back to Career Lens
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// //       <FloatingShapes />
// //       <StudentTimeline />
// //       <div className="max-w-5xl mx-auto relative">
// //         <div className="mb-8">
// //           <Link
// //             to="/lens"
// //             className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
// //           >
// //             <ArrowLeft className="mr-2" size={24} />
// //             <span className="text-xl font-semibold">Back to Career Lens</span>
// //           </Link>
// //         </div>

// //         <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
// //           {selectedCareer.career}
// //         </h1>

// //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-4">
// //             Career Overview
// //           </h2>
// //           <p className="text-xl text-gray-600 leading-relaxed">
// //             {selectedCareer.description}
// //           </p>
// //         </section>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           <section className="bg-white rounded-lg shadow-lg p-8">
// //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
// //             <ul className="space-y-4">
// //               {selectedCareer.pros.map((pro, index) => (
// //                 <li key={index} className="flex items-start">
// //                   <ThumbsUp
// //                     className="text-green-500 mr-2 flex-shrink-0"
// //                     size={24}
// //                   />
// //                   <span className="text-gray-700">{pro}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </section>

// //           <section className="bg-white rounded-lg shadow-lg p-8">
// //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
// //             <ul className="space-y-4">
// //               {selectedCareer.cons.map((con, index) => (
// //                 <li key={index} className="flex items-start">
// //                   <ThumbsDown
// //                     className="text-red-500 mr-2 flex-shrink-0"
// //                     size={24}
// //                   />
// //                   <span className="text-gray-700">{con}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </section>
// //         </div>

// //         <section className="bg-white rounded-lg shadow-lg p-8 my-8">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// //             Key Skills
// //           </h2>
// //           <div className="flex flex-wrap gap-4">
// //             {selectedCareer.skills.map((skill, index) => (
// //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// //                 <span className="text-gray-800">{skill}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// //             Salary Information
// //           </h2>
// //           <div className="mb-4">
// //             <label className="mr-4 text-lg">
// //               <input
// //                 type="radio"
// //                 value="yearly"
// //                 checked={salaryType === "yearly"}
// //                 onChange={() => setSalaryType("yearly")}
// //                 className="mr-2"
// //               />
// //               Yearly
// //             </label>
// //             <label className="text-lg">
// //               <input
// //                 type="radio"
// //                 value="monthly"
// //                 checked={salaryType === "monthly"}
// //                 onChange={() => setSalaryType("monthly")}
// //                 className="mr-2"
// //               />
// //               Monthly
// //             </label>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// //               <p className="text-sm text-blue-800 mb-1">Minimum</p>
// //               <p className="text-2xl font-bold text-blue-600">
// //                 {formatSalary(selectedCareer.salary.min_salary, salaryType)}
// //               </p>
// //             </div>
// //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// //               <p className="text-sm text-blue-800 mb-1">Median</p>
// //               <p className="text-2xl font-bold text-blue-600">
// //                 {formatSalary(selectedCareer.salary.median_salary, salaryType)}
// //               </p>
// //             </div>
// //             <div className="bg-blue-50 p-4 rounded-lg text-center">
// //               <p className="text-sm text-blue-800 mb-1">Maximum</p>
// //               <p className="text-2xl font-bold text-blue-600">
// //                 {formatSalary(selectedCareer.salary.max_salary, salaryType)}
// //               </p>
// //             </div>
// //           </div>
// //           <div className="h-64 w-full">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <LineChart
// //                 data={[
// //                   { name: "Minimum", salary: selectedCareer.salary.min_salary },
// //                   { name: "Median", salary: selectedCareer.salary.median_salary },
// //                   { name: "Maximum", salary: selectedCareer.salary.max_salary },
// //                 ]}
// //               >
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip
// //                   formatter={(value) => formatSalary(value, salaryType)}
// //                   labelStyle={{ color: "#374151" }}
// //                   contentStyle={{
// //                     backgroundColor: "#ffffff",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     boxShadow: "0 4px 6px rgba(0,0, 0, 0.1)",
// //                   }}
// //                 />
// //                 <Line
// //                   type="monotone"
// //                   dataKey="salary"
// //                   stroke="#3B82F6"
// //                   strokeWidth={2}
// //                   dot={{ fill: "#3B82F6", strokeWidth: 2 }}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </section>

// //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// //             Career Trend
// //           </h2>
// //           <div className="h-64 w-full">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={selectedCareer.trend}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="year" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="percentage" fill="#3B82F6" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </section>

// //         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// //             Related Careers
// //           </h2>
// //           <div className="flex flex-wrap gap-4">
// //             {selectedCareer.related_careers.map((relatedCareer, index) => (
// //               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
// //                 <span className="text-gray-800">{relatedCareer}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         <section className="bg-white rounded-lg shadow-lg p-8">
// //           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// //             Next Steps
// //           </h2>
// //           <p className="text-xl text-gray-600 leading-relaxed mb-6">
// //             Ready to pursue a career as a {selectedCareer.career}? Here are some
// //             steps you can take:
// //           </p>
// //           <ul className="space-y-4">
// //             <li className="flex items-center">
// //               <Book className="text-blue-500 mr-4" size={24} />
// //               <span className="text-gray-700">
// //                 Research certification programs and educational requirements
// //               </span>
// //             </li>
// //             <li className="flex items-center">
// //               <Users className="text-blue-500 mr-4" size={24} />
// //               <span className="text-gray-700">
// //                 Network with professionals in the industry
// //               </span>
// //             </li>
// //             <li className="flex items-center">
// //               <TrendingUp className="text-blue-500 mr-4" size={24} />
// //               <span className="text-gray-700">
// //                 Gain experience through internships or entry-level positions
// //               </span>
// //             </li>
// //           </ul>
// //           <div className="mt-8">
// //             <Link
// //               to={`/carrer/roadmaps/explore`}
// //               className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center"
// //             >
// //               Explore Career Roadmap
// //               <ArrowRight className="ml-2" size={20} />
// //             </Link>
// //           </div>
// //         </section>

// //         {timeSpent >= 20 && (
// //           <CareerInterestPopup careerName={selectedCareer.career} />
// //         )}

// // {showMentors && (
// //           <section className="bg-white rounded-lg shadow-lg p-8 mt-8">
// //             <h2 className="text-3xl font-semibold text-gray-800 mb-6">
// //               Meet Our Mentors
// //             </h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {mentors.map((mentor) => (
// //                 <a href={`mentor-booking/${mentor.user_id}`}>

// //                 <div
// //                   key={mentor.user_id}
// //                   className="bg-gray-50 rounded-lg p-4 shadow"
// //                   >
// //                   <img
// //                     src={mentor.image_url}
// //                     alt={mentor.user.name}
// //                     className="w-24 h-24 rounded-full mx-auto mb-4"
// //                   />
// //                   <h3 className="text-xl font-semibold text-center mb-2">
// //                     {mentor.user.name}
// //                   </h3>
// //                   <p className="text-gray-600 text-center mb-2">
// //                     {mentor.expertise}
// //                   </p>
// //                   <p className="text-sm text-gray-500 text-center mb-4">
// //                     {mentor.location}
// //                   </p>
// //                   <p className="text-sm text-gray-700">{mentor.bio}</p>
// //                 </div>
// //               </a>
// //               ))}
// //             </div>
// //           </section>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CareerDetails;


// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react';
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import FloatingShapes from "./FloatingShapes";
// import CareerInterestPopup from "./CareerInterestPopup";
// import StudentTimeline from "./StudentTimeline";
// import axios from "axios";

// const CareerDetails = () => {
//   const location = useLocation();
//   const [careerData, setCareerData] = useState(null);
//   const [salaryType, setSalaryType] = useState("yearly");
//   const [timeSpent, setTimeSpent] = useState(0);
//   const [showMentors, setShowMentors] = useState(false);
//   const [mentors, setMentors] = useState([]);

//   useEffect(() => {
//     if (location.state && location.state.careerData) {
//       setCareerData(location.state.careerData);
//     }

//     const fetchMentors = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/mentor");
//         setMentors(response.data);
//       } catch (error) {
//         console.error("Error fetching mentor data:", error);
//       }
//     };

//     fetchMentors();

//     const startTime = Date.now();
//     const timer = setInterval(() => {
//       const newTimeSpent = Math.floor((Date.now() - startTime) / 1000);
//       setTimeSpent(newTimeSpent);
      
//       if (newTimeSpent >= 10 && !showMentors) {
//         setShowMentors(true);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [location.state]);

//   const formatSalary = (amount, type = "yearly") => {
//     const formatter = new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     });

//     if (type === "monthly") {
//       amount = Math.round(amount / 12);
//     }

//     return formatter.format(amount);
//   };

//   if (!careerData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             Loading Career Information...
//           </h2>
//           <p className="text-xl text-gray-600 mb-8">
//             Please wait while we fetch the career details.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       <FloatingShapes />
//       <StudentTimeline />
//       <div className="max-w-5xl mx-auto relative">
//         <div className="mb-8">
//           <Link
//             to="/lens"
//             className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
//           >
//             <ArrowLeft className="mr-2" size={24} />
//             <span className="text-xl font-semibold">Back to Career Lens</span>
//           </Link>
//         </div>

//         <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
//           {careerData.name}
//         </h1>

//         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">
//             Career Overview
//           </h2>
//           <p className="text-xl text-gray-600 leading-relaxed">
//             {careerData.description}
//           </p>
//         </section>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <section className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
//             <ul className="space-y-4">
//               {careerData.pros.map((pro, index) => (
//                 <li key={index} className="flex items-start">
//                   <ThumbsUp
//                     className="text-green-500 mr-2 flex-shrink-0"
//                     size={24}
//                   />
//                   <span className="text-gray-700">{pro}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           <section className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
//             <ul className="space-y-4">
//               {careerData.cons.map((con, index) => (
//                 <li key={index} className="flex items-start">
//                   <ThumbsDown
//                     className="text-red-500 mr-2 flex-shrink-0"
//                     size={24}
//                   />
//                   <span className="text-gray-700">{con}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         </div>

//         <section className="bg-white rounded-lg shadow-lg p-8 my-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//             Key Skills
//           </h2>
//           <div className="flex flex-wrap gap-4">
//             {careerData.skills.map((skill, index) => (
//               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
//                 <span className="text-gray-800">{skill}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//             Salary Information
//           </h2>
//           <div className="mb-4">
//             <label className="mr-4 text-lg">
//               <input
//                 type="radio"
//                 value="yearly"
//                 checked={salaryType === "yearly"}
//                 onChange={() => setSalaryType("yearly")}
//                 className="mr-2"
//               />
//               Yearly
//             </label>
//             <label className="text-lg">
//               <input
//                 type="radio"
//                 value="monthly"
//                 checked={salaryType === "monthly"}
//                 onChange={() => setSalaryType("monthly")}
//                 className="mr-2"
//               />
//               Monthly
//             </label>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <p className="text-sm text-blue-800 mb-1">Minimum</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 {formatSalary(careerData.salary.min_salary, salaryType)}
//               </p>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <p className="text-sm text-blue-800 mb-1">Median</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 {formatSalary(careerData.salary.median_salary, salaryType)}
//               </p>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <p className="text-sm text-blue-800 mb-1">Maximum</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 {formatSalary(careerData.salary.max_salary, salaryType)}
//               </p>
//             </div>
//           </div>
//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={[
//                   { name: "Minimum", salary: careerData.salary.min_salary },
//                   { name: "Median", salary: careerData.salary.median_salary },
//                   { name: "Maximum", salary: careerData.salary.max_salary },
//                 ]}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(value) => formatSalary(value, salaryType)}
//                   labelStyle={{ color: "#374151" }}
//                   contentStyle={{
//                     backgroundColor: "#ffffff",
//                     borderRadius: "8px",
//                     border: "none",
//                     boxShadow: "0 4px 6px rgba(0,0, 0, 0.1)",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="salary"
//                   stroke="#3B82F6"
//                   strokeWidth={2}
//                   dot={{ fill: "#3B82F6", strokeWidth: 2 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//             Career Trend
//           </h2>
//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={Array.isArray(careerData.trend) ? careerData.trend : []}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="year" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="percentage" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//             Related Careers
//           </h2>
//           <div className="flex flex-wrap gap-4">
//             {careerData.related_careers.map((relatedCareer, index) => (
//               <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
//                 <span className="text-gray-800">{relatedCareer}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="bg-white rounded-lg shadow-lg p-8">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//             Next Steps
//           </h2>
//           <p className="text-xl text-gray-600 leading-relaxed mb-6">
//             Ready to pursue a career as a {careerData.name}? Here are some
//             steps you can take:
//           </p>
//           <ul className="space-y-4">
//             <li className="flex items-center">
//               <Book className="text-blue-500 mr-4" size={24} />
//               <span className="text-gray-700">
//                 Research certification programs and educational requirements
//               </span>
//             </li>
//             <li className="flex items-center">
//               <Users className="text-blue-500 mr-4" size={24} />
//               <span className="text-gray-700">
//                 Network with professionals in the industry
//               </span>
//             </li>
//             <li className="flex items-center">
//               <TrendingUp className="text-blue-500 mr-4" size={24} />
//               <span className="text-gray-700">
//                 Gain experience through internships or entry-level positions
//               </span>
//             </li>
//           </ul>
//           <div className="mt-8">
//             <Link
//               to={`/career/roadmaps/explore`}
//               className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center"
//             >
//               Explore Career Roadmap
//               <ArrowRight className="ml-2" size={20} />
//             </Link>
//           </div>
//         </section>

//         {timeSpent >= 20 && (
//           <CareerInterestPopup careerName={careerData.name} />
//         )}

//         {showMentors && (
//           <section className="bg-white rounded-lg shadow-lg p-8 mt-8">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//               Meet Our Mentors
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {mentors.map((mentor) => (
//                 <a href={`mentor-booking/${mentor.user_id}`} key={mentor.user_id}>
//                   <div className="bg-gray-50 rounded-lg p-4 shadow">
//                     <img
//                       src={mentor.image_url}
//                       alt={mentor.user.name}
//                       className="w-24 h-24 rounded-full mx-auto mb-4"
//                     />
//                     <h3 className="text-xl font-semibold text-center mb-2">
//                       {mentor.user.name}
//                     </h3>
//                     <p className="text-gray-600 text-center mb-2">
//                       {mentor.expertise}
//                     </p>
//                     <p className="text-sm text-gray-500 text-center mb-4">
//                       {mentor.location}
//                     </p>
//                     <p className="text-sm text-gray-700">{mentor.bio}</p>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CareerDetails;


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import FloatingShapes from "./FloatingShapes";
import CareerInterestPopup from "./CareerInterestPopup";
import axios from "axios";

const CareerDetails = () => {
  const location = useLocation();
  const [careerData, setCareerData] = useState(null);
  const [salaryType, setSalaryType] = useState("yearly");
  const [timeSpent, setTimeSpent] = useState(0);
  const [showMentors, setShowMentors] = useState(false);
  const [mentors, setMentors] = useState([]);

  // Mock data for salary trend
  const mockSalaryTrend = [
    { year: "2018", salary: 50000 },
    { year: "2019", salary: 55000 },
    { year: "2020", salary: 52000 },
    { year: "2021", salary: 58000 },
    { year: "2022", salary: 62000 },
  ];

  // Mock data for career trend
  const mockCareerTrend = [
    { year: "2018", percentage: 2 },
    { year: "2019", percentage: 3 },
    { year: "2020", percentage: 3.5 },
    { year: "2021", percentage: 4 },
    { year: "2022", percentage: 4.5 },
  ];

  useEffect(() => {
    if (location.state && location.state.careerData) {
      setCareerData(location.state.careerData);
    }

    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/mentor");
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentors();

    const startTime = Date.now();
    const timer = setInterval(() => {
      const newTimeSpent = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(newTimeSpent);
      
      if (newTimeSpent >= 10 && !showMentors) {
        setShowMentors(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [location.state]);


  if (!careerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Loading Career Information...
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Please wait while we fetch the career details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <FloatingShapes />
      <div className="max-w-5xl mx-auto relative">
        <div className="mb-8">
          <Link
            to="/lens"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" size={24} />
            <span className="text-xl font-semibold">Back to Career Lens</span>
          </Link>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
          {careerData.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
            <ul className="space-y-4">
              {careerData.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <ThumbsUp
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={24}
                  />
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
            <ul className="space-y-4">
              {careerData.cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <ThumbsDown
                    className="text-red-500 mr-2 flex-shrink-0"
                    size={24}
                  />
                  <span className="text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="bg-white rounded-lg shadow-lg p-8 my-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Key Skills
          </h2>
          <div className="flex flex-wrap gap-4">
            {careerData.skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
                <span className="text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Salary Information
          </h2>
          <div className="mb-4">
            <label className="mr-4 text-lg">
              <input
                type="radio"
                value="yearly"
                checked={salaryType === "yearly"}
                onChange={() => setSalaryType("yearly")}
                className="mr-2"
              />
              Yearly
            </label>
            <label className="text-lg">
              <input
                type="radio"
                value="monthly"
                checked={salaryType === "monthly"}
                onChange={() => setSalaryType("monthly")}
                className="mr-2"
              />
              Monthly
            </label>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalaryTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${value}`}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0,0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Career Trend
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCareerTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Related Careers
          </h2>
          <div className="flex flex-wrap gap-4">
            {careerData.related_careers.map((relatedCareer, index) => (
              <div key={index} className="bg-gray-100 rounded-full px-4 py-2">
                <span className="text-gray-800">{relatedCareer}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Next Steps
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Ready to pursue a career as a {careerData.name}? Here are some
            steps you can take:
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Book className="text-blue-500 mr-4" size={24} />
              <span className="text-gray-700">
                Research certification programs and educational requirements
              </span>
            </li>
            <li className="flex items-center">
              <Users className="text-blue-500 mr-4" size={24} />
              <span className="text-gray-700">
                Network with professionals in the industry
              </span>
            </li>
            <li className="flex items-center">
              <TrendingUp className="text-blue-500 mr-4" size={24} />
              <span className="text-gray-700">
                Gain experience through internships or entry-level positions
              </span>
            </li>
          </ul>
          <div className="mt-8">
            <Link
              to={`/career/roadmaps/explore`}
              className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center"
            >
              Explore Career Roadmap
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {timeSpent >= 20 && (
          <CareerInterestPopup careerName={careerData.name} />
        )}

        {showMentors && (
          <section className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Meet Our Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <a href={`mentor-booking/${mentor.user_id}`} key={mentor.user_id}>
                  <div className="bg-gray-50 rounded-lg p-4 shadow">
                    <img
                      src={mentor.image_url}
                      alt={mentor.user.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {mentor.user.name}
                    </h3>
                    <p className="text-gray-600 text-center mb-2">
                      {mentor.expertise}
                    </p>
                    <p className="text-sm text-gray-500 text-center mb-4">
                      {mentor.location}
                    </p>
                    <p className="text-sm text-gray-700">{mentor.bio}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CareerDetails;

