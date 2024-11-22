import React from 'react'
import { Users, Briefcase, Globe } from 'lucide-react'

const CollaborationOpportunities=()=> {
  const opportunities = [
    { title: "Industry Partnerships", description: "Connect with local businesses for internships and job shadowing.", icon: Briefcase },
    { title: "Alumni Network", description: "Engage with successful graduates for mentorship and career insights.", icon: Users },
    { title: "Global Exchange Programs", description: "Explore international educational opportunities and cultural exchanges.", icon: Globe },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Collaboration Opportunities</h2>
      <div className="space-y-6">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className="flex items-start space-x-4"
          >
            <opportunity.icon className="h-8 w-8 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
              <p className="text-gray-600">{opportunity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default CollaborationOpportunities