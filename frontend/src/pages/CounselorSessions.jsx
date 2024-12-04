import React, {useEffect, useState} from 'react'
import { User, Calendar, Briefcase, MessageCircle, LogOut, Star, Award, Users, Video, Mail, MapPin, Phone, BookOpen } from 'lucide-react'
import axios from "axios";

export default function CounselorSessions() {
  const [activeTab, setActiveTab] = useState('Profile')

  // Static data for demonstration
  const counselorData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    profileImage: "/placeholder.svg?height=128&width=128",
    dob: "1980-05-15",
    gender: "Female",
    location: "New York, USA",
    contactNumber: "+1 (555) 123-4567",
    degree: "Ph.D. in Psychology",
    certificate: "Licensed Professional Counselor",
    association: "American Counseling Association",
    yearOfExperience: 12,
    domain: "Career Counseling, Mental Health",
    bio: "Dr. Sarah Johnson is a highly experienced counselor specializing in career guidance and mental health support. With over a decade of experience, she has helped numerous individuals navigate their career paths and overcome personal challenges.",
    stats: {
      rating: "4.9",
      experience: "12 Years",
      activities: "593 Activities",
      sessions: "93 Sessions"
    }
  }

  // Static data for upcoming sessions
  const upcomingSessions = [
    { title: "Career Guidance", type: "1:1 Session", icon: "👥", time: "10:00 AM", date: "Today" },
    { title: "Group Discussion", type: "Team Meeting", icon: "👥", time: "2:00 PM", date: "Today" },
    { title: "Career Workshop", type: "Webinar", icon: "🎯", time: "11:00 AM", date: "Tomorrow" },
    { title: "Mock Interview", type: "1:1 Session", icon: "🎯", time: "3:00 PM", date: "Tomorrow" },
    { title: "Skills Workshop", type: "Webinar", icon: "💡", time: "10:00 AM", date: "Jan 25" },
    { title: "Q&A Session", type: "Group Session", icon: "❓", time: "2:00 PM", date: "Jan 26" }
  ]

  // Static data for queries
  const queries = [
    { student: "Alex Smith", query: "Need advice on choosing a major", status: "New" },
    { student: "Emma Brown", query: "Questions about internship opportunities", status: "In Progress" },
    { student: "Chris Lee", query: "Seeking guidance on graduate school applications", status: "New" }
  ]

  // Static data for past sessions
  const pastSessions = [
    { title: "Resume Review", student: "David Wilson", date: "2024-01-15", duration: "45 minutes" },
    { title: "Career Path Discussion", student: "Sophia Chen", date: "2024-01-12", duration: "60 minutes" },
    { title: "Interview Preparation", student: "Michael Taylor", date: "2024-01-10", duration: "30 minutes" }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileContent counselorData={counselorData} />
      case 'Schedule':
        return <ScheduleContent sessions={upcomingSessions} />
      case 'Workspace':
        return <WorkspaceContent pastSessions={pastSessions} />
      case 'Queries':
        return <QueriesContent queries={queries} />
      default:
        return <ProfileContent counselorData={counselorData} />
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
                src={counselorData.profileImage}
                alt={counselorData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-blue-800">{counselorData.name}</h2>
            <p className="text-blue-600">Counselor</p>
          </div>
          
          <nav className="space-y-2">
            {[
              { name: 'Profile', icon: <User className="w-4 h-4" /> },
              { name: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
              { name: 'Workspace', icon: <Briefcase className="w-4 h-4" /> },
              { name: 'Queries', icon: <MessageCircle className="w-4 h-4" /> }
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

function ProfileContent({ counselorData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Counselor Profile</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <StatPill icon={<Star />} label="Rating" value={counselorData.stats.rating} />
            <StatPill icon={<Award />} label="Experience" value={counselorData.stats.experience} />
            <StatPill icon={<Users />} label="Activities" value={counselorData.stats.activities} />
            <StatPill icon={<Video />} label="Sessions" value={counselorData.stats.sessions} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileItem icon={<User className="text-blue-500" />} label="Full Name" value={counselorData.name} />
            <ProfileItem icon={<Mail className="text-blue-500" />} label="Email" value={counselorData.email} />
            <ProfileItem icon={<Calendar className="text-blue-500" />} label="Date of Birth" value={counselorData.dob} />
            <ProfileItem icon={<User className="text-blue-500" />} label="Gender" value={counselorData.gender} />
            <ProfileItem icon={<MapPin className="text-blue-500" />} label="Location" value={counselorData.location} />
            <ProfileItem icon={<Phone className="text-blue-500" />} label="Contact Number" value={counselorData.contactNumber} />
            <ProfileItem icon={<Briefcase className="text-blue-500" />} label="Degree" value={counselorData.degree} />
            <ProfileItem icon={<Award className="text-blue-500" />} label="Certificate" value={counselorData.certificate} />
            <ProfileItem icon={<Users className="text-blue-500" />} label="Association" value={counselorData.association} />
            <ProfileItem icon={<Calendar className="text-blue-500" />} label="Years of Experience" value={counselorData.yearOfExperience.toString()} />
            <ProfileItem icon={<BookOpen className="text-blue-500" />} label="Domain" value={counselorData.domain} />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Bio</h2>
            <p className="text-gray-600">{counselorData.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScheduleContent({ sessions }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition-shadow"
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
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkspaceContent({ pastSessions }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Past Sessions</h2>
        <div className="space-y-4">
          {pastSessions.map((session, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-blue-700">{session.title}</h3>
                <p className="text-sm text-gray-600">with {session.student}</p>
                <p className="text-sm text-gray-600">{session.date} - {session.duration}</p>
              </div>
              <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                View Notes
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QueriesContent({ queries }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Queries</h2>
        <div className="space-y-4">
          {queries.map((query, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-blue-700">{query.student}</h3>
                <p className="text-sm text-gray-600">{query.query}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  query.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {query.status}
                </span>
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                  Respond
                </button>
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