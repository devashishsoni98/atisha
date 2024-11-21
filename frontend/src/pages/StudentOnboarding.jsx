import React, { useState, useEffect } from 'react'
import { User, Calendar, Book, Activity, ArrowRight, ChevronRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function StudentOnboarding() {
  const [activeTab, setActiveTab] = useState('welcome')
  const [completedSteps, setCompletedSteps] = useState({
    welcome: false,
    'book-session': false,
    interests: false,
    activities: false
  })
  const navigate = useNavigate()

  const tabs = [
    { id: 'welcome', label: 'Welcome', icon: <User /> },
    { id: 'book-session', label: 'Book a Session', icon: <Calendar /> },
    { id: 'interests', label: 'Interests', icon: <Book /> },
    { id: 'activities', label: 'Activities', icon: <Activity /> },
  ]

  const handleStepComplete = (step) => {
    setCompletedSteps(prev => ({ ...prev, [step]: true }))
  }

  const handleFinalSubmit = async () => {
    try {
      // Retrieve the user ID from localStorage or your authentication state
      const userId = localStorage.getItem('userId')
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.")
      }

      const response = await fetch("http://localhost:4000/api/students", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId: userId,
          // Add other necessary data here
          completedSteps: completedSteps,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      const responseData = await response.json()
      console.log("Profile updated successfully", responseData)
      navigate(`/dashboard/student/${responseData.id}`)
    } catch (error) {
      console.error("Error updating profile:", error)
      alert(`Error updating profile: ${error.message}. Please try again.`)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'welcome':
        return <WelcomeTab onComplete={() => handleStepComplete('welcome')} />
      case 'book-session':
        return <BookSessionTab onComplete={() => handleStepComplete('book-session')} />
      case 'interests':
        return <InterestsTab onComplete={() => handleStepComplete('interests')} />
      case 'activities':
        return <ActivitiesTab onComplete={() => handleStepComplete('activities')} />
      default:
        return <WelcomeTab onComplete={() => handleStepComplete('welcome')} />
    }
  }

  const allStepsCompleted = Object.values(completedSteps).every(step => step)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex flex-col">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-blue-600">Your Journey Begins</h1>
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
                  {completedSteps[tab.id] && (
                    <Check className="ml-2 text-green-500" size={16} />
                  )}
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
            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="bg-white shadow-lg mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <p className="text-gray-600">Complete all steps to access your full dashboard</p>
          <button
            onClick={handleFinalSubmit}
            disabled={!allStepsCompleted}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors ${
              allStepsCompleted
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </footer>
    </div>
  )
}

function WelcomeTab({ onComplete }) {
  const steps = [
    { title: 'Book your first counseling session', icon: '📅' },
    { title: 'Explore and select your interests', icon: '🔍' },
    { title: 'Check out upcoming activities', icon: '🎉' },
  ]

  useEffect(() => {
    // Automatically mark the welcome step as complete when rendered
    onComplete()
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-8 relative z-10"
    >
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-blue-800 mb-4"
        >
          Welcome, Student!
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-blue-600 max-w-2xl mx-auto"
        >
          We're excited to have you on board. Let's take a few moments to set up your account and explore some key features.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden"
          >
            {/* Decorative shape */}
            <div 
              className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12"
              style={{ zIndex: 0 }}
            />

            <div className="relative z-10">
              <span className="text-4xl mb-4 inline-block">{step.icon}</span>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Step {index + 1}</h3>
              <p className="text-blue-600">{step.title}</p>
            </div>

            <motion.div
              className="absolute bottom-2 right-2"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ChevronRight className="text-blue-400" size={24} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function BookSessionTab({ onComplete }) {
  const sessions = [
    { id: 1, title: 'Career Guidance', date: '2024-01-20', time: '10:00 AM' },
    { id: 2, title: 'Academic Planning', date: '2024-01-22', time: '2:00 PM' },
    { id: 3, title: 'Skills Development', date: '2024-01-25', time: '11:30 AM' },
  ]

  const handleBookSession = () => {
    // Simulating booking a session
    setTimeout(() => {
      onComplete()
      alert('Session booked successfully!')
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl font-bold text-blue-800">Book Your First Session</h2>
      <p className="text-xl text-blue-600">Choose a session to get started with your counseling journey.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">{session.title}</h3>
              <p className="text-gray-600">{session.date} at {session.time}</p>
              <motion.button
                onClick={handleBookSession}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function InterestsTab({ onComplete }) {
  const interests = [
    { id: 1, title: 'Engineering', icon: '🔧' },
    { id: 2, title: 'MBA', icon: '📊' },
    { id: 3, title: 'Architecture', icon: '🏛️' },
    { id: 4, title: 'Management', icon: '👥' },
    { id: 5, title: 'Design', icon: '🎨' },
    { id: 6, title: 'Medicine', icon: '⚕️' },
  ]

  const [selectedInterests, setSelectedInterests] = useState([])

  const handleInterestToggle = (id) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSaveInterests = () => {
    if (selectedInterests.length > 0) {
      onComplete()
      alert('Interests saved successfully!')
    } else {
      alert('Please select at least one interest.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl font-bold text-blue-800">Select Your Interests</h2>
      <p className="text-xl text-blue-600">Choose the areas you're most interested in exploring.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {interests.map((interest, index) => (
          <motion.button
            key={interest.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInterestToggle(interest.id)}
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md transition-colors ${
              selectedInterests.includes(interest.id)
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-white hover:bg-blue-50'
            }`}
          >
            <span className="text-5xl mb-3">{interest.icon}</span>
            <span className="text-lg text-blue-800 font-medium">{interest.title}</span>
          </motion.button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <motion.button
          onClick={handleSaveInterests}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save Interests
        </motion.button>
      </div>
    </motion.div>
  )
}

function ActivitiesTab({ onComplete }) {
  const activities = [
    { id: 1, title: 'Coding Workshop', date: '2024-01-28', status: 'Upcoming' },
    { id: 2, title: 'Career Fair', date: '2024-02-05', status: 'Open for Registration' },
    { id: 3, title: 'Leadership Summit', date: '2024-02-15', status: 'Open for Registration' },
  ]

  const handleRegister = () => {
    onComplete()
    alert('Registered for activity successfully!')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-6 relative z-10"
    >
      <h2 className="text-3xl font-bold text-blue-800">Upcoming Activities</h2>
      <p className="text-xl text-blue-600">Explore and join activities to enhance your skills and network.</p>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 sm:mb-0">
              <h3 className="text-xl font-semibold text-blue-600">{activity.title}</h3>
              <p className="text-gray-600">{activity.date}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {activity.status}
              </span>
              <motion.button
                onClick={handleRegister}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Register
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}