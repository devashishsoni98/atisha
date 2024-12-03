import { motion } from 'framer-motion'
import { Users, Clock, Calendar } from 'react-feather'

export default function EventStats({ event }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6"
        >
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Event Stats</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Users className="text-blue-600 mr-2" />
                        <span className="text-gray-700">Registered</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{event.event_registrations.length}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Clock className="text-blue-600 mr-2" />
                        <span className="text-gray-700">Duration</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{event.duration}h</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Calendar className="text-blue-600 mr-2" />
                        <span className="text-gray-700">Date</span>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">
            {new Date(event.start_date).toLocaleDateString()}
          </span>
                </div>
            </div>
        </motion.div>
    )
}

