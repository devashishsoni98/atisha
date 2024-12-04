
// // import React, { useState, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { logout } from '../store/authSlice';

// // const Dashboard = () => {
// //   const { user, isAuthenticated } = useSelector((state) => state.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [showCreateEventModal, setShowCreateEventModal] = useState(false);
// //   const [mentorType, setMentorType] = useState('');

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate('/login');
// //     }
// //   }, [isAuthenticated, navigate]);

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/login');
// //   };

// //   const renderTabContent = () => {
// //     switch (activeTab) {
// //       case 'overview':
// //         return <OverviewContent />;
// //       case 'events':
// //         return <EventsContent setShowCreateEventModal={setShowCreateEventModal} />;
// //       case 'institutes':
// //         return <InstitutesContent />;
// //       case 'mentors':
// //         return <MentorsContent mentorType={mentorType} setMentorType={setMentorType} />;
// //       default:
// //         return <OverviewContent />;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <header className="bg-white shadow-lg">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between h-16">
// //             <div className="flex">
// //               <div className="flex-shrink-0 flex items-center">
// //                 <span className="font-semibold text-xl text-gray-800">Admin Dashboard</span>
// //               </div>
// //               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
// //                 {['overview', 'events', 'institutes', 'mentors'].map((tab) => (
// //                   <button
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     className={`${
// //                       activeTab === tab
// //                         ? 'border-indigo-500 text-gray-900'
// //                         : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
// //                     } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium capitalize`}
// //                   >
// //                     {tab}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //             <div className="hidden sm:ml-6 sm:flex sm:items-center">
// //               <span className="text-sm font-medium text-gray-500 mr-4">{user?.name}</span>
// //               <button
// //                 onClick={handleLogout}
// //                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// //         {renderTabContent()}
// //       </main>

// //       {showCreateEventModal && (
// //         <EventCreationModal onClose={() => setShowCreateEventModal(false)} />
// //       )}
// //     </div>
// //   );
// // };

// // const OverviewContent = () => (
// //   <div>
// //     <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
// //     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
// //       <StatCard title="Total Students" value="1,234" />
// //       <StatCard title="Active Counseling Sessions" value="42" />
// //       <StatCard title="Pending Appointments" value="18" />
// //     </div>
// //     <div className="mt-8">
// //       <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h2>
// //       <ActivityList />
// //     </div>
// //   </div>
// // );

// // const EventsContent = ({ setShowCreateEventModal }) => {
// //   return (
// //     <div>
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-2xl font-semibold text-gray-900">Event Management</h1>
// //         <button
// //           onClick={() => setShowCreateEventModal(true)}
// //           className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //         >
// //           Create New Event
// //         </button>
// //       </div>
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div>
// //           <h2 className="text-lg font-medium text-gray-900 mb-4">Event Invitations</h2>
// //           <EventInvitations />
// //         </div>
// //         <div>
// //           <h2 className="text-lg font-medium text-gray-900 mb-4">Event Notifications</h2>
// //           <EventNotifications />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const InstitutesContent = () => {
// //   const institutes = [
// //     { id: 1, name: 'Tech University', type: 'Private', location: 'New York', students: 5000 },
// //     { id: 2, name: 'State College', type: 'Public', location: 'California', students: 15000 },
// //     { id: 3, name: 'Community Institute', type: 'Public', location: 'Texas', students: 3000 },
// //   ];

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Institute Listings</h1>
// //       <div className="bg-white shadow overflow-hidden sm:rounded-md">
// //         <ul className="divide-y divide-gray-200">
// //           {institutes.map((institute) => (
// //             <li key={institute.id}>
// //               <div className="px-4 py-4 sm:px-6">
// //                 <div className="flex items-center justify-between">
// //                   <p className="text-sm font-medium text-indigo-600 truncate">{institute.name}</p>
// //                   <div className="ml-2 flex-shrink-0 flex">
// //                     <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
// //                       {institute.type}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="mt-2 sm:flex sm:justify-between">
// //                   <div className="sm:flex">
// //                     <p className="flex items-center text-sm text-gray-500">
// //                       Location: {institute.location}
// //                     </p>
// //                   </div>
// //                   <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
// //                     <p>
// //                       Students: {institute.students}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // const MentorsContent = ({ mentorType, setMentorType }) => {
// //   const mentors = [
// //     { id: 1, name: 'John Doe', type: 'associate', expertise: 'Career Counseling' },
// //     { id: 2, name: 'Jane Smith', type: 'chief', expertise: 'Academic Advising' },
// //     { id: 3, name: 'Bob Johnson', type: 'associate', expertise: 'Personal Development' },
// //   ];

// //   const filteredMentors = mentorType ? mentors.filter(mentor => mentor.type === mentorType) : mentors;

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-semibold text-gray-900 mb-6">Mentor Verification</h1>
// //       <div className="mb-4">
// //         <label htmlFor="mentorType" className="block text-sm font-medium text-gray-700">Filter by Mentor Type</label>
// //         <select
// //           id="mentorType"
// //           value={mentorType}
// //           onChange={(e) => setMentorType(e.target.value)}
// //           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
// //         >
// //           <option value="">All</option>
// //           <option value="associate">Associate</option>
// //           <option value="chief">Chief</option>
// //         </select>
// //       </div>
// //       <div className="bg-white shadow overflow-hidden sm:rounded-md">
// //         <ul className="divide-y divide-gray-200">
// //           {filteredMentors.map((mentor) => (
// //             <li key={mentor.id}>
// //               <div className="px-4 py-4 sm:px-6">
// //                 <div className="flex items-center justify-between">
// //                   <p className="text-sm font-medium text-indigo-600 truncate">{mentor.name}</p>
// //                   <div className="ml-2 flex-shrink-0 flex">
// //                     <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                       mentor.type === 'chief' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
// //                     }`}>
// //                       {mentor.type.charAt(0).toUpperCase() + mentor.type.slice(1)}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="mt-2 sm:flex sm:justify-between">
// //                   <div className="sm:flex">
// //                     <p className="flex items-center text-sm text-gray-500">
// //                       Expertise: {mentor.expertise}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // const StatCard = ({ title, value }) => (
// //   <div className="bg-white overflow-hidden shadow rounded-lg">
// //     <div className="p-5">
// //       <div className="flex items-center">
// //         <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
// //           <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
// //           </svg>
// //         </div>
// //         <div className="ml-5 w-0 flex-1">
// //           <dl>
// //             <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
// //             <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
// //           </dl>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const ActivityList = () => {
// //   const activities = [
// //     { id: 1, title: 'New student registered', name: 'John Doe', time: '1 hour ago' },
// //     { id: 2, title: 'Counseling session completed', name: 'Jane Smith with Dr. Johnson', time: '3 hours ago' },
// //   ];

// //   return (
// //     <div className="bg-white shadow overflow-hidden sm:rounded-md">
// //       <ul className="divide-y divide-gray-200">
// //         {activities.map((activity) => (
// //           <li key={activity.id}>
// //             <div className="px-4 py-4 sm:px-6">
// //               <div className="flex items-center justify-between">
// //                 <p className="text-sm font-medium text-indigo-600 truncate">
// //                   {activity.title}
// //                 </p>
// //                 <div className="ml-2 flex-shrink-0 flex">
// //                   <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
// //                     New
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="mt-2 sm:flex sm:justify-between">
// //                 <div className="sm:flex">
// //                   <p className="flex items-center text-sm text-gray-500">
// //                     {activity.name}
// //                   </p>
// //                 </div>
// //                 <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
// //                   <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
// //                     <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
// //                   </svg>
// //                   <p>
// //                     {activity.time}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // const EventInvitations = () => (
// //   <div className="bg-white shadow overflow-hidden sm:rounded-md">
// //     <ul className="divide-y divide-gray-200">
// //       <li className="px-4 py-4 sm:px-6">Event invitation placeholder</li>
// //     </ul>
// //   </div>
// // );

// // const EventNotifications = () => (
// //   <div className="bg-white shadow overflow-hidden sm:rounded-md">
// //     <ul className="divide-y divide-gray-200">
// //       <li className="px-4 py-4 sm:px-6">Event notification placeholder</li>
// //     </ul>
// //   </div>
// // );

// // const EventCreationModal = ({ onClose }) => (
// //   <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
// //     <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
// //       <div className="mt-3">
// //         <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Create New Event</h3>
// //         <form className="space-y-4">
// //           <div>
// //             <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
// //             <input type="text" id="eventName" name="eventName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
// //           </div>
// //           <div>
// //             <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
// //             <input type="date" id="eventDate" name="eventDate" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
// //           </div>
// //           <div>
// //             <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Description</label>
// //             <textarea id="eventDescription" name="eventDescription" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
// //           </div>
// //           <div className="flex justify-end">
// //             <button type="button" onClick={onClose} className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
// //               Cancel
// //             </button>
// //             <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
// //               Create
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   </div>
// // );

// // export default Dashboard;


// // import React, { useState, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { logout } from '../store/authSlice';
// // import { BarChart3, Users, Calendar, LogOut, Menu, X, Bell, Search } from 'lucide-react';

// // const Dashboard = () => {
// //   const { user, isAuthenticated } = useSelector((state) => state.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [showCreateEventModal, setShowCreateEventModal] = useState(false);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState('Overview');

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate('/login');
// //     }
// //   }, [isAuthenticated, navigate]);

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/login');
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <aside className={`bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
// //         <nav>
// //           <motion.div 
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.2 }}
// //             className="flex items-center justify-between px-4"
// //           >
// //             <span className="text-2xl font-extrabold">Admin Panel</span>
// //             <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
// //               <X size={24} />
// //             </button>
// //           </motion.div>
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.3 }}
// //             className="mt-8 space-y-4"
// //           >
// //             {['Overview', 'Events', 'Institutes', 'Mentors'].map((item) => (
// //               <a
// //                 key={item}
// //                 href="#"
// //                 onClick={() => setActiveTab(item)}
// //                 className={`block py-2.5 px-4 rounded transition duration-200 ${
// //                   activeTab === item ? 'bg-indigo-800' : 'hover:bg-indigo-800'
// //                 }`}
// //               >
// //                 {item}
// //               </a>
// //             ))}
// //           </motion.div>
// //         </nav>
// //       </aside>

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         {/* Header */}
// //         <header className="bg-white shadow-md">
// //           <div className="flex items-center justify-between p-4">
// //             <div className="flex items-center space-x-4">
// //               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
// //                 <Menu size={24} />
// //               </button>
// //               <h1 className="text-xl font-semibold">Dashboard</h1>
// //             </div>
// //             <div className="flex items-center space-x-4">
// //               <button className="p-2 rounded-full hover:bg-gray-100">
// //                 <Bell size={20} />
// //               </button>
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   placeholder="Search..."
// //                   className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 />
// //                 <Search size={20} className="absolute right-3 top-2.5 text-gray-400" />
// //               </div>
// //               <button
// //                 onClick={handleLogout}
// //                 className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
// //               >
// //                 <LogOut size={18} />
// //                 <span>Logout</span>
// //               </button>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Dashboard Content */}
// //         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
// //           <div className="container mx-auto px-6 py-8">
// //             <h3 className="text-gray-700 text-3xl font-medium">{activeTab}</h3>
            
// //             {activeTab === 'Overview' && (
// //               <>
// //                 <div className="mt-8">
// //                   <StatCards />
// //                 </div>
// //                 <div className="flex flex-wrap mt-8 -mx-6">
// //                   <RecentActivities />
// //                   <InstitutesOverview />
// //                   <MentorsOverview />
// //                   <EventsOverview setShowCreateEventModal={setShowCreateEventModal} />
// //                 </div>
// //               </>
// //             )}
            
// //             {activeTab === 'Events' && (
// //               <div className="mt-8">
// //                 <EventsOverview setShowCreateEventModal={setShowCreateEventModal} />
// //               </div>
// //             )}
            
// //             {activeTab === 'Institutes' && (
// //               <div className="mt-8">
// //                 <InstitutesOverview />
// //               </div>
// //             )}
            
// //             {activeTab === 'Mentors' && (
// //               <div className="mt-8">
// //                 <MentorsOverview />
// //               </div>
// //             )}
// //           </div>
// //         </main>
// //       </div>

// //       {showCreateEventModal && (
// //         <EventCreationModal onClose={() => setShowCreateEventModal(false)} />
// //       )}
// //     </div>
// //   );
// // };

// // const StatCards = () => {
// //   const stats = [
// //     { title: "Total Students", value: "1,234", icon: Users, color: "bg-blue-500" },
// //     { title: "Active Sessions", value: "42", icon: BarChart3, color: "bg-green-500" },
// //     { title: "Pending Appointments", value: "18", icon: Calendar, color: "bg-yellow-500" },
// //   ];

// //   return (
// //     <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
// //       {stats.map((stat, index) => (
// //         <motion.div
// //           key={index}
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: index * 0.1 }}
// //           className="flex items-center p-4 bg-white rounded-lg shadow-xs"
// //         >
// //           <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
// //             <stat.icon size={24} />
// //           </div>
// //           <div>
// //             <p className="mb-2 text-sm font-medium text-gray-600">{stat.title}</p>
// //             <p className="text-lg font-semibold text-gray-700">{stat.value}</p>
// //           </div>
// //         </motion.div>
// //       ))}
// //     </div>
// //   );
// // };

// // const RecentActivities = () => {
// //   const activities = [
// //     { id: 1, title: 'New student registered', name: 'John Doe', time: '1 hour ago' },
// //     { id: 2, title: 'Counseling session completed', name: 'Jane Smith with Dr. Johnson', time: '3 hours ago' },
// //     { id: 3, title: 'Event scheduled', name: 'Career Fair 2023', time: '5 hours ago' },
// //   ];

// //   return (
// //     <div className="w-full xl:w-1/2 px-6 mb-6">
// //       <div className="bg-white rounded-lg shadow-md p-6">
// //         <h4 className="text-xl font-semibold mb-4">Recent Activities</h4>
// //         <ul className="space-y-4">
// //           {activities.map((activity) => (
// //             <motion.li 
// //               key={activity.id}
// //               initial={{ opacity: 0, x: -20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ delay: activity.id * 0.1 }}
// //               className="flex items-center justify-between border-b pb-2"
// //             >
// //               <div>
// //                 <p className="font-medium">{activity.title}</p>
// //                 <p className="text-sm text-gray-500">{activity.name}</p>
// //               </div>
// //               <span className="text-sm text-gray-400">{activity.time}</span>
// //             </motion.li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // const InstitutesOverview = () => {
// //   const institutes = [
// //     { id: 1, name: 'Tech University', type: 'Private', location: 'New York', students: 5000 },
// //     { id: 2, name: 'State College', type: 'Public', location: 'California', students: 15000 },
// //     { id: 3, name: 'Community Institute', type: 'Public', location: 'Texas', students: 3000 },
// //   ];

// //   return (
// //     <div className="w-full xl:w-1/2 px-6 mb-6">
// //       <div className="bg-white rounded-lg shadow-md p-6">
// //         <h4 className="text-xl font-semibold mb-4">Institutes Overview</h4>
// //         <ul className="space-y-4">
// //           {institutes.map((institute) => (
// //             <motion.li 
// //               key={institute.id}
// //               initial={{ opacity: 0, x: 20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ delay: institute.id * 0.1 }}
// //               className="flex items-center justify-between border-b pb-2"
// //             >
// //               <div>
// //                 <p className="font-medium">{institute.name}</p>
// //                 <p className="text-sm text-gray-500">{institute.location}</p>
// //               </div>
// //               <div className="text-right">
// //                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
// //                   {institute.type}
// //                 </span>
// //                 <p className="text-sm text-gray-500 mt-1">{institute.students} students</p>
// //               </div>
// //             </motion.li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // const MentorsOverview = () => {
// //   const mentors = [
// //     { id: 1, name: 'John Doe', type: 'associate', expertise: 'Career Counseling' },
// //     { id: 2, name: 'Jane Smith', type: 'chief', expertise: 'Academic Advising' },
// //     { id: 3, name: 'Bob Johnson', type: 'associate', expertise: 'Personal Development' },
// //   ];

// //   return (
// //     <div className="w-full px-6 mb-6">
// //       <div className="bg-white rounded-lg shadow-md p-6">
// //         <h4 className="text-xl font-semibold mb-4">Mentors Overview</h4>
// //         <ul className="space-y-4">
// //           {mentors.map((mentor) => (
// //             <motion.li 
// //               key={mentor.id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: mentor.id * 0.1 }}
// //               className="flex items-center justify-between border-b pb-2"
// //             >
// //               <div>
// //                 <p className="font-medium">{mentor.name}</p>
// //                 <p className="text-sm text-gray-500">{mentor.expertise}</p>
// //               </div>
// //               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                 mentor.type === 'chief' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
// //               }`}>
// //                 {mentor.type.charAt(0).toUpperCase() + mentor.type.slice(1)}
// //               </span>
// //             </motion.li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // const EventsOverview = ({ setShowCreateEventModal }) => {
// //   return (
// //     <div className="w-full px-6 mb-6">
// //       <div className="bg-white rounded-lg shadow-md p-6">
// //         <div className="flex justify-between items-center mb-4">
// //           <h4 className="text-xl font-semibold">Event Management</h4>
// //           <button
// //             onClick={() => setShowCreateEventModal(true)}
// //             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
// //           >
// //             Create New Event
// //           </button>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <h5 className="text-lg font-medium mb-2">Event Invitations</h5>
// //             <EventInvitations />
// //           </div>
// //           <div>
// //             <h5 className="text-lg font-medium mb-2">Event Notifications</h5>
// //             <EventNotifications />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const EventInvitations = () => (
// //   <div className="bg-gray-50 rounded-md p-4">
// //     <p className="text-gray-600">Event invitation placeholder</p>
// //   </div>
// // );

// // const EventNotifications = () => (
// //   <div className="bg-gray-50 rounded-md p-4">
// //     <p className="text-gray-600">Event notification placeholder</p>
// //   </div>
// // );

// // const EventCreationModal = ({ onClose }) => (
// //   <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
// //     <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
// //       <div className="mt-3">
// //         <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Create New Event</h3>
// //         <form className="space-y-4">
// //           <div>
// //             <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
// //             <input type="text" id="eventName" name="eventName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
// //           </div>
// //           <div>
// //             <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
// //             <input type="date" id="eventDate" name="eventDate" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
// //           </div>
// //           <div>
// //             <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Description</label>
// //             <textarea id="eventDescription" name="eventDescription" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
// //           </div>
// //           <div className="flex justify-end">
// //             <button type="button" onClick={onClose} className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
// //               Cancel
// //             </button>
// //             <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
// //               Create
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   </div>
// // );

// // export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { logout } from '../store/authSlice';
// import { BarChart3, Users, Calendar, LogOut, Menu, X, Bell, Search, Plus } from 'lucide-react';
// import { EventInvitations, EventNotifications } from './EventComponents';
// import EventCreationForm from './EventCreationForm';

// const Dashboard = () => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showCreateEventModal, setShowCreateEventModal] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('Overview');

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className={`bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
//         <nav>
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="flex items-center justify-between px-4"
//           >
//             <span className="text-2xl font-extrabold">Admin Panel</span>
//             <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
//               <X size={24} />
//             </button>
//           </motion.div>
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="mt-8 space-y-4"
//           >
//             {['Overview', 'Events', 'Institutes', 'Mentors'].map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 onClick={() => setActiveTab(item)}
//                 className={`block py-2.5 px-4 rounded transition duration-200 ${
//                   activeTab === item ? 'bg-indigo-800' : 'hover:bg-indigo-800'
//                 }`}
//               >
//                 {item}
//               </a>
//             ))}
//           </motion.div>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-md">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center space-x-4">
//               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
//                 <Menu size={24} />
//               </button>
//               <h1 className="text-xl font-semibold">Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 rounded-full hover:bg-gray-100">
//                 <Bell size={20} />
//               </button>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <Search size={20} className="absolute right-3 top-2.5 text-gray-400" />
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
//               >
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
//           <div className="container mx-auto px-6 py-8">
//             <h3 className="text-gray-700 text-3xl font-medium">{activeTab}</h3>
            
//             <AnimatePresence mode="wait">
//               {activeTab === 'Overview' && (
//                 <motion.div
//                   key="overview"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="mt-8">
//                     <StatCards />
//                   </div>
//                   <div className="flex flex-wrap mt-8 -mx-6">
//                     <RecentActivities />
//                     <InstitutesOverview />
//                     <MentorsOverview />
//                     <EventsOverview setShowCreateEventModal={setShowCreateEventModal} />
//                   </div>
//                 </motion.div>
//               )}
              
//               {activeTab === 'Events' && (
//                 <motion.div
//                   key="events"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5 }}
//                   className="mt-8"
//                 >
//                   <EventsOverview setShowCreateEventModal={setShowCreateEventModal} />
//                 </motion.div>
//               )}
              
//               {activeTab === 'Institutes' && (
//                 <motion.div
//                   key="institutes"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5 }}
//                   className="mt-8"
//                 >
//                   <InstitutesOverview />
//                 </motion.div>
//               )}
              
//               {activeTab === 'Mentors' && (
//                 <motion.div
//                   key="mentors"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5 }}
//                   className="mt-8"
//                 >
//                   <MentorsOverview />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </main>
//       </div>

//       {showCreateEventModal && (
//         <EventCreationForm onClose={() => setShowCreateEventModal(false)} />
//       )}
//     </div>
//   );
// };

// const StatCards = () => {
//   const stats = [
//     { title: "Total Students", value: "1,234", icon: Users, color: "bg-blue-500" },
//     { title: "Active Sessions", value: "42", icon: BarChart3, color: "bg-green-500" },
//     { title: "Pending Appointments", value: "18", icon: Calendar, color: "bg-yellow-500" },
//   ];

//   return (
//     <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
//       {stats.map((stat, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           className="flex items-center p-4 bg-white rounded-lg shadow-xs"
//         >
//           <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
//             <stat.icon size={24} />
//           </div>
//           <div>
//             <p className="mb-2 text-sm font-medium text-gray-600">{stat.title}</p>
//             <p className="text-lg font-semibold text-gray-700">{stat.value}</p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const RecentActivities = () => {
//   const activities = [
//     { id: 1, title: 'New student registered', name: 'John Doe', time: '1 hour ago' },
//     { id: 2, title: 'Counseling session completed', name: 'Jane Smith with Dr. Johnson', time: '3 hours ago' },
//     { id: 3, title: 'Event scheduled', name: 'Career Fair 2023', time: '5 hours ago' },
//   ];

//   return (
//     <div className="w-full xl:w-1/2 px-6 mb-6">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h4 className="text-xl font-semibold mb-4">Recent Activities</h4>
//         <ul className="space-y-4">
//           {activities.map((activity) => (
//             <motion.li 
//               key={activity.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: activity.id * 0.1 }}
//               className="flex items-center justify-between border-b pb-2"
//             >
//               <div>
//                 <p className="font-medium">{activity.title}</p>
//                 <p className="text-sm text-gray-500">{activity.name}</p>
//               </div>
//               <span className="text-sm text-gray-400">{activity.time}</span>
//             </motion.li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const InstitutesOverview = () => {
//   const institutes = [
//     { id: 1, name: 'Tech University', type: 'Private', location: 'New York', students: 5000 },
//     { id: 2, name: 'State College', type: 'Public', location: 'California', students: 15000 },
//     { id: 3, name: 'Community Institute', type: 'Public', location: 'Texas', students: 3000 },
//   ];

//   return (
//     <div className="w-full xl:w-1/2 px-6 mb-6">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h4 className="text-xl font-semibold mb-4">Institutes Overview</h4>
//         <ul className="space-y-4">
//           {institutes.map((institute) => (
//             <motion.li 
//               key={institute.id}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: institute.id * 0.1 }}
//               className="flex items-center justify-between border-b pb-2"
//             >
//               <div>
//                 <p className="font-medium">{institute.name}</p>
//                 <p className="text-sm text-gray-500">{institute.location}</p>
//               </div>
//               <div className="text-right">
//                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                   {institute.type}
//                 </span>
//                 <p className="text-sm text-gray-500 mt-1">{institute.students} students</p>
//               </div>
//             </motion.li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const MentorsOverview = () => {
//   const mentors = [
//     { id: 1, name: 'John Doe', type: 'associate', expertise: 'Career Counseling' },
//     { id: 2, name: 'Jane Smith', type: 'chief', expertise: 'Academic Advising' },
//     { id: 3, name: 'Bob Johnson', type: 'associate', expertise: 'Personal Development' },
//   ];

//   return (
//     <div className="w-full px-6 mb-6">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h4 className="text-xl font-semibold mb-4">Mentors Overview</h4>
//         <ul className="space-y-4">
//           {mentors.map((mentor) => (
//             <motion.li 
//               key={mentor.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: mentor.id * 0.1 }}
//               className="flex items-center justify-between border-b pb-2"
//             >
//               <div>
//                 <p className="font-medium">{mentor.name}</p>
//                 <p className="text-sm text-gray-500">{mentor.expertise}</p>
//               </div>
//               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                 mentor.type === 'chief' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
//               }`}>
//                 {mentor.type.charAt(0).toUpperCase() + mentor.type.slice(1)}
//               </span>
//             </motion.li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const EventsOverview = ({ setShowCreateEventModal }) => {
//   return (
//     <div className="w-full px-6 mb-6">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h4 className="text-xl font-semibold">Event Management</h4>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowCreateEventModal(true)}
//             className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
//           >
//             <Plus size={18} className="mr-2" />
//             Create New Event
//           </motion.button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <h5 className="text-lg font-medium mb-2">Event Invitations</h5>
//             <EventInvitations />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <h5 className="text-lg font-medium mb-2">Event Notifications</h5>
//             <EventNotifications />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EventCreationForm = ({ onClose }) => (
//   <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//     <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
//       <div className="mt-3">
//         <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Create New Event</h3>
//         <form className="space-y-4">
//           <div>
//             <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
//             <input type="text" id="eventName" name="eventName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//           </div>
//           <div>
//             <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
//             <input type="date" id="eventDate" name="eventDate" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//           </div>
//           <div>
//             <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea id="eventDescription" name="eventDescription" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
//           </div>
//           <div className="flex justify-end">
//             <button type="button" onClick={onClose} className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
//               Cancel
//             </button>
//             <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../store/authSlice';
import { BarChart3, Users, Calendar, LogOut, Menu, X, Bell, Search, Plus } from 'lucide-react';
import { EventInvitations, EventNotifications } from './EventComponents';
import EventCreationForm from './EventCreationForm';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <nav>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between px-4"
          >
            <span className="text-2xl font-extrabold">Admin Panel</span>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
              <X size={24} />
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-y-4"
          >
            {['Overview', 'Events', 'Institutes', 'Mentors'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setActiveTab(item)}
                className={`block py-2.5 px-4 rounded transition duration-200 ${
                  activeTab === item ? 'bg-indigo-800' : 'hover:bg-indigo-800'
                }`}
              >
                {item}
              </a>
            ))}
          </motion.div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search size={20} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">{activeTab}</h3>
            
            <AnimatePresence mode="wait">
              {activeTab === 'Overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mt-8">
                    <StatCards />
                  </div>
                  <div className="flex flex-wrap mt-8 -mx-6">
                    <RecentActivities />
                    <InstitutesOverview />
                    <MentorsOverview />
                    <EventsOverview setShowCreateEventModal={setShowCreateEventModal} />
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'Events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <EventsOverview setShowCreateEventModal={setShowCreateEventModal} />
                </motion.div>
              )}
              
              {activeTab === 'Institutes' && (
                <motion.div
                  key="institutes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <InstitutesOverview />
                </motion.div>
              )}
              
              {activeTab === 'Mentors' && (
                <motion.div
                  key="mentors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <MentorsOverview />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {showCreateEventModal && (
        <EventCreationForm onClose={() => setShowCreateEventModal(false)} />
      )}
    </div>
  );
};

const StatCards = () => {
  const stats = [
    { title: "Total Students", value: "1,234", icon: Users, color: "bg-blue-500" },
    { title: "Active Sessions", value: "42", icon: BarChart3, color: "bg-green-500" },
    { title: "Pending Appointments", value: "18", icon: Calendar, color: "bg-yellow-500" },
  ];

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center p-4 bg-white rounded-lg shadow-xs"
        >
          <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-lg font-semibold text-gray-700">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const RecentActivities = () => {
  const activities = [
    { id: 1, title: 'New student registered', name: 'John Doe', time: '1 hour ago' },
    { id: 2, title: 'Counseling session completed', name: 'Jane Smith with Dr. Johnson', time: '3 hours ago' },
    { id: 3, title: 'Event scheduled', name: 'Career Fair 2023', time: '5 hours ago' },
  ];

  return (
    <div className="w-full xl:w-1/2 px-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold mb-4">Recent Activities</h4>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <motion.li 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: activity.id * 0.1 }}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.name}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const InstitutesOverview = () => {
  const institutes = [
    { id: 1, name: 'Tech University', type: 'Private', location: 'New York', students: 5000 },
    { id: 2, name: 'State College', type: 'Public', location: 'California', students: 15000 },
    { id: 3, name: 'Community Institute', type: 'Public', location: 'Texas', students: 3000 },
  ];

  return (
    <div className="w-full xl:w-1/2 px-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold mb-4">Institutes Overview</h4>
        <ul className="space-y-4">
          {institutes.map((institute) => (
            <motion.li 
              key={institute.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: institute.id * 0.1 }}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{institute.name}</p>
                <p className="text-sm text-gray-500">{institute.location}</p>
              </div>
              <div className="text-right">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {institute.type}
                </span>
                <p className="text-sm text-gray-500 mt-1">{institute.students} students</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MentorsOverview = () => {
  const mentors = [
    { id: 1, name: 'John Doe', type: 'associate', expertise: 'Career Counseling' },
    { id: 2, name: 'Jane Smith', type: 'chief', expertise: 'Academic Advising' },
    { id: 3, name: 'Bob Johnson', type: 'associate', expertise: 'Personal Development' },
  ];

  return (
    <div className="w-full px-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-xl font-semibold mb-4">Mentors Overview</h4>
        <ul className="space-y-4">
          {mentors.map((mentor) => (
            <motion.li 
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mentor.id * 0.1 }}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{mentor.name}</p>
                <p className="text-sm text-gray-500">{mentor.expertise}</p>
              </div>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                mentor.type === 'chief' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {mentor.type.charAt(0).toUpperCase() + mentor.type.slice(1)}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const EventsOverview = ({ setShowCreateEventModal }) => {
  return (
    <div className="w-full px-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold">Event Management</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateEventModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          >
            <Plus size={18} className="mr-2" />
            Create New Event
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h5 className="text-lg font-medium mb-2">Event Invitations</h5>
            <EventInvitations />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h5 className="text-lg font-medium mb-2">Event Notifications</h5>
            <EventNotifications />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

