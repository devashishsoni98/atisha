import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Header from '../components/quiz/Header'
import QuestionCard from '../components/quiz/QuestionCard'
import TimeoutDialog from '../components/quiz/TimeoutDialog'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



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

  const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId')
  console.log(userId);
  

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
  }, [userId]);

  const fetchQuizData = async () => {
    try {

      const StudentInfo = await axios.get(`http://localhost:4000/api/student/${userId}`)
      console.log({class:StudentInfo.data?.student_education.class});
      
      const response = await axios.post('http://localhost:7000/quiz/fetch_generate_questions',{class:StudentInfo.data?.student_education.class})
      if (response.data && response.data.questions) {
        setQuizData(response.data.questions)
        console.log(quizData);
        
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

  // const submitQuizAnswers = async () => {
  //   try {
  //     const formattedAnswers = Object.entries(answers).map(([questionId, response]) => ({
  //       question_id: parseInt(questionId),
  //       response: response
  //     }))

  //     const payload = {
  //       user_id: 2, // Replace with actual user ID
  //       responses: formattedAnswers
  //     }

  //     console.log(payload);
      

  //     await axios.post('http://localhost:7000/quiz/calculate_results', payload)
  //     // Handle successful submission (e.g., show a success message)
  //   } catch (error) {
  //     console.error("Error submitting quiz answers:", error)
  //     // Handle submission error (e.g., show an error message)
  //   }
  // }


  const submitQuizAnswers = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([questionNumber, response]) => {
        const questionId = quizData[questionNumber - 1]?.id; // Get the ID using the question number
        return {
          question_id: questionId, // Use the fetched question ID
          response: response
        };
      });
  
      const payload = {
        user_id: userId, // Replace with actual user ID
        responses: formattedAnswers
      };
  
      console.log(payload);
      
      const response = await axios.post('http://localhost:7000/quiz/calculate_results', payload);
      console.log(response.data);
      


      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestion(questionNumber)
    setVisitedQuestions((prev) =>
      prev.includes(questionNumber) ? prev : [...prev, questionNumber]
    )
  }

  // const onSubmit = (data) => {
  //   setAnswers((prev) => ({ ...prev, [currentQuestion]: data.answer }))
  //   setAnsweredQuestions((prev) =>
  //     prev.includes(currentQuestion) ? prev : [...prev, currentQuestion]
  //   )

  //   if (currentQuestion < quizData.length) {
  //     handleQuestionSelect(currentQuestion + 1)
  //     reset() // Reset the form for the next question
  //   } else {
  //     setIsFinished(true)
  //     submitQuizAnswers()
  //     // Navigate to result page (implement your navigation logic here)
  //   }
  // }


  const onSubmit = (data) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: data.answer })); // currentQuestion is already in number format
    setAnsweredQuestions((prev) =>
      prev.includes(currentQuestion) ? prev : [...prev, currentQuestion]
    );
  
    if (currentQuestion < quizData.length) {
      handleQuestionSelect(currentQuestion + 1);
      reset(); // Reset the form for the next question
    } else {
      setIsFinished(true);
      submitQuizAnswers(); // This will now use correct IDs
      // Navigate to result page (implement your navigation logic here)
    }
  };

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

      {/* <QuestionCard
        question={quizData[currentQuestion - 1]}
        onSubmit={handleSubmit(onSubmit)}
        onSkip={handleSkip}
        register={register}
        setValue={setValue}
      /> */}
<QuestionCard
  question={quizData[currentQuestion - 1]}
  onSubmit={handleSubmit(onSubmit)} // Pass handleSubmit directly
  onSkip={handleSkip}
  register={register}
  setValue={setValue}
  currentQuestionNumber={currentQuestion} // Pass current question number
  totalQuestions={quizData.length} // Optional: Pass total questions if needed
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



// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import Header from '../components/quiz/Header'
// import QuestionCard from '../components/quiz/QuestionCard'
// import TimeoutDialog from '../components/quiz/TimeoutDialog'
// import { useNavigate } from 'react-router-dom'

// const QUESTION_TIME_LIMIT = 60 // 60 seconds per question

// const hardcodedQuestions = [
//   {
//     id: 1,
//     question: "What is the capital of France?",
//     options: ["London", "Berlin", "Paris", "Madrid"],
//     timeLimit: QUESTION_TIME_LIMIT,
//   },
//   {
//     id: 2,
//     question: "Which planet is known as the Red Planet?",
//     options: ["Mars", "Venus", "Jupiter", "Saturn"],
//     timeLimit: QUESTION_TIME_LIMIT,
//   },
//   {
//     id: 3,
//     question: "Who painted the Mona Lisa?",
//     options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
//     timeLimit: QUESTION_TIME_LIMIT,
//   },
//   {
//     id: 4,
//     question: "What is the largest ocean on Earth?",
//     options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
//     timeLimit: QUESTION_TIME_LIMIT,
//   },
//   {
//     id: 5,
//     question: "Which element has the chemical symbol 'O'?",
//     options: ["Gold", "Silver", "Oxygen", "Iron"],
//     timeLimit: QUESTION_TIME_LIMIT,
//   }
// ]

// const QuizFormsPage = () => {
//   const [quizData, setQuizData] = useState(hardcodedQuestions)
//   const [currentQuestion, setCurrentQuestion] = useState(1)
//   const [visitedQuestions, setVisitedQuestions] = useState([1])
//   const [answeredQuestions, setAnsweredQuestions] = useState([])
//   const [answers, setAnswers] = useState({})
//   const [isFinished, setIsFinished] = useState(false)
//   const [showTimeoutDialog, setShowTimeoutDialog] = useState(false)
//   const [totalTime, setTotalTime] = useState(QUESTION_TIME_LIMIT * hardcodedQuestions.length)
  
//   const navigate = useNavigate()

//   const { register, handleSubmit, reset, setValue } = useForm()

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = ''; // Chrome requires this for showing the dialog
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   const handleQuestionSelect = (questionNumber) => {
//     setCurrentQuestion(questionNumber)
//     setVisitedQuestions((prev) =>
//       prev.includes(questionNumber) ? prev : [...prev, questionNumber]
//     )
//   }

//   const onSubmit = (data) => {
//     setAnswers((prev) => ({ ...prev, [currentQuestion]: data.answer }));
//     setAnsweredQuestions((prev) =>
//       prev.includes(currentQuestion) ? prev : [...prev, currentQuestion]
//     );
  
//     if (currentQuestion < quizData.length) {
//       handleQuestionSelect(currentQuestion + 1);
//       reset();
//     } else {
//       setIsFinished(true);
//       navigate('/quiz/result');
//     }
//   };

//   const handleSkip = () => {
//     if (currentQuestion < quizData.length) {
//       handleQuestionSelect(currentQuestion + 1)
//       reset()
//     }
//   }

//   const handleTotalTimeUp = () => {
//     setShowTimeoutDialog(true)
//   }

//   const handleTimeoutDialogClose = () => {
//     setShowTimeoutDialog(false)
//     setIsFinished(true)
//     navigate('/quiz/result')
//   }

//   if (isFinished) {
//     navigate('/quiz/result')
//     return null
//   }

//   return (
//     <div className="h-auto w-full bg-gray-50">
//       <div className="sticky top-0 z-10">
//         <Header
//           currentQuestion={currentQuestion}
//           totalQuestions={quizData.length}
//           visitedQuestions={visitedQuestions}
//           answeredQuestions={answeredQuestions}
//           onQuestionSelect={handleQuestionSelect}
//           totalTime={totalTime}
//           onTimeUp={handleTotalTimeUp}
//         />
//       </div>

//       <QuestionCard
//         question={quizData[currentQuestion - 1]}
//         onSubmit={handleSubmit(onSubmit)}
//         onSkip={handleSkip}
//         register={register}
//         setValue={setValue}
//         currentQuestionNumber={currentQuestion}
//         totalQuestions={quizData.length}
//       />

//       <AnimatePresence>
//         {showTimeoutDialog && (
//           <TimeoutDialog onClose={handleTimeoutDialogClose} />
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default QuizFormsPage