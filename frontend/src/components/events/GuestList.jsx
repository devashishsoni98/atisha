import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import apibackend from '../../utils/api'

export default function GuestList({ event }) {
    const [students, setStudents] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStudentInfo = async () => {
            setLoading(true)
            const newStudents = {}
            for (const registration of event.event_registrations) {
                try {
                    const response = await apibackend.get(`/students/${registration.student_id}`)
                    newStudents[registration.student_id] = response.data
                } catch (error) {
                    console.error(`Error fetching student ${registration.student_id} information:`, error)
                    newStudents[registration.student_id] = { name: 'Unknown' }
                }
            }
            setStudents(newStudents)
            setLoading(false)
        }

        fetchStudentInfo()
    }, [event.event_registrations])

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-white rounded-lg shadow-md p-4"
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Guest List</h3>
            {loading ? (
                <p className="text-gray-600">Loading guest list...</p>
            ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {event.event_registrations.map((registration) => (
                        <li
                            key={registration.id}
                            className="text-gray-700 bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                        >
                            <span>{students[registration.student_id]?.name || 'Unknown'}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                registration.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                            }`}>
                {registration.status}
              </span>
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    )
}

