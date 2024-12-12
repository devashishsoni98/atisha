import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Users, Brain, CheckCircle, ChevronDown, Check } from 'lucide-react'
import { useSelector } from 'react-redux'

const programs = [
  {
    level: "Beginner",
    duration: "3 months",
    description: "Perfect for those new to counseling, covering fundamental theories and basic techniques.",
    modules: [
      { name: "Introduction to Counseling", duration: "2 weeks" },
      { name: "Basic Communication Skills", duration: "3 weeks" },
      { name: "Ethical Considerations", duration: "2 weeks" },
      { name: "Counseling Models", duration: "5 weeks" },
      { name: "Active Listening Techniques", duration: "2 weeks" },
      { name: "Building Rapport with Clients", duration: "2 weeks" },
      { name: "Understanding Diversity in Counseling", duration: "3 weeks" },
      { name: "Introduction to Mental Health Disorders", duration: "4 weeks" }
    ]
  },
  {
    level: "Intermediate",
    duration: "6 months",
    description: "Designed for counselors with some experience, focusing on advanced techniques and specialized approaches.",
    modules: [
      { name: "Advanced Counseling Techniques", duration: "6 weeks" },
      { name: "Group Counseling", duration: "4 weeks" },
      { name: "Assessment and Diagnosis", duration: "8 weeks" },
      { name: "Cultural Competence", duration: "6 weeks" },
      { name: "Cognitive Behavioral Therapy", duration: "5 weeks" },
      { name: "Family Systems Therapy", duration: "4 weeks" },
      { name: "Crisis Intervention", duration: "3 weeks" },
      { name: "Substance Abuse Counseling", duration: "4 weeks" }
    ]
  },
  {
    level: "Expert",
    duration: "12 months",
    description: "For experienced counselors aiming to master complex cases and develop leadership in the field.",
    modules: [
      { name: "Specialized Intervention Strategies", duration: "12 weeks" },
      { name: "Supervision Skills", duration: "8 weeks" },
      { name: "Research Methods", duration: "12 weeks" },
      { name: "Program Development", duration: "20 weeks" },
      { name: "Advanced Psychopathology", duration: "10 weeks" },
      { name: "Integrative Approaches to Therapy", duration: "8 weeks" },
      { name: "Ethics and Legal Issues in Counseling", duration: "6 weeks" },
      { name: "Counseling in Multicultural Contexts", duration: "8 weeks" }
    ]
  }
];

const specializations = [
  { name: "Mental Health", icon: <Brain className="w-4 h-4" /> },
  { name: "Career", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Relationship", icon: <Users className="w-4 h-4" /> }
];


const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};


export default function CounselorTrainingProgram() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState("Mental Health");
  const [isCompleted, setIsCompleted] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState({});
  const userName = useSelector((state) => state.user.name) || "John Doe"; // Fallback for demo

  const handleApply = (program) => {
    setSelectedProgram(program);
    setIsCompleted(false);
    setCompletedModules({});
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleBack = () => {
    setSelectedProgram(null);
    setIsCompleted(false);
    setCompletedModules({});
  };

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const toggleModuleCompletion = (moduleName) => {
    setCompletedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const calculateProgress = () => {
    if (!selectedProgram) return 0;
    const totalModules = selectedProgram.modules.length;
    const completedCount = Object.values(completedModules).filter(Boolean).length;
    return (completedCount / totalModules) * 100;
  };

  const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -inset-[10px] opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full fill-current text-blue-300"
            >
              {i % 3 === 0 && (
                <path d="M50 0 L100 50 L50 100 L0 50 Z" />
              )}
              {i % 3 === 1 && (
                <circle cx="50" cy="50" r="50" />
              )}
              {i % 3 === 2 && (
                <path d="M0 0 L100 0 L100 100 L0 100 Z" />
              )}
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* <AnimatedBackground /> */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* <motion.h1
          variants={slideIn}
          className="text-4xl font-bold text-center text-gray-900 mb-8"
        >
          Counselor Training Programs
        </motion.h1> */}
        
        {selectedProgram ? (
          isCompleted ? (
            <motion.div
              variants={slideIn}
              className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto  "
            >
              <h2 className="text-2xl font-bold mb-4">Certificate of Completion</h2>
              <p className="text-gray-600 mb-6">Congratulations on your achievement!</p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-semibold">{userName}</p>
                  <p className="text-sm text-gray-500">Certified Counselor</p>
                </div>
              </div>
              <p className="mb-4">You have successfully completed the {selectedProgram.level} program in {selectedSpecialization}.</p>
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="text-green-500" />
                <span>Program completed on {new Date().toLocaleDateString()}</span>
              </div>
              <button
                onClick={handleBack}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Back to Programs
              </button>
            </motion.div>
          ) : (
            <motion.div
            variants={slideIn}
              className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-2">{selectedProgram.level} Program</h2>
              <p className="text-gray-600 mb-4">{selectedProgram.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {selectedSpecialization}
                </span>
                <span className="text-sm text-gray-500">Duration: {selectedProgram.duration}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <div className="mb-6">
                <button
                  onClick={() => toggleModule('modules')}
                  className="flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  <span className="font-semibold">View Modules</span>
                  <ChevronDown className={`transform transition-transform ${expandedModule === 'modules' ? 'rotate-180' : ''}`} />
                </button>
                {expandedModule === 'modules' && (
                  <ul className="mt-2 space-y-2">
                    {selectedProgram.modules.map((module, index) => (
                      <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`module-${index}`}
                            checked={completedModules[module.name] || false}
                            onChange={() => toggleModuleCompletion(module.name)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                          />
                          <label htmlFor={`module-${index}`} className="flex-1 cursor-pointer">
                            {module.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">{module.duration}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  disabled={calculateProgress() < 100}
                >
                  {calculateProgress() < 100 ? 'Complete All Modules' : 'Mark as Completed'}
                </button>
              </div>
            </motion.div>
          )
        ) : (
          <motion.div
            variants={slideIn}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto  " 
          >
            <h2 className="text-2xl font-bold mb-2">Select Your Specialization</h2>
            <p className="text-gray-600 mb-6">Choose the area you want to focus on in your counseling career</p>
            <div className="flex justify-center space-x-4 mb-8">
              {specializations.map((spec) => (
                <button
                  key={spec.name}
                  onClick={() => setSelectedSpecialization(spec.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded ${
                    selectedSpecialization === spec.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } transition-colors`}
                >
                  {spec.icon}
                  <span>{spec.name}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <div key={program.level} className="bg-gray-50 rounded-lg p-6 shadow">
                  <h3 className="text-xl font-bold mb-2">{program.level}</h3>
                  <p className="text-gray-500 mb-2">{program.duration}</p>
                  <p className="mb-4">{program.description}</p>
                  <ul className="list-disc list-inside mb-4 text-sm text-gray-600">
                    {program.modules.slice(0, 4).map((module, index) => (
                      <li key={index}>{module.name}</li>
                    ))}
                    {program.modules.length > 4 && (
                      <li className="list-none font-semibold">+ {program.modules.length - 4} more modules</li>
                    )}
                  </ul>
                  <button
                    onClick={() => handleApply(program)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
                  >
                    Apply for {program.level}
                  </button>
                </div>
))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

