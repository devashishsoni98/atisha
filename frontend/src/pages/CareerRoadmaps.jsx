// import React from 'react'

// const CarrerRoadmaps = () => {
//   return (
//     <div>CarrerRoadmaps</div>
//   )
// }

// export default CarrerRoadmaps

import React from 'react';

const CareerRoadmap = () => {
  const categories = [
    {
        title: "Creative Arts Pathways",
        options: [
            { name: "Artist", path: "/artist", description: "Engages in visual arts such as painting, drawing, or sculpture" },
            { name: "Musician", path: "/musician", description: "Plays instruments or sings, creating music" },
            { name: "Writer", path: "/writer", description: "Creates stories, poems, or articles" },
            { name: "Graphic Designer", path: "/graphic-design", description: "Creates visual content for digital and print media" },
            { name: "Animator", path: "/animation", description: "Produces animated content for entertainment and education" },
            { name: "Fashion Designer", path: "/fashion", description: "Designs and creates clothing and accessories" },
            { name: "Interior Designer", path: "/interior-design", description: "Designs and decorates interior spaces" }
        ]
    },
    {
        title: "Science & Technology Tracks",
        options: [
            { name: "Scientist", path: "/scientist", description: "Conducts research and experiments in fields like biology, chemistry, or physics" },
            { name: "Engineer", path: "/engineer", description: "Designs and builds structures, machines, or systems" },
            { name: "Computer Programmer", path: "/programming", description: "Writes code and develops software applications" },
            { name: "Data Scientist", path: "/data-science", description: "Analyzes complex data sets to find patterns and insights" },
            { name: "Research Analyst", path: "/research", description: "Conducts detailed research and analysis in specific fields" },
            { name: "Biotechnologist", path: "/biotech", description: "Applies technology to biological systems and organisms" }
        ]
    },
    {
        title: "Health & Medicine",
        options: [
            { name: "Doctor", path: "/doctor", description: "Provides medical care and treatment to patients" },
            { name: "Nurse", path: "/nurse", description: "Assists doctors and cares for patients in healthcare settings" },
            { name: "Veterinarian", path: "/vet", description: "Cares for animals and treats their illnesses" },
            { name: "Pharmacist", path: "/pharmacist", description: "Dispenses medications and provides pharmaceutical care" },
            { name: "Physical Therapist", path: "/pt", description: "Helps patients recover physical abilities and manage pain" },
            { name: "Dentist", path: "/dentist", description: "Provides oral healthcare and dental treatments" }
        ]
    },
    {
        title: "Public Service & Safety",
        options: [
            { name: "Firefighter", path: "/firefighter", description: "Responds to emergencies and helps extinguish fires" },
            { name: "Police Officer", path: "/police", description: "Enforces laws and ensures community safety" },
            { name: "Paramedic", path: "/paramedic", description: "Provides emergency medical assistance" },
            { name: "Social Worker", path: "/social-work", description: "Helps individuals and communities with various challenges" },
            { name: "Emergency Manager", path: "/emergency", description: "Coordinates emergency response and disaster preparedness" },
            { name: "Public Safety Director", path: "/safety", description: "Oversees public safety programs and initiatives" }
        ]
    },
    {
        title: "Education & Training",
        options: [
            { name: "Teacher", path: "/teacher", description: "Educates students in various subjects at schools" },
            { name: "Coach", path: "/coach", description: "Trains athletes in sports or physical activities" },
            { name: "Professor", path: "/professor", description: "Teaches and conducts research at higher education institutions" },
            { name: "Educational Consultant", path: "/edu-consultant", description: "Advises on educational strategies and improvements" },
            { name: "Special Education Teacher", path: "/special-ed", description: "Works with students who have special needs" },
            { name: "Corporate Trainer", path: "/corporate-training", description: "Provides professional development training in businesses" }
        ]
    },
    {
        title: "Business & Finance",
        options: [
            { name: "Entrepreneur", path: "/entrepreneur", description: "Starts and manages their own business" },
            { name: "Accountant", path: "/accountant", description: "Manages financial records and helps with budgeting" },
            { name: "Financial Analyst", path: "/financial-analyst", description: "Analyzes financial data and makes recommendations" },
            { name: "Investment Banker", path: "/investment-banking", description: "Handles complex financial transactions and investments" },
            { name: "Marketing Manager", path: "/marketing", description: "Develops and implements marketing strategies" },
            { name: "Human Resources Manager", path: "/hr", description: "Manages workplace policies and employee relations" }
        ]
    },
    {
        title: "Transportation",
        options: [
            { name: "Pilot", path: "/pilot", description: "Operates aircraft for travel or cargo transport" },
            { name: "Truck Driver", path: "/truck-driver", description: "Transports goods over long distances by road" },
            { name: "Ship Captain", path: "/captain", description: "Commands vessels for maritime transportation" },
            { name: "Train Engineer", path: "/train", description: "Operates trains for passenger or freight transport" },
            { name: "Air Traffic Controller", path: "/atc", description: "Manages aircraft traffic at airports" },
            { name: "Logistics Manager", path: "/logistics", description: "Coordinates transportation and supply chain operations" }
        ]
    },
    {
        title: "Environment & Nature",
        options: [
            { name: "Environmental Scientist", path: "/environmental", description: "Studies the environment and works on conservation efforts" },
            { name: "Zoologist", path: "/zoologist", description: "Studies animals and their behaviors in the wild or in captivity" },
            { name: "Marine Biologist", path: "/marine-bio", description: "Studies ocean life and marine ecosystems" },
            { name: "Conservation Officer", path: "/conservation", description: "Protects natural resources and wildlife" },
            { name: "Climate Scientist", path: "/climate", description: "Studies climate patterns and environmental changes" },
            { name: "Forest Ranger", path: "/ranger", description: "Manages and protects forest areas and wildlife" }
        ]
    }
];


  return (
    <div className="min-h-screen p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Career Roadmaps</h1>
          <p className="text-gray-600 text-lg">
            SIH is a community effort to create roadmaps, guides and other educational content to
            help guide students in picking up a path and guide their careers.
          </p>
        </div>

        {/* Categories */}
        {categories.map((category, idx) => (
          <div key={idx} className="mb-12">
            {/* Category Header */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-orange-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-orange-300 px-6 py-2 text-white rounded-full text-lg font-medium">
                  {category.title}
                </span>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {category.options.map((option, index) => (
                <div 
                  key={index}
                  className="bg-orange-50 hover:bg-orange-100 transition-colors duration-300 
                           rounded-lg p-6 cursor-pointer border border-orange-100
                           flex items-center justify-between"
                >
                  <span className="text-gray-800 font-medium">{option.name}</span>
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRoadmap;