import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Briefcase, GraduationCap, Book, School, Building2, Users } from 'lucide-react';

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
      active 
        ? 'bg-blue-500 text-white shadow-lg' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
    }`}
    onClick={onClick}
  >
    <Icon className="w-4 h-4" />
    {label}
  </motion.button>
);

const KnowledgeBaseItem = ({ title, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-center">{title}</h3>
  </motion.div>
);

const OpportunityCard = ({ title, type, location, deadline }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm p-6"
  >
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2 mb-3">
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{type}</span>
      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        {location}
      </span>
    </div>
    <p className="text-sm text-gray-500 flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      Deadline: {deadline}
    </p>
  </motion.div>
);

const CaseStudyCard = ({ title, field, summary }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm p-6"
  >
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{field}</span>
    <p className="text-sm text-gray-700 mt-3 leading-relaxed">{summary}</p>
  </motion.div>
);

const SearchBar = ({ placeholder }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative"
  >
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
    />
  </motion.div>
);

const Resources = () => {
    const [userType, setUserType] = useState("student");
    const [activeTab, setActiveTab] = useState("knowledge-base");
  
    const knowledgeBaseItems = [
      { title: "STEM Careers", icon: "🔬" },
      { title: "Management Roles", icon: "📊" },
      { title: "Design Fields", icon: "🎨" },
      { title: "Healthcare Professions", icon: "🏥" },
      { title: "Tech Industry", icon: "💻" },
      { title: "Creative Arts", icon: "🎭" },
    ];
  
    const opportunities = [
      { title: "Summer Internship at Tech Co", type: "Internship", location: "San Francisco, CA", deadline: "2023-05-15" },
      { title: "Marketing Intern", type: "Internship", location: "New York, NY", deadline: "2023-06-01" },
    ];
  
    const caseStudies = [
      { title: "From Intern to CEO", field: "Software Engineering", summary: "How Jane Doe climbed the corporate ladder in the tech industry." },
      { title: "Revolutionizing Robotics", field: "Mechanical Engineering", summary: "The journey of creating cutting-edge robotics for manufacturing." },
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8">Discover Your Path with Our Resources</h1>
            {/* User Type Tabs (Commented out for now) */}
          </div>
        </header>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div className="flex gap-4 flex-wrap">
              {['knowledge-base', 'opportunities', 'case-studies'].map((tab) => (
                <TabButton
                  key={tab}
                  active={activeTab === tab}
                  icon={tab === 'knowledge-base' ? Book : tab === 'opportunities' ? Briefcase : GraduationCap}
                  label={tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </div>
  
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'knowledge-base' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {knowledgeBaseItems.map((item, index) => (
                    <KnowledgeBaseItem key={index} {...item} />
                  ))}
                </div>
              )}
  
              {activeTab === 'opportunities' && (
                <div className="space-y-8">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-grow">
                      <SearchBar placeholder="Search opportunities..." />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-3 bg-white rounded-xl flex items-center gap-2 hover:bg-gray-50 border border-gray-200"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opportunities.map((opportunity, index) => (
                      <OpportunityCard key={index} {...opportunity} />
                    ))}
                  </div>
                </div>
              )}
  
              {activeTab === 'case-studies' && (
                <div className="space-y-8">
                  <SearchBar placeholder="Search case studies..." />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudies.map((caseStudy, index) => (
                      <CaseStudyCard key={index} {...caseStudy} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    );
  };
  
  export default Resources;


