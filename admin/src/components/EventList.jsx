import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/events/all/admin');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto px-4 pb-2">
            <h1 className="text-xl font-semibold  mb-2">Event List</h1>
            <div className="space-y-6">
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-lg rounded-lg overflow-hidden border "
                    >
                        <div className="px-6 py-4">
                            <h2 className="text-xl font-semibold text-indigo-600">{event.name}</h2>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                        </div>
                        <div className="px-6 py-4 bg-gray-50">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Date:</span>{' '}
                                {format(new Date(event.start_date), 'MMMM d, yyyy')}
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Duration:</span> {event.duration} hours
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Location:</span> {event.city}, {event.state}
                            </p>
                        </div>
                        <div className="px-6 py-4 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  event.status === 'scheduled' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
              }`}>
                {event.status}
              </span>
                            <Link to={`/event/${event.id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                >
                                    View Details
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EventList;

