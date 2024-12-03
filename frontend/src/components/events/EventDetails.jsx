// // import { motion } from 'framer-motion'
// // import { format } from 'date-fns'
// // import { MapPin, Clock, Calendar, Globe, Tag } from 'react-feather'
// //
// // export default function EventDetails({ event }) {
// //     const formatDate = (date) => format(new Date(date), 'MMMM d, yyyy h:mm a')
// //
// //     return (
// //         <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="bg-white rounded-2xl shadow-xl overflow-hidden"
// //         >
// //             <div className="relative h-64 md:h-96">
// //                 <img
// //                     src={event.image}
// //                     alt={event.name}
// //                     className="w-full h-full object-cover"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
// //                     <h1 className="text-3xl md:text-4xl font-bold text-white p-6">{event.name}</h1>
// //                 </div>
// //             </div>
// //             <div className="p-6 space-y-6">
// //                 <p className="text-gray-600 text-lg">{event.description}</p>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div className="flex items-center space-x-3">
// //                         <Calendar className="text-blue-600" />
// //                         <p className="text-gray-700"><strong>Date:</strong> {formatDate(event.start_date)}</p>
// //                     </div>
// //                     <div className="flex items-center space-x-3">
// //                         <Clock className="text-blue-600" />
// //                         <p className="text-gray-700"><strong>Duration:</strong> {event.duration} hours</p>
// //                     </div>
// //                     <div className="flex items-center space-x-3">
// //                         <Tag className="text-blue-600" />
// //                         <p className="text-gray-700"><strong>Type:</strong> {event.event_type}</p>
// //                     </div>
// //                     <div className="flex items-center space-x-3">
// //                         <Globe className="text-blue-600" />
// //                         <p className="text-gray-700"><strong>Mode:</strong> {event.event_mode}</p>
// //                     </div>
// //                 </div>
// //                 <div className="pt-4 border-t border-gray-200">
// //                     {event.event_mode === 'online' ? (
// //                         <div className="flex items-center space-x-3">
// //                             <Globe className="text-blue-600" />
// //                             <p className="text-gray-700">
// //                                 <strong>Link:</strong>{' '}
// //                                 {event.link ? (
// //                                     <a href={event.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
// //                                         Join Event
// //                                     </a>
// //                                 ) : (
// //                                     'To be announced'
// //                                 )}
// //                             </p>
// //                         </div>
// //                     ) : (
// //                         <div className="flex items-center space-x-3">
// //                             <MapPin className="text-blue-600" />
// //                             <p className="text-gray-700"><strong>Location:</strong> {event.city}, {event.state}</p>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </motion.div>
// //     )
// // // }
// //
// // import { motion } from 'framer-motion'
// // import { format } from 'date-fns'
// // import { MapPin, Clock, Calendar, Globe, Tag } from 'react-feather'
// //
// // export default function EventDetails({ event }) {
// //     const formatDate = (date) => format(new Date(date), 'MMMM d, yyyy h:mm a')
// //
// //     return (
// //         <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="bg-white rounded-2xl shadow-xl overflow-hidden"
// //         >
// //             <div className="relative h-64 md:h-96">
// //                 <img
// //                     src={event.image_url}
// //                     alt={event.name}
// //                     className="w-full h-full object-cover"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
// //                     <h1 className="text-3xl md:text-4xl font-bold text-white p-6">{event.name}</h1>
// //                 </div>
// //             </div>
// //             <div className="p-6">
// //                 <p className="text-gray-600 text-lg">{event.description}</p>
// //             </div>
// //         </motion.div>
// //     )
// // }
//
//
// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { format } from 'date-fns'
// import { MapPin, Clock, Calendar, Globe, Tag, Users } from 'react-feather'
//
// import GuestList from './GuestListDialog.jsx'
//
// export default function EventDetails({ event }) {
//     const [showGuestList, setShowGuestList] = useState(false)
//     const formatDate = (date) => format(new Date(date), 'MMMM d, yyyy h:mm a')
//
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-white rounded-2xl shadow-xl overflow-hidden"
//         >
//             <div className="relative h-64 md:h-96">
//                 <img
//                     src={event.image_url}
//                     alt={event.name}
//                     className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white p-6">{event.name}</h1>
//                 </div>
//             </div>
//             <div className="p-6">
//                 <p className="text-gray-600 text-lg">{event.description}</p>
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-semibold flex items-center"
//                     onClick={() => setShowGuestList(!showGuestList)}
//                 >
//                     <Users className="mr-2" />
//                     {showGuestList ? 'Hide' : 'View'} Guest List
//                 </motion.button>
//                 {showGuestList && (
//                     <GuestList event={event} />
//                 )}
//             </div>
//         </motion.div>
//     )
// }
//


import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { MapPin, Clock, Calendar, Globe, Tag, Users } from 'react-feather'


export default function EventDetails({ event, onShowGuestList }) {
    const formatDate = (date) => format(new Date(date), 'MMMM d, yyyy h:mm a')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="relative h-64 md:h-96">
                <img
                    src={event.image_url}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                    <h1 className="text-3xl md:text-4xl font-bold text-white p-6">{event.name}</h1>
                </div>
            </div>
            <div className="p-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-semibold flex items-center"
                    onClick={() => onShowGuestList()}
                >
                    <Users className="mr-2" />
                    View Guest List
                </motion.button>
                <p className="text-gray-600 text-lg">{event.description}</p>
            </div>
        </motion.div>
    )
}

