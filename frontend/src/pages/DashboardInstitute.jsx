import React, { useState } from 'react'
import { Building2, Calendar, PieChart, GraduationCap, LogOut, MapPin, Phone, Mail, Clock, Users, BookOpen, Award, School } from 'lucide-react'

export default function InstituteDashboard() {
  const [activeTab, setActiveTab] = useState('Profile')

  // Static data for demonstration
  const instituteData = {
    name: "Delhi Public School",
    email: "info@dps.edu",
    profileImage: "https://th.bing.com/th/id/OIP.BrnoxxJl9iBDH5aKAz5ckAHaD8?w=337&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    address: "123 Education Lane, New Delhi",
    location: "New Delhi, India",
    contactNumber: "+91 11 2345 6789",
    establishYear: "1972",
    instituteType: "Private",
    studentBody: "5000+",
    subjects: "Science, Commerce, Arts, Computer Science",
    specialPrograms: "International Exchange, STEM Research, Sports Excellence",
    languageOffer: "English, Hindi, French, German, Sanskrit",
    certificateAndAffiliation: "CBSE, IB, Cambridge International",
    stats: {
      state: "Delhi NCR",
      board: "CBSE",
      activities: "993 Activities",
      sessions: "99 Sessions"
    }
  }

  // Static data for activities
  const activities = [
    { title: "Online Quiz", type: "Quiz", icon: "📝", upcoming: 3 },
    { title: "Career Workshop", type: "Workshop", icon: "👥", upcoming: 2 },
    { title: "Guest Seminar", type: "Seminar", icon: "🎓", upcoming: 1 },
    { title: "Tech Webinar", type: "Webinar", icon: "💻", upcoming: 4 }
  ]

  // Static data for analysis
  const analysisData = [
    { title: "Student Performance", type: "pie", value: "78% Above Average" },
    { title: "Attendance Rate", type: "line", value: "92% This Month" },
    { title: "Activity Participation", type: "bar", value: "850 Students" },
    { title: "Academic Progress", type: "column", value: "15% Improvement" }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileContent instituteData={instituteData} />
      case 'Institute Details':
        return <DetailsContent instituteData={instituteData} />
      case 'Activities':
        return <ActivitiesContent activities={activities} />
      case 'Analysis':
        return <AnalysisContent analysisData={analysisData} />
      default:
        return <ProfileContent instituteData={instituteData} />
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4 overflow-hidden">
              <img
                src={instituteData.profileImage}
                alt={instituteData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-blue-800">{instituteData.name}</h2>
            <p className="text-blue-600">Educational Institute</p>
          </div>
          
          <nav className="space-y-2">
            {[
              { name: 'Profile', icon: <Building2 className="w-4 h-4" /> },
              { name: 'Institute Details', icon: <School className="w-4 h-4" /> },
              { name: 'Activities', icon: <Calendar className="w-4 h-4" /> },
              { name: 'Analysis', icon: <PieChart className="w-4 h-4" /> }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full py-3 px-4 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                  activeTab === item.name
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-100 text-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
            <button
              onClick={() => console.log('Logout clicked')}
              className="w-full py-3 px-4 rounded-xl text-left text-red-500 hover:bg-red-50 mt-4 flex items-center space-x-3"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function ProfileContent({ instituteData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Institute Profile</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <StatPill icon={<Building2 />} label="State" value={instituteData.stats.state} />
            <StatPill icon={<Award />} label="Board" value={instituteData.stats.board} />
            <StatPill icon={<Calendar />} label="Activities" value={instituteData.stats.activities} />
            <StatPill icon={<Users />} label="Sessions" value={instituteData.stats.sessions} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileItem icon={<Building2 className="text-blue-500" />} label="Institute Name" value={instituteData.name} />
            <ProfileItem icon={<Mail className="text-blue-500" />} label="Email" value={instituteData.email} />
            <ProfileItem icon={<MapPin className="text-blue-500" />} label="Address" value={instituteData.address} />
            <ProfileItem icon={<Phone className="text-blue-500" />} label="Contact Number" value={instituteData.contactNumber} />
            <ProfileItem icon={<Clock className="text-blue-500" />} label="Established" value={instituteData.establishYear} />
            <ProfileItem icon={<Building2 className="text-blue-500" />} label="Type" value={instituteData.instituteType} />
            <ProfileItem icon={<Users className="text-blue-500" />} label="Student Body" value={instituteData.studentBody} />
            <ProfileItem icon={<Award className="text-blue-500" />} label="Affiliations" value={instituteData.certificateAndAffiliation} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailsContent({ instituteData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Information</h2>
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Subjects Offered</h3>
            <p className="text-gray-700">{instituteData.subjects}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Special Programs</h3>
            <p className="text-gray-700">{instituteData.specialPrograms}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Languages Offered</h3>
            <p className="text-gray-700">{instituteData.languageOffer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivitiesContent({ activities }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-3">{activity.icon}</span>
                <h3 className="font-medium text-blue-700">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.type}</p>
                <div className="mt-4 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {activity.upcoming} Upcoming
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnalysisContent({ analysisData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysisData.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-xl p-6 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-blue-700">{item.title}</h3>
                <p className="text-lg font-semibold text-gray-800 mt-2">{item.value}</p>
              </div>
              <div className="text-blue-500">
                <PieChart className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
      <div className="flex-shrink-0 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

function StatPill({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2">
      <span className="text-blue-500">{icon}</span>
      <span className="text-sm font-medium text-gray-600">{value}</span>
    </div>
  )
}