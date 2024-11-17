'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, Home } from 'lucide-react'
import QuizImage from '../assets/Quiz.png'

const QuizPage =()=> {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const startQuiz = () => {
    console.log('Redirecting to quiz page...')
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        initial={{ x: 500, scale: 0.9 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#2B84EA] rounded-bl-full opacity-20 -translate-y-1/2 translate-x-1/2"
      />
      <motion.div
        initial={{x:-500, scale: 0.9 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#2B84EA] rounded-tr-full opacity-20 translate-y-1/2 -translate-x-1/2"
      />

      {/* Home button */}
      <motion.a
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-8 left-8"
        href='/'
      >
        <button className="p-3 rounded-full bg-[#2B84EA] text-white hover:bg-blue-600 transition-colors">
          <Home size={24} />
        </button>
      </motion.a>

      <main className="relative z-10 max-w-4xl mx-auto pt-24 px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#2B84EA] mb-4">Quiz Overview</h1>
          <p className="text-gray-600 text-lg">
            Test your knowledge and challenge yourself with our comprehensive quiz
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-[#2B84EA] mb-4">What to Expect</h2>
              <ul className="space-y-3">
                {['Multiple choice questions', 'Timed sections', 'Instant feedback', 'Detailed explanations'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#2B84EA] mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src={QuizImage}
                alt="Quiz illustration"
                className="w-[20rem] h-48 object-contain"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <button
            onClick={openDialog}
            className="bg-[#2B84EA] text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </motion.div>
      </main>

      {/* Guidelines Dialog */}
      {isDialogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#2B84EA]">Quiz Guidelines</h2>
              <button onClick={closeDialog} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              {[
                'Read each question carefully before answering',
                'You have 60 seconds per question',
                'Cannot return to previous questions',
                'Final score shown at completion',
                'Detailed explanations provided after submission'
              ].map((guideline, index) => (
                <motion.div
                  key={guideline}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start space-x-3 text-gray-600"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2B84EA] mt-2" />
                  <p>{guideline}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDialog}
                className="px-6 py-2 rounded-full border-2 border-[#2B84EA] text-[#2B84EA] hover:bg-blue-50 transition-colors"
              >
                Close
              </button>
              <a href={`/quiz/iq/1`}>
              <button
                onClick={startQuiz}
                className="px-6 py-2 rounded-full bg-[#2B84EA] text-white hover:bg-blue-600 transition-colors"
                >
                Start Quiz
              </button>
                </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default QuizPage