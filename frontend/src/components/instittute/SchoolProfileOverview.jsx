import React from 'react'
import { Building, Users, Award, User } from 'lucide-react'

const SchoolProfileOverview=()=> {
  const schoolInfo = {
    name: "Evergreen High School",
    location: "Springfield, USA",
    studentCount: 1200,
    counselors: [
      { name: "Dr. Sarah Johnson", specialty: "Career Guidance" },
      { name: "Mr. David Lee", specialty: "Academic Planning" },
      { name: "Ms. Emily Chen", specialty: "College Admissions" }
    ]
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">School Profile Overview</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Building className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-semibold">{schoolInfo.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-500" />
            <span>{schoolInfo.studentCount} Students</span>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-blue-500" />
            <span>{schoolInfo.location}</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Counselors</h3>
          <ul className="space-y-2">
            {schoolInfo.counselors.map((counselor, index) => (
              <li key={index} className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-500" />
                <span>{counselor.name} - {counselor.specialty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


export default SchoolProfileOverview