// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { ArrowRight, Sparkles, Target, Rocket, BookOpen, Users, Lightbulb, ChevronDown, CheckCircle2 } from 'lucide-react';
// import photo from "../../assets/welcome.png";
// import { getStudentTraitsByStudentId } from "../../api/StudentTraitsApi.jsx";

// const StudentOnboarding = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [studentTrait, setStudentTrait] = useState(null);

//   const userId = useSelector((state) => state.user.id) || localStorage.getItem("userId");
//   const roleType = useSelector((state) => state.user.roleType) || localStorage.getItem("userType");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/${roleType}/${userId}`);
//         setUserData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch user data. Please try again.");
//         setLoading(false);
//       }
//     };
    
//     const fetchDetails = async () => { 
//       try {
//         const traits = await getStudentTraitsByStudentId(userId);
//         setStudentTrait(traits);
//       } catch (err) {
//         console.error("Failed to fetch student traits:", err);
//       }
//     }; 

//     fetchUserData(); 
//     fetchDetails(); 
//   }, [userId, roleType]); 

//   const dashboardLink = () => {
//     switch (roleType) {
//       case "institute": return `/dashboard/institute/${userId}`;
//       case "counselor": return `/dashboard/counselor/${userId}`;
//       case "mentor": return `/dashboard/mentor/${userId}`;
//       default: return `/dashboard/student/${userId}`;
//     }
//   };

//   const getWelcomeContent = () => {
//     switch (roleType) {
//       case "institute":
//         return {
//           title: "Empower the Next Generation",
//           description: "Shape futures by creating impactful programs and guiding students towards success.",
//           cta: "Go to Dashboard",
//           icon: <Target className="w-16 h-16 text-indigo-500" />,
//           color: "from-indigo-400 to-blue-500",
//         };
//       case "counselor":
//         return {
//           title: "Guide Paths to Success",
//           description: "Inspire and mentor students, helping them navigate their career journeys with confidence.",
//           cta: "Go to Dashboard",
//           icon: <Sparkles className="w-16 h-16 text-purple-500" />,
//           color: "from-purple-400 to-pink-500",
//         };
//       case "mentor":
//         return {
//           title: "Share Your Wisdom",
//           description: "Mentor the next generation of professionals and help them reach their full potential.",
//           cta: "Go to Dashboard",
//           icon: <Rocket className="w-16 h-16 text-teal-500" />,
//           color: "from-teal-400 to-green-500",
//         };
//       default:
//         return {
//           title: "Your Journey Begins Here",
//           description: "Explore your interests, skills, and dreams to chart the perfect career path for you.",
//           cta: "Go to Dashboard",
//           icon: <Sparkles className="w-16 h-16 text-blue-500" />,
//           color: "from-blue-400 to-indigo-500",
//         };
//     }
//   };

//   const CareerFlowStep = ({ icon, title, isLast }) => (
//     <motion.div 
//       className="flex items-center"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex flex-col items-center w-32">
//         <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center shadow-md">
//           {icon}
//         </div>
//         <p className="mt-2 text-sm font-medium text-gray-600 text-center">{title}</p>
//       </div>
//       {!isLast && (
//         <motion.div 
//           className="hidden md:block w-8 h-1 bg-indigo-300 mx-2"
//           initial={{ width: 0 }}
//           animate={{ width: "2rem" }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         />
//       )}
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//         <motion.div
//           className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
//           animate={{ opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//         >
//           Loading...
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//         <motion.div 
//           className="text-2xl text-red-600 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-8"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {error}
//         </motion.div>
//       </div>
//     );
//   }

//   const welcomeContent = getWelcomeContent();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
     

//       <main className="container mx-auto px-4 py-8">
//         <motion.div 
//           className="bg-white rounded-3xl shadow-xl p-8 mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
//             <motion.div 
//               className="flex-shrink-0"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.2 }}
//             >
//               <img
//                 src={photo}
//                 alt="Welcome Illustration"
//                 className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-white"
//               />
//             </motion.div>
//             <div className="text-center md:text-left">
//               <motion.div 
//                 className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 {welcomeContent.icon}
//                 <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                   {welcomeContent.title}
//                 </h2>
//               </motion.div>
//               <motion.p 
//                 className="text-xl text-gray-700 mt-4 max-w-2xl"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//               >
//                 Welcome, {userData.name}! {welcomeContent.description}
//               </motion.p>
//             </div>
//           </div>
//           <motion.div 
//             className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <Link
//               to={dashboardLink()}
//               className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               {welcomeContent.cta}
//               <ArrowRight className="ml-2 h-6 w-6" />
//             </Link>

//             {roleType === "student" && studentTrait && studentTrait.traits_counter < 2 && (
//               <Link
//                 to="/quiz"
//                 className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-lg font-semibold rounded-full text-purple-700 bg-white hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               >
//                 Take your Quiz
//                 <ChevronDown className="ml-2 h-6 w-6" />
//               </Link>
//             )}
//           </motion.div>
//         </motion.div>

//         <motion.div 
//           className="bg-white rounded-3xl shadow-xl p-8 mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Your Career Journey</h3>
//         <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-4">
//           <CareerFlowStep 
//             icon={<CheckCircle2 className="w-8 h-8 text-indigo-600" />} 
//             title="Take your Quiz" 
//           />
//           <CareerFlowStep 
//             icon={<Target className="w-8 h-8 text-indigo-600" />} 
//             title="Explore Recommended Careers" 
//           />
//           <CareerFlowStep 
//             icon={<BookOpen className="w-8 h-8 text-indigo-600" />} 
//             title="Explore Roadmaps" 
//           />
//           <CareerFlowStep 
//             icon={<Users className="w-8 h-8 text-indigo-600" />} 
//             title="Complete Levels" 
//           />
//           <CareerFlowStep 
//             icon={<Rocket className="w-8 h-8 text-indigo-600" />} 
//             title="Learn and Grow" 
//             isLast 
//           />
//         </div>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[
//             {
//               title: "Personalized Learning",
//               icon: <BookOpen className="w-12 h-12 text-white" />,
//               description: "Tailored courses and resources to match your goals and interests.",
//               color: "from-blue-400 to-indigo-500",
//             },
//             {
//               title: "Expert Guidance",
//               icon: <Users className="w-12 h-12 text-white" />,
//               description: "Connect with experienced mentors and counselors in your field.",
//               color: "from-purple-400 to-pink-500",
//             },
//             {
//               title: "Career Insights",
//               icon: <Lightbulb className="w-12 h-12 text-white" />,
//               description: "Gain valuable industry knowledge and stay ahead of trends.",
//               color: "from-yellow-400 to-orange-500",
//             },
//           ].map((feature, index) => (
//             <motion.div
//               key={index}
//               className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 * index }}
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className={`p-4 rounded-full bg-gradient-to-br ${feature.color} mb-6`}>
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {roleType === "counselor" && (
//           <motion.div 
//             className="mt-12 bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <div className="relative z-10">
//               <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
//                 Counselor Training Program
//               </h3>
//               <p className="text-xl text-gray-700 mb-6">
//                 Enhance your skills and stay updated with the latest in career counseling techniques and methodologies.
//               </p>
//               <Link
//                 to="/training"
//                 className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               >
//                 Explore Our Training Program
//                 <ArrowRight className="ml-2 h-6 w-6" />
//               </Link>
//             </div>
//             <div className="absolute inset-0 opacity-25 bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300 transform rotate-12 scale-150"></div>
//           </motion.div>
//         )}
//       </main>

//       <motion.footer 
//         className="bg-white shadow-lg mt-16"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.6 }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
//           <p className="text-base text-gray-600">
//             Need assistance? Reach out to our support team at{' '}
//             <a href="mailto:support@careercompass.com" className="text-blue-600 hover:text-blue-800 transition-colors">
//               support@careercompass.com
//             </a>
//           </p>
//           <div className="mt-4 flex justify-center space-x-6">
//             <a href="#" className="text-gray-400 hover:text-gray-500">
//               <span className="sr-only">Facebook</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-500">
//               <span className="sr-only">Instagram</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-500">
//               <span className="sr-only">Twitter</span>
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </motion.footer>
//     </div>
//   );
// };

// export default StudentOnboarding;


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowRight, Sparkles, Target, Rocket, BookOpen, Users, Lightbulb, ChevronDown, CheckCircle2, Globe, MessageCircle, Briefcase, FileText } from 'lucide-react';
import { getStudentTraitsByStudentId } from "../../api/StudentTraitsApi.jsx";
import StudentTimeline from "../../components/StudentTimeline.jsx";

const StudentOnboarding = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentTrait, setStudentTrait] = useState(null);

  const userId = useSelector((state) => state.user.id) || localStorage.getItem("userId");
  const roleType = useSelector((state) => state.user.roleType) || localStorage.getItem("userType");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/${roleType}/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        setLoading(false);
      }
    };
    
    const fetchDetails = async () => { 
      try {
        const traits = await getStudentTraitsByStudentId(userId);
        setStudentTrait(traits);
      } catch (err) {
        console.error("Failed to fetch student traits:", err);
      }
    }; 

    fetchUserData(); 
    if (roleType === "student") {
      fetchDetails();
    }
  }, [userId, roleType]); 

  const dashboardLink = () => {
    switch (roleType) {
      case "institute": return `/dashboard/institute/${userId}`;
      case "counselor": return `/dashboard/counselor/${userId}`;
      case "mentor": return `/dashboard/mentor/${userId}`;
      default: return `/dashboard/student/${userId}`;
    }
  };

  const getWelcomeContent = () => {
    switch (roleType) {
      case "institute":
        return {
          title: "Empower the Next Generation",
          description: "Shape futures by creating impactful programs and guiding students towards success.",
          cta: "Go to Dashboard",
          icon: <Target className="w-16 h-16 text-indigo-500" />,
          color: "from-indigo-400 to-blue-500",
        };
      case "counselor":
        return {
          title: "Guide Paths to Success",
          description: "Inspire and mentor students, helping them navigate their career journeys with confidence.",
          cta: "Go to Dashboard",
          icon: <Sparkles className="w-16 h-16 text-purple-500" />,
          color: "from-purple-400 to-pink-500",
        };
      case "mentor":
        return {
          title: "Share Your Wisdom",
          description: "Mentor the next generation of professionals and help them reach their full potential.",
          cta: "Go to Dashboard",
          icon: <Rocket className="w-16 h-16 text-teal-500" />,
          color: "from-teal-400 to-green-500",
        };
      default:
        return {
          title: "Your Journey Begins Here",
          description: "Explore your interests, skills, and dreams to chart the perfect career path for you.",
          cta: "Go to Dashboard",
          icon: <Sparkles className="w-16 h-16 text-blue-500" />,
          color: "from-blue-400 to-indigo-500",
        };
    }
  };

  const CareerFlowStep = ({ icon, title, isLast }) => (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center w-32">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center shadow-md">
          {icon}
        </div>
        <p className="mt-2 text-sm font-medium text-gray-600 text-center">{title}</p>
      </div>
      {!isLast && (
        <motion.div 
          className="hidden md:block w-8 h-1 bg-indigo-300 mx-2"
          initial={{ width: 0 }}
          animate={{ width: "2rem" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
    </motion.div>
  );

  const getCareerJourneySteps = () => {
    switch (roleType) {
      case "student":
        return [
          { icon: <CheckCircle2 className="w-8 h-8 text-indigo-600" />, title: "Take your Quiz" },
          { icon: <Target className="w-8 h-8 text-indigo-600" />, title: "Explore Recommended Careers" },
          { icon: <BookOpen className="w-8 h-8 text-indigo-600" />, title: "Explore Roadmaps" },
          { icon: <Users className="w-8 h-8 text-indigo-600" />, title: "Complete Levels" },
          { icon: <Rocket className="w-8 h-8 text-indigo-600" />, title: "Learn and Grow" },
        ];
      case "counselor":
        return [
          { icon: <Globe className="w-8 h-8 text-purple-600" />, title: "Explore the Website" },
          { icon: <Briefcase className="w-8 h-8 text-purple-600" />, title: "Connect to Your Institute" },
          { icon: <MessageCircle className="w-8 h-8 text-purple-600" />, title: "Take Sessions" },
          { icon: <Target className="w-8 h-8 text-purple-600" />, title: "Guide Students" },
          { icon: <BookOpen className="w-8 h-8 text-purple-600" />, title: "Get Training" },
        ];
      case "mentor":
        return [
          { icon: <Globe className="w-8 h-8 text-teal-600" />, title: "Explore Website" },
          { icon: <Users className="w-8 h-8 text-teal-600" />, title: "Take Workshops" },
          { icon: <MessageCircle className="w-8 h-8 text-teal-600" />, title: "Conduct Sessions" },
          { icon: <Lightbulb className="w-8 h-8 text-teal-600" />, title: "Share Technical Insights" },
          { icon: <Rocket className="w-8 h-8 text-teal-600" />, title: "Inspire Future Professionals" },
        ];
      case "institute":
        return [
          { icon: <FileText className="w-8 h-8 text-indigo-600" />, title: "Set Up Your Profile" },
          { icon: <Users className="w-8 h-8 text-indigo-600" />, title: "Update Students Data" },
          { icon: <Briefcase className="w-8 h-8 text-indigo-600" />, title: "Arrange Weekly Activities" },
          { icon: <Target className="w-8 h-8 text-indigo-600" />, title: "Execute Programs" },
          { icon: <Lightbulb className="w-8 h-8 text-indigo-600" />, title: "Help Students Explore Careers" },
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <motion.div
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
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
        <motion.div 
          className="text-2xl text-red-600 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
      </div>
    );
  }

  const welcomeContent = getWelcomeContent();
  const careerJourneySteps = getCareerJourneySteps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-48 h-48 rounded-full flex items-center justify-center shadow-lg border-4 border-white bg-gradient-to-r ${welcomeContent.color}`}>
                {welcomeContent.icon}
              </div>
            </motion.div>
            <div className="text-center md:text-left">
              <motion.div 
                className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {welcomeContent.title}
                </h2>
              </motion.div>
              <motion.p 
                className="text-xl text-gray-700 mt-4 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Welcome, {userData.name}! {welcomeContent.description}
              </motion.p>
            </div>
          </div>
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to={dashboardLink()}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {welcomeContent.cta}
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>

            {roleType === "student" && studentTrait && (
              <Link
                to="/quiz"
                className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-lg font-semibold rounded-full text-purple-700 bg-white hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Take your Quiz
                <ChevronDown className="ml-2 h-6 w-6" />
              </Link>
            )}
          </motion.div>
        </motion.div>

{/* <StudentTimeline/> */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Your Career Journey</h3>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-4">
            {careerJourneySteps.map((step, index) => (
              <CareerFlowStep 
                key={index}
                icon={step.icon}
                title={step.title}
                isLast={index === careerJourneySteps.length - 1}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Personalized Learning",
              icon: <BookOpen className="w-12 h-12 text-white" />,
              description: "Tailored courses and resources to match your goals and interests.",
              color: "from-blue-400 to-indigo-500",
            },
            {
              title: "Expert Guidance",
              icon: <Users className="w-12 h-12 text-white" />,
              description: "Connect with experienced mentors and counselors in your field.",
              color: "from-purple-400 to-pink-500",
            },
            {
              title: "Career Insights",
              icon: <Lightbulb className="w-12 h-12 text-white" />,
              description: "Gain valuable industry knowledge and stay ahead of trends.",
              color: "from-yellow-400 to-orange-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full bg-gradient-to-br ${feature.color} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {roleType === "counselor" && (
          <motion.div 
            className="mt-12 bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
                Counselor Training Program
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                Enhance your skills and stay updated with the latest in career counseling techniques and methodologies.
              </p>
              <Link
                to="/training"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Our Training Program
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </div>
            <div className="absolute inset-0 opacity-25 bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300 transform rotate-12 scale-150"></div>
          </motion.div>
        )}
      </main>

      <motion.footer 
        className="bg-white shadow-lg mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-base text-gray-600">
            Need assistance? Reach out to our support team at{' '}
            <a href="mailto:support@careercompass.com" className="text-blue-600 hover:text-blue-800 transition-colors">
              support@careercompass.com
            </a>
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default StudentOnboarding;

