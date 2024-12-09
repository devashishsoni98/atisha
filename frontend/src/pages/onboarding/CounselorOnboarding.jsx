import React, { useState } from 'react'
import { User, Calendar, MessageCircle, Briefcase, ArrowRight, ChevronRight } from 'lucide-react'
import {Link} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { UpcomingSessionsTab } from '../../components/counselorOnBoarding/UpcommingCounselorSessions'
import SessionRequestsTab from '../../components/counselorOnBoarding/CounselorSessionRequest'
import { CounselorStudentQueries } from '../../components/counselorOnBoarding/SessionQueires'
import { useEffect } from 'react'



export default function CounselorOnboarding() {
  const [activeTab, setActiveTab] = useState('sessions')

  const tabs = [
    { id: 'sessions', label: 'Upcoming Sessions', icon: <Calendar className="w-4 h-4" /> },
    { id: 'requests', label: 'Session Requests', icon: <User className="w-4 h-4" /> },
    { id: 'schedule', label: 'Today\'s Schedule', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'queries', label: 'Student Queries', icon: <MessageCircle className="w-4 h-4" /> },
  ]



  const renderTabContent = () => {
    switch (activeTab) {
      case 'sessions':
        return <UpcomingSessionsTab />
      case 'requests':
        return <SessionRequestsTab />
      case 'schedule':
        return <TodayScheduleTab />
      case 'queries':
        return <CounselorStudentQueries />
      default:
        return <UpcomingSessionsTab />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex flex-col">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-blue-600">John Don</h1>
            <nav className="flex space-x-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </motion.button>
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
          <p className="text-gray-600">Welcome to your counselor dashboard</p>
          <Link
            to="/dashboard/counselor/1"
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
