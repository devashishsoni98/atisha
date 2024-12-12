import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useParams, Link } from 'react-router-dom';

const EventDetails = () => {
    const [event, setEvent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/events/all/admin`);
                const data = await response.json();
                const selectedEvent = data.find(e => e.id === parseInt(id));
                setEvent(selectedEvent);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [id]);

    if (!event) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
                <div className="px-6 py-4">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-4">{event.name}</h1>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Date:</span>{' '}
                        {format(new Date(event.start_date), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Time:</span>{' '}
                        {format(new Date(event.start_date), 'h:mm a')} - {format(new Date(event.end_date), 'h:mm a')}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Duration:</span> {event.duration} hours
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Location:</span> {event.city}, {event.state}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Capacity:</span> {event.capacity} attendees
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Event Type:</span> {event.event_type}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Event Mode:</span> {event.event_mode}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Status:</span>{' '}
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            event.status === 'scheduled' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                        }`}>
              {event.status}
            </span>
                    </p>
                </div>
                <div className="px-6 py-4 flex justify-between items-center">
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                        >
                            Back to Event List
                        </motion.button>
                    </Link>
                    <a href={`${event.link}`} target="_blank" rel="noopener noreferrer">

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Start
                    </motion.button>
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default EventDetails;

