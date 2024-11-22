import React from 'react'
import { MessageCircle, Mail, Video } from 'lucide-react'

const CommunicationTools=()=> {
  const tools = [
    { name: "Instant Messaging", icon: MessageCircle },
    { name: "Email", icon: Mail },
    { name: "Video Conferencing", icon: Video },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Communication Tools</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center"
          >
            <tool.icon className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold">{tool.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}


export default CommunicationTools