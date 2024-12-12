import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, BookOpen, Briefcase, Heart } from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

const slideIn = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
};

export default function Activities() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch activities from API
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/activities');
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
            <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden" variants={slideIn}>
                <div className="p-8">
                    <motion.h1 className="text-3xl font-bold text-gray-800 mb-6" variants={fadeIn}>Activities</motion.h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {activities.map((activity) => (
                            <motion.div
                                key={activity.id}
                                className="bg-white overflow-hidden shadow rounded-lg"
                                variants={slideIn}
                            >
                                <div className="p-5">
                                    <div className="flex items-center">
                                        {activity.type === 'webinar' && <Video className="h-8 w-8 text-blue-600" />}
                                        {activity.type === 'quiz' && <BookOpen className="h-8 w-8 text-blue-600" />}
                                        {activity.type === 'workshop' && <Briefcase className="h-8 w-8 text-blue-600" />}
                                        {activity.type === 'physical' && <Heart className="h-8 w-8 text-blue-600" />}
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">{activity.title}</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">{activity.type}</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3">
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            View details
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

