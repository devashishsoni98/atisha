import React, { useState } from 'react'
import { motion } from 'framer-motion'

const CustomTabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index) => {
    setActiveTab(index)
    onTabChange(index)
  }

  return (
    <div className="flex space-x-2  p-2 rounded-lg">
      {tabs.map((tab, index) => (
        <motion.button
          key={index}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === index
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500 hover:bg-blue-100'
          }`}
          onClick={() => handleTabClick(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  )
}

export default CustomTabs

