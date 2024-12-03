import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { MapPin, Clock, Calendar, Globe, Tag } from 'react-feather'

export default function EventSidebar({ event }) {
    const formatDate = (date) => format(new Date(date), 'MMMM d, yyyy h:mm a')

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Details</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Calendar className="text-blue-600" />
                    <p className="text-gray-700"><strong>Date:</strong> {formatDate(event.start_date)}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Clock className="text-blue-600" />
                    <p className="text-gray-700"><strong>Duration:</strong> {event.duration} hours</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Tag className="text-blue-600" />
                    <p className="text-gray-700"><strong>Type:</strong> {event.event_type}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Globe className="text-blue-600" />
                    <p className="text-gray-700"><strong>Mode:</strong> {event.event_mode}</p>
                </div>
                {event.event_mode === 'online' ? (
                    <div className="flex items-center space-x-3">
                        <Globe className="text-blue-600" />
                        <p className="text-gray-700">
                            <strong>Link:</strong>{' '}
                            {event.link ? (
                                <a href={event.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                    Join Event
                                </a>
                            ) : (
                                'To be announced'
                            )}
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <MapPin className="text-blue-600" />
                        <p className="text-gray-700"><strong>Location:</strong> {event.city}, {event.state}</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
