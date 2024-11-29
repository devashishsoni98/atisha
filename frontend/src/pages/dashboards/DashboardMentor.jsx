import React, { useEffect, useState } from 'react';
import { User, Calendar, Briefcase, MessageCircle, LogOut, Award, Users, BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 }
};

function ProfileItem({ icon, label, value }) {
  return (
    <motion.div className="flex items-center p-4 bg-blue-50 rounded-lg" variants={slideIn}>
      <div className="flex-shrink-0 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}

function ProfileContent({ mentorData }) {
  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
      <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden" variants={slideIn}>
        <div className="p-8">
          <motion.h1 className="text-3xl font-bold text-gray-800 mb-6" variants={fadeIn}>Mentor Profile</motion.h1>
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileItem icon={<User className="text-blue-500" />} label="Full Name" value={mentorData?.user.name} />
            <ProfileItem icon={<Mail className="text-blue-500" />} label="Email" value={mentorData?.user.email} />
            <ProfileItem icon={<BookOpen className="text-blue-500" />} label="Expertise" value={mentorData?.expertise} />
            <ProfileItem icon={<Calendar className="text-blue-500" />} label="Joined" value={new Date(mentorData?.created_at).toLocaleDateString()} />
            {mentorData?.mentor_education.map((edu, index) => (
              <React.Fragment key={index}>
                <ProfileItem icon={<Award className="text-blue-500" />} label="Degree" value={edu.degree} />
                <ProfileItem icon={<Users className="text-blue-500" />} label="Institution" value={edu.institution} />
              </React.Fragment>
            ))}
            {mentorData?.mentor_professional.map((prof, index) => (
              <React.Fragment key={index}>
                <ProfileItem icon={<Briefcase className="text-blue-500" />} label="Professional Type" value={prof.type} />
                <ProfileItem icon={<Calendar className="text-blue-500" />} label="Years of Experience" value={prof.year_of_experience.toString()} />
              </React.Fragment>
            ))}
          </div>
          <motion.div className="mt-6" variants={fadeIn}>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Bio</h2>
            <p className="text-gray-600">{mentorData?.bio}</p>
          </motion.div>
          {mentorData?.certifications && mentorData.certifications.length > 0 && (
            <motion.div className="mt-6" variants={fadeIn}>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h2>
              <div className="flex flex-wrap gap-4">
                {mentorData.certifications.map((cert, index) => (
                  <img key={index} src={cert} alt={`Certification ${index + 1}`} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScheduleContent() {
  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
      <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
        <motion.h2 className="text-2xl font-bold text-gray-800 mb-6" variants={fadeIn}>Upcoming Sessions</motion.h2>
        <p>No upcoming sessions scheduled.</p>
      </motion.div>
    </motion.div>
  );
}

function WorkspaceContent() {
  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
      <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
        <motion.h2 className="text-2xl font-bold text-gray-800 mb-6" variants={fadeIn}>Workspace</motion.h2>
        <p>Your workspace content goes here.</p>
      </motion.div>
    </motion.div>
  );
}

function QueriesContent() {
  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
      <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
        <motion.h2 className="text-2xl font-bold text-gray-800 mb-6" variants={fadeIn}>Student Queries</motion.h2>
        <p>No pending queries at the moment.</p>
      </motion.div>
    </motion.div>
  );
}

export default function DashboardMentor() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/mentor/8');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched mentor data:", data);
        setMentorData(data);
      } catch (err) {
        console.error("Error fetching mentor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileContent mentorData={mentorData} />;
      case 'Schedule':
        return <ScheduleContent />;
      case 'Workspace':
        return <WorkspaceContent />;
      case 'Queries':
        return <QueriesContent />;
      default:
        return <ProfileContent mentorData={mentorData} />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div className="min-h-screen bg-blue-50" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
      <div className="flex">
        {/* Sidebar */}
        <motion.div className="w-64 min-h-screen bg-white p-6 shadow-lg" variants={slideIn}>
          <div className="flex flex-col items-center mb-8">
            <motion.img
              src="/placeholder.svg?height=128&width=128"
              alt={mentorData?.user.name}
              className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
            <motion.h2 className="text-xl font-bold text-blue-800" variants={fadeIn}>{mentorData?.user.name}</motion.h2>
            <motion.p className="text-blue-600" variants={fadeIn}>Mentor</motion.p>
          </div>
          
          <nav className="space-y-2">
            {[
              { name: 'Profile', icon: <User className="w-4 h-4" /> },
              { name: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
              { name: 'Workspace', icon: <Briefcase className="w-4 h-4" /> },
              { name: 'Queries', icon: <MessageCircle className="w-4 h-4" /> }
            ].map((item) => (
              <motion.button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full py-3 px-4 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                  activeTab === item.name
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-100 text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
            <motion.button
              onClick={() => console.log('Logout clicked')}
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
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

