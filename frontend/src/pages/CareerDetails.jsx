import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Book, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowRight, DollarSign, TrendingDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FloatingShapes from './FloatingShapes';
import CareerInterestPopup from './CareerInterestPopup';

const fallbackData = {
  career: "Software Engineer",
  career_id: 44,
  description: "Software Engineers design, develop, and maintain software systems and applications. They work on a variety of projects, from web and mobile applications to operating systems and embedded software.",
  cons: [
    "Long hours, especially during project deadlines.",
    "Competitive field requiring constant learning and skill development.",
    "Limited creativity as compared to other software-related roles like UX design.",
    "Can involve repetitive tasks, depending on the specific role.",
    "Requires a high level of problem-solving abilities, which can be stressful."
  ],
  pros: [
    "High demand for skilled professionals in a rapidly growing industry.",
    "Competitive salaries and excellent benefits packages.",
    "Opportunities for continuous learning, innovation, and career advancement.",
    "Job security and long-term career prospects due to the increasing reliance on technology.",
    "Prestigious and rewarding profession with opportunities to make a positive impact."
  ],
  related_careers: [
    "Product Manager",
    "Web Developer",
    "Backend Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Cloud Architect",
    "Technical Writer",
    "Software Architect",
    "Systems Analyst"
  ],
  skills: [
    "Programming Languages",
    "Data Structures",
    "Algorithms",
    "Software Design",
    "Debugging",
    "Version Control",
    "Databases",
    "Agile Development",
    "Cloud Computing",
    "Communication"
  ],
  trend: [
    "2020: 10%",
    "2021: 8%",
    "2022: 6%",
    "2023: 4%",
    "2024: 2%"
  ],
  salary: {
    min_salary: 420000,
    max_salary: 1100000,
    median_salary: 650000,
    currency: "INR",
    period: "YEAR"
  }
};

const CareerDetails = () => {
  const { career } = useParams();
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salaryType, setSalaryType] = useState('yearly');
  const [activeSection, setActiveSection] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [explorationDepth, setExplorationDepth] = useState(0);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        const response = await fetch(`https://api.example.com/career/${encodeURIComponent(career)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch career data');
        }
        const data = await response.json();
        setCareerData(data);
      } catch (err) {
        console.error('Error fetching career data:', err);
        setCareerData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();

    // Start tracking time spent
    const startTime = Date.now();
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Clean up timer on component unmount
    return () => {
      clearInterval(timer);
      // Here you could send the final timeSpent and explorationDepth to your analytics service
      console.log("Time spent:", timeSpent, "seconds");
      console.log("Exploration depth:", explorationDepth);
    };
  }, [career]);

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

  const trackExploration = (section) => {
    setExplorationDepth((prevDepth) => prevDepth + 1);
    setActiveSection(section);
    console.log(`Explored ${section}`);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const floatingAnimation = {
    y: ['-10px', '10px'],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!careerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Career Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">We couldn't find the career you're looking for. Let's try again!</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/career-lens" className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
              Back to Career Lens
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <FloatingShapes />
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={floatingAnimation}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div {...fadeInUp} className="mb-8">
          <motion.div
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/career-lens" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
              <ArrowLeft className="mr-2" size={24} />
              <span className="text-xl font-semibold">Back to Career Lens</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {careerData.career}
        </motion.h1>

        <motion.section 
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
          {...fadeInUp}
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          onClick={() => trackExploration("Career Overview")}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Career Overview</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{careerData.description}</p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.section 
            className="bg-white rounded-lg shadow-lg p-8"
            {...fadeInUp}
            whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            onClick={() => trackExploration("Pros")}
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Pros</h2>
            <ul className="space-y-4">
              {careerData.pros.map((pro, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <ThumbsUp className="text-green-500 mr-2 flex-shrink-0" size={24} />
                  <span className="text-gray-700">{pro}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section 
            className="bg-white rounded-lg shadow-lg p-8"
            {...fadeInUp}
            whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            onClick={() => trackExploration("Cons")}
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cons</h2>
            <ul className="space-y-4">
              {careerData.cons.map((con, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <ThumbsDown className="text-red-500 mr-2 flex-shrink-0" size={24} />
                  <span className="text-gray-700">{con}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        <motion.section 
          className="bg-white rounded-lg shadow-lg p-8 my-8"
          {...fadeInUp}
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          onClick={() => trackExploration("Key Skills")}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Skills</h2>
          <div className="flex flex-wrap gap-4">
            {careerData.skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-full px-4 py-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              >
                <span className="text-gray-800">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
          {...fadeInUp}
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          onClick={() => trackExploration("Salary Information")}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Salary Information</h2>
          <div className="mb-4">
            <label className="mr-4 text-lg">
              <input
                type="radio"
                value="yearly"
                checked={salaryType === 'yearly'}
                onChange={() => setSalaryType('yearly')}
                className="mr-2"
              />
              Yearly
            </label>
            <label className="text-lg">
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
            <motion.div 
                className="bg-blue-50 p-4 rounded-lg text-center"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              >
                <p className="text-sm text-blue-800 mb-1">Minimum</p>
                <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.min_salary, salaryType)}</p>
              </motion.div>
              <motion.div 
                className="bg-blue-50 p-4 rounded-lg text-center"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              >
                <p className="text-sm text-blue-800 mb-1">Median</p>
                <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.median_salary, salaryType)}</p>
              </motion.div>
              <motion.div 
                className="bg-blue-50 p-4 rounded-lg text-center"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              >
                <p className="text-sm text-blue-800 mb-1">Maximum</p>
                <p className="text-2xl font-bold text-blue-600">{formatSalary(careerData.salary.max_salary, salaryType)}</p>
              </motion.div>
          </div>
          <motion.div 
            className="h-64 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Minimum', salary: careerData.salary.min_salary },
                { name: 'Median', salary: careerData.salary.median_salary },
                { name: 'Maximum', salary: careerData.salary.max_salary }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatSalary(value, salaryType)}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0, 0, 0.1)' }}
                />
                <Line type="monotone" dataKey="salary" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.section>

        <motion.section 
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
          {...fadeInUp}
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          onClick={() => trackExploration("Career Trend")}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Career Trend</h2>
          <motion.div 
            className="h-64 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={careerData.trend.map(item => {
                const [year, percentage] = item.split(': ');
                return { year, percentage: parseFloat(percentage) };
              })}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3B82F6">
                  {careerData.trend.map((entry, index) => (
                    <motion.rect key={`bar-${index}`} whileHover={{ scale: 1.1 }} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.section>

        <motion.section 
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
          {...fadeInUp}
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          onClick={() => trackExploration("Related Careers")}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Related Careers</h2>
          <div className="flex flex-wrap gap-4">
            {careerData.related_careers.map((relatedCareer, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-full px-4 py-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
              >
                <span className="text-gray-800">{relatedCareer}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          {...fadeInUp}
          className="bg-white rounded-lg shadow-lg p-8"
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          onClick={() => trackExploration("Next Steps")}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Next Steps</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Ready to pursue a career as a {careerData.career}? Here are some steps you can take:
          </p>
          <ul className="space-y-4">
            <motion.li 
              className="flex items-center"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <Book className="text-blue-500 mr-4" size={24} />
              <span className="text-gray-700">Research certification programs and educational requirements</span>
            </motion.li>
            <motion.li 
              className="flex items-center"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <Users className="text-blue-500 mr-4" size={24} />
              <span className="text-gray-700">Network with professionals in the industry</span>
            </motion.li>
            <motion.li 
              className="flex items-center"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <TrendingUp className="text-blue-500 mr-4" size={24} />
              <span className="text-gray-700">Gain experience through internships or entry-level positions</span>
            </motion.li>
          </ul>
          <motion.div 
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={`/career-roadmap/${careerData.career_id}`}
              className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 inline-flex items-center"
            >
              Explore Career Roadmap
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </motion.section>

       
        {timeSpent > 60 && <CareerInterestPopup careerName={careerData.career} />}
      </div>
    </div>
  );
};

export default CareerDetails;

