// import { useState } from "react";
// import { Home } from "lucide-react";
// import { motion } from "framer-motion";
// import Img from "../assets/illustration1.jpg";
// import { Link } from "react-router-dom";
//
// const Result = () => {
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//   });
//
//   const interests = ["Engineer", "CA", "IAS"];
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle booking submission
//     console.log("Booking submitted:", formData);
//     setIsBookingOpen(false);
//   };
//
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };
//
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//     },
//   };
//
//   return (
//     <motion.div
//       className="min-h-screen bg-white relative overflow-hidden"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* Decorative corners */}
//       <motion.div
//         className="absolute md:top-0 top-[-15%] right-0 w-48 h-48 bg_primary_color -rotate-45 transform translate-x-24 -translate-y-24"
//         initial={{ scale: 0, rotate: 0 }}
//         animate={{ scale: 1, rotate: -45 }}
//         transition={{ duration: 0.5, type: "spring" }}
//       />
//       <motion.div
//         className="absolute bottom-[-15%] left-0 w-48 h-48 bg_primary_color -rotate-45 transform -translate-x-24 translate-y-24"
//         initial={{ scale: 0, rotate: 0 }}
//         animate={{ scale: 1, rotate: -45 }}
//         transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
//       />
//
//       {/* Main content */}
//       <div className="max-w-4xl mx-auto px-4 py-8 relative">
//         {/* Header */}
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Link to="/" className="inline-block">
//             <div className="w-12 h-12 bg_light_primary_color rounded-full flex items-center justify-center">
//               <Home className="w-6 h-6 text-white" />
//             </div>
//           </Link>
//         </motion.div>
//
//         {/* Results Section */}
//         <motion.div className="text-center mt-8" variants={itemVariants}>
//           <motion.h1
//             className="text-4xl font-bold primary_color mb-4"
//             variants={itemVariants}
//           >
//             Your Result
//           </motion.h1>
//           <motion.p
//             className="text-lg text-gray-600 mb-8"
//             variants={itemVariants}
//           >
//             Your result will show your interested careers
//           </motion.p>
//
//           <motion.div
//             className="w-48 h-48 mx-auto mb-8"
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
//           >
//             <img
//               src={Img}
//               alt="Thinking person illustration"
//               className="w-full h-full object-contain"
//             />
//           </motion.div>
//
//           {/* Interests */}
//           <motion.div className="mb-12" variants={containerVariants}>
//             <motion.div
//               className="bg_light_primary_color text-white font-semibold py-2 px-6 rounded-full inline-block mb-8"
//               variants={itemVariants}
//             >
//               Your Interests
//             </motion.div>
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-4"
//               variants={containerVariants}
//             >
//               {interests.map((interest, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg_accent_one rounded-lg p-4 text-blue-950 font-medium res-box transition-colors cursor-pointer"
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link
//                     to={`/roadmap/${interest}`}
//                     className="w-full h-full"
//                   >
//                     {interest}
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>
//
//           {/* Actions */}
//           <motion.div className="space-y-8" variants={containerVariants}>
//             <motion.h2
//               className="text-2xl font-bold text-gray-800"
//               variants={itemVariants}
//             >
//               Still not Satisfied ?
//             </motion.h2>
//             <motion.div
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//               variants={containerVariants}
//             >
//               <Link to="/student-browsing">
//               <motion.button
//                 onClick={() => setIsBookingOpen(true)}
//                 className="bg_accent_one res-box text-blue-950 font-semibold py-2 px-6 rounded-full transition-colors"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 >
//                 Book a Session
//               </motion.button>
//                 </Link>
//               <motion.div
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/carrer/roadmaps/explore"
//                   className="bg_accent_one res-box text-blue-950 font-semibold py-2 px-6 rounded-full transition-colors inline-block"
//                 >
//                   Explore more Careers
//                 </Link>
//               </motion.div>
//               <motion.div
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/quiz"
//                   className="bg_accent_one res-box text-blue-950 font-semibold py-2 px-6 rounded-full transition-colors inline-block"
//                 >
//                   Retake Quiz
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//
//         {/* Booking Modal */}
//         {isBookingOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-lg p-6 max-w-md w-full"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 500 }}
//             >
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 Book a Career Guidance Session
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Date</label>
//                   <input
//                     type="date"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
//                     value={formData.date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, date: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Time</label>
//                   <input
//                     type="time"
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
//                     value={formData.time}
//                     onChange={(e) =>
//                       setFormData({ ...formData, time: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="flex gap-4 justify-end">
//                   <button
//                     type="button"
//                     onClick={() => setIsBookingOpen(false)}
//                     className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                   >
//                     Cancel
//                   </button>
//                   <Link to="/student-browsing">
//                   <button
//                     type="submit"
//                     className="bg_primary_color hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
//                     >
//                     Book Session
//                   </button>
//                     </Link>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };
//
// export default Result;


import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import Img from "../assets/illustration1.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Result = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [interests, setInterests] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  // const interests = ["Engineer", "CA", "IAS"];
  const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId')

//   useEffect(() => {
//     const fetchCareerRecommendations = async () => {
//         try {
//             const response = await axios.post('http://localhost:4000/api/career/recommend', {
//                 user_id: userId
//             });

//             // Adjusting the response to fit into interests
//             const recommendedCareers = [
//                 response.data.career1,
//                 response.data.career2,
//                 response.data.career3
//             ];

//             // Update interests with the recommended careers
//             setInterests(prevInterests => [...prevInterests, ...recommendedCareers]);
//             console.log(recommendedCareers);

//         } catch (error) {
//             console.error('Error fetching career recommendations:', error);
//         }
//     };

//     fetchCareerRecommendations();
// }, []);

  useEffect(() => {
    const fetchCareerRecommendations = async () => {
      try {
          const response = await axios.post('http://localhost:4000/api/career/recommend', {
            user_id: userId
          });

        const recommendedCareers = [
          response.data.career1,
          response.data.career2,
          response.data.career3
        ];

        // Filter out duplicates before updating interests
        setInterests(prevInterests => [
          ...new Set([...prevInterests, ...recommendedCareers])
        ]);
      } catch (error) {
        console.error('Error fetching career recommendations:', error);
      }
    };

    fetchCareerRecommendations();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle booking submission
  //   console.log("Booking submitted:", formData);
  //   setIsBookingOpen(false);
  // };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
      <motion.div
          className="min-h-screen bg-white relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
      >
        {/* Decorative corners */}
        <motion.div
            className="absolute md:top-0 top-[-15%] right-0 w-48 h-48 bg_primary_color -rotate-45 transform translate-x-24 -translate-y-24"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: -45 }}
            transition={{ duration: 0.5, type: "spring" }}
        />
        <motion.div
            className="absolute bottom-[-15%] left-0 w-48 h-48 bg_primary_color -rotate-45 transform -translate-x-24 translate-y-24"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: -45 }}
            transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
        />

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-8 relative">
          {/* Header */}
          <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block">
              <div className="w-12 h-12 bg_light_primary_color rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
            </Link>
          </motion.div>

          {/* Results Section */}
          <motion.div className="text-center mt-8" variants={itemVariants}>
            <motion.h1
                className="text-4xl font-bold primary_color mb-4"
                variants={itemVariants}
            >
              Your Result
            </motion.h1>
            <motion.p
                className="text-lg text-gray-600 mb-8"
                variants={itemVariants}
            >
              Your result will show your interested careers
            </motion.p>

            <motion.div
                className="w-48 h-48 mx-auto mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            >
              <img
                  src={Img}
                  alt="Thinking person illustration"
                  className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Interests */}
            <motion.div className="mb-12" variants={containerVariants}>
              <motion.div
                  className="bg_light_primary_color text-white font-semibold py-2 px-6 rounded-full inline-block mb-8"
                  variants={itemVariants}
              >
                Your Interests
              </motion.div>
              <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  variants={containerVariants}
              >
                {interests.map((interest, index) => (
                    <motion.div
                        key={index}
                        className="bg_accent_one rounded-lg p-4 text-blue-950 font-medium res-box transition-colors cursor-pointer"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <Link
                          to={`/roadmap/${interest}`}
                          className="w-full h-full"
                      >
                        {interest}
                      </Link>
                    </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Actions */}
            <motion.div className="space-y-8" variants={containerVariants}>
              <motion.h2
                  className="text-2xl font-bold text-gray-800"
                  variants={itemVariants}
              >
                Still not Satisfied ?
              </motion.h2>
              <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  variants={containerVariants}
              >
                <Link to="/student-browsing">
                  <motion.button
                      onClick={() => setIsBookingOpen(true)}
                      className="bg_accent_one res-box text-blue-950 font-semibold py-2 px-6 rounded-full transition-colors"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Book a Session
                  </motion.button>
                </Link>
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <Link
                      to="/carrer/roadmaps/explore"
                      className="bg_accent_one res-box text-blue-950 font-semibold py-2 px-6 rounded-full transition-colors inline-block"
                  >
                    Explore more Careers
                  </Link>
                </motion.div>
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <Link
                      to="/quiz"
                      className="bg_accent_one res-box text-blue-950 font-semibold py-2 px-6 rounded-full transition-colors inline-block"
                  >
                    Retake Quiz
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Booking Modal */}
          {isBookingOpen && (
              <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              >
                <motion.div
                    className="bg-white rounded-lg p-6 max-w-md w-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 500 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Book a Career Guidance Session
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Name</label>
                      <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                          value={formData.name}
                          onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                          }
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                          type="email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                          value={formData.email}
                          onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                          }
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Date</label>
                      <input
                          type="date"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                          value={formData.date}
                          onChange={(e) =>
                              setFormData({ ...formData, date: e.target.value })
                          }
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Time</label>
                      <input
                          type="time"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                          value={formData.time}
                          onChange={(e) =>
                              setFormData({ ...formData, time: e.target.value })
                          }
                      />
                    </div>
                    <div className="flex gap-4 justify-end">
                      <button
                          type="button"
                          onClick={() => setIsBookingOpen(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <Link to="/student-browsing">
                        <button
                            type="submit"
                            className="bg_primary_color hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                          Book Session
                        </button>
                      </Link>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
          )}
        </div>
      </motion.div>
  );
};

export default Result;