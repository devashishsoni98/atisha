import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {logout} from '../store/authSlice';
import {BarChart3, Users, Calendar, LogOut, Menu, X, Bell, Search, Plus, Briefcase} from 'lucide-react';
import {EventInvitations, EventNotifications} from './EventComponents';
import EventCreationForm from './EventCreationForm';
import Activities from './Activities';
import EventList from "./EventList.jsx";
import axios from 'axios';

const Dashboard = () => {
    const {user, isAuthenticated} = useSelector((state) => state.auth);
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
            <aside
                className={`bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
                <nav>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                        className="flex items-center justify-between px-4"
                    >
                        <span className="text-2xl font-extrabold">Admin Panel</span>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                            <X size={24}/>
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="mt-8 space-y-4"
                    >
                        {['Overview', 'Events', 'Institutes', 'Mentors', 'Activities'].map((item) => (
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
                {/* <header className="bg-white shadow-md">
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
        </header> */}

                <header className="bg-white shadow-md">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                                <Menu size={24}/>
                            </button>
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <Bell size={20}/>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
                            >
                                <LogOut size={18}/>
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
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.5}}
                                >
                                    <div className="mt-8">
                                        <StatCards/>
                                    </div>
                                    <div className="flex flex-wrap mt-8 -mx-6">
                                        <RecentActivities/>
                                        <InstitutesOverview/>
                                        <MentorsOverview/>
                                        <EventsOverview setShowCreateEventModal={setShowCreateEventModal}/>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'Events' && (
                                <motion.div
                                    key="events"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.5}}
                                    className="mt-8"
                                >
                                    <EventsOverview setShowCreateEventModal={setShowCreateEventModal}/>
                                    {/*<EventList/>*/}
                                </motion.div>
                            )}

                            {activeTab === 'Institutes' && (
                                <motion.div
                                    key="institutes"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.5}}
                                    className="mt-8"
                                >
                                    <InstitutesOverview/>

                                </motion.div>
                            )}

                            {activeTab === 'Mentors' && (
                                <motion.div
                                    key="mentors"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.5}}
                                    className="mt-8"
                                >
                                    <MentorsOverview/>
                                </motion.div>
                            )}

                            {activeTab === 'Activities' && (
                                <motion.div
                                    key="activities"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.5}}
                                    className="mt-8"
                                >
                                    <Activities/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            {showCreateEventModal && (
                <EventCreationForm onClose={() => setShowCreateEventModal(false)}/>
            )}
        </div>
    );
};

const StatCards = () => {
    const stats = [
        {title: "Total Students", value: "1,234", icon: Users, color: "bg-blue-500"},
        {title: "Active Sessions", value: "42", icon: BarChart3, color: "bg-green-500"},
        {title: "Pending Appointments", value: "18", icon: Calendar, color: "bg-yellow-500"},
    ];

    return (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.1}}
                    className="flex items-center p-4 bg-white rounded-lg shadow-xs"
                >
                    <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                        <stat.icon size={24}/>
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

// const RecentActivities = () => {
//     const activities = [
//         {id: 1, title: 'New student registered', name: 'John Doe', time: '1 hour ago'},
//         {id: 2, title: 'Counseling session completed', name: 'Jane Smith with Dr. Johnson', time: '3 hours ago'},
//         {id: 3, title: 'Event scheduled', name: 'Career Fair 2023', time: '5 hours ago'},
//     ];
//
//     return (
//         <div className="w-full xl:w-1/2 px-6 mb-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//                 <h4 className="text-xl font-semibold mb-4">Recent Activities</h4>
//                 <ul className="space-y-4">
//                     {activities.map((activity) => (
//                         <motion.li
//                             key={activity.id}
//                             initial={{opacity: 0, x: -20}}
//                             animate={{opacity: 1, x: 0}}
//                             transition={{delay: activity.id * 0.1}}
//                             className="flex items-center justify-between border-b pb-2"
//                         >
//                             <div>
//                                 <p className="font-medium">{activity.title}</p>
//                                 <p className="text-sm text-gray-500">{activity.name}</p>
//                             </div>
//                             <span className="text-sm text-gray-400">{activity.time}</span>
//                         </motion.li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

const RecentActivities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/push-notifications');
                const formattedActivities = response.data.map(activity => ({
                    id: activity.id,
                    title: activity.message,
                    name: activity.message.split(': ')[1] || 'Unknown',
                    time: formatTime(activity.created_at),
                }));
                setActivities(formattedActivities);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours === 1) {
            return '1 hour ago';
        } else {
            return `${diffInHours} hours ago`;
        }
    };

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
        {id: 1, name: 'Tech University', type: 'Private', location: 'New York', students: 5000},
        {id: 2, name: 'State College', type: 'Public', location: 'California', students: 15000},
        {id: 3, name: 'Community Institute', type: 'Public', location: 'Texas', students: 3000},
    ];

    return (
        <div className="w-full xl:w-1/2 px-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-xl font-semibold mb-4">Institutes Overview</h4>
                <ul className="space-y-4">
                    {institutes.map((institute) => (
                        <motion.li
                            key={institute.id}
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: institute.id * 0.1}}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <div>
                                <p className="font-medium">{institute.name}</p>
                                <p className="text-sm text-gray-500">{institute.location}</p>
                            </div>
                            <div className="text-right">
                <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
        {id: 1, name: 'John Doe', type: 'associate', expertise: 'Career Counseling'},
        {id: 2, name: 'Jane Smith', type: 'chief', expertise: 'Academic Advising'},
        {id: 3, name: 'Bob Johnson', type: 'associate', expertise: 'Personal Development'},
    ];

    return (
        <div className="w-full px-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-xl font-semibold mb-4">Mentors Overview</h4>
                <ul className="space-y-4">
                    {mentors.map((mentor) => (
                        <motion.li
                            key={mentor.id}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: mentor.id * 0.1}}
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

const EventsOverview = ({setShowCreateEventModal}) => {
    return (
        <div className="w-full px-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold">Event Management</h4>
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={() => setShowCreateEventModal(true)}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        <Plus size={18} className="mr-2"/>
                        Create New Event
                    </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        {/*<h5 className="text-lg font-medium mb-2">Recent Events</h5>*/}
                        {/*<EventInvitations />*/}
                        <EventList/>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.4}}
                    >
                        <h5 className="text-lg font-medium mb-2">Event Notifications</h5>
                        <EventNotifications/>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

