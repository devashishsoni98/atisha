// import React from 'react';
// import { motion } from 'framer-motion';
// import { Video, BookOpen, Briefcase } from 'lucide-react';

// const slideIn = {
//     initial: { y: 20, opacity: 0 },
//     animate: { y: 0, opacity: 1 },
//     exit: { y: -20, opacity: 0 }
// };

// const ActivityList = ({ activities }) => {
//     return (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {activities.map((activity) => (
//                 <motion.div
//                     key={activity.id}
//                     className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-200"
//                     variants={slideIn}
//                 >
//                     <div className="p-5">
//                         <div className="flex items-center">
//                             {activity.type === 'webinar' && <Video className="h-8 w-8 text-indigo-600" />}
//                             {activity.type === 'quiz' && <BookOpen className="h-8 w-8 text-indigo-600" />}
//                             {activity.type === 'workshop' && <Briefcase className="h-8 w-8 text-indigo-600" />}
//                             <div className="ml-5 w-0 flex-1">
//                                 <h3 className="text-lg font-medium text-gray-900 truncate">{activity.title}</h3>
//                                 <p className="text-sm text-gray-500">{activity.type}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="bg-gray-50 px-5 py-3">
//                         <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                             View details
//                         </a>
//                     </div>
//                 </motion.div>
//             ))}
//         </div>
//     );
// };

// export default ActivityList;


import React from 'react';
import { motion } from 'framer-motion';
import { Video, BookOpen, Briefcase } from 'lucide-react';

const slideIn = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
};

const ActivityList = ({ activities, onViewDetails }) => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
                <motion.div
                    key={activity.id}
                    className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-200"
                    variants={slideIn}
                >
                    <div className="p-5">
                        <div className="flex items-center">
                            {activity.type === 'webinar' && <Video className="h-8 w-8 text-indigo-600" />}
                            {activity.type === 'quiz' && <BookOpen className="h-8 w-8 text-indigo-600" />}
                            {activity.type === 'workshop' && <Briefcase className="h-8 w-8 text-indigo-600" />}
                            <div className="ml-5 w-0 flex-1">
                                <h3 className="text-lg font-medium text-gray-900 truncate">{activity.title}</h3>
                                <p className="text-sm text-gray-500">{activity.type}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <button
                            onClick={() => onViewDetails(activity)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            View details
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ActivityList;

