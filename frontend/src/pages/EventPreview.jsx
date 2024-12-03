// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import EventDetails from '../components/events/EventDetails'
// import RegistrationForm from '../components/events/RegistrationForm'
// import GuestListDialog from '../components/events/GuestListDialog'
// import EventStats from '../components/events/EventStats'
// import apibackend from '../utils/api'
//
// export default function EventPreviewPage() {
//     const [event, setEvent] = useState(null)
//     const [isRegistered, setIsRegistered] = useState(false)
//     const [showGuestList, setShowGuestList] = useState(false)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//
//     const { id } = useParams()
//     const userId = useSelector(state => state.user.id || localStorage.getItem('userId'))
//
//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 setLoading(true)
//                 const response = await apibackend.get(`/events/${id}`)
//             console.log(response.data)
//                 setEvent(response.data)
//                 setIsRegistered(response.data.event_registrations.some(reg => reg.student_id === parseInt(userId)))
//             } catch (err) {
//                 setError('Failed to load event details. Please try again later.')
//                 console.error('Error fetching event:', err)
//             } finally {
//                 setLoading(false)
//             }
//         }
//
//         fetchEvent()
//     }, [id, userId])
//
//     const handleRegister = async () => {
//         try {
//             const response = await axios.post('http://localhost:7000/events/register_for_event', {
//                 event_id: event.id,
//                 student_id: parseInt(userId)
//             })
//
//
//             if (response.status === 201) {
//                 setIsRegistered(true)
//                 setEvent(prevEvent => ({
//                     ...prevEvent,
//                     event_registrations: [
//                         ...prevEvent.event_registrations,
//                         { id: response.data.id, event_id: event.id, student_id: parseInt(userId), status: 'confirmed' }
//                     ]
//                 }))
//             }
//         } catch (err) {
//             console.error('Error registering for event:', err)
//             alert('Failed to register for the event. Please try again.')
//         }
//     }
//
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                     className="text-2xl font-semibold text-blue-600"
//                 >
//                     Loading event details...
//                 </motion.div>
//             </div>
//         )
//     }
//
//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="text-xl text-red-600 bg-white p-6 rounded-lg shadow-lg"
//                 >
//                     {error}
//                 </motion.div>
//             </div>
//         )
//     }
//
//     return (
//         <div className=" w-[100%] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="max-w-7xl mx-auto"
//             >
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="md:col-span-2">
//                         <EventDetails event={event} />
//                     </div>
//                     <div className="space-y-6">
//                         <RegistrationForm
//                             event={event}
//                             isRegistered={isRegistered}
//                             onRegister={handleRegister}
//                         />
//                         <EventStats event={event} />
//                     </div>
//                 </div>
//                 {isRegistered && (
//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors font-semibold"
//                         onClick={() => setShowGuestList(true)}
//                     >
//                         View Guest List
//                     </motion.button>
//                 )}
//                 <AnimatePresence>
//                     {showGuestList && (
//                         <GuestListDialog
//                             event={event}
//                             onClose={() => setShowGuestList(false)}
//                             userId={userId}
//                         />
//                     )}
//                 </AnimatePresence>
//             </motion.div>
//         </div>
//     )
// }
//


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import EventDetails from '../components/events/EventDetails'
import RegistrationForm from '../components/events/RegistrationForm'
import EventStats from '../components/events/EventStats'
import apibackend from '../utils/api'
import EventSidebar from '../components/events/EventSidebar'
import GuestListDialog from '../components/events/GuestListDialog'
import { AnimatePresence } from 'framer-motion';

export default function EventPreviewPage() {
    const [event, setEvent] = useState(null)
    const [isRegistered, setIsRegistered] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showGuestList, setShowGuestList] = useState(false)

    const { id } = useParams()
    const userId = useSelector(state => state.user.id || localStorage.getItem('userId'))

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true)
                const response = await apibackend.get(`/events/${id}`)
                setEvent(response.data)
                setIsRegistered(response.data.event_registrations.some(reg => reg.student_id === parseInt(userId)))
            } catch (err) {
                setError('Failed to load event details. Please try again later.')
                console.error('Error fetching event:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [id, userId])

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:7000/events/register_for_event', {
                event_id: event.id,
                student_id: parseInt(userId)
            })

            if (response.status === 201) {
                setIsRegistered(true)
                setEvent(prevEvent => ({
                    ...prevEvent,
                    event_registrations: [
                        ...prevEvent.event_registrations,
                        { id: response.data.id, event_id: event.id, student_id: parseInt(userId), status: 'confirmed' }
                    ]
                }))
            }
        } catch (err) {
            console.error('Error registering for event:', err)
            alert('Failed to register for the event. Please try again.')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-blue-600"
                >
                    Loading event details...
                </motion.div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-red-600 bg-white p-6 rounded-lg shadow-lg"
                >
                    {error}
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <EventDetails event={event} onShowGuestList={() => setShowGuestList(true)} />
                    </div>
                    <div className="space-y-6">
                        <EventSidebar event={event} />
                        <RegistrationForm
                            event={event}
                            isRegistered={isRegistered}
                            onRegister={handleRegister}
                        />
                        <EventStats event={event} />
                    </div>
                </div>
                <AnimatePresence>
                    {showGuestList && (
                        <GuestListDialog
                            event={event}
                            onClose={() => setShowGuestList(false)}
                            userId={userId}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

