// // import { motion } from 'framer-motion'
// // import { Users } from 'react-feather'
// //
// // export default function RegistrationForm({ event, isRegistered, onRegister }) {
// //     const availableSlots = event.capacity - event.event_registrations.length
// //
// //     return (
// //         <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.4 }}
// //             className="bg-white rounded-2xl shadow-xl p-6"
// //         >
// //             <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
// //                 <Users className="mr-2" />
// //                 Registration
// //             </h2>
// //             <div className="space-y-4">
// //                 <div>
// //                     <p className="text-gray-600 mb-2">
// //                         Available slots: <span className="font-bold text-blue-600">{availableSlots}</span> out of {event.capacity}
// //                     </p>
// //                     <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
// //                         <div
// //                             className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
// //                             style={{ width: `${(event.event_registrations.length / event.capacity) * 100}%` }}
// //                         ></div>
// //                     </div>
// //                 </div>
// //                 {isRegistered ? (
// //                     <motion.p
// //                         initial={{ opacity: 0, scale: 0.8 }}
// //                         animate={{ opacity: 1, scale: 1 }}
// //                         className="text-green-600 font-semibold bg-green-100 p-3 rounded-lg text-center"
// //                     >
// //                         You are registered for this event!
// //                     </motion.p>
// //                 ) : (
// //                     <>
// //                         {availableSlots > 0 ? (
// //                             <motion.button
// //                                 whileHover={{ scale: 1.05 }}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
// //                                 onClick={onRegister}
// //                             >
// //                                 Register Now
// //                             </motion.button>
// //                         ) : (
// //                             <p className="text-red-600 font-semibold bg-red-100 p-3 rounded-lg text-center">
// //                                 Sorry, this event is fully booked.
// //                             </p>
// //                         )}
// //                     </>
// //                 )}
// //             </div>
// //         </motion.div>
// //     )
// // }
// //
//
// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Users, Clock } from 'react-feather'
//
// export default function RegistrationForm({ event, isRegistered, onRegister }) {
//     const [timeLeft, setTimeLeft] = useState('')
//
//     useEffect(() => {
//         const timer = setInterval(() => {
//             const now = new Date()
//             const eventStart = new Date(event.start_date)
//             const difference = eventStart - now
//
//             if (difference > 0) {
//                 const days = Math.floor(difference / (1000 * 60 * 60 * 24))
//                 const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
//                 const minutes = Math.floor((difference / 1000 / 60) % 60)
//                 const seconds = Math.floor((difference / 1000) % 60)
//
//                 setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
//             } else {
//                 setTimeLeft('Event has started')
//                 clearInterval(timer)
//             }
//         }, 1000)
//
//         return () => clearInterval(timer)
//     }, [event.start_date])
//
//     const availableSlots = event.capacity - event.event_registrations.length
//
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-white rounded-2xl shadow-xl p-6"
//         >
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//                 <Users className="mr-2" />
//                 Registration
//             </h2>
//             <div className="space-y-4">
//                 <div>
//                     <p className="text-gray-600 mb-2">
//                         Available slots: <span className="font-bold text-blue-600">{availableSlots}</span> out of {event.capacity}
//                     </p>
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                         <div
//                             className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
//                             style={{ width: `${(event.event_registrations.length / event.capacity) * 100}%` }}
//                         ></div>
//                     </div>
//                 </div>
//                 {isRegistered ? (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="bg-green-100 p-4 rounded-lg"
//                     >
//                         <p className="text-green-600 font-semibold mb-2">You are registered for this event!</p>
//                         <div className="flex items-center text-green-700">
//                             <Clock className="mr-2" />
//                             <span>{timeLeft}</span>
//                         </div>
//                     </motion.div>
//                 ) : (
//                     <>
//                         {availableSlots > 0 ? (
//                             event.event_mode === 'online' ? (
//                                 <motion.a
//                                     href={event.link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
//                                 >
//                                     Join Event
//                                 </motion.a>
//                             ) : (
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
//                                     onClick={onRegister}
//                                 >
//                                     Register Now
//                                 </motion.button>
//                             )
//                         ) : (
//                             <p className="text-red-600 font-semibold bg-red-100 p-3 rounded-lg text-center">
//                                 Sorry, this event is fully booked.
//                             </p>
//                         )}
//                     </>
//                 )}
//             </div>
//         </motion.div>
//     )
// }
//

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock } from 'react-feather'

export default function RegistrationForm({ event, isRegistered, onRegister }) {
    const [timeLeft, setTimeLeft] = useState('')
    const [eventStatus, setEventStatus] = useState('upcoming')

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const eventStart = new Date(event.start_date)
            const difference = eventStart - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                const minutes = Math.floor((difference / 1000 / 60) % 60)
                const seconds = Math.floor((difference / 1000) % 60)

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
                setEventStatus('upcoming')
            } else {
                setTimeLeft('Event has started')
                setEventStatus('started')
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [event.start_date])

    const availableSlots = event.capacity - event.event_registrations.length

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="mr-2" />
                Registration
            </h2>
            <div className="space-y-4">
                <div>
                    <p className="text-gray-600 mb-2">
                        Available slots: <span className="font-bold text-blue-600">{availableSlots}</span> out of {event.capacity}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(event.event_registrations.length / event.capacity) * 100}%` }}
                        ></div>
                    </div>
                </div>
                {isRegistered ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-100 p-4 rounded-lg"
                    >
                        <p className="text-green-600 font-semibold mb-2">You are registered for this event!</p>
                        <div className="flex items-center text-green-700">
                            <Clock className="mr-2" />
                            <span>{timeLeft}</span>
                        </div>
                        {eventStatus === 'started' && event.event_mode === 'online' && (
                            <motion.a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-4 block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Join Event
                            </motion.a>
                        )}
                    </motion.div>
                ) : (
                    <>
                        {eventStatus === 'upcoming' ? (
                            availableSlots > 0 ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                                    onClick={onRegister}
                                >
                                    Register Now
                                </motion.button>
                            ) : (
                                <p className="text-red-600 font-semibold bg-red-100 p-3 rounded-lg text-center">
                                    Sorry, this event is fully booked.
                                </p>
                            )
                        ) : (
                            <p className="text-yellow-600 font-semibold bg-yellow-100 p-3 rounded-lg text-center">
                                This event has already started.
                            </p>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    )
}

