// import React, { useState } from 'react'
import { User, Calendar, MessageCircle, Briefcase, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {useState} from "react";
import { Link } from 'react-router-dom';
import UpcomingSessionsTab from '../../components/mentorOnBoarding/MentorUpcommingSessionTab';
import MenteeRequestsTab from '../../components/mentorOnBoarding/MentorMenteeQueriesTab';
import AvailabilityTab from '../../components/mentorOnBoarding/MentorAvailabilityTab';
import MenteeQueriesTab from '../../components/mentorOnBoarding/MentorMenteeRequestTab';




export default function MentorOnboarding() {
  const [activeTab, setActiveTab] = useState('sessions')

  const tabs = [
    { id: 'sessions', label: 'Upcoming Sessions', icon: <Calendar className="w-4 h-4" /> },
    { id: 'requests', label: 'Mentee Requests', icon: <User className="w-4 h-4" /> },
    { id: 'availability', label: 'My Availability', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'queries', label: 'Mentee Queries', icon: <MessageCircle className="w-4 h-4" /> },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sessions':
        return <UpcomingSessionsTab />
      case 'requests':
        return <MenteeRequestsTab />
      case 'availability':
        return <AvailabilityTab />
      case 'queries':
        return <MenteeQueriesTab />
      default:
        return <UpcomingSessionsTab />
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex flex-col">
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-blue-600 mb-4">Mentor Dashboard</h1>
              <nav className="flex space-x-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {tab.icon}
                      <span className="ml-2">{tab.label}</span>
                    </button>
                ))}
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="bg-white shadow-lg mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <p className="text-gray-600">Welcome to your mentor dashboard</p>
            <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Go to Full Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </footer>
      </div>
  )
}

