// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { getUpcommingEvents, getCompletedEvents } from '../api/EventsApi';
// import {Link} from "react-router-dom";

// const WorkshopEventsPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [completedEvents, setCompletedEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const timer = setTimeout(() => {
//           setIsLoading(false);
//         }, 1500);

//         // Simulating API calls
//         const upcomingEventDetails = await getUpcommingEvents();
//         const completedEventDetails = await getCompletedEvents();

//         setUpcomingEvents(upcomingEventDetails);
//         setCompletedEvents(completedEventDetails);

//         return () => clearTimeout(timer);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 20 
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const EventCard = ({ event, isCompleted }) => (
//     <motion.div
//       variants={cardVariants}
//       className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//     >
//       <div className="p-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-3">{event.name}</h2>
        
//         <div className="space-y-2 mb-4 text-sm text-gray-600">
//           <div className="flex items-center gap-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             <span>{formatDate(event.start_date)}</span>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span>{event.city}, {event.state}</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//             </svg>
//             <span>{event.event_mode}</span>
//           </div>
//         </div>
        
//         <p className="text-gray-600 text-sm line-clamp-3 mb-6">{event.description}</p>
        
//         <div className="flex flex-col sm:flex-row gap-3">
//             <Link to={`/preview-events/${event.id}`}
//             className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center"
//             >
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             href={event.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className=""
//           >
//             {isCompleted ? 'View Summary' : 'View Details'}

//           </motion.div >
//             </Link>
//           {!isCompleted && (
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 text-center"
//             >
//               Register
//             </motion.button>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );

//   const EventSection = ({ title, events, isCompleted }) => (
//     <section className="mb-12">
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="flex items-center justify-between mb-8"
//       >
//         <h2 className="text-2xl font-semibold text-gray-800">
//           {title}
//         </h2>
//         <div className="text-blue-600">
//           {events.length} Events
//         </div>
//       </motion.div>
//       <motion.div 
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         {events.map((event) => (
//           <EventCard key={event.id} event={event} isCompleted={isCompleted} />
//         ))}
//       </motion.div>
//     </section>
//   );

//   return (
//     <div className="w-full min-h-screen px-6 py-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl font-bold text-blue-600">Workshops & Events</h1>
//         </motion.div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <motion.div 
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//               className="rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"
//             />
//           </div>
//         ) : (
//           <div>
//             <EventSection title="Upcoming Events" events={upcomingEvents} isCompleted={false} />
//             <EventSection title="Completed Events" events={completedEvents} isCompleted={true} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkshopEventsPage;

// // Simulated API functions
// async function getUpcomingEvents() {
//   // This would be replaced with an actual API call
//   return [
//     {
//       "id": 1,
//       "name": "Tech Seminar",
//       "description": "A seminar on the latest technology trends",
//       "event_type": "seminar",
//       "start_date": "2025-01-15T09:00:00.000Z",
//       "end_date": "2025-01-15T17:00:00.000Z",
//       "duration": 28800,
//       "capacity": 500,
//       "link": "http://techseminar.com",
//       "status": "scheduled",
//       "event_mode": "offline",
//       "organizer_id": 1,
//       "created_at": "2024-12-02T09:31:06.899Z",
//       "city": "San Francisco",
//       "state": "California"
//     },
//     {
//       "id": 2,
//       "name": "Online Workshop",
//       "description": "Interactive workshop on web development",
//       "event_type": "workshop",
//       "start_date": "2025-02-10T10:00:00.000Z",
//       "end_date": "2025-02-11T10:00:00.000Z",
//       "duration": 7200,
//       "capacity": 300,
//       "link": "http://devworkshop.com",
//       "status": "scheduled",
//       "event_mode": "online",
//       "organizer_id": 1,
//       "created_at": "2024-12-02T09:31:06.899Z",
//       "city": "New York",
//       "state": "New York"
//     }
//   ];
// }

// async function getCompletedEvents() {
//   // This would be replaced with an actual API call
//   return [
//     {
//       "id": 3,
//       "name": "Data Science Symposium",
//       "description": "A comprehensive look at the latest in data science",
//       "event_type": "conference",
//       "start_date": "2024-11-20T09:00:00.000Z",
//       "end_date": "2024-11-22T17:00:00.000Z",
//       "duration": 172800,
//       "capacity": 1000,
//       "link": "http://datasciencesymposium.com",
//       "status": "completed",
//       "event_mode": "hybrid",
//       "organizer_id": 2,
//       "created_at": "2024-10-01T10:00:00.000Z",
//       "city": "Chicago",
//       "state": "Illinois"
//     }
//   ];
// }



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCompletedEvents, getUpcommingEvents } from '../api/EventsApi';
import { Link } from 'react-router-dom';


const WorkshopEventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);

        const upcomingEventDetails = await getUpcommingEvents();
        const completedEventDetails = await getCompletedEvents();

        setUpcomingEvents(upcomingEventDetails);
        setCompletedEvents(completedEventDetails);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const EventCard = ({ event, isCompleted }) => (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{event.name}</h2>
        
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.start_date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.city}, {event.state}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>{event.event_mode}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-6">{event.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to={`/preview-events/${event.id}`}
            className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isCompleted ? 'View Summary' : 'View Details'}
            </motion.div>
          </Link>
          {!isCompleted && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 text-center"
            >
              Register
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );

  const EventSection = ({ title, events, isCompleted }) => (
    <section className="mb-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          {title}
        </h2>
        <div className="text-blue-600">
          {events.length} Events
        </div>
      </motion.div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} isCompleted={isCompleted} />
        ))}
      </motion.div>
    </section>
  );

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-600">Workshops & Events</h1>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"
            />
          </div>
        ) : (
          <div>
            <EventSection title="Upcoming Events" events={upcomingEvents} isCompleted={false} />
            <EventSection title="Completed Events" events={completedEvents} isCompleted={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopEventsPage;

