import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, ThumbsUp, ThumbsDown, Users, Book, ArrowRight, Briefcase, GraduationCap, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock API function
const fetchCareerData = async () => {
  // Simulating API call with setTimeout
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    career: "Gym Trainer",
    career_id: 46,
    description: "A Gym Trainer is a fitness professional who helps clients achieve their health and fitness goals through personalized exercise programs and nutritional advice. They work in gyms, fitness centers, or as independent contractors, guiding individuals or groups through workouts, demonstrating proper form, and motivating clients to push their limits safely.",
    cons: [
      "Limited earning potential compared to other healthcare professions.",
      "Physically demanding, may involve long hours of standing and assisting clients.",
      "Often requires additional certifications and continuing education to stay up-to-date.",
      "Can be emotionally draining, dealing with clients' fitness struggles and setbacks.",
      "Job security is influenced by factors such as economic conditions and gym closures."
    ],
    pros: [
      "Health and fitness-oriented lifestyle, involving regular physical activity and healthy eating habits.",
      "Flexible work hours that often accommodate personal schedules and allow for a work-life balance.",
      "Opportunity to positively impact and empower clients, helping them achieve their fitness goals.",
      "Potential for financial rewards based on experience, certifications, and clientele base.",
      "Continuous professional development opportunities through workshops, seminars, and certifications."
    ],
    related_careers: [
      "Fitness Instructor",
      "Personal Trainer",
      "Physical Therapist",
      "Athletic Coach",
      "Nutritionist"
    ],
    salary: {
      min_salary: 420000,
      max_salary: 1100000,
      median_salary: 650000,
      currency: "INR",
      period: "YEAR"
    },
    skills: [
      "Exercise Science",
      "Physical Education",
      "Nutrition",
      "Motivation",
      "Safety",
      "Communication",
      "Anatomy",
      "Kinesiology"
    ],
    job_outlook: {
      growth_rate: 15,
      description: "The job outlook for Gym Trainers is positive, with an expected growth rate of 15% over the next decade, which is much faster than the average for all occupations."
    },
    education: {
      minimum: "High School Diploma",
      recommended: "Bachelor's degree in Exercise Science or related field",
      certifications: [
        "Certified Personal Trainer (CPT)",
        "Certified Strength and Conditioning Specialist (CSCS)",
        "Group Fitness Instructor Certification"
      ]
    },
    work_environment: {
      settings: ["Gyms", "Fitness Centers", "Private Studios", "Clients' Homes"],
      physical_demands: "High",
      work_schedule: "Flexible, including evenings and weekends"
    },
    career_progression: [
      "Entry-level Gym Trainer",
      "Senior Gym Trainer",
      "Specialized Trainer (e.g., Sports Performance, Rehabilitation)",
      "Fitness Manager",
      "Gym Owner or Entrepreneur"
    ],
    industry_trends: [
      "Increasing demand for online and virtual training sessions",
      "Growing focus on holistic wellness and mind-body connection",
      "Rise of boutique fitness studios and specialized training programs",
      "Integration of technology and wearable devices in fitness tracking"
    ]
  };
};

const GymTrainerCareer = () => {
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [salaryType, setSalaryType] = useState('monthly');

  useEffect(() => {
    const loadCareerData = async () => {
      try {
        setLoading(true);
        const data = await fetchCareerData();
        setCareerData(data);
      } catch (err) {
        setError("Failed to fetch career data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCareerData();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const tabVariants = {
    active: { backgroundColor: "#4F46E5", color: "white" },
    inactive: { backgroundColor: "#E5E7EB", color: "#374151" }
  };

  const formatSalary = (amount, type = 'yearly') => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
    
    if (type === 'monthly') {
      amount = Math.round(amount / 12);
    }
    
    return formatter.format(amount);
  };

  const renderProsAndCons = () => (
    <motion.div
      key="pros&cons"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
            <ThumbsUp className="mr-2" /> Pros
          </h3>
          <ul className="space-y-2">
            {careerData.pros.map((pro, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-green-500 mr-2">✓</span>
                {pro}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
            <ThumbsDown className="mr-2" /> Cons
          </h3>
          <ul className="space-y-2">
            {careerData.cons.map((con, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-red-500 mr-2">✗</span>
                {con}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  const renderSkills = () => (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {careerData.skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-indigo-100 rounded-lg p-3 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-indigo-800 font-medium">{skill}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderSalary = () => {
    const salaryData = [
      { name: 'Minimum', salary: careerData.salary.min_salary },
      { name: 'Median', salary: careerData.salary.median_salary },
      { name: 'Maximum', salary: careerData.salary.max_salary }
    ];

    return (
      <motion.div
        key="salary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Salary Information</h2>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="yearly"
              checked={salaryType === 'yearly'}
              onChange={() => setSalaryType('yearly')}
              className="mr-2"
            />
            Yearly
          </label>
          <label>
            <input
              type="radio"
              value="monthly"
              checked={salaryType === 'monthly'}
              onChange={() => setSalaryType('monthly')}
              className="mr-2"
            />
            Monthly
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-sm text-green-800 mb-1">Minimum</p>
            <p className="text-xl font-bold text-green-900">{formatSalary(careerData.salary.min_salary, salaryType)}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-800 mb-1">Median</p>
            <p className="text-xl font-bold text-blue-900">{formatSalary(careerData.salary.median_salary, salaryType)}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <p className="text-sm text-purple-800 mb-1">Maximum</p>
            <p className="text-xl font-bold text-purple-900">{formatSalary(careerData.salary.max_salary, salaryType)}</p>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatSalary(value, salaryType)}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              />
              <Line type="monotone" dataKey="salary" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#4F46E5', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  };

  const renderJobOutlook = () => (
    <motion.div
      key="jobOutlook"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Outlook</h2>
      <p className="text-gray-600 mb-4">{careerData.job_outlook.description}</p>
      <div className="bg-green-100 p-4 rounded-lg inline-block">
        <p className="text-green-800">
          <strong>Growth Rate:</strong> {careerData.job_outlook.growth_rate}%
        </p>
      </div>
    </motion.div>
  );

  const renderEducation = () => (
    <motion.div
      key="education"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education Requirements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Minimum:</strong> {careerData.education.minimum}</p>
          <p><strong>Recommended:</strong> {careerData.education.recommended}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Certifications:</h3>
          <ul className="list-disc list-inside">
            {careerData.education.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  const renderWorkEnvironment = () => (
    <motion.div
      key="workEnvironment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Work Environment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Settings:</h3>
          <ul className="list-disc list-inside">
            {careerData.work_environment.settings.map((setting, index) => (
              <li key={index}>{setting}</li>
            ))}
          </ul>
        </div>
        <div>
          <p><strong>Physical Demands:</strong> {careerData.work_environment.physical_demands}</p>
          <p><strong>Work Schedule:</strong> {careerData.work_environment.work_schedule}</p>
        </div>
      </div>
    </motion.div>
  );

  const renderCareerProgression = () => {
    const data = careerData.career_progression.map((stage, index) => ({
      name: stage,
      value: (index + 1) * 20
    }));

    return (
      <motion.div
        key="careerProgression"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Career Progression</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  };

  const renderIndustryTrends = () => (
    <motion.div
      key="industryTrends"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Industry Trends</h2>
      <ul className="space-y-2">
        {careerData.industry_trends.map((trend, index) => (
          <li key={index} className="flex items-start">
            <TrendingUp className="text-indigo-500 mr-2 mt-1 flex-shrink-0" />
            <span>{trend}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <Link to="/career-lens" className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300">
            Go Back
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="mb-8">
          <Link to="/career-lens" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Career Lens
          </Link>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          {...fadeInUp}
        >
          {careerData.career}
        </motion.h1>

        <motion.div 
          className="bg-white rounded-xl shadow-xl p-6 mb-8"
          {...fadeInUp}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {['overview', 'pros&cons', 'skills', 'salary', 'jobOutlook', 'education', 'workEnvironment', 'careerProgression', 'industryTrends'].map((tab) => (
              <motion.button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none`}
                variants={tabVariants}
                animate={activeTab === tab ? "active" : "inactive"}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Career Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {careerData.description}
                </p>
              </motion.div>
            )}
            {activeTab === 'pros&cons' && renderProsAndCons()}
            {activeTab === 'skills' && renderSkills()}
            {activeTab === 'salary' && renderSalary()}
            {activeTab === 'jobOutlook' && renderJobOutlook()}
            {activeTab === 'education' && renderEducation()}
            {activeTab === 'workEnvironment' && renderWorkEnvironment()}
            {activeTab === 'careerProgression' && renderCareerProgression()}
            {activeTab === 'industryTrends' && renderIndustryTrends()}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          {...fadeInUp}
          className="bg-white rounded-xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Careers</h2>
          <div className="flex flex-wrap gap-4">
            {careerData.related_careers.map((career, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-full px-4 py-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-gray-800">{career}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          {...fadeInUp}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Next Steps</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Ready to pursue a career as a Gym Trainer? Here are some steps you can take:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Book className="text-indigo-500 mr-2" />
              <span>Research certification programs and educational requirements</span>
            </li>
            <li className="flex items-center">
              <Users className="text-indigo-500 mr-2" />
              <span>Network with professionals in the fitness industry</span>
            </li>
            <li className="flex items-center">
              <TrendingUp className="text-indigo-500 mr-2" />
              <span>Gain experience through internships or entry-level positions</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link 
              to="/career-roadmap/gym-trainer" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300 inline-flex items-center"
            >
              Explore Career Roadmap
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GymTrainerCareer;

