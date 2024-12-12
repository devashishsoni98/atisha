// // import React, { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { Search, Filter, ChevronDown, PlayCircle, Clock, BarChart, ChevronRight } from 'lucide-react';
// //
// // const InteractiveContent = () => {
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [selectedCategory, setSelectedCategory] = useState('All');
// //
// //     const categories = ['All', 'Web Development', 'Data Science', 'Mobile Development', 'DevOps', 'Design'];
// //
// //     const roadmaps = [
// //         {
// //             id: 1,
// //             title: 'Become a Full-Stack Developer',
// //             description: 'Master front-end and back-end technologies to become a versatile full-stack developer.',
// //             category: 'Web Development',
// //             totalVideos: 50,
// //             totalDuration: '40h 30m',
// //             difficulty: 'Beginner to Advanced',
// //             image: 'https://via.placeholder.com/300x200.png?text=Full+Stack+Dev'
// //         },
// //         {
// //             id: 2,
// //             title: 'Data Science Career Path',
// //             description: 'Learn statistics, machine learning, and data visualization to start your data science career.',
// //             category: 'Data Science',
// //             totalVideos: 60,
// //             totalDuration: '55h 45m',
// //             difficulty: 'Intermediate',
// //             image: 'https://via.placeholder.com/300x200.png?text=Data+Science'
// //         },
// //         {
// //             id: 3,
// //             title: 'Mobile App Development Journey',
// //             description: 'Create cross-platform mobile apps using React Native and publish them to app stores.',
// //             category: 'Mobile Development',
// //             totalVideos: 45,
// //             totalDuration: '38h 20m',
// //             difficulty: 'Beginner to Intermediate',
// //             image: 'https://via.placeholder.com/300x200.png?text=Mobile+Dev'
// //         },
// //         {
// //             id: 4,
// //             title: 'DevOps Engineering Essentials',
// //             description: 'Learn the tools and practices for implementing DevOps in your organization.',
// //             category: 'DevOps',
// //             totalVideos: 55,
// //             totalDuration: '50h 15m',
// //             difficulty: 'Intermediate to Advanced',
// //             image: 'https://via.placeholder.com/300x200.png?text=DevOps'
// //         },
// //         {
// //             id: 5,
// //             title: 'UI/UX Design Mastery',
// //             description: 'Master the principles of user interface and user experience design for digital products.',
// //             category: 'Design',
// //             totalVideos: 40,
// //             totalDuration: '35h 30m',
// //             difficulty: 'Beginner to Advanced',
// //             image: 'https://via.placeholder.com/300x200.png?text=UI+UX+Design'
// //         },
// //     ];
// //
// //     const filteredRoadmaps = roadmaps.filter(roadmap =>
// //         (selectedCategory === 'All' || roadmap.category === selectedCategory) &&
// //         roadmap.title.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //
// //     return (
// //         <div className="min-h-screen bg-gray-50 py-8">
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                 <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Contents</h1>
// //
// //                 {/* Search and Filter */}
// //                 <div className="flex flex-col md:flex-row justify-between items-center mb-8">
// //                     <div className="relative w-full md:w-96 mb-4 md:mb-0">
// //                         <input
// //                             type="text"
// //                             placeholder="Search roadmaps..."
// //                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             value={searchTerm}
// //                             onChange={(e) => setSearchTerm(e.target.value)}
// //                         />
// //                         <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
// //                     </div>
// //                     <div className="relative">
// //                         <select
// //                             className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             value={selectedCategory}
// //                             onChange={(e) => setSelectedCategory(e.target.value)}
// //                         >
// //                             {categories.map(category => (
// //                                 <option key={category} value={category}>{category}</option>
// //                             ))}
// //                         </select>
// //                         <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
// //                     </div>
// //                 </div>
// //
// //                 {/* Roadmaps Grid */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {filteredRoadmaps.map(roadmap => (
// //                         <motion.div
// //                             key={roadmap.id}
// //                             className="bg-white rounded-lg shadow-md overflow-hidden"
// //                             whileHover={{ y: -5, transition: { duration: 0.2 } }}
// //                         >
// //                             <img src={roadmap.image} alt={roadmap.title} className="w-full h-48 object-cover" />
// //                             <div className="p-6">
// //                                 <h2 className="text-xl font-semibold mb-2">{roadmap.title}</h2>
// //                                 <p className="text-gray-600 mb-4">{roadmap.description}</p>
// //                                 <div className="flex items-center mb-4">
// //                                     <PlayCircle className="text-blue-500 mr-2" size={20} />
// //                                     <span className="text-sm font-medium">{roadmap.totalVideos} videos</span>
// //                                     <Clock className="text-blue-500 ml-4 mr-2" size={20} />
// //                                     <span className="text-sm font-medium">{roadmap.totalDuration}</span>
// //                                 </div>
// //                                 <div className="flex items-center text-sm text-gray-500 mb-4">
// //                                     <BarChart className="mr-2" size={16} />
// //                                     <span>{roadmap.difficulty}</span>
// //                                 </div>
// //                                 <motion.button
// //                                     className="w-full bg_primary_color text-white py-2 rounded-full font-medium flex items-center justify-center"
// //                                     whileHover={{ backgroundColor: '#3FA2F6' }}
// //                                     whileTap={{ scale: 0.95 }}
// //                                 >
// //                                     Start Roadmap
// //                                     <ChevronRight className="ml-2" size={20} />
// //                                 </motion.button>
// //                             </div>
// //                         </motion.div>
// //                     ))}
// //                 </div>
// //
// //                 {filteredRoadmaps.length === 0 && (
// //                     <div className="text-center text-gray-500 mt-8">
// //                         No roadmaps found. Try adjusting your search or filter.
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default InteractiveContent;
// //



// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, PlayCircle, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import MultiGameApp from '../components/TypingSpeedTest';

// const InteractiveContents = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedVideo, setSelectedVideo] = useState(null);

//     const roadmaps = [
//         { topic: 'National Education Policy', link: 'https://youtu.be/r6AOu-T2yFY' },
//         { topic: 'Level 1', link: 'https://youtu.be/YPZlsVxhjUk?si=FbeJQDL081AgGbo0' },
//         { topic: 'Level 2', link: 'https://youtu.be/wc-RSgSBdSc?si=jvjyoxVTkSExGWCs' },
//         { topic: 'Level 3', link: 'https://youtu.be/MQsbdgvCB-E?si=_pBOCkghVD7TZbJM' },
//     ];

//     const filteredVideos = roadmaps.filter(video =>
//         video.topic.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const openVideoDialog = (video) => {
//         setSelectedVideo(video);
//     };

//     const closeVideoDialog = () => {
//         setSelectedVideo(null);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 py-8">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Contents</h1>

//                 <div className="mb-6">
//                     <div className="relative max-w-md ">
//                         <input
//                             type="text"
//                             placeholder="Search videos..."
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4">
//                     {filteredVideos.map((video, index) => (
//                         <motion.div
//                             key={index}
//                             className="bg-white border border-gray-200 p-4"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-medium text-gray-900">{video.topic}</h3>
//                                 <a
//                                     className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
//                                     // whileHover={{ backgroundColor: '#3B82F6' }}
//                                     // whileTap={{ scale: 0.95 }}
//                                     // onClick={() => openVideoDialog(video)}
//                                     href={video.link}
//                                     target="_blank"
//                                 >

//                                     <PlayCircle size={20} />
//                                     <span>Play</span>
//                                 </a>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {filteredVideos.length === 0 && (
//                     <div className="text-center text-gray-500 mt-8">
//                         No videos found. Try adjusting your search.
//                     </div>
//                 )}
//             </div>

//             <AnimatePresence>
//                 {selectedVideo && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//                         onClick={closeVideoDialog}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9 }}
//                             animate={{ scale: 1 }}
//                             exit={{ scale: 0.9 }}
//                             className="bg-white rounded-lg p-4 max-w-3xl w-full"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="text-xl font-semibold">{selectedVideo.topic}</h3>
//                                 <button
//                                     onClick={closeVideoDialog}
//                                     className="text-gray-500 hover:text-gray-700"
//                                     aria-label="Close video"
//                                 >
//                                     <X size={24} />
//                                 </button>
//                             </div>
//                             <div className="relative pb-[56.25%] h-0">
//                                 <iframe
//                                     src={selectedVideo.link}
//                                     title={selectedVideo.topic}
//                                     className="absolute top-0 left-0 w-full h-full"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 ></iframe>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//             <div className='mt-16'>
//                 <MultiGameApp/>
//             </div>
//         </div>
//     );
// };

// export default InteractiveContents;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PlayCircle, ExternalLink, X } from 'lucide-react';
import MultiGameApp from '../components/TypingSpeedTest';

const roadmaps = [
  { 
    topic: 'National Education Policy', 
    link: 'https://youtu.be/r6AOu-T2yFY',
    description: 'An overview of the National Education Policy and its impact on the education system.'
  },
  { 
    topic: 'Level 1: Introduction to Programming', 
    link: 'https://youtu.be/YPZlsVxhjUk?si=FbeJQDL081AgGbo0',
    description: 'Basic concepts of programming for beginners.'
  },
  { 
    topic: 'Level 2: Intermediate Programming Concepts', 
    link: 'https://youtu.be/wc-RSgSBdSc?si=jvjyoxVTkSExGWCs',
    description: 'Advanced programming techniques and data structures.'
  },
  { 
    topic: 'Level 3: Advanced Software Development', 
    link: 'https://youtu.be/MQsbdgvCB-E?si=_pBOCkghVD7TZbJM',
    description: 'Complex algorithms, system design, and software architecture.'
  },
];

const InteractiveContents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = roadmaps.filter(video =>
    video.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openVideoDialog = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoDialog = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Video Contents</h1>

        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredVideos.map((video, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.topic}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => openVideoDialog(video)}
                  >
                    <PlayCircle className="mr-2 h-5 w-5 text-gray-400" />
                    Preview
                  </button>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Watch Full Video
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No videos found. Try adjusting your search.
          </div>
        )}
      </div>

      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
          onClick={closeVideoDialog}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-3xl w-full" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedVideo.topic}</h3>
              <button
                onClick={closeVideoDialog}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={selectedVideo.link}
                title={selectedVideo.topic}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      <div className='mt-16'>
        <MultiGameApp/>
      </div>
    </div>
  );
};

export default InteractiveContents;

