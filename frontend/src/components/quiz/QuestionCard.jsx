// import React from 'react'
// import { motion } from 'framer-motion'

// const QuestionCard = ({ question, onSubmit, onSkip, register, setValue }) => {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full h-auto mx-auto p-6"
//     >
//       {/* <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
//         Quiz
//       </h1> */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-blue-50 h-[55vh] border rounded-lg p-6 mb-6">
//           <h2 className="font-bold mb-4">Question {question.id}:</h2>
//           <p className="text-gray-800">{question.question}</p>
//         </div>

//         <div className="h-[55vh] bg-blue-50 rounded-lg p-6 border">
//           <h2 className="font-bold mb-4">Answers:</h2>
//           <form onSubmit={onSubmit} className="space-y-3">
//             {question.options.map((option, index) => (
//               <label
//                 key={index}
//                 className="block bg-gray-300 hover:bg-blue-400 transition-colors rounded-lg p-3 cursor-pointer"
//               >
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="radio"
//                     value={option}
//                     {...register('answer')}
//                     onChange={() => setValue('answer', option)}
//                     className="w-4 h-4"
//                   />
//                   <span className="text-gray-800">{option}</span>
//                 </div>
//               </label>
//             ))}
//           </form>
//         </div>
//       </div>
//       <div className="flex justify-center mt-6 space-x-4">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={onSkip}
//           className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//         >
//           Skip
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={onSubmit}
//           className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Next
//         </motion.button>
//       </div>
//     </motion.div>
//   )
// }

// export default QuestionCard


import React from 'react'
import { motion } from 'framer-motion'

const QuestionCard = ({ question, onSubmit, onSkip, register, setValue, currentQuestionNumber }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-auto mx-auto p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 h-[55vh] border rounded-lg p-6 mb-6">
          <h2 className="font-bold mb-4">Question {currentQuestionNumber}:</h2> {/* Use currentQuestionNumber here */}
          <p className="text-gray-800">{question?.question}</p>
        </div>

        <div className="h-[55vh] bg-blue-50 rounded-lg p-6 border">
          <h2 className="font-bold mb-4">Answers:</h2>
          <form onSubmit={onSubmit} className="space-y-3">
            {question?.options.map((option, index) => (
              <label
                key={index}
                className="block bg-gray-300 hover:bg-blue-400 transition-colors rounded-lg p-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={option}
                    {...register('answer', { required: true })} // Add required validation if necessary
                    onChange={() => setValue('answer', option)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-800">{option}</span>
                </div>
              </label>
            ))}
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSkip}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Skip
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  )
}

export default QuestionCard;