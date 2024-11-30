import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MapPin, BookOpen, Award, School, Calendar, Briefcase, MessageCircle, Bell, LogOut } from 'lucide-react';

// Animation variants
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

// ProfileItem component
function ProfileItem({ icon, label, value }) {
  return (
    <motion.div className="flex items-center p-4 bg-blue-50 rounded-lg" variants={slideIn}>
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value || 'N/A'}</p>
      </div>
    </motion.div>
  );
}

// ProfileContent component
function ProfileContent({ mentorData }) {
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
            Mentor Profile
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileItem
              icon={<User className="text-blue-500" />}
              label="Full Name"
              value={mentorData?.user?.name}
            />
            <ProfileItem
              icon={<Mail className="text-blue-500" />}
              label="Email"
              value={mentorData?.user?.email}
            />
            <ProfileItem
              icon={<MapPin className="text-blue-500" />}
              label="Location"
              value={mentorData?.location}
            />
            <ProfileItem
              icon={<BookOpen className="text-blue-500" />}
              label="Expertise"
              value={mentorData?.expertise}
            />
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Award className="text-blue-500 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Degree</p>
                <p className="text-lg font-semibold text-gray-800">
                  {mentorData?.mentor_education[0]?.degree}
                </p>
               
              </div>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Award className="text-blue-500 mr-4 flex-shrink-0" />
              <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Certifications</p>
              <button
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Show Certifications
                </button>
              </div>
            </div>
            <ProfileItem
              icon={<School className="text-blue-500" />}
              label="Institution"
              value={mentorData?.mentor_education[0]?.institution}
            />
            <ProfileItem
              icon={<School className="text-blue-500" />}
              label="Institution"
              value={mentorData?.mentor_education[0]?.institution}
            />
            <ProfileItem
              icon={<Calendar className="text-blue-500" />}
              label="Years of Experience"
              value={mentorData?.mentor_professional[0]?.year_of_experience.toString()}
            />
            <ProfileItem
              icon={<Briefcase className="text-blue-500" />}
              label="Professional Type"
              value={mentorData?.mentor_professional[0]?.type}
            />
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Bio</h2>
              <p className="text-gray-600">{mentorData?.bio}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Certifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {mentorData?.certifications.map((cert, index) => (
                <img
                  key={index}
                  src={cert}
                  alt={`Certification ${index + 1}`}
                  className="w-full h-auto rounded-md shadow-sm"
                />
              ))}
            </div>
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

// ScheduleContent component
function ScheduleContent() {
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
        <p className="text-gray-600">No upcoming sessions scheduled.</p>
      </motion.div>
    </motion.div>
  );
}

// WorkspaceContent component
function WorkspaceContent() {
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
        <p className="text-gray-600">No past sessions available.</p>
      </motion.div>
    </motion.div>
  );
}

function EventsContent() {
  const [invitations, setInvitations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulated API calls
    const fetchInvitations = async () => {
      // Replace with actual API call
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, name: 'Career Fair 2024', date: '2024-03-15', organizer: 'University XYZ' },
        { id: 2, name: 'STEM Workshop', date: '2024-04-02', organizer: 'Tech Institute' },
        { id: 3, name: 'College Admissions Seminar', date: '2024-05-10', organizer: 'Education Board' },
      ]), 1000));
      setInvitations(response);
    };

    const fetchNotifications = async () => {
      // Replace with actual API call
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, title: 'Event Reminder', message: 'Career Fair 2024 is tomorrow!', date: '2024-03-14' },
        { id: 2, title: 'New Participant', message: 'John Doe has registered for your STEM Workshop', date: '2024-03-20' },
        { id: 3, title: 'Event Update', message: 'The venue for College Admissions Seminar has changed', date: '2024-04-01' },
      ]), 1000));
      setNotifications(response);
    };

    fetchInvitations();
    fetchNotifications();
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        variants={fadeIn}
      >
        Events
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white shadow-lg rounded-2xl overflow-hidden"
          variants={slideIn}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Invitations</h2>
            <div className="space-y-4 px-2 max-h-96 overflow-y-auto">
              {invitations.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-blue-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-blue-700">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.organizer}</p>
                  <p className="text-sm text-gray-600">Date: {event.date}</p>
                  <div className="mt-2 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      Accept
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                      Decline
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl overflow-hidden"
          variants={slideIn}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Notifications</h2>
            <div className="space-y-4 px-2 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className="bg-blue-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-blue-700">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-white shadow-lg rounded-2xl overflow-hidden"
        variants={slideIn}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Request New Event</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main MentorDashboard component
export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [mentorData, setMentorData] = useState(null);
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

    const fetchMentorData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/mentor/${userId}`,
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
        setMentorData(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching mentor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [token, userId, navigate]);

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    // Clear token, navigate to login page, etc.
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileContent mentorData={mentorData} />;
      case "Schedule":
        return <ScheduleContent />;
      case "Workspace":
        return <WorkspaceContent />;
        case "Events":
        return <EventsContent />;
      default:
        return <ProfileContent mentorData={mentorData} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
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
              src={mentorData?.image_url || "/placeholder.svg?height=128&width=128"}
              alt={mentorData?.user?.name}
              className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4 object-cover"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.h2
              className="text-xl font-bold text-blue-800"
              variants={fadeIn}
            >
              {mentorData?.user?.name}
            </motion.h2>
            <motion.p className="text-blue-600" variants={fadeIn}>
              Mentor
            </motion.p>
          </div>
          
          <nav className="space-y-2">
            {[
              { name: "Profile", icon: <User className="w-4 h-4" /> },
              { name: "Schedule", icon: <Calendar className="w-4 h-4" /> },
              { name: "Events", icon: <Bell className="w-4 h-4" /> },
              { name: "Workspace", icon: <Briefcase className="w-4 h-4" /> },
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

