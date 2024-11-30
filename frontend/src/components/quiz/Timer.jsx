import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Timer = ({ totalSeconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
    >
      <span className="text-sm text-gray-600">Total Time Left</span>
      <span className="font-mono font-bold">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </motion.div>
  )
}

export default Timer

