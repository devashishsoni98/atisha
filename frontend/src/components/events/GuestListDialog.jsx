// import { motion } from 'framer-motion'
// import { X } from 'react-feather'
//
// export default function GuestListDialog({ event, onClose, userId }) {
//     const isRegistered = event.event_registrations.some(reg => reg.student_id === parseInt(userId))
//
//     useEffect(() => {
//         const fetchStudentInfo = async () => {
//             setLoading(true)
//             const newStudents = {}
//             for (const registration of event.event_registrations) {
//                 try {
//                     const response = await apibackend.get(`/students/${registration.student_id}`)
//                     newStudents[registration.student_id] = response.data
//                 } catch (error) {
//                     console.error(`Error fetching student ${registration.student_id} information:`, error)
//                     newStudents[registration.student_id] = { name: 'Unknown' }
//                 }
//             }
//             setStudents(newStudents)
//             setLoading(false)
//         }
//
//         if (isRegistered) {
//             fetchStudentInfo()
//         }
//     }, [event.event_registrations, isRegistered])
//
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         >
//             <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-2xl p-6 w-full max-w-md relative"
//             >
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 >
//                     <X size={24} />
//                 </button>
//                 <h2 className="text-2xl font-semibold text-blue-800 mb-4">Guest List</h2>
//                 {isRegistered ? (
//                     <ul className="mb-4 max-h-60 overflow-y-auto space-y-2">
//                         {event.event_registrations.map((registration) => (
//                             <li
//                                 key={registration.id}
//                                 className="text-gray-700 bg-gray-100 p-3 rounded-lg flex justify-between items-center">
//                                 <span>Student ID: {registration.student_id}</span>
//                                 <span className={`px-2 py-1 rounded-full text-xs ${
//                                     registration.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
//                                 }`}>
//                   {registration.status}
//                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-red-600 mb-4">You must be registered to view the guest list.</p>
//                 )}
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
//                     onClick={onClose}
//                 >
//                     Close
//                 </motion.button>
//             </motion.div>
//         </motion.div>
//     )
// }
//


import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users } from 'react-feather'
import apibackend from '../../utils/api'

export default function GuestListDialog({ event, onClose, userId }) {
    const [students, setStudents] = useState({})
    const [loading, setLoading] = useState(true)
    const isRegistered = event.event_registrations.some(reg => reg.student_id === parseInt(userId))

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

        if (isRegistered) {
            fetchStudentInfo()
        }
    }, [event.event_registrations, isRegistered])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl p-6 w-full max-w-md relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <Users className="mr-2" />
                        Guest List
                    </h2>
                    {isRegistered ? (
                        loading ? (
                            <p className="text-gray-600">Loading guest list...</p>
                        ) : (
                            <ul className="mb-4 max-h-60 overflow-y-auto space-y-2">
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
                        )
                    ) : (
                        <p className="text-red-600 mb-4">You must be registered to view the guest list.</p>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                        onClick={onClose}
                    >
                        Close
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
