import React from 'react'
import { Calendar, Video } from 'lucide-react'

export function UpcomingSessionsTab() {
  const upcomingSessions = [
    { title: "Career Guidance", type: "1:1 Session", time: "10:00 AM", date: "Today" },
    { title: "Group Discussion", type: "Team Meeting", time: "2:00 PM", date: "Today" },
    { title: "Career Workshop", type: "Webinar", time: "11:00 AM", date: "Tomorrow" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Upcoming Sessions</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingSessions.map((session, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{session.title}</h3>
                <p className="text-sm text-gray-600">{session.type}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{session.date} at {session.time}</span>
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                <Video className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

