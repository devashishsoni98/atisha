import React from 'react'
import { motion } from 'framer-motion'

const TimeoutDialog = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-lg max-w-md w-full mx-4 p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
        <p className="text-gray-600 mb-6">
          The quiz time has ended. Your answers will be submitted automatically.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Results
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default TimeoutDialog

