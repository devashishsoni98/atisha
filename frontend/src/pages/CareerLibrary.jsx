    // import React, { useEffect, useState } from 'react';
    // import { motion } from 'framer-motion';
    // import { Search, Filter, ChevronDown, Book, Users, Briefcase, ChevronRight, GraduationCap } from 'lucide-react';
    // import axios from 'axios'

    // const CareerLibrary = () => {
    //     const [searchTerm, setSearchTerm] = useState('');
    //     const [selectedCategory, setSelectedCategory] = useState('All');
    //     const [careerResources, setCareerResources] = useState([])

        
    //     useEffect(() => {
    //         const fetchResources = async () => {
    //             try {
    //                 const response = await axios.post("https://boring-hopper-great.lemme.cloud/api/4dbd3cb5-1f94-4e6d-8da9-39778c1e83ea", {
    //                     message: "I want to scrape all components and study material on the website: https://ndl.iitkgp.ac.in/se_browse/educationalLevel. The navbar contains categories such as 'Class V,' 'Class VI,' 'Class VII,' etc. For each category, extract at least 10 entries, and for each entry, provide the following details:\n1. Name: Name of the component/item.\n2. Category: The category it belongs to.\n3. Field: Relevant field or subject (e.g., Physics, Mathematics, General Knowledge).\n4. Description: A brief description of the item or component.\n5. Link: Direct URL to the item. Ensure all links are absolute URLs (resolve any relative links using this kind of url example https://ndl.iitkgp.ac.in/se_search?key=introduction-to-quantum-mechanics."
    //                 });
    //                 console.log(response.data);
    //             } catch (error) {
    //                 console.error("Error fetching resources:", error);
    //             }
    //         };
        
    //         fetchResources();
    //     }, []);

    //     const categories = ['All', 'Software Engineering', 'Data Science', 'Product Management', 'UX Design', 'Marketing'];

        
    //     const Resources = [
    //         {
    //             id: 1,
    //             title: 'Software Engineering Career Guide',
    //             description: 'Comprehensive guide covering various roles, skills, and career paths in software engineering.',
    //             category: 'Software Engineering',
    //             type: 'E-Book',
    //             readers: 15000,
    //             level: 'All Levels',
    //             image: 'https://via.placeholder.com/300x200.png?text=Software+Engineering'
    //         },
    //         {
    //             id: 2,
    //             title: 'Data Science: From Junior to Senior',
    //             description: 'Learn how to progress in your data science career, from entry-level positions to senior roles.',
    //             category: 'Data Science',
    //             type: 'Course',
    //             readers: 8500,
    //             level: 'Intermediate',
    //             image: 'https://via.placeholder.com/300x200.png?text=Data+Science+Career'
    //         },
    //         {
    //             id: 3,
    //             title: 'Product Management Essentials',
    //             description: 'Master the core skills and methodologies required to excel as a product manager in tech.',
    //             category: 'Product Management',
    //             type: 'Workshop Series',
    //             readers: 12000,
    //             level: 'Beginner to Intermediate',
    //             image: 'https://via.placeholder.com/300x200.png?text=Product+Management'
    //         },
    //         {
    //             id: 4,
    //             title: 'UX Design Portfolio Masterclass',
    //             description: 'Create a standout UX design portfolio that will impress employers and clients.',
    //             category: 'UX Design',
    //             type: 'Video Course',
    //             readers: 6800,
    //             level: 'Intermediate to Advanced',
    //             image: 'https://via.placeholder.com/300x200.png?text=UX+Design+Portfolio'
    //         },
    //         {
    //             id: 5,
    //             title: 'Digital Marketing Career Roadmap',
    //             description: 'Explore various digital marketing specializations and plan your career progression.',
    //             category: 'Marketing',
    //             type: 'Interactive Guide',
    //             readers: 9200,
    //             level: 'All Levels',
    //             image: 'https://via.placeholder.com/300x200.png?text=Digital+Marketing'
    //         },
    //     ];

    //     const filteredResources = careerResources.filter(resource =>
    //         (selectedCategory === 'All' || resource.category === selectedCategory) &&
    //         resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );

    //     return (
    //         <div className="min-h-screen bg-gray-50 py-8">
    //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //                 <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Library</h1>

    //                 {/* Search and Filter */}
    //                 <div className="flex flex-col md:flex-row justify-between items-center mb-8">
    //                     <div className="relative w-full md:w-96 mb-4 md:mb-0">
    //                         <input
    //                             type="text"
    //                             placeholder="Search career resources..."
    //                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                             value={searchTerm}
    //                             onChange={(e) => setSearchTerm(e.target.value)}
    //                         />
    //                         <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
    //                     </div>
    //                     <div className="relative">
    //                         <select
    //                             className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                             value={selectedCategory}
    //                             onChange={(e) => setSelectedCategory(e.target.value)}
    //                         >
    //                             {categories.map(category => (
    //                                 <option key={category} value={category}>{category}</option>
    //                             ))}
    //                         </select>
    //                         <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
    //                     </div>
    //                 </div>

    //                 {/* Career Resources Grid */}
    //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //                     {filteredResources.map(resource => (
    //                         <motion.div
    //                             key={resource.id}
    //                             className="bg-white rounded-lg shadow-md overflow-hidden"
    //                             whileHover={{ y: -5, transition: { duration: 0.2 } }}
    //                         >
    //                             <img src={resource.image} alt={resource.title} className="w-full h-48 object-cover" />
    //                             <div className="p-6">
    //                                 <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
    //                                 <p className="text-gray-600 mb-4">{resource.description}</p>
    //                                 <div className="flex items-center mb-4">
    //                                     <Book className="text-blue-500 mr-2" size={20} />
    //                                     <span className="text-sm font-medium">{resource.type}</span>
    //                                     <Users className="text-blue-500 ml-4 mr-2" size={20} />
    //                                     <span className="text-sm font-medium">{resource.readers} readers</span>
    //                                 </div>
    //                                 <div className="flex items-center text-sm text-gray-500 mb-4">
    //                                     <GraduationCap className="mr-2" size={16} />
    //                                     <span>{resource.level}</span>
    //                                 </div>
    //                                 <motion.button
    //                                     className="w-full bg-blue-500 text-white py-2 rounded-full font-medium flex items-center justify-center"
    //                                     whileHover={{ backgroundColor: '#3B82F6' }}
    //                                     whileTap={{ scale: 0.95 }}
    //                                 >
    //                                     Access Resource
    //                                     <ChevronRight className="ml-2" size={20} />
    //                                 </motion.button>
    //                             </div>
    //                         </motion.div>
    //                     ))}
    //                 </div>

    //                 {filteredResources.length === 0 && (
    //                     <div className="text-center text-gray-500 mt-8">
    //                         No career resources found. Try adjusting your search or filter.
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // };

    // export default CareerLibrary;


    import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Book, Users, Briefcase, ChevronRight, GraduationCap } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CareerLibrary = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [careerResources, setCareerResources] = useState([]);

    // useEffect(() => {
    //     const fetchResources = async () => {
    //         try {
    //             const responses = await axios.post("https://gallant-antonelli-beautiful.lemme.cloud/api/cbd5c479-8093-460f-9904-f3ab66423f6a", {
                    
    //                     message: "Find scholarships in India that are available across the internet for students"
                    
    //             });
    //             console.log(responses.data);
                
    //             const response = await axios.post("https://wizardly-goldwasser-eloquent.lemme.cloud/api/6d24d0df-6d60-445c-8522-9fd043d8be26", {
    //                 message: "I want to scrape all components and study material on the website: https://ndl.iitkgp.ac.in/se_browse/educationalLevel. The navbar contains categories such as 'Class V,' 'Class VI,' 'Class VII,' etc. For each category, extract at least 10 entries, and for each entry, provide the following details:\n1. Name: Name of the component/item.\n2. Category: The category it belongs to.\n3. Field: Relevant field or subject (e.g., Physics, Mathematics, General Knowledge).\n4. Description: A brief description of the item or component.\n5. Link: Direct URL to the item. Ensure all links are absolute URLs (resolve any relative links using the this kind of url example https://ndl.iitkgp.ac.in/se_search?key=introduction-to-quantum-mechanics.\n\n Ensure the results are well-organized, categorized, and contain accurate details about each item."
    //             });
    //             setCareerResources(response.data.res.entries);
    //         } catch (error) {
    //             console.error("Error fetching resources:", error);
    //         }
    //     };

    //     fetchResources();
    // }, []);

    const categories = ['All', ...new Set(careerResources.map(resource => resource.Category))];

    const filteredResources = careerResources.filter(resource =>
        (selectedCategory === 'All' || resource.Category === selectedCategory) &&
        resource.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Library</h1>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="relative w-full md:w-96 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search career resources..."
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

                {/* Career Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map(resource => (
                        <motion.div
                            key={resource.Link}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <img src={`https://via.placeholder.com/300x200.png?text=${encodeURIComponent(resource.Field)}`} alt={resource.Name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{resource.Name}</h2>
                                <p className="text-gray-600 mb-4">{resource.Description}</p>
                                <div className="flex items-center mb-4">
                                    <Book className="text-blue-500 mr-2" size={20} />
                                    <span className="text-sm font-medium">{resource.Field}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <GraduationCap className="mr-2" size={16} />
                                    <span>{resource.Category}</span>
                                </div>
                                <a href={`${(resource.Link)}`} target='_blank' >
                                    <motion.button
                                        className="w-full bg-blue-500 text-white py-2 rounded-full font-medium flex items-center justify-center"
                                        whileHover={{ backgroundColor: '#3B82F6' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Access Resource
                                        <ChevronRight className="ml-2" size={20} />
                                    </motion.button>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        No career resources found. Try adjusting your search or filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerLibrary;



const ResourcePage = () => {
    const { resourceLink } = useParams();
    const decodedLink = decodeURIComponent(resourceLink);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Resource Details</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Redirecting to Resource</h2>
                    <p className="text-gray-600 mb-4">
                        You are being redirected to the following resource:
                    </p>
                    <a
                        href={decodedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {decodedLink}
                    </a>
                    <p className="mt-4 text-gray-600">
                        If you are not redirected automatically, please click the link above.
                    </p>
                </div>
            </div>
        </div>
    );
};
