import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Mentors() {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {id} =useParams();

  useEffect(() => {
    const fetchData = async () => {
        console.log(id);
        
      try {
        const response = await fetch(`http://localhost:7000/match_student?student_id=${id}`)
        const data = await response.json()
        setMatches(data.matches)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="primary_color text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold primary_color mb-8 text-center">
          Mentors you can choose
        </h1>
        
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div 
                key={match.counsellor_id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg_primary_color p-4">
                  <h2 className="text-white text-xl font-semibold">
                    Counsellor {match.counsellor_id}
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="primary_color font-semibold mb-1">
                      Specialization
                    </h3>
                    <p className="text-gray-700">
                      {match.specialization}
                    </p>
                  </div>

                  <div>
                    <h3 className="primary_color font-semibold mb-1">
                      Key Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {match.key_areas.map((area, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 px-3 py-1 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="primary_color font-semibold mb-1">
                      Student Subjects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {match.student_subjects.map((subject, index) => (
                        <span 
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-blue-100">
                  <button className="w-full bg_light_primary_color hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300">
                    Book Sessions
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-blue-800 text-lg">
              No matches found at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}