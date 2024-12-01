import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, PlayCircle, Clock, BarChart, ChevronRight } from 'lucide-react';

const InteractiveContent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Web Development', 'Data Science', 'Mobile Development', 'DevOps', 'Design'];

    const roadmaps = [
        {
            id: 1,
            title: 'Become a Full-Stack Developer',
            description: 'Master front-end and back-end technologies to become a versatile full-stack developer.',
            category: 'Web Development',
            totalVideos: 50,
            totalDuration: '40h 30m',
            difficulty: 'Beginner to Advanced',
            image: 'https://via.placeholder.com/300x200.png?text=Full+Stack+Dev'
        },
        {
            id: 2,
            title: 'Data Science Career Path',
            description: 'Learn statistics, machine learning, and data visualization to start your data science career.',
            category: 'Data Science',
            totalVideos: 60,
            totalDuration: '55h 45m',
            difficulty: 'Intermediate',
            image: 'https://via.placeholder.com/300x200.png?text=Data+Science'
        },
        {
            id: 3,
            title: 'Mobile App Development Journey',
            description: 'Create cross-platform mobile apps using React Native and publish them to app stores.',
            category: 'Mobile Development',
            totalVideos: 45,
            totalDuration: '38h 20m',
            difficulty: 'Beginner to Intermediate',
            image: 'https://via.placeholder.com/300x200.png?text=Mobile+Dev'
        },
        {
            id: 4,
            title: 'DevOps Engineering Essentials',
            description: 'Learn the tools and practices for implementing DevOps in your organization.',
            category: 'DevOps',
            totalVideos: 55,
            totalDuration: '50h 15m',
            difficulty: 'Intermediate to Advanced',
            image: 'https://via.placeholder.com/300x200.png?text=DevOps'
        },
        {
            id: 5,
            title: 'UI/UX Design Mastery',
            description: 'Master the principles of user interface and user experience design for digital products.',
            category: 'Design',
            totalVideos: 40,
            totalDuration: '35h 30m',
            difficulty: 'Beginner to Advanced',
            image: 'https://via.placeholder.com/300x200.png?text=UI+UX+Design'
        },
    ];

    const filteredRoadmaps = roadmaps.filter(roadmap =>
        (selectedCategory === 'All' || roadmap.category === selectedCategory) &&
        roadmap.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Contents</h1>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="relative w-full md:w-96 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search roadmaps..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* Roadmaps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRoadmaps.map(roadmap => (
                        <motion.div
                            key={roadmap.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <img src={roadmap.image} alt={roadmap.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{roadmap.title}</h2>
                                <p className="text-gray-600 mb-4">{roadmap.description}</p>
                                <div className="flex items-center mb-4">
                                    <PlayCircle className="text-blue-500 mr-2" size={20} />
                                    <span className="text-sm font-medium">{roadmap.totalVideos} videos</span>
                                    <Clock className="text-blue-500 ml-4 mr-2" size={20} />
                                    <span className="text-sm font-medium">{roadmap.totalDuration}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <BarChart className="mr-2" size={16} />
                                    <span>{roadmap.difficulty}</span>
                                </div>
                                <motion.button
                                    className="w-full bg_primary_color text-white py-2 rounded-full font-medium flex items-center justify-center"
                                    whileHover={{ backgroundColor: '#3FA2F6' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Roadmap
                                    <ChevronRight className="ml-2" size={20} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredRoadmaps.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        No roadmaps found. Try adjusting your search or filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractiveContent;

