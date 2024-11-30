import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Header from '../components/quiz/Header'
import QuestionCard from '../components/quiz/QuestionCard'
import TimeoutDialog from '../components/quiz/TimeoutDialog'
import { useNavigate } from 'react-router-dom'


const QUESTION_TIME_LIMIT = 60 // 60 seconds per question

const QuizFormsPage = () => {
  const [quizData, setQuizData] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [visitedQuestions, setVisitedQuestions] = useState([1])
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const navigator = useNavigate()

  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    fetchQuizData();
    
    // Handle before unload event
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Chrome requires this for showing the dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT_HERE')
      if (response.data && response.data.questions) {
        setQuizData(response.data.questions)
        setTotalTime(QUESTION_TIME_LIMIT * response.data.questions.length)
      } else {
        // Fallback to existing data if API returns null or invalid data
        const fallbackData = [
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          {
            id: 1,
            question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
            options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
            timeLimit: QUESTION_TIME_LIMIT,
          },
          
          // ... other questions ...
        ]
        setQuizData(fallbackData)
        setTotalTime(QUESTION_TIME_LIMIT * fallbackData.length)
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error)
      // Fallback to existing data if API call fails
      const fallbackData = [
        {
          id: 1,
          question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
          options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
          timeLimit: QUESTION_TIME_LIMIT,
        },
        {
          id:2,
          question: "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
          options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
          timeLimit: QUESTION_TIME_LIMIT,
        },
       
        // ... other questions ...
      ]
      setQuizData(fallbackData)
      setTotalTime(QUESTION_TIME_LIMIT * fallbackData.length)
    } finally {
      setIsLoading(false)
    }
  }

  const submitQuizAnswers = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, response]) => ({
        question_id: parseInt(questionId),
        response: response
      }))

      const payload = {
        user_id: 2, // Replace with actual user ID
        responses: formattedAnswers
      }

      console.log(payload);
      

      await axios.post('YOUR_SUBMISSION_API_ENDPOINT_HERE', payload)
      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting quiz answers:", error)
      // Handle submission error (e.g., show an error message)
    }
  }

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestion(questionNumber)
    setVisitedQuestions((prev) =>
      prev.includes(questionNumber) ? prev : [...prev, questionNumber]
    )
  }

  const onSubmit = (data) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: data.answer }))
    setAnsweredQuestions((prev) =>
      prev.includes(currentQuestion) ? prev : [...prev, currentQuestion]
    )

    if (currentQuestion < quizData.length) {
      handleQuestionSelect(currentQuestion + 1)
      reset() // Reset the form for the next question
    } else {
      setIsFinished(true)
      submitQuizAnswers()
      // Navigate to result page (implement your navigation logic here)
    }
  }

  const handleSkip = () => {
    if (currentQuestion < quizData.length) {
      handleQuestionSelect(currentQuestion + 1)
      reset() // Reset the form when skipping
    }
  }

  const handleQuestionTimeUp = () => {
    handleSkip()
  }

  const handleTotalTimeUp = () => {
    setShowTimeoutDialog(true)
  }

  const handleTimeoutDialogClose = () => {
    setShowTimeoutDialog(false)
    setIsFinished(true)
    submitQuizAnswers()
    // Navigate to result page (implement your navigation logic here)
  }

  if (isLoading) {
    return (
      <div className="h-auto flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-blue-600"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  if (isFinished) {
    const totalAnswered = Object.keys(answers).length

    navigator('/quiz/result')

    // return (
    //   <motion.div 
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     transition={{ duration: 0.5 }}
    //     className="h-auto bg-gray-50 flex items-center justify-center p-4"
    //   >
    //     <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    //       <h2 className="text-2xl font-bold text-center mb-6">
    //         Quiz Complete!
    //       </h2>
    //       <div className="space-y-4">
    //         <p className="flex justify-between">
    //           <span>Total Questions:</span>
    //           <span>{quizData.length}</span>
    //         </p>
    //         <p className="flex justify-between">
    //           <span>Questions Answered:</span>
    //           <span>{totalAnswered}</span>
    //         </p>
    //         <p className="flex justify-between">
    //           <span>Questions Skipped:</span>
    //           <span>{quizData.length - totalAnswered}</span>
    //         </p>
    //         <motion.button
    //           whileHover={{ scale: 1.05 }}
    //           whileTap={{ scale: 0.95 }}
    //           onClick={() => window.location.reload()}
    //           className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    //         >
    //           Try Again
    //         </motion.button>
    //       </div>
    //     </div>
    //   </motion.div>
    // )
  }

  return (
    <div className="h-auto w-full bg-gray-50">
      <div className="sticky top-0 z-10">
        <Header
          currentQuestion={currentQuestion}
          totalQuestions={quizData.length}
          visitedQuestions={visitedQuestions}
          answeredQuestions={answeredQuestions}
          onQuestionSelect={handleQuestionSelect}
          totalTime={totalTime}
          onTimeUp={handleTotalTimeUp}
        />
      </div>

      <QuestionCard
        question={quizData[currentQuestion - 1]}
        onSubmit={handleSubmit(onSubmit)}
        onSkip={handleSkip}
        register={register}
        setValue={setValue}
      />

      <AnimatePresence>
        {showTimeoutDialog && (
          <TimeoutDialog onClose={handleTimeoutDialogClose} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuizFormsPage

