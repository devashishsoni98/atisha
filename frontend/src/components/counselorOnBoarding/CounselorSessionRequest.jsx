import React from 'react'
import { User, Clock } from 'lucide-react'

const SessionRequestsTab =()=> {
  const sessionRequests = [
    { student: "Alex Smith", type: "Career Guidance", time: "3:00 PM", date: "Tomorrow" },
    { student: "Emma Brown", type: "Mock Interview", time: "11:00 AM", date: "Jan 24" },
    { student: "Chris Lee", type: "Resume Review", time: "2:00 PM", date: "Jan 25" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Session Requests</h2>
      <div className="space-y-4">
        {sessionRequests.map((request, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6 shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-blue-700">{request.student}</h3>
              <p className="text-sm text-gray-600">{request.type}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                <span>{request.date} at {request.time}</span>
              </div>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                Accept
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SessionRequestsTab