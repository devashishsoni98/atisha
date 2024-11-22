import React from 'react'
import {MessageCircle} from 'lucide-react'

const MenteeQueriesTab = () => {
    const menteeQueries = [
        {mentee: "David Wilson", query: "Need advice on negotiating job offers", status: "New"},
        {mentee: "Sophia Chen", query: "Questions about work-life balance in tech", status: "In Progress"},
        {mentee: "Michael Taylor", query: "Seeking guidance on starting a side project", status: "New"},
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800">Mentee Queries</h2>
            <div className="space-y-4">
                {menteeQueries?.map((query, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-6 shadow-md flex justify-between items-center">
                        <div className="flex items-start">
                            <MessageCircle className="mr-4 h-6 w-6 text-blue-500"/>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-700">{query.mentee}</h3>
                                <p className="text-sm text-gray-600">{query.query}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                query.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                             {query.status}
                                 </span>
                            <button
                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                Respond
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenteeQueriesTab