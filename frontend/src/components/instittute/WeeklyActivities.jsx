import React from 'react'
import { Calendar, Star, Clock, User, Mail } from 'lucide-react'

const WeeklyActivities =()=> {
  const activities = [
    { title: "Career Fair", date: "2024-01-25", time: "10:00 AM - 2:00 PM", description: "Explore various career opportunities with local employers." },
    { title: "College Application Workshop", date: "2024-01-27", time: "3:00 PM - 5:00 PM", description: "Get help with your college applications and essays." },
    { title: "Study Skills Seminar", date: "2024-01-29", time: "4:00 PM - 5:30 PM", description: "Learn effective study techniques to improve your academic performance." },
  ]

  const pastActivities = [
    { title: "Mock Interviews", date: "2024-01-20", feedback: "Students found the experience very helpful in preparing for real interviews." },
    { title: "SAT Prep Course", date: "2024-01-18", feedback: "Participants reported feeling more confident about taking the SAT." },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800">Weekly Activities</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-700">Upcoming Activities</h3>
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-blue-800">{activity.title}</h4>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{activity.date}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{activity.time}</span>
              </div>
              <p className="text-gray-600">{activity.description}</p>
            </div>
            <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Register
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-700">Past Activities Recap</h3>
        {pastActivities.map((activity, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h4 className="text-lg font-semibold text-blue-800">{activity.title}</h4>
            <p className="text-gray-600 mt-2">{activity.date}</p>
            <p className="text-gray-700 mt-2"><Star className="inline h-4 w-4 text-yellow-500 mr-1" /> {activity.feedback}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Resources and Materials</h3>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Download Activity Guide
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
            View All Resources
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Contact Information</h3>
        <div className="flex items-center space-x-2 text-gray-600">
          <User className="h-5 w-5" />
          <span>Activities Coordinator: Jane Smith</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 mt-2">
          <Mail className="h-5 w-5" />
          <span>Email: jane.smith@educonnect.com</span>
        </div>
      </div>
    </div>
  )
}

export default WeeklyActivities