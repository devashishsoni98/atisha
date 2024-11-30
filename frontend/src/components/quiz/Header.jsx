// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import Timer from './Timer'
// import GuidelinesDialog from './GuidelinesDialog'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const Header = ({
//   currentQuestion,
//   totalQuestions,
//   visitedQuestions,
//   answeredQuestions,
//   onQuestionSelect,
//   totalTime,
//   onTimeUp
// }) => {
//   const [showGuidelines, setShowGuidelines] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const questionsPerPage = 10
//   const totalPages = Math.ceil(totalQuestions / questionsPerPage)

//   useEffect(() => {
//     const page = Math.ceil(currentQuestion / questionsPerPage)
//     setCurrentPage(page)
//   }, [currentQuestion])

//   const getQuestionStyle = (questionNumber) => {
//     if (questionNumber === currentQuestion) {
//       return "bg-blue-500 text-white"
//     }
//     if (answeredQuestions.includes(questionNumber)) {
//       return "bg-green-400 text-white"
//     }
//     if (visitedQuestions.includes(questionNumber)) {
//       return "bg-blue-200"
//     }
//     return "bg-gray-200"
//   }

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage)
//     }
//   }

//   const renderQuestionButtons = () => {
//     const startQuestion = (currentPage - 1) * questionsPerPage + 1
//     const endQuestion = Math.min(currentPage * questionsPerPage, totalQuestions)

//     return Array.from({ length: endQuestion - startQuestion + 1 }, (_, i) => {
//       const questionNumber = startQuestion + i
//       return (
//         <motion.button
//           key={questionNumber}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => onQuestionSelect(questionNumber)}
//           className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${getQuestionStyle(questionNumber)}`}
//         >
//           {questionNumber}
//         </motion.button>
//       )
//     })
//   }

//   return (
//     <React.Fragment>
//       <div className="flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm">
//         <div className="flex items-center gap-2">
          
//         </div>

//         <div className="flex items-center gap-2">
//           {totalPages > 1 && (
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="p-1 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
//             >
//               <ChevronLeft size={20} />
//             </motion.button>
//           )}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentPage}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.2 }}
//               className="flex items-center gap-2"
//             >
//               {renderQuestionButtons()}
//             </motion.div>
//           </AnimatePresence>
//           {totalPages > 1 && (
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="p-1 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
//             >
//               <ChevronRight size={20} />
//             </motion.button>
//           )}
//         </div>

//         <div className="flex items-center gap-4">
//           <Timer totalSeconds={totalTime} onTimeUp={onTimeUp} />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
//             onClick={() => setShowGuidelines(true)}
//           >
//             Guidelines
//           </motion.button>
//         </div>
//       </div>
//       <GuidelinesDialog
//         isOpen={showGuidelines}
//         onClose={() => setShowGuidelines(false)}
//       />
//     </React.Fragment>
//   )
// }

// export default Header


import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timer from './Timer'
import GuidelinesDialog from './GuidelinesDialog'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Header = ({
  currentQuestion,
  totalQuestions,
  visitedQuestions,
  answeredQuestions,
  onQuestionSelect,
  totalTime,
  onTimeUp
}) => {
  const [showGuidelines, setShowGuidelines] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [questionsPerPage, setQuestionsPerPage] = useState(10)
  
  // Update questionsPerPage based on window size
  useEffect(() => {
    const updateQuestionsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setQuestionsPerPage(5);
      } else if (width < 1024) { // Tablet
        setQuestionsPerPage(7);
      } else { // Desktop
        setQuestionsPerPage(10);
      }
    };

    updateQuestionsPerPage(); // Set initial value
    window.addEventListener('resize', updateQuestionsPerPage); // Update on resize

    return () => {
      window.removeEventListener('resize', updateQuestionsPerPage); // Cleanup listener
    };
  }, []);

  useEffect(() => {
    const page = Math.ceil(currentQuestion / questionsPerPage);
    setCurrentPage(page);
  }, [currentQuestion, questionsPerPage]);

  const getQuestionStyle = (questionNumber) => {
    if (questionNumber === currentQuestion) {
      return "bg-blue-500 text-white"
    }
    if (answeredQuestions.includes(questionNumber)) {
      return "bg-green-400 text-white"
    }
    if (visitedQuestions.includes(questionNumber)) {
      return "bg-blue-200"
    }
    return "bg-gray-200"
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const renderQuestionButtons = () => {
    const startQuestion = (currentPage - 1) * questionsPerPage + 1;
    const endQuestion = Math.min(currentPage * questionsPerPage, totalQuestions);

    return Array.from({ length: endQuestion - startQuestion + 1 }, (_, i) => {
      const questionNumber = startQuestion + i;
      return (
        <motion.button
          key={questionNumber}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onQuestionSelect(questionNumber)}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${getQuestionStyle(questionNumber)}`}
        >
          {questionNumber}
        </motion.button>
      )
    });
  }

  return (
    <React.Fragment>
      <div className=" grid sm:grid-cols-3 gap-4 items-center justify-between px-4 py-2 bg-white border-b shadow-sm">
        <div className="flex  items-center gap-2">
          {/* Additional header content can go here */}
        </div>

        <div className="flex items-center gap-2">
          {totalPages > 1 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </motion.button>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              {renderQuestionButtons()}
            </motion.div>
          </AnimatePresence>
          {totalPages > 1 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </motion.button>
          )}
        </div>

        <div className="flex justify-end items-center gap-4">
          <Timer totalSeconds={totalTime} onTimeUp={onTimeUp} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            onClick={() => setShowGuidelines(true)}
          >
            Guidelines
          </motion.button>
        </div>
      </div>
      <GuidelinesDialog
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
      />
    </React.Fragment>
  )
}

export default Header;