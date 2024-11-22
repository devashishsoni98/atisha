import React from 'react'
import { Book, FileText, Video } from 'lucide-react'

const ResourceLibrary =()=> {
  const resources = [
    { title: "Career Exploration Guide", type: "Article", icon: FileText },
    { title: "College Application Tips", type: "Video", icon: Video },
    { title: "Study Skills Handbook", type: "E-book", icon: Book },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Resource Library</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center"
          >
            <resource.icon className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-600">{resource.type}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourceLibrary