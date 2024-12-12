import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Briefcase, GraduationCap, Book, School, Building2, Users } from 'lucide-react';
import CustomTabs from '../ui/Tabs';
import CareerLibrary from './CareerLibrary';


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



const mockOpportunities = [
  {
    "Link": "https://internshala.com/internship/detail/data-science-internship",
    "Name": "Data Science Internship",
    "Field": "Data Science",
    "Category": "Internship",
    "Description": "Work on data analysis and machine learning projects."
  },
  {
    "Link": "https://www.naukri.com/job-listings-marketing-executive",
    "Name": "Marketing Executive",
    "Field": "Marketing",
    "Category": "Job",
    "Description": "Develop and implement marketing strategies."
  },
  {
    "Link": "https://internshala.com/internship/detail/software-developer-internship",
    "Name": "Software Developer Intern",
    "Field": "Software Development",
    "Category": "Internship",
    "Description": "Assist in developing and testing software applications."
  },
  {
    "Link": "https://internshala.com/internship/detail/hr-internship",
    "Name": "HR Internship",
    "Field": "Human Resources",
    "Category": "Internship",
    "Description": "Support HR functions and employee engagement activities."
  },
  {
    "Link": "https://www.naukri.com/job-listings-graphic-designer",
    "Name": "Graphic Designer",
    "Field": "Design",
    "Category": "Job",
    "Description": "Create visual content for digital platforms."
  },
  {
    "Link": "https://in.indeed.com/viewjob?jk=finance-analyst",
    "Name": "Finance Analyst",
    "Field": "Finance",
    "Category": "Job",
    "Description": "Analyze financial data and prepare reports."
  },
  {
    "Link": "https://internshala.com/internship/detail/content-writing-internship",
    "Name": "Content Writing Internship",
    "Field": "Content Writing",
    "Category": "Internship",
    "Description": "Write and edit content for blogs and websites."
  },
  {
    "Link": "https://www.naukri.com/job-listings-digital-marketing-specialist",
    "Name": "Digital Marketing Specialist",
    "Field": "Digital Marketing",
    "Category": "Job",
    "Description": "Manage digital marketing campaigns and SEO."
  },
  {
    "Link": "https://internshala.com/internship/detail/mechanical-engineering-internship",
    "Name": "Mechanical Engineering Internship",
    "Field": "Mechanical Engineering",
    "Category": "Internship",
    "Description": "Assist in mechanical design and development projects."
  },
  {
    "Link": "https://in.indeed.com/viewjob?jk=business-development-executive",
    "Name": "Business Development Executive",
    "Field": "Business Development",
    "Category": "Job",
    "Description": "Identify new business opportunities and partnerships."
  },
  {
    "Link": "https://internshala.com/internship/detail/web-development-internship",
    "Name": "Web Development Internship",
    "Field": "Web Development",
    "Category": "Internship",
    "Description": "Work on front-end and back-end web development projects."
  },
  {
    "Link": "https://www.naukri.com/job-listings-sales-manager",
    "Name": "Sales Manager",
    "Field": "Sales",
    "Category": "Job",
    "Description": "Lead sales teams and drive revenue growth."
  },
  {
    "Link": "https://internshala.com/internship/detail/ui-ux-design-internship",
    "Name": "UI/UX Design Internship",
    "Field": "UI/UX Design",
    "Category": "Internship",
    "Description": "Design user interfaces and improve user experience."
  },
  {
    "Link": "https://in.indeed.com/viewjob?jk=operations-manager",
    "Name": "Operations Manager",
    "Field": "Operations",
    "Category": "Job",
    "Description": "Oversee daily operations and improve efficiency."
  },
  {
    "Link": "https://internshala.com/internship/detail/electrical-engineering-internship",
    "Name": "Electrical Engineering Internship",
    "Field": "Electrical Engineering",
    "Category": "Internship",
    "Description": "Assist in electrical system design and testing."
  }
]

const OpportunityCards=()=> {

  const [ opportunities, setOpportunities ]= useState([]);

  useEffect(()=>{
    setOpportunities(mockOpportunities)
  },[]);


  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-2">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Opportunities
        </h1> */}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    opportunity.Category === 'Internship' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {opportunity.Category}
                  </span>
                  <span className="text-sm text-gray-500">{opportunity.Field}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {opportunity.Name}
                </h2>
                
                <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                  {opportunity.Description}
                </p>
                
                <motion.a
                  href={opportunity.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}


const mockScholarships = [
  {
    "state": "All India",
    "scheme": "National Scholarship Portal",
    "fromstartdate": "01-06-2023"
  },
  {
    "link": "https://scholarships.gov.in/",
    "state": "All India",
    "scheme": "Central Sector Scheme of Scholarships for College and University Students",
    "fromstartdate": "15-07-2023"
  },
  {
    "state": "All India",
    "scheme": "Post Matric Scholarship for SC/ST/OBC Students",
    "fromstartdate": "01-08-2023"
  },
  {
    "link": "https://scholarships.gov.in/",
    "state": "All India",
    "scheme": "Merit-cum-Means Scholarship for Professional and Technical Courses",
    "fromstartdate": "10-07-2023"
  },
  {
    "state": "All India",
    "scheme": "AICTE Pragati Scholarship for Girls",
    "fromstartdate": "05-06-2023"
  },
  {
    "link": "https://www.aicte-india.org/",
    "state": "All India",
    "scheme": "AICTE Saksham Scholarship for Differently Abled Students",
    "fromstartdate": "20-06-2023"
  },
  {
    "state": "All India",
    "scheme": "INSPIRE Scholarship for Higher Education",
    "fromstartdate": "01-07-2023"
  },
  {
    "link": "http://kvpy.iisc.ernet.in/",
    "state": "All India",
    "scheme": "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    "fromstartdate": "15-06-2023"
  },
  {
    "state": "All India",
    "scheme": "Maulana Azad National Fellowship for Minority Students",
    "fromstartdate": "01-09-2023"
  },
  {
    "link": "https://scholarships.gov.in/",
    "state": "All India",
    "scheme": "National Means-cum-Merit Scholarship",
    "fromstartdate": "01-08-2023"
  },
  {
    "state": "All India",
    "scheme": "Prime Minister's Scholarship Scheme for RPF/RPSF",
    "fromstartdate": "01-07-2023"
  },
  {
    "link": "https://www.ugc.ac.in/",
    "state": "All India",
    "scheme": "UGC NET JRF Scholarship",
    "fromstartdate": "01-06-2023"
  }
]

const ScholarshipCards=()=> {

  const [ scholarships, setScholarships ]= useState([]);

  useEffect(()=>{
    setScholarships(mockScholarships)
  },[]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-2">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Scholarship Opportunities
        </h1> */}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600">
                    {scholarship.state}
                  </span>
                  <span className="text-sm text-gray-500">
                    Start Date: {scholarship.fromstartdate}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {scholarship.scheme}
                </h2>
                
                <motion.div
                  className="mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {scholarship.link ? (
                    <a
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                      Apply Now
                    </a>
                  ) : (
                    <span className="inline-block w-full text-center bg-gray-300 text-gray-600 py-2 px-4 rounded-lg font-semibold cursor-not-allowed">
                      Application Link Not Available
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}



const mockEducationalResources = [
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=introduction-to-quantum-mechanics",
    "Name": "Introduction to Quantum Mechanics",
    "Field": "Physics",
    "Category": "Class VIII to XII",
    "Description": "A comprehensive guide to understanding the principles of quantum mechanics."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=advanced-algebra",
    "Name": "Advanced Algebra",
    "Field": "Mathematics",
    "Category": "Class VIII to XII",
    "Description": "Explores complex algebraic concepts suitable for high school students."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=world-history-overview",
    "Name": "World History Overview",
    "Field": "History",
    "Category": "Class VIII to XII",
    "Description": "An overview of major events and themes in world history."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=organic-chemistry-basics",
    "Name": "Organic Chemistry Basics",
    "Field": "Chemistry",
    "Category": "Class VIII to XII",
    "Description": "Introduction to the fundamental concepts of organic chemistry."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=principles-of-economics",
    "Name": "Principles of Economics",
    "Field": "Economics",
    "Category": "Class VIII to XII",
    "Description": "Covers basic economic principles and theories."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=introduction-to-programming",
    "Name": "Introduction to Programming",
    "Field": "Computer Science",
    "Category": "Class VIII to XII",
    "Description": "A beginner's guide to programming concepts and languages."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=human-anatomy-and-physiology",
    "Name": "Human Anatomy and Physiology",
    "Field": "Biology",
    "Category": "Class VIII to XII",
    "Description": "Detailed study of human body systems and functions."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=environmental-science-fundamentals",
    "Name": "Environmental Science Fundamentals",
    "Field": "Environmental Science",
    "Category": "Class VIII to XII",
    "Description": "Basic concepts and issues in environmental science."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=english-literature-classics",
    "Name": "English Literature Classics",
    "Field": "English Literature",
    "Category": "Class VIII to XII",
    "Description": "Study of classic works in English literature."
  },
  {
    "Link": "https://ndl.iitkgp.ac.in/se_search?key=basic-geometry-concepts",
    "Name": "Basic Geometry Concepts",
    "Field": "Mathematics",
    "Category": "Class VIII to XII",
    "Description": "Introduction to basic geometric shapes and theorems."
  }
]

const EducationalResourceCards=()=> {

  const [ resources, setResources ]= useState([]);

  useEffect(()=>{
    setResources(mockEducationalResources)
  },[]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-2">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Educational Resources
        </h1> */}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600">
                    {resource.Field}
                  </span>
                  <span className="text-sm text-gray-500">
                    {resource.Category}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {resource.Name}
                </h2>
                
                <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                  {resource.Description}
                </p>
                
                <motion.a
                  href={resource.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Resource
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}




const Resources = () => {
  const [userType, setUserType] = useState("student")
  const [activeTab, setActiveTab] = useState("CareerLibrary")



  const tabs = [
    { label: 'Career Library', content: 'CareerLibrary' },
    { label: 'Opportunities', content: 'opportunities' },
    { label: 'Scholarships', content: 'Scholarships' },
  ]

  const handleTabChange = (index) => {
    setActiveTab(tabs[index].content)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Discover Your Path with Our Resources</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <CustomTabs tabs={tabs} onTabChange={handleTabChange} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'CareerLibrary' && (
                <div className=" gap-6">
                  
                    <EducationalResourceCards/>
                  
                </div>
              )}

              {activeTab === 'opportunities' && (
                <div className="space-y-8">
                  {/* <div className="flex flex-wrap gap-4">
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
                  </div> */}
                  <div className="">
                    <OpportunityCards/>
                  </div>
                </div>
              )}

              {activeTab === 'Scholarships' && (
                <div className="space-y-8">
                  {/* <SearchBar placeholder="Search case studies..." /> */}
                  <div className="gap-6">
                    <ScholarshipCards/>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default Resources


  


