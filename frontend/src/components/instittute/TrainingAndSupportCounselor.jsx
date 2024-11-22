import React from 'react'
import { HelpCircle, Book, PhoneCall } from 'lucide-react'

const TrainingAndSupportCounselor=()=> {
  const supportItems = [
    { title: "FAQs", description: "Find answers to common questions about our platform.", icon: HelpCircle },
    { title: "User Guides", description: "Step-by-step instructions for using EduConnect features.", icon: Book },
    { title: "Technical Support", description: "Contact our support team for assistance.", icon: PhoneCall },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Training and Support</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {supportItems.map((item, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center"
          >
            <item.icon className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


export default TrainingAndSupportCounselor