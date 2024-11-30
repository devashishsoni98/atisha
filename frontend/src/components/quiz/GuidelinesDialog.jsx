import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTION_TIME_LIMIT = 60 // 60 seconds per question

const GuidelinesDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-lg max-w-lg w-full mx-4 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Quiz Guidelines</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>1. Each question has a {QUESTION_TIME_LIMIT} second time limit.</p>
              <p>
                2. Total quiz duration depends on the number of questions fetched.
              </p>
              <p>3. Questions are automatically submitted when time runs out.</p>
              <p>
                4. You can navigate between questions using the number buttons
                above.
              </p>
              <p>5. Color indicators:</p>
              <ul className="ml-6">
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span>Current question</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  <span>Answered question</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-200"></span>
                  <span>Unvisited question</span>
                </li>
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Got it
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GuidelinesDialog

