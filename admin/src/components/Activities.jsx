// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar, Clock, Users, Plus, BookOpen, Briefcase, Heart, Video } from 'lucide-react';
// import ActivityForm from './ActivityForm';
// import ActivityList from './ActivityList';
// import QuizForm from './QuizeForm';

// const fadeIn = {
//     initial: {
//         opacity: 0,
//     },
//     animate: {
//         opacity: 1,
//         transition: {
//             duration: 0.5,
//         },
//     },
//     exit: {
//         opacity: 0,
//         transition: {
//             duration: 0.5,
//         },
//     },
// };

// const slideIn = {
//     initial: {
//         y: 20,
//         opacity: 0,
//     },
//     animate: {
//         y: 0,
//         opacity: 1,
//         transition: {
//             duration: 0.5,
//         },
//     },
//     exit: {
//         y: 20,
//         opacity: 0,
//         transition: {
//             duration: 0.5,
//         },
//     },
// };


// export default function Activities() {
//     const [activities, setActivities] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [activityType, setActivityType] = useState('webinar');

//     useEffect(() => {
//         fetchActivities();
//     }, []);

//     const fetchActivities = async () => {
//         try {
//             const response = await fetch('http://localhost:4000/api/activities');
//             const data = await response.json();
//             setActivities(data);
//         } catch (error) {
//             console.error('Error fetching activities:', error);
//         }
//     };

//     const handleCreateActivity = async (formData) => {
//         try {
//             const response = await fetch('http://localhost:4000/api/activities', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 const newActivity = await response.json();
//                 setActivities([...activities, newActivity]);
//                 setShowForm(false);
//             } else {
//                 console.error('Failed to create activity');
//             }
//         } catch (error) {
//             console.error('Error creating activity:', error);
//         }
//     };

//     return (
//         <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
//             <motion.div className="bg-white shadow-lg rounded-lg overflow-hidden" variants={slideIn}>
//                 <div className="p-6">
//                     <div className="flex justify-between items-center mb-6">
//                         <motion.h2 className="text-2xl font-bold text-gray-800" variants={fadeIn}>Manage Activities</motion.h2>
//                         <motion.button
//                             onClick={() => setShowForm(true)}
//                             className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition duration-200"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Plus className="w-5 h-5 mr-2" />
//                             Add Activity
//                         </motion.button>
//                     </div>
//                     <AnimatePresence>
//                         {showForm && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: -20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                             >
//                                 {activityType === 'quiz' ? (
//                                     <QuizForm onSubmit={handleCreateActivity} onCancel={() => setShowForm(false)} />
//                                 ) : (
//                                     <ActivityForm
//                                         activityType={activityType}
//                                         setActivityType={setActivityType}
//                                         onSubmit={handleCreateActivity}
//                                         onCancel={() => setShowForm(false)}
//                                     />
//                                 )}
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                     <ActivityList activities={activities} />
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Plus, BookOpen, Briefcase, Heart, Video } from 'lucide-react';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';
import QuizForm from './QuizeForm';
import ActivityDetails from './ActivityDetails';

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};

const slideIn = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.5 } },
};

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [activityType, setActivityType] = useState('webinar');
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/activities');
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const reloadActivities = async () => {
        await fetchActivities();
    };

    const handleCreateActivity = async (formData) => {
        try {
            const response = await fetch('http://localhost:4000/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowForm(false);
                await reloadActivities();
            } else {
                console.error('Failed to create activity');
            }
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };

    const handleViewDetails = (activity) => {
        setSelectedActivity(activity);
    };

    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white shadow-lg rounded-lg overflow-hidden" variants={slideIn}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <motion.h2 className="text-2xl font-bold text-gray-800" variants={fadeIn}>Manage Activities</motion.h2>
                        <motion.button
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Activity
                        </motion.button>
                    </div>
                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                {activityType === 'quiz' ? (
                                    <QuizForm onSubmit={handleCreateActivity} onCancel={() => setShowForm(false)} />
                                ) : (
                                    <ActivityForm
                                        activityType={activityType}
                                        setActivityType={setActivityType}
                                        onSubmit={handleCreateActivity}
                                        onCancel={() => setShowForm(false)}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {selectedActivity ? (
                        <ActivityDetails activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
                    ) : (
                        <ActivityList activities={activities} onViewDetails={handleViewDetails} />
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

