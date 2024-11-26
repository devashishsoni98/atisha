// import React, { useEffect, useState } from "react";
// import {
//   User,
//   Calendar,
//   Briefcase,
//   MessageCircle,
//   LogOut,
//   Award,
//   Users,
//   BookOpen,
//   Mail,
//   MapPin,
//   Phone,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCommonFunctions } from "../../utils/commonFunctions";

// const fadeIn = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const slideIn = {
//   initial: { x: -20, opacity: 0 },
//   animate: { x: 0, opacity: 1 },
//   exit: { x: 20, opacity: 0 },
// };

// export default function CounselorDashboard() {
//   const [activeTab, setActiveTab] = useState("Profile");
//   const [counselorData, setCounselorData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { handleLogout } = useCommonFunctions();

//   const token =
//     useSelector((state) => state.user.token) || localStorage.getItem("token");
//   const userId =
//     useSelector((state) => state.user.id) || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Token:", token, "UserID:", userId);
//     if (!token) {
//       console.error("No token found. Redirecting to signup.");
//       navigate("/signup");
//       return;
//     }

//     const fetchCounselorData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/counselor/${userId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.message || `HTTP error! status: ${response.status}`
//           );
//         }

//         const data = await response.json();
//         console.log("Fetched counselor data:", data);
//         setCounselorData(data);
//       } catch (err) {
//         console.error("Error fetching counselor data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounselorData();
//   }, [token, userId, navigate]);

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Profile":
//         return <ProfileContent counselorData={counselorData} />;
//       case "Schedule":
//         return <ScheduleContent sessions={[]} />;
//       case "Workspace":
//         return <WorkspaceContent pastSessions={[]} />;
//       case "Queries":
//         return <QueriesContent queries={[]} />;
//       default:
//         return <ProfileContent counselorData={counselorData} />;
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <motion.div
//       className="min-h-screen bg-blue-50"
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       variants={fadeIn}
//     >
//       <div className="flex">
//         {/* Sidebar */}
//         <motion.div
//           className="w-64 min-h-screen bg-white p-6 shadow-lg"
//           variants={slideIn}
//         >
//           <div className="flex flex-col items-center mb-8">
//             <motion.img
//               src={
//                 counselorData?.counselor_personal_info.image ||
//                 "/placeholder.svg?height=128&width=128"
//               }
//               alt={counselorData?.name}
//               className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             />
//             <motion.h2
//               className="text-xl font-bold text-blue-800"
//               variants={fadeIn}
//             >
//               {counselorData?.name}
//             </motion.h2>
//             <motion.p className="text-blue-600" variants={fadeIn}>
//               Counselor
//             </motion.p>
//           </div>

//           <nav className="space-y-2">
//             {[
//               { name: "Profile", icon: <User className="w-4 h-4" /> },
//               { name: "Schedule", icon: <Calendar className="w-4 h-4" /> },
//               { name: "Workspace", icon: <Briefcase className="w-4 h-4" /> },
//               { name: "Queries", icon: <MessageCircle className="w-4 h-4" /> },
//             ].map((item) => (
//               <motion.button
//                 key={item.name}
//                 onClick={() => setActiveTab(item.name)}
//                 className={`w-full py-3 px-4 rounded-xl text-left transition-colors flex items-center space-x-3 ${
//                   activeTab === item.name
//                     ? "bg-blue-500 text-white"
//                     : "hover:bg-blue-100 text-gray-700"
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </motion.button>
//             ))}
//             <motion.button
//               onClick={handleLogout}
//               className="w-full py-3 px-4 rounded-xl text-left text-red-500 hover:bg-red-50 mt-4 flex items-center space-x-3"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Logout</span>
//             </motion.button>
//           </nav>
//         </motion.div>

//         {/* Main Content */}
//         <motion.div className="flex-1 p-8" variants={fadeIn}>
//           <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// function ProfileContent({ counselorData }) {
//   return (
//     <motion.div
//       className="space-y-6"
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       variants={fadeIn}
//     >
//       <motion.div
//         className="bg-white shadow-lg rounded-2xl overflow-hidden"
//         variants={slideIn}
//       >
//         <div className="p-8">
//           <motion.h1
//             className="text-3xl font-bold text-gray-800 mb-6"
//             variants={fadeIn}
//           >
//             Counselor Profile
//           </motion.h1>
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Accessing counselor data according to the new structure */}
//             <ProfileItem
//               icon={<User className="text-blue-500" />}
//               label="Full Name"
//               value={counselorData?.name}
//             />
//             <ProfileItem
//               icon={<Mail className="text-blue-500" />}
//               label="Email"
//               value={counselorData?.email}
//             />
//             <ProfileItem
//               icon={<Calendar className="text-blue-500" />}
//               label="Date of Birth"
//               value={new Date(
//                 counselorData?.counselor_personal_info.dob
//               ).toLocaleDateString()}
//             />
//             <ProfileItem
//               icon={<User className="text-blue-500" />}
//               label="Gender"
//               value={counselorData?.counselor_personal_info.gender}
//             />
//             <ProfileItem
//               icon={<MapPin className="text-blue-500" />}
//               label="Location"
//               value={counselorData?.counselor_personal_info.location}
//             />
//             <ProfileItem
//               icon={<Phone className="text-blue-500" />}
//               label="Contact Number"
//               value={counselorData?.counselor_personal_info.contact_number}
//             />
//             <ProfileItem
//               icon={<Award className="text-blue-500" />}
//               label="Degree"
//               value={counselorData?.counselor_education.degree}
//             />
//             {/* <ProfileItem
//               icon={<Award className="text-blue-500" />}
//               label="Degree Image URL"
//               value={counselorData?.counselor_education.degree_image}
//             /> */}
//              <div className='flex items-center p-4 bg-blue-50 rounded-lg'>
//                           <Award className='text-blue-500 mr-4' />
//                           <div>
//                               <p className='text-sm font-medium text-gray-600'>Degree</p>
//                               {/* Display the degree image */}
//                               {counselorData?.counselor_education.degree_image && (
//                                   <>
//                                       <p className='text-lg font-semibold text-gray-800'>{counselorData.counselor_education.degree}</p>
//                                       <img 
//                                           src={counselorData.counselor_education.degree_image} 
//                                           alt='Degree'
//                                           className='mt-2 w-full h-auto rounded-md shadow-md'
//                                       />
//                                   </>
//                               )}
//                           </div>
//                         </div>
//             <ProfileItem
//               icon={<Users className="text-blue-500" />}
//               label="Association"
//               value={counselorData?.counselor_education.association}
//             />
//             <ProfileItem
//               icon={<Calendar className="text-blue-500" />}
//               label="Years of Experience"
//               value={counselorData?.counselor_professional.year_of_experience.toString()}
//             />

//             {/* Conditionally render Career Specialization */}
//             {counselorData?.counselor_professional.career_specialization &&
//               counselorData.counselor_professional.career_specialization
//                 .length > 0 && (
//                 <>
//                   <ProfileItem
//                     icon={<BookOpen className="text-blue-500" />}
//                     label={"Career Specialization"}
//                     value={
//                       counselorData.counselor_professional.career_specialization.join(
//                         ", "
//                       ) || "N/A"
//                     }
//                   />
//                 </>
//               )}

//             {/* Show Bio */}
//             <div className="sm:col-span-full">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Bio</h2>
//               <p>{counselorData?.counselor_professional.bio}</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
// function ScheduleContent({ sessions }) {
//   return (
//     <motion.div
//       className="space-y-6"
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       variants={fadeIn}
//     >
//       <motion.div
//         className="bg-white rounded-2xl p-6 shadow-md"
//         variants={slideIn}
//       >
//         <motion.h2
//           className="text-2xl font-bold text-gray-800 mb-6"
//           variants={fadeIn}
//         >
//           Upcoming Sessions
//         </motion.h2>
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
//           variants={fadeIn}
//         >
//           {sessions.map((session, index) => (
//             <motion.div
//               key={index}
//               className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition-shadow"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <span className="text-2xl mb-2">{session.icon}</span>
//                   <h3 className="font-medium text-blue-700">{session.title}</h3>
//                   <p className="text-sm text-gray-600">{session.type}</p>
//                   <div className="mt-2 text-sm text-gray-600">
//                     <p>{session.time}</p>
//                     <p>{session.date}</p>
//                   </div>
//                 </div>
//                 <motion.button
//                   className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   Join
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }

// function WorkspaceContent({ pastSessions }) {
//   return (
//     <motion.div
//       className="space-y-6"
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       variants={fadeIn}
//     >
//       <motion.div
//         className="bg-white rounded-2xl p-6 shadow-md"
//         variants={slideIn}
//       >
//         <motion.h2
//           className="text-2xl font-bold text-gray-800 mb-6"
//           variants={fadeIn}
//         >
//           Past Sessions
//         </motion.h2>
//         <motion.div className="space-y-4" variants={fadeIn}>
//           {pastSessions.map((session, index) => (
//             <motion.div
//               key={index}
//               className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
//               whileHover={{ scale: 1.02 }}
//             >
//               <div>
//                 <h3 className="font-medium text-blue-700">{session.title}</h3>
//                 <p className="text-sm text-gray-600">with {session.student}</p>
//                 <p className="text-sm text-gray-600">
//                   {session.date} - {session.duration}
//                 </p>
//               </div>
//               <motion.button
//                 className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 View Notes
//               </motion.button>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }

// function QueriesContent({ queries }) {
//   return (
//     <motion.div
//       className="space-y-6"
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       variants={fadeIn}
//     >
//       <motion.div
//         className="bg-white rounded-2xl p-6 shadow-md"
//         variants={slideIn}
//       >
//         <motion.h2
//           className="text-2xl font-bold text-gray-800 mb-6"
//           variants={fadeIn}
//         >
//           Student Queries
//         </motion.h2>
//         <motion.div className="space-y-4" variants={fadeIn}>
//           {queries.map((query, index) => (
//             <motion.div
//               key={index}
//               className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
//               whileHover={{ scale: 1.02 }}
//             >
//               <div>
//                 <h3 className="font-medium text-blue-700">{query.student}</h3>
//                 <p className="text-sm text-gray-600">{query.query}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     query.status === "New"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-yellow-100 text-yellow-800"
//                   }`}
//                 >
//                   {query.status}
//                 </span>
//                 <motion.button
//                   className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   Respond
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }

// function ProfileItem({ icon, label, value }) {
//   return (
//     <motion.div
//       className="flex items-center p-4 bg-blue-50 rounded-lg"
//       variants={slideIn}
//     >
//       <div className="flex-shrink-0 mr-4">{icon}</div>
//       <div>
//         <p className="text-sm font-medium text-gray-600">{label}</p>
//         <p className="text-lg font-semibold text-gray-800">{value}</p>
//       </div>
//     </motion.div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, Briefcase, MessageCircle, LogOut, Award, Users, BookOpen, Mail, MapPin, Phone } from 'lucide-react';

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

export default function CounselorDashboard() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [counselorData, setCounselorData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.user.token) || localStorage.getItem("token");
  const userId = useSelector((state) => state.user.id) || localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to signup.");
      navigate("/signup");
      return;
    }

    const fetchCounselorData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/counselor/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        setCounselorData(data);
      } catch (err) {
        console.error("Error fetching counselor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselorData();
  }, [token, userId, navigate]);

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    // Clear token, navigate to login page, etc.
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileContent counselorData={counselorData} />;
      case "Schedule":
        return <ScheduleContent sessions={[]} />;
      case "Workspace":
        return <WorkspaceContent pastSessions={[]} />;
      case "Queries":
        return <QueriesContent queries={[]} />;
      default:
        return <ProfileContent counselorData={counselorData} />;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <motion.div
      className="min-h-screen bg-blue-50"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          className="w-64 min-h-screen bg-white p-6 shadow-lg"
          variants={slideIn}
        >
          <div className="flex flex-col items-center mb-8">
            <motion.img
              src={
                counselorData?.counselor_personal_info.image ||
                "/placeholder.svg?height=128&width=128"
              }
              alt={counselorData?.name}
              className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4 object-cover"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.h2
              className="text-xl font-bold text-blue-800"
              variants={fadeIn}
            >
              {counselorData?.name}
            </motion.h2>
            <motion.p className="text-blue-600" variants={fadeIn}>
              Counselor
            </motion.p>
          </div>

          <nav className="space-y-2">
            {[
              { name: "Profile", icon: <User className="w-4 h-4" /> },
              { name: "Schedule", icon: <Calendar className="w-4 h-4" /> },
              { name: "Workspace", icon: <Briefcase className="w-4 h-4" /> },
              { name: "Queries", icon: <MessageCircle className="w-4 h-4" /> },
            ].map((item) => (
              <motion.button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full py-3 px-4 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                  activeTab === item.name
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 text-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
            <motion.button
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl text-left text-red-500 hover:bg-red-50 mt-4 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          </nav>
        </motion.div>

        {/* Main Content */}
        <motion.div className="flex-1 p-8" variants={fadeIn}>
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProfileContent({ counselorData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.div
        className="bg-white shadow-lg rounded-2xl overflow-hidden"
        variants={slideIn}
      >
        <div className="p-8">
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-6"
            variants={fadeIn}
          >
            Counselor Profile
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileItem
              icon={<User className="text-blue-500" />}
              label="Full Name"
              value={counselorData?.name}
            />
            <ProfileItem
              icon={<Mail className="text-blue-500" />}
              label="Email"
              value={counselorData?.email}
            />
            <ProfileItem
              icon={<Calendar className="text-blue-500" />}
              label="Date of Birth"
              value={new Date(
                counselorData?.counselor_personal_info.dob
              ).toLocaleDateString()}
            />
            <ProfileItem
              icon={<User className="text-blue-500" />}
              label="Gender"
              value={counselorData?.counselor_personal_info.gender}
            />
            <ProfileItem
              icon={<MapPin className="text-blue-500" />}
              label="Location"
              value={counselorData?.counselor_personal_info.location}
            />
            <ProfileItem
              icon={<Phone className="text-blue-500" />}
              label="Contact Number"
              value={counselorData?.counselor_personal_info.contact_number}
            />
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Award className="text-blue-500 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Degree</p>
                <p className="text-lg font-semibold text-gray-800">
                  {counselorData?.counselor_education.degree}
                </p>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Show Degree
                </button>
              </div>
            </div>
            <ProfileItem
              icon={<Users className="text-blue-500" />}
              label="Association"
              value={counselorData?.counselor_education.association}
            />
            <ProfileItem
              icon={<Calendar className="text-blue-500" />}
              label="Years of Experience"
              value={counselorData?.counselor_professional.year_of_experience.toString()}
            />

            {counselorData?.counselor_professional.career_specialization &&
              counselorData.counselor_professional.career_specialization
                .length > 0 && (
                <ProfileItem
                  icon={<BookOpen className="text-blue-500" />}
                  label="Career Specialization"
                  value={
                    counselorData.counselor_professional.career_specialization.join(
                      ", "
                    ) || "N/A"
                  }
                />
              )}

            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Bio</h2>
              <p className="text-gray-600">{counselorData?.counselor_professional.bio}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dialog for degree image */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
            <img
              src={counselorData?.counselor_education.degree_image}
              alt="Degree Certificate"
              className="w-full h-auto rounded-md shadow-sm"
            />
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ScheduleContent({ sessions }) {
  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-md"
        variants={slideIn}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-6"
          variants={fadeIn}
        >
          Upcoming Sessions
        </motion.h2>
        {sessions.length === 0 ? (
          <p className="text-gray-600">No upcoming sessions scheduled.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={fadeIn}
          >
            {sessions.map((session, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-2xl mb-2">{session.icon}</span>
                    <h3 className="font-medium text-blue-700">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.type}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{session.time}</p>
                      <p>{session.date}</p>
                    </div>
                  </div>
                  <motion.button
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Join
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function WorkspaceContent({ pastSessions }) {
  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-md"
        variants={slideIn}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-6"
          variants={fadeIn}
        >
          Past Sessions
        </motion.h2>
        {pastSessions.length === 0 ? (
          <p className="text-gray-600">No past sessions available.</p>
        ) : (
          <motion.div className="space-y-4" variants={fadeIn}>
            {pastSessions.map((session, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h3 className="font-medium text-blue-700">{session.title}</h3>
                  <p className="text-sm text-gray-600">with {session.student}</p>
                  <p className="text-sm text-gray-600">
                    {session.date} - {session.duration}
                  </p>
                </div>
                <motion.button
                  className="px-3 py-1 bg-blue-100 text-blue-600
rounded-lg hover:bg-blue-200 transition-colors text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  View Notes
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function QueriesContent({ queries }) {
  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-md"
        variants={slideIn}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-6"
          variants={fadeIn}
        >
          Student Queries
        </motion.h2>
        {queries.length === 0 ? (
          <p className="text-gray-600">No student queries at the moment.</p>
        ) : (
          <motion.div className="space-y-4" variants={fadeIn}>
            {queries.map((query, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h3 className="font-medium text-blue-700">{query.student}</h3>
                  <p className="text-sm text-gray-600">{query.query}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      query.status === "New"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {query.status}
                  </span>
                  <motion.button
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Respond
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <motion.div
      className="flex items-center p-4 bg-blue-50 rounded-lg"
      variants={slideIn}
    >
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}

