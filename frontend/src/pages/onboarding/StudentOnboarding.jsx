import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  BookOpen,
  Users,
  Lightbulb,
} from "lucide-react";
import photo from "../../assets/welcome.png";
import { getStudentTraitsByStudentId } from "../../api/StudentTraitsApi.jsx";

const StudentOnboarding = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentTrait, setStudentTrait] = useState(null);

  const userId =
    useSelector((state) => state.user.id) || localStorage.getItem("userId");
  const roleType =
    useSelector((state) => state.user.roleType) ||
    localStorage.getItem("userType");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/${roleType}/${userId}`
        );
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        setLoading(false);
      }
    };

    fetchUserData();

    const fetchDetails = async () => {
      const traits = await getStudentTraitsByStudentId(userId);

      setStudentTrait(traits);
      console.log(studentTrait);
    };

    fetchDetails();
  }, [userId, roleType]);

  const dashboardLink = () => {
    switch (roleType) {
      case "institute":
        return `/dashboard/institute/${userId}`;
      case "counselor":
        return `/dashboard/counselor/${userId}`;
      case "mentor":
        return `/dashboard/mentor/${userId}`;
      default:
        return `/dashboard/student/${userId}`;
    }
  };

  const getWelcomeContent = () => {
    switch (roleType) {
      case "institute":
        return {
          title: "Empower the Next Generation",
          description:
            "As an educational institute, you play a crucial role in shaping futures. Let's work together to create impactful programs and guide students towards success.",
          cta: "Set Up Your Institute Profile",
          icon: <Target className="w-16 h-16 text-indigo-500" />,
          illustration: photo,
        };
      case "counselor":
        return {
          title: "Guide Paths to Success",
          description:
            "Your expertise can change lives. Prepare to inspire, mentor, and help students navigate their career journeys with confidence.",
          cta: "Complete Your Counselor Profile",
          icon: <Sparkles className="w-16 h-16 text-purple-500" />,
          illustration: photo,
        };
      case "mentor":
        return {
          title: "Share Your Wisdom",
          description:
            "Your experience is invaluable. Get ready to mentor the next generation of professionals and help them reach their full potential.",
          cta: "Set Up Your Mentorship Areas",
          icon: <Rocket className="w-16 h-16 text-teal-500" />,
          illustration: photo,
        };
      default:
        return {
          title: "Your Journey Begins Here",
          description:
            "Exciting opportunities await! Let's explore your interests, skills, and dreams to chart the perfect career path for you.",
          cta: "Start Your Career Discovery",
          icon: <Sparkles className="w-16 h-16 text-blue-500" />,
          illustration: photo,
        };
    }
  };

  const AnimatedBackground = () => (
    <div className="absolute inset-0 pointer-events-none">
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
              {i % 3 === 0 && <path d="M50 0 L100 50 L50 100 L0 50 Z" />}
              {i % 3 === 1 && <circle cx="50" cy="50" r="50" />}
              {i % 3 === 2 && <path d="M0 0 L100 0 L100 100 L0 100 Z" />}
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <motion.div
          className="text-2xl font-bold text-blue-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const welcomeContent = getWelcomeContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <header className="bg-white bg-opacity-90 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.h1
              className="text-2xl font-bold text-blue-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Onboarding
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to={dashboardLink()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="relative z-10 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex-shrink-0"
              >
                <img
                  src={welcomeContent.illustration}
                  alt="Welcome Illustration"
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                />
              </motion.div>
              <div className="text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center justify-center sm:justify-start space-x-4 mb-4 pl-2"
                >
                  {welcomeContent.icon}
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    {welcomeContent.title}
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg text-gray-700 max-w-2xl pl-4 pt-3"
                >
                  Welcome, {userData.name}! {welcomeContent.description}
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link
                to={`${dashboardLink()}/profile`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {welcomeContent.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Platform Features
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Personalized Learning",
              icon: <BookOpen className="w-8 h-8 text-blue-500" />,
              description:
                "Tailored courses and resources to match your goals and interests.",
            },
            {
              title: "Expert Guidance",
              icon: <Users className="w-8 h-8 text-purple-500" />,
              description:
                "Connect with experienced mentors and counselors in your field.",
            },
            {
              title: "Career Insights",
              icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
              description:
                "Gain valuable industry knowledge and stay ahead of trends.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {roleType === "counselor" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Counselor Training Program
              </h3>
              <p className="text-base text-gray-600 mb-6">
                Enhance your skills and stay updated with the latest in career
                counseling techniques and methodologies.
              </p>
              <Link
                to="/training"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Our Training Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="bg-white bg-opacity-90 shadow-lg backdrop-blur-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-sm text-gray-600">
            Need assistance? Reach out to our support team at
            support@careercompass.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentOnboarding;
