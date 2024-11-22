import React from 'react'
import { Clock } from 'lucide-react'

const TodayScheduleTab =()=> {
  const todaySchedule = [
    { time: "09:00 AM", title: "Team Meeting", duration: "1 hour" },
    { time: "11:00 AM", title: "Career Guidance Session", duration: "45 minutes" },
    { time: "02:00 PM", title: "Workshop Preparation", duration: "2 hours" },
    { time: "04:30 PM", title: "Student Consultation", duration: "30 minutes" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Today's Schedule</h2>
      <div className="space-y-4">
        {todaySchedule.map((item, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6 shadow-md flex items-center">
            <Clock className="mr-4 h-6 w-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-blue-700">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.time} - {item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodayScheduleTab