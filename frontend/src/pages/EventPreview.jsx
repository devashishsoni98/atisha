import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Users, Eye, Clock, Globe, ExternalLink, Trophy, Heart } from 'lucide-react';
import {useParams} from "react-router-dom";

const EnhancedEventPreview = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const {eventId} = useParams(); 

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
                setError("Failed to load event data");
                // Fallback object
                setEvent({
                    id: 1,
                    name: "Career Development Workshop",
                    organizer: "Career Guidance Cell",
                    description: "Join us for an intensive workshop on career development and industry preparation.",
                    event_type: "workshop",
                    start_date: "2024-12-12T13:41:00.000Z",
                    end_date: "2024-12-12T17:41:00.000Z",
                    duration: 14400,
                    capacity: 150,
                    current_participants: 84,
                    link: "https://example.com/event",
                    status: "scheduled",
                    event_mode: "online",
                    organizer_id: 2,
                    created_at: "2024-11-27T10:57:06.908Z",
                    city: "Online",
                    state: "N/A",
                    image_url: null,
                    eligibility: "All Students • Undergraduate • Postgraduate",
                    highlights: ["Career Guidance", "Industry Experts", "Certification"],
                    timeline: [
                        {
                            date: "2024-12-12",
                            title: "Workshop Day 1",
                            description: "Introduction to Career Planning"
                        }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-2xl font-bold text-blue-600">Loading event details...</div>
            </div>
        );
    }

    // if (error) {
    // return (
    // <div className="flex items-center justify-center h-screen bg-gray-100">
    // <div className="text-2xl font-bold text-red-500">{error}</div>
    // </div>
    // );
    // }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const isEventStarted = new Date(event.start_date) <= new Date();
    const isCapacityLeft = event.capacity === null || event.current_participants < event.capacity;
    const canJoin = !isEventStarted && isCapacityLeft;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Event Logo/Image */}
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                            {event.image_url ? (
                                <img
                                    src={event.image_url}
                                    alt={event.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <Globe className="w-12 h-12 text-gray-400" />
                            )}
                        </div>

                        {/* Event Title and Basic Info */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
                                    <p className="text-gray-600 mt-1">{event.organizer}</p>
                                </div>
                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <ExternalLink className="w-6 h-6 text-gray-400" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {event.event_type}
                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {event.event_mode}
                </span>
                            </div>

                            {/* Highlights Banner */}
                            {event.highlights && (
                                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-600" />
                                    <p className="text-yellow-800 text-sm font-medium">
                                        {event.highlights.join(' • ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Content */}
                    <div className="md:col-span-2">
                        <div className="w-full border-b">
                            <nav className="flex -mb-px">
                                {['details', 'timeline', 'eligibility'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-2 px-4 text-sm font-medium ${
                                            activeTab === tab
                                                ? 'border-b-2 border-blue-600 text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-6">
                            {activeTab === 'details' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-lg p-6 shadow-sm"
                                >
                                    <h2 className="text-xl font-semibold mb-4">About the Event</h2>
                                    <p className="text-gray-700">{event.description}</p>
                                </motion.div>
                            )}

                            {activeTab === 'timeline' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-lg p-6 shadow-sm"
                                >
                                    <h2 className="text-xl font-semibold mb-4">Event Timeline</h2>
                                    {event.timeline?.map((item, index) => (
                                        <div key={index} className="flex gap-4 mb-4">
                                            <div className="w-24 text-sm text-gray-600">{formatDate(item.date)}</div>
                                            <div>
                                                <h3 className="font-medium">{item.title}</h3>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === 'eligibility' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-lg p-6 shadow-sm"
                                >
                                    <h2 className="text-xl font-semibold mb-4">Eligibility Criteria</h2>
                                    <p className="text-gray-700">{event.eligibility}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Event Stats */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Date & Time</p>
                                        <p className="text-sm text-gray-600">
                                            {formatDate(event.start_date)} at {formatTime(event.start_date)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Duration</p>
                                        <p className="text-sm text-gray-600">{event.duration / 60} minutes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Participants</p>
                                        <p className="text-sm text-gray-600">
                                            {event.current_participants} {event.capacity ? `/ ${event.capacity}` : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Eye className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Mode</p>
                                        <p className="text-sm text-gray-600">{event.event_mode}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Button */}
                            {canJoin ? (
                                <motion.button
                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Register Now
                                </motion.button>
                            ) : (
                                <div className="w-full mt-6 bg-gray-100 text-gray-600 font-semibold py-3 px-6 rounded-lg text-center">
                                    {isEventStarted ? "Registration Closed" : "No seats available"}
                                </div>
                            )}

                            {/* Join Link for Online Events */}
                            {event.event_mode === 'online' && event.link && (
                                <a
                                    href={event.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-3 block text-center text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Join Event
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedEventPreview;

