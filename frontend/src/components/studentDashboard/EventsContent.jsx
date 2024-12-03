import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommonFunctions } from '../../utils/commonFunctions';
import axios from 'axios';
import { User, Mail, Calendar, MapPin, Phone, School, GraduationCap, LogOut, Bell, Home, LineChart, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';
const EventsContent = () => {
    const [events, setEvents] = useState([]);
    const userId = useSelector((state) => state.user.userId || localStorage.getItem('userId'));

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Uncomment and modify this line to fetch events from your API
                // const response = await axios.get(`http://localhost:4000/api/events/get_events_for_student/${userId}`);
                // console.log(response.data);
                setEvents([
                    {
                        "id": 1,
                        "name": "Career Guidance Workshop",
                        "description": "A workshop aimed at providing career guidance to high school students. Topics include career options, skill development, and industry trends.",
                        "event_type": "workshop",
                        "start_date": "2024-12-12T13:41:00.000Z",
                        "end_date": "2024-12-12T15:41:00.000Z", // Fixed end date
                        "duration": 14400,
                        "capacity": 15,
                        "link": null,
                        "status": "scheduled",
                        "event_mode": "offline",
                        "organizer_id": 2,
                        "created_at": "2024-11-27T10:57:06.908Z",
                        "city": "Jaipur",
                        "state": "Rajasthan"
                    },
                    {
                        "id": 2,
                        "name": "Mental Health Awareness Seminar",
                        "description": "A seminar focused on raising awareness about mental health issues among students. Topics include stress management, coping strategies, and available resources.",
                        "event_type": "seminar",
                        "start_date": "2024-12-15T10:00:00.000Z",
                        "end_date": "2024-12-15T12:00:00.000Z",
                        "duration": 7200,
                        "capacity": 50,
                        "link": null,
                        "status": "scheduled",
                        "event_mode": "online",
                        "organizer_id": 3,
                        "created_at": "2024-11-30T09:30:00.000Z",
                        "city": "Delhi",
                        "state": "Delhi"
                    },
                    {
                        "id": 3,
                        "name": "Leadership Development Program",
                        "description": "An intensive program designed to develop leadership skills in young adults. Includes workshops, group activities, and guest speakers.",
                        "event_type": "program",
                        "start_date": "2024-12-20T09:00:00.000Z",
                        "end_date": "2024-12-22T17:00:00.000Z",
                        "duration": 216000,
                        "capacity": 30,
                        "link": null,
                        "status": "scheduled",
                        "event_mode": "offline",
                        "organizer_id": 1,
                        "created_at": "2024-11-28T14:45:00.000Z",
                        "city": "Mumbai",
                        "state": "Maharashtra"
                    },
                    {
                        id: 4,
                        name: 'College Application Workshop',
                        description: 'A workshop that guides students through the college application process, including essay writing and interview preparation.',
                        event_type: 'workshop',
                        start_date: '2025-01-05T14:00:00.000Z',
                        end_date: '2025-01-05T16:00:00.000Z',
                        duration: 7200,
                        capacity: 20,
                        link: null,
                        status: 'scheduled',
                        event_mode: 'offline',
                        organizer_id: 2,
                        created_at: '2024-12-01T11:20:00.000Z',
                        city: 'Bengaluru',
                        state: 'Karnataka'
                    },
                    // Past Events
                    {
                        id: 5,
                        name: 'Summer Internship Fair 2024',
                        description:
                            'A fair connecting students with potential summer internship opportunities across various industries.',
                        event_type: 'fair',
                        start_date: '2024-11-10T09:00:00.000Z',
                        end_date: '2024-11-10T16:00:00.000Z',
                        duration: 25200,
                        capacity: 100,
                        link: null,
                        status: 'ended',
                        event_mode: null,
                        organizer_id: 2,
                        created_at: '2024-10-01T08:30:00.000Z',
                        city: null,
                        state: null
                    },
                    {
                        id: 6,
                        name: '[Past Event] Career Counseling Session - Fall 2023',
                        description: '[Past Event] A session aimed at helping students choose the right career path based on their interests and skills.',
                        event_type: 'session',
                        start_date: '2023-09-15T10:00:00.000Z',
                        end_date: '2023-09-15T12:30:00.000Z',
                        duration: 9000,
                        capacity: 25,
                        link: null,
                        status: 'ended',
                        event_mode: 'offline',
                        organizer_id: 1,
                        created_at: '2023-08-20T14:45:00.000Z',
                        city: 'Pune',
                        state: 'Maharashtra'
                    },
                    {
                        id: 7,
                        name: '[Past Event] Academic Excellence Workshop',
                        description: '[Past Event] A workshop focused on study techniques and academic success strategies for high school students.',
                        event_type: 'workshop',
                        start_date: '2023-10-05T14:00:00.000Z',
                        end_date: '2023-10-05T16:00:00.000Z',
                        duration: 7200,
                        capacity: 30,
                        link: null,
                        status: 'ended',
                        event_mode: 'offline',
                        organizer_id: 2,
                        created_at: '2023-09-01T11:20:00.000Z',
                        city: 'Hyderabad',
                        state: 'Telangana'
                    }
                ]);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, [userId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    };

    const upcomingEvents = events.filter(event => new Date(event.start_date) > new Date());
    const pastEvents = events.filter(event => new Date(event.start_date) <= new Date());


    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
                <div className="flex justify-between items-center mb-6">
                    <motion.h2 className="text-2xl font-bold text-blue-800" variants={fadeIn}>Your Events</motion.h2>
                    <Link to="/explore-events"
                          className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-xl transition-colors">
                        Explore Events
                    </Link>
                </div>

                <motion.div className="space-y-4" variants={fadeIn}>
                    <h3 className="font-semibold text-lg text-blue-700 mb-2">Upcoming Events</h3>
                    {upcomingEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            className="bg-blue-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                            variants={slideIn}
                        >
                            <div>
                                <h4 className="font-medium text-blue-700">{event.name}</h4>
                                <p className="text-sm text-gray-600">{formatDate(event.start_date)} at {formatTime(event.start_date)}</p>
                                <p className="text-sm text-gray-600">Duration: {event.duration / 60} minutes</p>
                                <p className="text-sm text-gray-600">Type: {event.event_type}</p>
                                <p className="text-sm text-gray-600">Mode: {event.event_mode}</p>
                                <p className="text-sm text-gray-600">Location: {event.city}, {event.state}</p>
                            </div>
                            <Link to={`/preview-events/${event.id}`}>
                            <motion.button
                                className="mt-2 md:mt-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold "
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                {/*{event.event_mode === 'offline' ? 'RSVP' : 'Join'}*/}

                                Join
                            </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div className="space-y-4 mt-8" variants={fadeIn}>
                    <h3 className="font-semibold text-lg text-blue-700 mb-2">Past Events</h3>
                    {pastEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            className="bg-green-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                            variants={slideIn}
                        >
                            <div>
                                <h4 className="font-medium text-green-700">{event.name}</h4>
                                <p className="text-sm text-gray-600">{formatDate(event.start_date)} at {formatTime(event.start_date)}</p>
                                <p className="text-sm text-gray-600">Type: {event.event_type}</p>
                                <p className="text-sm text-gray-600">Mode: {event.event_mode}</p>
                                <p className="text-sm text-gray-600">Location: {event.city}, {event.state}</p>
                            </div>
                            <motion.button
                                className="mt-2 md:mt-0 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                View Details
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
export default EventsContent