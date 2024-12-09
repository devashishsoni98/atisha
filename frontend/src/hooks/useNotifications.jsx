"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NotificationContext = createContext()

export function useNotification() {
  return useContext(NotificationContext)
}

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    }, 5000)
  }, [])

  const value = {
    addNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} />
    </NotificationContext.Provider>
  )
}

function NotificationContainer({ notifications }) {
  return (
    <div className="fixed top-4 right-[40%] px-6 flex flex-col justify-start items-center gap-4 z-30 ">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function Notification({ message, type }) {
  const animations = {
    initial: { opacity: 0, y: -50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "text-green-500 font-semibold border-[2px] bg-white border-green-500"
      case "error":
        return "text-red-500 font-semibold border-[2px] bg-white border-red-500"
      case "info":
        return "text-blue-500 font-semibold border-[2px] bg-white border-blue-500"
      default:
        return "text-gray-500 font-semibold border-[2px] bg-white border-gray-500"
    }
  }

  return (
    <motion.div
      {...animations}
      layout
      className={`${getBackgroundColor()}  p-4 rounded-lg shadow-lg max-w-sm`}
    >
      {message}
    </motion.div>
  )
}

export default NotificationProvider

