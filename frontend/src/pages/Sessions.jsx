// // import React, { useState, useEffect } from 'react';
// // import workshop1 from "../assets/workshop1.jpg"
// // import workshop2 from "../assets/workshop2.jpg"
// // import up_work1 from "../assets/up_work1.png"
// // import work1 from "../assets/work1.jpg"
// // import work2 from "../assets/work2.jpg"


// // const WorkshopEventsPage = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [joinedEvents, setJoinedEvents] = useState([]);

// //   const upcomingEvents = [
// //     {
// //       id: 1,
// //       title: "Web Development Bootcamp",
// //       date: "December 15, 2024",
// //       time: "10:00 AM - 4:00 PM",
// //       location: "Tech Hub, Downtown",
// //       description: "Intensive one-day bootcamp covering HTML, CSS, and JavaScript basics. Join us for an immersive learning experience where you'll build real-world projects and learn from industry experts.",
// //       image: up_work1
// //     },
// //     {
// //       id: 2,
// //       title: "Data Science Workshop",
// //       date: "December 25, 2024",
// //       time: "2:00 PM - 6:00 PM",
// //       location: "Innovation Center",
// //       description: "Learn the fundamentals of data analysis and machine learning. This workshop covers essential topics in data science, including statistical analysis, Python programming with pandas and numpy.",
// //       image: work1
// //     },
// //     {
// //       id: 3,
// //       title: "UI/UX Design Principles",
// //       date: "January 10, 2025",
// //       time: "1:00 PM - 5:00 PM",
// //       location: "Design Studio",
// //       description: "Deep dive into modern design practices, user research methodologies, and creating effective user interfaces. Practical exercises and real-world case studies included.",
// //       image: work2
// //     }
// //   ];

// //   const completedEvents = [
// //     {
// //       id: 4,
// //       title: "Mobile App Development",
// //       date: "October 20, 2024",
// //       time: "9:00 AM - 3:00 PM",
// //       location: "Tech Campus",
// //       description: "Comprehensive workshop on mobile app development. Learn to build cross-platform applications using React Native. Topics included app architecture and state management.",
// //       image: workshop1,
// //       participants: 45,
// //       rating: 4.8
// //     },
// //     {
// //       id: 5,
// //       title: "Cloud Computing Workshop",
// //       date: "September 15, 2024",
// //       time: "10:00 AM - 4:00 PM",
// //       location: "Virtual",
// //       description: "Explored AWS and Azure services, covering deployment, scaling, and best practices for cloud architecture. Hands-on exercises with real cloud environments.",
// //       image: workshop2,
// //       participants: 60,
// //       rating: 4.9
// //     }
// //   ];

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setIsLoading(false);
// //     }, 1500);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const handleJoinEvent = (eventId) => {
// //     if (!joinedEvents.includes(eventId)) {
// //       setJoinedEvents([...joinedEvents, eventId]);
// //       alert("You've successfully joined the event!");
// //     } else {
// //       alert("You've already joined this event.");
// //     }
// //   };

// //   const EventCard = ({ event, isCompleted = false }) => (
// //     <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
// //       <div className="relative h-48 overflow-hidden">
// //         <img 
// //           src={event.image} 
// //           alt={event.title} 
// //           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 "
// //         />
// //         {isCompleted && (
// //           <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
// //             Completed
// //           </div>
// //         )}
// //       </div>
      
// //       <div className="p-6">
// //         <h2 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h2>
        
// //         <div className="space-y-2 mb-4 text-sm text-gray-600">
// //           <div className="flex items-center gap-2">
// //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //             </svg>
// //             <span>{event.date}</span>
// //           </div>
          
// //           <div className="flex items-center gap-2">
// //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //             <span>{event.time}</span>
// //           </div>
          
// //           <div className="flex items-center gap-2">
// //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //             </svg>
// //             <span>{event.location}</span>
// //           </div>

// //           {isCompleted && (
// //             <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
// //               <div className="flex items-center gap-1">
// //                 <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
// //                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                 </svg>
// //                 <span className="text-gray-700">{event.rating}/5.0</span>
// //               </div>
// //               <div className="text-gray-600">
// //                 {event.participants} Participants
// //               </div>
// //             </div>
// //           )}
// //         </div>
        
// //         <p className="text-gray-600 text-sm line-clamp-3 mb-6">{event.description}</p>
        
// //         <div className="flex flex-col sm:flex-row gap-3">
// //           <a 
// //             href={`/events/details/${event.id}`}
// //             className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center"
// //           >
// //             {isCompleted ? 'View Summary' : 'View Details'}
// //           </a>
// //           {!isCompleted && (
// //             <button 
// //               onClick={() => handleJoinEvent(event.id)}
// //               className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center disabled:bg-blue-400 disabled:cursor-not-allowed"
// //               disabled={joinedEvents.includes(event.id)}
// //             >
// //               {joinedEvents.includes(event.id) ? 'Already Joined' : 'Join Event'}
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="w-full min-h-screen px-6 py-8 bg-gray-50">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl font-bold text-blue-600">Workshops & Events</h1>
// //         </div>

// //         {isLoading ? (
// //           <div className="flex justify-center items-center h-64">
// //             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
// //           </div>
// //         ) : (
// //           <div className="space-y-16">
// //             {/* Upcoming Events Section */}
// //             <section>
// //               <div className="flex items-center justify-between mb-8">
// //                 <h2 className="text-2xl font-semibold text-gray-800">
// //                   Upcoming Events
// //                 </h2>
// //                 <div className="text-blue-600">
// //                   {upcomingEvents.length} Events
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {upcomingEvents.map((event) => (
// //                   <EventCard key={event.id} event={event} />
// //                 ))}
// //               </div>
// //             </section>

// //             {/* Completed Events Section */}
// //             <section>
// //               <div className="flex items-center justify-between mb-8">
// //                 <h2 className="text-2xl font-semibold text-gray-800">
// //                   Completed Events
// //                 </h2>
// //                 <div className="text-blue-600">
// //                   {completedEvents.length} Events
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {completedEvents.map((event) => (
// //                   <EventCard key={event.id} event={event} isCompleted={true} />
// //                 ))}
// //               </div>
// //             </section>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default WorkshopEventsPage;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import workshop1 from "../assets/workshop1.jpg"
// import workshop2 from "../assets/workshop2.jpg"
// import up_work1 from "../assets/up_work1.png"
// import work1 from "../assets/work1.jpg"
// import work2 from "../assets/work2.jpg"
// import { getCompletedEvents, getUpcommingEvnts } from '../api/EventsApi';

// const WorkshopEventsPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [joinedEvents, setJoinedEvents] = useState([]);
//   const [upcommingEvent, setUpcommingEvent] = useState();
//   const [completedEvent, setCompletedEvent] = useState();

//   // Animation variants
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

//   const loadingVariants = {
//     animate: {
//       rotate: 360,
//       transition: {
//         duration: 1,
//         repeat: Infinity,
//         ease: "linear"
//       }
//     }
//   };

//   // Your existing event data...
//   const upcomingEvents = [
//     {
//       id: 1,
//       title: "Web Development Bootcamp",
//       date: "December 15, 2024",
//       time: "10:00 AM - 4:00 PM",
//       location: "Tech Hub, Downtown",
//       description: "Intensive one-day bootcamp covering HTML, CSS, and JavaScript basics. Join us for an immersive learning experience where you'll build real-world projects and learn from industry experts.",
//       image: up_work1
//     },
//     {
//       id: 2,
//       title: "Data Science Workshop",
//       date: "December 25, 2024",
//       time: "2:00 PM - 6:00 PM",
//       location: "Innovation Center",
//       description: "Learn the fundamentals of data analysis and machine learning. This workshop covers essential topics in data science, including statistical analysis, Python programming with pandas and numpy.",
//       image: work1
//     },
//     {
//       id: 3,
//       title: "UI/UX Design Principles",
//       date: "January 10, 2025",
//       time: "1:00 PM - 5:00 PM",
//       location: "Design Studio",
//       description: "Deep dive into modern design practices, user research methodologies, and creating effective user interfaces. Practical exercises and real-world case studies included.",
//       image: work2
//     }
//   ];

//   const completedEvents = [
//     {
//       id: 4,
//       title: "Mobile App Development",
//       date: "October 20, 2024",
//       time: "9:00 AM - 3:00 PM",
//       location: "Tech Campus",
//       description: "Comprehensive workshop on mobile app development. Learn to build cross-platform applications using React Native. Topics included app architecture and state management.",
//       image: workshop1,
//       participants: 45,
//       rating: 4.8
//     },
//     {
//       id: 5,
//       title: "Cloud Computing Workshop",
//       date: "September 15, 2024",
//       time: "10:00 AM - 4:00 PM",
//       location: "Virtual",
//       description: "Explored AWS and Azure services, covering deployment, scaling, and best practices for cloud architecture. Hands-on exercises with real cloud environments.",
//       image: workshop2,
//       participants: 60,
//       rating: 4.9
//     }
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);

//     const upcommingEventDetails = getUpcommingEvnts();
//     setUpcommingEvent(upcommingEventDetails)
//     const completedEvents = getCompletedEvents();
//     setCompletedEvent(completedEvents)
//     return () => clearTimeout(timer);
//   }, []);

//   const handleJoinEvent = (eventId) => {
//     if (!joinedEvents.includes(eventId)) {
//       setJoinedEvents([...joinedEvents, eventId]);
//       alert("You've successfully joined the event!");
//     } else {
//       alert("You've already joined this event.");
//     }
//   };

//   const EventCard = ({ event, isCompleted = false }) => (
//     <motion.div
//       variants={cardVariants}
//       className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//     >
//       <div className="relative h-48 overflow-hidden">
//         <motion.img 
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           src={event.image} 
//           alt={event.title} 
//           className="w-full h-full object-cover"
//         />
//         {isCompleted && (
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
//           >
//             Completed
//           </motion.div>
//         )}
//       </div>
      
//       <div className="p-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h2>
        
//         <div className="space-y-2 mb-4 text-sm text-gray-600">
//           <div className="flex items-center gap-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             <span>{event.date}</span>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>{event.time}</span>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span>{event.location}</span>
//           </div>

//           {isCompleted && (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100"
//             >
//               <div className="flex items-center gap-1">
//                 <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span className="text-gray-700">{event.rating}/5.0</span>
//               </div>
//               <div className="text-gray-600">
//                 {event.participants} Participants
//               </div>
//             </motion.div>
//           )}
//         </div>
        
//         <p className="text-gray-600 text-sm line-clamp-3 mb-6">{event.description}</p>
        
//         <div className="flex flex-col sm:flex-row gap-3">
//           <motion.a 
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             href={`/events/details/${event.id}`}
//             className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center"
//           >
//             {isCompleted ? 'View Summary' : 'View Details'}
//           </motion.a>
//           {!isCompleted && (
//             <motion.button 
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleJoinEvent(event.id)}
//               className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center disabled:bg-blue-400 disabled:cursor-not-allowed"
//               disabled={joinedEvents.includes(event.id)}
//             >
//               {joinedEvents.includes(event.id) ? 'Already Joined' : 'Join Event'}
//             </motion.button>
//           )}
//         </div>
//       </div>
//     </motion.div>
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
//               animate="animate"
//               variants={loadingVariants}
//               className="rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"
//             />
//           </div>
//         ) : (
//           <div className="space-y-16">
//             {/* Upcoming Events Section */}
//             <section>
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="flex items-center justify-between mb-8"
//               >
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Upcoming Events
//                 </h2>
//                 <div className="text-blue-600">
//                   {upcomingEvents.length} Events
//                 </div>
//               </motion.div>
//               <motion.div 
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
//               >
//                 {upcomingEvents.map((event) => (
//                   <EventCard key={event.id} event={event} />
//                 ))}
//               </motion.div>
//             </section>

//             {/* Completed Events Section */}
//             <section>
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="flex items-center justify-between mb-8"
//               >
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Completed Events
//                 </h2>
//                 <div className="text-blue-600">
//                   {completedEvents.length} Events
//                 </div>
//               </motion.div>
//               <motion.div 
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
//               >
//                 {completedEvents.map((event) => (
//                   <EventCard key={event.id} event={event} isCompleted={true} />
//                 ))}
//               </motion.div>
//             </section>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkshopEventsPage;



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUpcommingEvents, getCompletedEvents } from '../api/EventsApi';

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

        // Simulating API calls
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
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-4 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center"
          >
            {isCompleted ? 'View Summary' : 'View Details'}
          </motion.a>
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

