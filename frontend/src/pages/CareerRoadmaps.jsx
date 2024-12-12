import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CareerRoadmap = () => {
  const categories = [
    {
      title: "Most Trending Pathways",
      options: [
        {
          name: "Engineer",
          path: `/roadmap/engineer`,
          description:
            "Engages in visual arts such as painting, drawing, or sculpture",
        },
        {
          name: "Doctor",
          path: "/roadmap/doctor",
          description: "Plays instruments or sings, creating music",
        },
        {
          name: "CA",
          path: "/roadmap/ca",
          description: "Plays instruments or sings, creating music",
        },
        {
          name: "IAS",
          path: "/roadmap/ias",
          description: "Plays instruments or sings, creating music",
        },
      ],
    },
    {
      title: "Creative Arts Pathways",
      options: [
        {
          name: "Artist",
          path: "/artist",
          description:
            "Engages in visual arts such as painting, drawing, or sculpture",
        },
        {
          name: "Musician",
          path: "/musician",
          description: "Plays instruments or sings, creating music",
        },
        {
          name: "Writer",
          path: "/writer",
          description: "Creates stories, poems, or articles",
        },
        {
          name: "Graphic Designer",
          path: "/graphic-design",
          description: "Creates visual content for digital and print media",
        },
        {
          name: "Animator",
          path: "/animation",
          description:
            "Produces animated content for entertainment and education",
        },
        {
          name: "Fashion Designer",
          path: "/fashion",
          description: "Designs and creates clothing and accessories",
        },
        {
          name: "Interior Designer",
          path: "/interior-design",
          description: "Designs and decorates interior spaces",
        },
      ],
    },
    {
      title: "Science & Technology Tracks",
      options: [
        {
          name: "Scientist",
          path: "/scientist",
          description:
            "Conducts research and experiments in fields like biology, chemistry, or physics",
        },
        {
          name: "Engineer",
          path: "/engineer",
          description: "Designs and builds structures, machines, or systems",
        },
        {
          name: "Computer Programmer",
          path: "/programming",
          description: "Writes code and develops software applications",
        },
        {
          name: "Data Scientist",
          path: "/data-science",
          description:
            "Analyzes complex data sets to find patterns and insights",
        },
        {
          name: "Research Analyst",
          path: "/research",
          description:
            "Conducts detailed research and analysis in specific fields",
        },
        {
          name: "Biotechnologist",
          path: "/biotech",
          description: "Applies technology to biological systems and organisms",
        },
      ],
    },
    {
      title: "Health & Medicine",
      options: [
        {
          name: "Doctor",
          path: "/doctor",
          description: "Provides medical care and treatment to patients",
        },
        {
          name: "Nurse",
          path: "/nurse",
          description:
            "Assists doctors and cares for patients in healthcare settings",
        },
        {
          name: "Veterinarian",
          path: "/vet",
          description: "Cares for animals and treats their illnesses",
        },
        {
          name: "Pharmacist",
          path: "/pharmacist",
          description: "Dispenses medications and provides pharmaceutical care",
        },
        {
          name: "Physical Therapist",
          path: "/pt",
          description:
            "Helps patients recover physical abilities and manage pain",
        },
        {
          name: "Dentist",
          path: "/dentist",
          description: "Provides oral healthcare and dental treatments",
        },
      ],
    },
    {
      title: "Public Service & Safety",
      options: [
        {
          name: "Firefighter",
          path: "/firefighter",
          description: "Responds to emergencies and helps extinguish fires",
        },
        {
          name: "Police Officer",
          path: "/police",
          description: "Enforces laws and ensures community safety",
        },
        {
          name: "Paramedic",
          path: "/paramedic",
          description: "Provides emergency medical assistance",
        },
        {
          name: "Social Worker",
          path: "/social-work",
          description:
            "Helps individuals and communities with various challenges",
        },
        {
          name: "Emergency Manager",
          path: "/emergency",
          description:
            "Coordinates emergency response and disaster preparedness",
        },
        {
          name: "Public Safety Director",
          path: "/safety",
          description: "Oversees public safety programs and initiatives",
        },
      ],
    },
    {
      title: "Education & Training",
      options: [
        {
          name: "Teacher",
          path: "/teacher",
          description: "Educates students in various subjects at schools",
        },
        {
          name: "Coach",
          path: "/coach",
          description: "Trains athletes in sports or physical activities",
        },
        {
          name: "Professor",
          path: "/professor",
          description:
            "Teaches and conducts research at higher education institutions",
        },
        {
          name: "Educational Consultant",
          path: "/edu-consultant",
          description: "Advises on educational strategies and improvements",
        },
        {
          name: "Special Education Teacher",
          path: "/special-ed",
          description: "Works with students who have special needs",
        },
        {
          name: "Corporate Trainer",
          path: "/corporate-training",
          description:
            "Provides professional development training in businesses",
        },
      ],
    },
    {
      title: "Business & Finance",
      options: [
        {
          name: "Entrepreneur",
          path: "/entrepreneur",
          description: "Starts and manages their own business",
        },
        {
          name: "Accountant",
          path: "/accountant",
          description: "Manages financial records and helps with budgeting",
        },
        {
          name: "Financial Analyst",
          path: "/financial-analyst",
          description: "Analyzes financial data and makes recommendations",
        },
        {
          name: "Investment Banker",
          path: "/investment-banking",
          description: "Handles complex financial transactions and investments",
        },
        {
          name: "Marketing Manager",
          path: "/marketing",
          description: "Develops and implements marketing strategies",
        },
        {
          name: "Human Resources Manager",
          path: "/hr",
          description: "Manages workplace policies and employee relations",
        },
      ],
    },
    {
      title: "Transportation",
      options: [
        {
          name: "Pilot",
          path: "/pilot",
          description: "Operates aircraft for travel or cargo transport",
        },
        {
          name: "Truck Driver",
          path: "/truck-driver",
          description: "Transports goods over long distances by road",
        },
        {
          name: "Ship Captain",
          path: "/captain",
          description: "Commands vessels for maritime transportation",
        },
        {
          name: "Train Engineer",
          path: "/train",
          description: "Operates trains for passenger or freight transport",
        },
        {
          name: "Air Traffic Controller",
          path: "/atc",
          description: "Manages aircraft traffic at airports",
        },
        {
          name: "Logistics Manager",
          path: "/logistics",
          description: "Coordinates transportation and supply chain operations",
        },
      ],
    },
    {
      title: "Environment & Nature",
      options: [
        {
          name: "Environmental Scientist",
          path: "/environmental",
          description:
            "Studies the environment and works on conservation efforts",
        },
        {
          name: "Zoologist",
          path: "/zoologist",
          description:
            "Studies animals and their behaviors in the wild or in captivity",
        },
        {
          name: "Marine Biologist",
          path: "/marine-bio",
          description: "Studies ocean life and marine ecosystems",
        },
        {
          name: "Conservation Officer",
          path: "/conservation",
          description: "Protects natural resources and wildlife",
        },
        {
          name: "Climate Scientist",
          path: "/climate",
          description: "Studies climate patterns and environmental changes",
        },
        {
          name: "Forest Ranger",
          path: "/ranger",
          description: "Manages and protects forest areas and wildlife",
        },
      ],
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingShapeVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  return (
    // <motion.div
    //   className="min-h-screen p-6"
    //   initial="hidden"
    //   animate="visible"
    //   variants={containerVariants}
    // >
    //   <div className="mx-auto">
    //     {/* Header */}
    //     <motion.div className="text-center mb-12" variants={itemVariants}>
    //       <h1 className="text-4xl font-bold text-[#606060] mb-4">
    //         Career Roadmaps
    //       </h1>
    //       <p className="text-gray-600 text-lg">
    //         SIH is a community effort to create roadmaps, guides and other
    //         educational content to help guide students in picking up a path and
    //         guide their careers.
    //       </p>
    //     </motion.div>

    //     {/* Categories */}
    //     {categories.map((category, idx) => (
    //       <motion.div key={idx} className="mb-12" variants={itemVariants}>
    //         {/* Category Header */}
    //         <div className="relative mb-8">
    //           <div className="absolute inset-0 flex items-center">
    //             <div className="w-full border-t-2 accent_two"></div>
    //           </div>
    //           <div className="relative flex justify-center">
    //             <motion.span
    //               className="bg_primary_color px-6 py-2 text-white rounded-full text-lg font-medium"
    //               whileHover={{ scale: 1.05 }}
    //               whileTap={{ scale: 0.95 }}
    //             >
    //               {category.title}
    //             </motion.span>
    //           </div>
    //         </div>

    //         {/* Bento Grid */}
    //         {/* <motion.div 
    //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
    //           variants={containerVariants}
    //         >
    //           {category.options.map((option, index) => (
    //             <motion.a 
    //               key={index}
    //               className="bg-[#e2e2e2] hover:bg_primary_color transition-colors duration-300 
    //                          rounded-lg p-6 cursor-pointer border border_primary_color
    //                          flex items-center justify-between"
    //               variants={itemVariants}
    //               whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    //               whileTap={{ scale: 0.97 }}
    //               href={`/roadmap/${option.name}`}
    //             >
    //               <span className="text-dark_gray font-medium">{option.name}</span>
    //               <motion.svg
    //                 className="w-5 h-5 primary_color"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 initial={{ x: -5 }}
    //                 whileHover={{ x: 0 }}
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M9 5l7 7-7 7"
    //                 />
    //               </motion.svg>
    //             </motion.a>
    //           ))}
    //         </motion.div> */}
    //         <motion.div
    //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
    //           variants={containerVariants}
    //         >
    //           {category.options.map((option, index) => (
    //             <motion.div
    //               key={index}
    //               className="bg-[#e2e2e2] hover:bg_primary_color transition-colors duration-300 
    //              rounded-lg  cursor-pointer border border_primary_color
    //              flex items-center justify-between"
    //               variants={itemVariants}
    //               whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    //               whileTap={{ scale: 0.97 }}
    //             >
    //               <Link
    //                 to={`/roadmap/${option.name}`}
    //                 className="flex items-center justify-between w-full h-full p-6"
    //               >
    //                 <span className="text-dark_gray font-medium">
    //                   {option.name}
    //                 </span>
    //                 <motion.svg
    //                   className="w-5 h-5 primary_color"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                   initial={{ x: -5 }}
    //                   whileHover={{ x: 0 }}
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M9 5l7 7-7 7"
    //                   />
    //                 </motion.svg>
    //               </Link>
    //             </motion.div>
    //           ))}
    //         </motion.div>
    //       </motion.div>
    //     ))}
    //   </div>
    // </motion.div>
    <motion.div
    className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden relative"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    {/* Floating shapes */}
    <motion.div
      className="absolute top-10 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-50"
      variants={floatingShapeVariants}
      animate="animate"
    />
    <motion.div
      className="absolute bottom-20 right-20 w-20 h-20 bg-blue-300 rounded-lg opacity-50 rotate-45"
      variants={floatingShapeVariants}
      animate="animate"
    />
    <motion.div
      className="absolute top-1/3 right-1/4 w-12 h-12 border-4 border-blue-400 rounded-full opacity-50"
      variants={floatingShapeVariants}
      animate="animate"
    />

    <div className="mx-auto max-w-7xl relative z-10">
      {/* Header */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-5xl font-bold text-blue-800 mb-4">
          Career Roadmaps
        </h1>
        <p className="text-blue-600 text-xl max-w-3xl mx-auto">
          SIH is a community effort to create roadmaps, guides and other
          educational content to help guide students in picking up a path and
          guide their careers.
        </p>
      </motion.div>

      {/* Interactive compass */}
      <motion.div
        className="w-24 h-24 mx-auto mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="text-blue-600">
          <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Categories */}
      {categories.map((category, idx) => (
        <motion.div key={idx} className="mb-12" variants={itemVariants}>
          {/* Category Header */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-blue-200"></div>
            </div>
            <div className="relative flex justify-center">
              <motion.span
                className="bg-blue-600 px-6 py-2 text-white rounded-full text-lg font-medium shadow-md"
                whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
                whileTap={{ scale: 0.95 }}
              >
                {category.title}
              </motion.span>
            </div>
          </div>

          {/* Bento Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {category.options.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white hover:bg-blue-50 transition-all duration-300 
                           rounded-lg shadow-md overflow-hidden group"
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={option.path}
                  className="flex items-center justify-between w-full h-full p-6 relative"
                >
                  <span className="text-blue-800 font-medium z-10">{option.name}</span>
                  <motion.svg
                    className="w-5 h-5 text-blue-600 z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: -5 }}
                    whileHover={{ x: 0 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                  <motion.div
                    className="absolute inset-0 bg-blue-100 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}

      {/* Interactive footer element */}
      <motion.div
        className="text-center mt-12 p-6 bg-blue-600 text-white rounded-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="text-2xl font-bold mb-2">Ready to start your journey?</h2>
        <p className="mb-4">Explore our roadmaps and find your perfect career path!</p>
        <motion.button
          className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium"
          whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  </motion.div>
  );
};

export default CareerRoadmap;
