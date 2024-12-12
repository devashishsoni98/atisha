import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useCommonFunctions } from "../../utils/commonFunctions";
import axios from "axios";
import ActivitiesSchool from './ActivitiesSchool';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  School,
  GraduationCap,
  LogOut,
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Star,
  CheckCircle,
  Circle,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import { OverviewContent } from "./OverviewContent";

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

const DashboardStudent = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleLogout } = useCommonFunctions();
  const tabsRef = useRef(null);

  const token =
    useSelector((state) => state.user.token) || localStorage.getItem("token");
  const userId =
    useSelector((state) => state.user.id) || localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to signup.");
      navigate("/signup");
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/student/${userId}`,
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
        console.log("Fetched student data:", data);
        setStudentData(data);
      } catch (err) {
        console.error("Error fetching student data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [token, userId, navigate]);

  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(
        `[data-tab="${activeTab}"]`
      );
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewContent studentData={studentData} />;
      case "Profile":
        return <ProfileContent studentData={studentData} />;
      case "Interest":
        return <InterestContent interests={studentData?.student_interest} />;
      case "Session":
        return <SessionContent />;
        case 'Activities':
          return <ActivitiesSchool />;
      // case "Activities":
      //   return <ActivitiesContent activities={[]} />;
      case "Events":
        return <EventsContent />;
      default:
        return <OverviewContent studentData={studentData} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-auto md:min-h-screen bg-gray-100"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar for both Mobile and Desktop */}
        <motion.div
          className="w-full md:min-h-screen lg:w-64 bg-white shadow-lg relative"
          variants={slideIn}
        >
          <Link
            to="/onboarding"
            className="absolute top-4 left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          {/* Mobile Header */}
          <div className="lg:hidden bg-blue-500 p-6">
            <div className="relative h-24 mb-16">
              <img
                src={studentData?.student_personal_info.image}
                alt={studentData?.name}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">
                {studentData?.name}
              </h2>
              <p className="text-blue-100">Student</p>
            </div>
          </div>
          {/* Desktop Header */}
          <div className="hidden lg:block p-3 mt-12">
            <img
              src={studentData?.student_personal_info.image}
              alt={studentData?.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-blue-500 text-center">
              {studentData?.name}
            </h2>
            <p className="text-blue-300 text-center">Student</p>
          </div>

          <div className="p-6">
            {/* Horizontal Scrollable Tabs for Mobile, Vertical for Desktop */}
            <nav
              ref={tabsRef}
              className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible whitespace-nowrap lg:whitespace-normal scrollbar-hide"
            >
              {[
                "Overview",
                "Profile",
                "Interest",
                "Session",
                "Events",
                "Activities",
              ].map((tab) => (
                <motion.button
                  key={tab}
                  data-tab={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 py-3 px-4 mr-2 lg:mr-0 lg:mb-2 rounded-xl text-left transition-colors ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100 text-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl text-left text-red-500 hover:bg-red-50 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="flex-1 p-4 lg:p-8" variants={fadeIn}>
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

// const OverviewContent = ({ studentData }) => {
//     return (
//         <motion.div className="space-y-6" initial="initial" animate="animate" exit="exit" variants={fadeIn}>
//             <motion.div className="bg-white rounded-2xl p-6 shadow-md" variants={slideIn}>
//                 <motion.h2 className="text-2xl font-bold mb-6 text-blue-800" variants={fadeIn}>Overview</motion.h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
//                         <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
//                         </div>
//                         <p className="mt-2 text-sm text-gray-600">75% Complete</p>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
//                         <p className="text-2xl font-bold">2</p>
//                         <p className="text-sm text-gray-600">Sessions scheduled this week</p>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
//                         <ul className="list-disc list-inside">
//                             <li>Completed Career Aptitude Test</li>
//                             <li>Attended Virtual Career Fair</li>
//                         </ul>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//                         <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition-colors">Book Session</button>
//                         <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">Update Profile</button>
//                     </div>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

const ProfileContent = ({ studentData }) =>
  studentData ? (
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
            Student Profile
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileItem
              icon={<User className="text-blue-500" />}
              label="Full Name"
              value={studentData.name}
            />
            <ProfileItem
              icon={<Mail className="text-blue-500" />}
              label="Email"
              value={studentData.email}
            />
            <ProfileItem
              icon={<Calendar className="text-blue-500" />}
              label="Date of Birth"
              value={new Date(
                studentData.student_personal_info.dob
              ).toLocaleDateString()}
            />
            <ProfileItem
              icon={<User className="text-blue-500" />}
              label="Gender"
              value={studentData.student_personal_info.gender}
            />
            <ProfileItem
              icon={<MapPin className="text-blue-500" />}
              label="Location"
              value={studentData.student_personal_info.location}
            />
            <ProfileItem
              icon={<Phone className="text-blue-500" />}
              label="Contact Number"
              value={studentData.student_personal_info.contact_number}
            />
            <ProfileItem
              icon={<School className="text-blue-500" />}
              label="School Name"
              value={studentData.student_education.school_name}
            />
            <ProfileItem
              icon={<GraduationCap className="text-blue-500" />}
              label="Class"
              value={studentData.student_education.class.toString()}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  ) : null;

const ProfileItem = ({ icon, label, value }) => (
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

const InterestContent = ({ interests }) => {
  if (!interests) {
    return <div>No interests available</div>;
  }

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
          className="text-2xl font-bold mb-6 text-blue-800"
          variants={fadeIn}
        >
          Interests
        </motion.h2>

        {/* Subjects Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-blue-700">Subjects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.subjects.map((subject) => (
              <motion.div
                key={`subject-${subject.id}`}
                className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.h4 className="font-medium text-blue-700">
                  {subject.subject_name}
                </motion.h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-blue-700">Hobbies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.hobbies.map((hobby) => (
              <motion.div
                key={`hobby-${hobby.id}`}
                className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.h4 className="font-medium text-blue-700">
                  {hobby.hobby_name}
                </motion.h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sports Section */}
        <div>
          <h3 className="text-xl font-semibold text-blue-700">Sports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.sports.map((sport) => (
              <motion.div
                key={`sport-${sport.id}`}
                className="bg-white border-2 border-blue-100 rounded-xl p-4 text-center hover:border-blue-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.h4 className="font-medium text-blue-700">
                  {sport.sport_name}
                </motion.h4>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SessionContent = () => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [sessions, setSessions] = useState([]);
  const userId = useSelector(
    (state) => state.user.userId || localStorage.getItem("userId")
  );

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/counselor-booking/get_bookings_for_student/${userId}`
        );
        console.log(response.data);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [userId]);

  const openReportDialog = async (report) => {
    console.log("report", report);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/session-reports/counselor-booking/${report.id}`
      );
      console.log("report i wanted:", response.data);
      setSelectedReport(response.data);
      setIsReportDialogOpen(true);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const upcomingSessions = sessions.filter(
    (session) => session.status === "approved"
  );
  const attendedSessions = sessions.filter(
    (session) => session.status === "completed"
  );

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
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-2xl font-bold text-blue-800"
            variants={fadeIn}
          >
            Your Sessions
          </motion.h2>
          <Link
            to="/student-browsing"
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-xl transition-colors"
          >
            Book New Session
          </Link>
        </div>

        <motion.div className="space-y-4" variants={fadeIn}>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Upcoming Sessions
          </h3>
          {upcomingSessions.map((session) => (
            <motion.div
              key={session.id}
              className="bg-blue-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              variants={slideIn}
            >
              <div>
                <h4 className="font-medium text-blue-700">
                  Session with {session.counselor.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(session.date)} at {formatTime(session.start_time)}
                </p>
                <p className="text-sm text-gray-600">
                  Duration:{" "}
                  {Math.round(
                    (new Date(session.end_time).getTime() -
                      new Date(session.start_time).getTime()) /
                      (1000 * 60)
                  )}{" "}
                  minutes
                </p>
              </div>
              <motion.button
                className="mt-2 md:mt-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="space-y-4 mt-8" variants={fadeIn}>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Attended Sessions
          </h3>
          {attendedSessions.map((session) => (
            <motion.div
              key={session.id}
              className="bg-green-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              variants={slideIn}
            >
              <div>
                <span>{session.id}</span>
                <h4 className="font-medium text-green-700">
                  Session with {session.counselor.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(session.date)} at {formatTime(session.start_time)}
                </p>
                <p className="text-sm text-gray-600">
                  Counselor: {session.counselor.name}
                </p>
              </div>
              <motion.button
                className="mt-2 md:mt-0 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openReportDialog(session)}
              >
                View Report
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isReportDialogOpen && (
          <ReportDialog
            report={selectedReport}
            onClose={() => setIsReportDialogOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ReportDialog = ({ onClose, report }) => {
  if (!report) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const printReport = () => {
    const printContents = document.getElementById("report-content").innerHTML;
    const originalContents = document.body.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Report</title>");
    printWindow.document.write(
      "<style>body { font-family: Arial, sans-serif; }</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6" id="report-content">
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Counseling Session Report
            </h1>
            <p className="text-gray-600">
              Generated on: {formatDate(new Date().toISOString())}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Session Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Date:</strong> {formatDate(report.session_date)}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {formatTime(report.counselor_bookings.start_time)} -{" "}
                  {formatTime(report.counselor_bookings.end_time)}
                </p>
                <p>
                  <strong>Duration:</strong> {report.duration} minutes
                </p>
              </div>
              <div>
                <p>
                  <strong>Counselor:</strong> {report.counselor_name}
                </p>
                <p>
                  <strong>Student:</strong> {report.student_name}
                </p>
                <p>
                  <strong>Status:</strong> {report.counselor_bookings.status}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Session Overview
            </h2>
            <div>
              <p>
                <strong>Objective:</strong> {report.objective}
              </p>
              <p>
                <strong>Topics Discussed:</strong> {report.topics_discussed}
              </p>
              <p>
                <strong>Student Concerns:</strong> {report.student_concerns}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Assessment</h2>
            <div>
              <p>
                <strong>Strengths Identified:</strong>{" "}
                {report.strengths_identified}
              </p>
              <p>
                <strong>Areas for Improvement:</strong>{" "}
                {report.areas_for_improvement}
              </p>
              <p>
                <strong>Career Alignment:</strong> {report.career_alignment}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Action Items
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              {report.action_items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Recommendations
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              {report.recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Follow-up Plan
            </h2>
            <p>{report.follow_up_plan}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Additional Notes
            </h2>
            <p>{report.additional_notes}</p>
          </section>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => printReport()}
          >
            Print Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ActivitiesContent = ({ activities }) => (
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
        className="text-2xl font-bold mb-6 text-blue-800"
        variants={fadeIn}
      >
        Your Activities
      </motion.h2>
      <motion.div className="space-y-4" variants={fadeIn}>
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
            variants={slideIn}
          >
            <div>
              <h3 className="font-medium text-blue-700">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.date}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activity.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : activity.status === "Upcoming"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {activity.status}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </motion.div>
);

const EventsContent = () => {
  const [events, setEvents] = useState([]);
  const userId = useSelector(
    (state) => state.user.userId || localStorage.getItem("userId")
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEvents([
          {
            id: 1,
            name: "Career Guidance Workshop",
            description:
              "A workshop aimed at providing career guidance to high school students. Topics include career options, skill development, and industry trends.",
            event_type: "workshop",
            start_date: "2024-12-12T13:41:00.000Z",
            end_date: "2024-12-12T15:41:00.000Z",
            duration: 14400,
            capacity: 15,
            link: null,
            status: "scheduled",
            event_mode: "offline",
            organizer_id: 2,
            created_at: "2024-11-27T10:57:06.908Z",
            city: "Jaipur",
            state: "Rajasthan",
          },
          {
            id: 2,
            name: "Mental Health Awareness Seminar",
            description:
              "A seminar focused on raising awareness about mental health issues among students. Topics include stress management, coping strategies, and available resources.",
            event_type: "seminar",
            start_date: "2024-12-15T10:00:00.000Z",
            end_date: "2024-12-15T12:00:00.000Z",
            duration: 7200,
            capacity: 50,
            link: null,
            status: "scheduled",
            event_mode: "online",
            organizer_id: 3,
            created_at: "2024-11-30T09:30:00.000Z",
            city: "Delhi",
            state: "Delhi",
          },
          {
            id: 3,
            name: "Leadership Development Program",
            description:
              "An intensive program designed to develop leadership skills in young adults. Includes workshops, group activities, and guest speakers.",
            event_type: "program",
            start_date: "2024-12-20T09:00:00.000Z",
            end_date: "2024-12-22T17:00:00.000Z",
            duration: 216000,
            capacity: 30,
            link: null,
            status: "scheduled",
            event_mode: "offline",
            organizer_id: 1,
            created_at: "2024-11-28T14:45:00.000Z",
            city: "Mumbai",
            state: "Maharashtra",
          },
          {
            id: 4,
            name: "College Application Workshop",
            description:
              "A workshop that guides students through the college application process, including essay writing and interview preparation.",
            event_type: "workshop",
            start_date: "2025-01-05T14:00:00.000Z",
            end_date: "2025-01-05T16:00:00.000Z",
            duration: 7200,
            capacity: 20,
            link: null,
            status: "scheduled",
            event_mode: "offline",
            organizer_id: 2,
            created_at: "2024-12-01T11:20:00.000Z",
            city: "Bengaluru",
            state: "Karnataka",
          },
          // Past Events
          {
            id: 5,
            name: "Summer Internship Fair 2024",
            description:
              "A fair connecting students with potential summer internship opportunities across various industries.",
            event_type: "fair",
            start_date: "2024-11-10T09:00:00.000Z",
            end_date: "2024-11-10T16:00:00.000Z",
            duration: 25200,
            capacity: 100,
            link: null,
            status: "ended",
            event_mode: null,
            organizer_id: 2,
            created_at: "2024-10-01T08:30:00.000Z",
            city: null,
            state: null,
          },
          {
            id: 6,
            name: "[Past Event] Career Counseling Session - Fall 2023",
            description:
              "[Past Event] A session aimed at helping students choose the right career path based on their interests and skills.",
            event_type: "session",
            start_date: "2023-09-15T10:00:00.000Z",
            end_date: "2023-09-15T12:30:00.000Z",
            duration: 9000,
            capacity: 25,
            link: null,
            status: "ended",
            event_mode: "offline",
            organizer_id: 1,
            created_at: "2023-08-20T14:45:00.000Z",
            city: "Pune",
            state: "Maharashtra",
          },
          {
            id: 7,
            name: "[Past Event] Academic Excellence Workshop",
            description:
              "[Past Event] A workshop focused on study techniques and academic success strategies for high school students.",
            event_type: "workshop",
            start_date: "2023-10-05T14:00:00.000Z",
            end_date: "2023-10-05T16:00:00.000Z",
            duration: 7200,
            capacity: 30,
            link: null,
            status: "ended",
            event_mode: "offline",
            organizer_id: 2,
            created_at: "2023-09-01T11:20:00.000Z",
            city: "Hyderabad",
            state: "Telangana",
          },
        ]);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [userId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.start_date) > new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.start_date) <= new Date()
  );

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
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-2xl font-bold text-blue-800"
            variants={fadeIn}
          >
            Your Events
          </motion.h2>
          <Link
            to="/explore-events"
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-xl transition-colors"
          >
            Explore Events
          </Link>
        </div>

        <motion.div className="space-y-4" variants={fadeIn}>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Upcoming Events
          </h3>
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-blue-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              variants={slideIn}
            >
              <div>
                <h4 className="font-medium text-blue-700">{event.name}</h4>
                <p className="text-sm text-gray-600">
                  {formatDate(event.start_date)} at{" "}
                  {formatTime(event.start_date)}
                </p>
                <p className="text-sm text-gray-600">
                  Duration: {event.duration / 60} minutes
                </p>
                <p className="text-sm text-gray-600">
                  Type: {event.event_type}
                </p>
                <p className="text-sm text-gray-600">
                  Mode: {event.event_mode}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {event.city}, {event.state}
                </p>
              </div>
              <Link to={`/preview-events/${event.id}`}>
                <motion.button
                  className="mt-2 md:mt-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="space-y-4 mt-8" variants={fadeIn}>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Past Events
          </h3>
          {pastEvents.map((event) => (
            <motion.div
              key={event.id}
              className="bg-green-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              variants={slideIn}
            >
              <div>
                <h4 className="font-medium text-green-700">{event.name}</h4>
                <p className="text-sm text-gray-600">
                  {formatDate(event.start_date)} at{" "}
                  {formatTime(event.start_date)}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {event.event_type}
                </p>
                <p className="text-sm text-gray-600">
                  Mode: {event.event_mode}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {event.city}, {event.state}
                </p>
              </div>
              <motion.button
                className="mt-2 md:mt-0 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardStudent;
