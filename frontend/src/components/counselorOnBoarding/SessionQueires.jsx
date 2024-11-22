// React import removed as it's not used in this component
import { MessageCircle } from 'lucide-react'

export function CounselorStudentQueries() {
  const studentQueries = [
    { student: "David Wilson", query: "Need advice on choosing a major", status: "New" },
    { student: "Sophia Chen", query: "Questions about internship opportunities", status: "In Progress" },
    { student: "Michael Taylor", query: "Seeking guidance on graduate school applications", status: "New" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Student Queries</h2>
      <div className="space-y-4">
        {studentQueries.map((query, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6 shadow-md flex justify-between items-center">
            <div className="flex items-start">
              <MessageCircle className="mr-4 h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{query.student}</h3>
                <p className="text-sm text-gray-600">{query.query}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                query.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {query.status}
              </span>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

