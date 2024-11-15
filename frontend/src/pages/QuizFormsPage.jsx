// import React from 'react'

// const QuizFormsPage = () => {
//   return (
//     <div className='w-full min-h-screen px-6"'>
//       QuizFormsPage</div>
//   )
// }

// export default QuizFormsPage

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const QUESTION_TIME_LIMIT = 60; // 60 seconds per question

const quizData = [
  {
    id: 1,
    question:
      "A man is looking at a photograph of someone. His friend asks, 'Who is it you are looking at?' The man replies, 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photograph?",
    options: ["His son", "His Father", "Himself", "His Grandfather", "hiii"],
    timeLimit: QUESTION_TIME_LIMIT,
  },
  {
    id: 2,
    question: "If you divide 30 by half and add 10, what do you get?",
    options: ["25", "70", "35", "40"],
    timeLimit: QUESTION_TIME_LIMIT,
  },
  {
    id: 3,
    question: "What goes up but never comes down?",
    options: ["Age", "Height", "Temperature", "Time"],
    timeLimit: QUESTION_TIME_LIMIT,
  },
];

const GuidelinesDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4 p-6">
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
            2. Total quiz duration is{" "}
            {(QUESTION_TIME_LIMIT * quizData.length) / 60} minutes.
          </p>
          <p>3. Questions are automatically submitted when time runs out.</p>
          <p>
            4. You can navigate between questions using the number buttons
            above.
          </p>
          <p>5. Color indicators:</p>
          <ul className="ml-6">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400"></span>
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
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

const Header = ({
  currentQuestion,
  totalQuestions,
  visitedQuestions,
  answeredQuestions,
  onQuestionSelect,
}) => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  const getQuestionStyle = (questionNumber) => {
    if (questionNumber === currentQuestion) {
      return "bg-orange-400 text-white";
    }
    if (answeredQuestions.includes(questionNumber)) {
      return "bg-green-400 text-white";
    }
    if (visitedQuestions.includes(questionNumber)) {
      return "bg-orange-200";
    }
    return "bg-gray-200";
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img
              src="/api/placeholder/32/32"
              alt="Atisha Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold">ATISHA</span>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <button
              key={i}
              onClick={() => onQuestionSelect(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${getQuestionStyle(
                i + 1
              )}`}
            >
              {i + 1}
            </button>
          ))}
          <span className="mx-2">...</span>
        </div>

        <button
          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          onClick={() => setShowGuidelines(true)}
        >
          Guidelines
        </button>
      </div>
      <GuidelinesDialog
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
      />
    </>
  );
};

const Timer = ({ totalSeconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
      <span className="text-sm text-gray-600">Time Left</span>
      <span className="font-mono font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

const QuestionTimer = ({ seconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds); // Reset timer when seconds prop changes
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="bg-orange-50 text-center py-1 text-sm text-gray-600">
      Remaining time: {timeLeft} sec
    </div>
  );
};

const QuestionCard = ({ question, options, onAnswer, onSkip }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="w-full min-h-screen mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-orange-400 text-center mb-8">
        Sample Quiz Name
      </h1>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="bg-orange-50 h-[55vh] border  rounded-lg p-6 mb-6">
          <h2 className="font-bold mb-4">Question {question.id}:</h2>
          <p className="text-gray-800">{question.question}</p>
        </div>

        <div className="h-[55vh] bg-orange-50 rounded-lg p-6 border">
          <h2 className="font-bold mb-4">Answers:</h2>
          <form onSubmit={handleSubmit(onAnswer)} className="space-y-3">
            {options.map((option, index) => (
              <label
                key={index}
                className="block bg-orange-300 hover:bg-orange-400 transition-colors rounded-lg p-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={option}
                    {...register("answer", { required: true })}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-800">{option}</span>
                </div>
              </label>
            ))}
          </form>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onSkip}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Skip
        </button>
        <button
          onClick={handleSubmit(onAnswer)}
          className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const QuizFormsPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [visitedQuestions, setVisitedQuestions] = useState([1]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const totalTime = QUESTION_TIME_LIMIT * quizData.length;

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestion(questionNumber);
    setVisitedQuestions((prev) =>
      prev.includes(questionNumber) ? prev : [...prev, questionNumber]
    );
  };

  const handleAnswer = (data) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: data.answer }));
    setAnsweredQuestions((prev) =>
      prev.includes(currentQuestion) ? prev : [...prev, currentQuestion]
    );

    if (currentQuestion < quizData.length) {
      handleQuestionSelect(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < quizData.length) {
      handleQuestionSelect(currentQuestion + 1);
    }
  };

  const handleQuestionTimeUp = () => {
    handleSkip();
  };

  const handleTotalTimeUp = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    const totalAnswered = Object.keys(answers).length;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            Quiz Complete!
          </h2>
          <div className="space-y-4">
            <p className="flex justify-between">
              <span>Total Questions:</span>
              <span>{quizData.length}</span>
            </p>
            <p className="flex justify-between">
              <span>Questions Answered:</span>
              <span>{totalAnswered}</span>
            </p>
            <p className="flex justify-between">
              <span>Questions Skipped:</span>
              <span>{quizData.length - totalAnswered}</span>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="sticky top-0 z-10  ">
        <Header
          currentQuestion={currentQuestion}
          totalQuestions={quizData.length}
          visitedQuestions={visitedQuestions}
          answeredQuestions={answeredQuestions}
          onQuestionSelect={handleQuestionSelect}
        />
        <QuestionTimer
          seconds={QUESTION_TIME_LIMIT}
          onTimeUp={handleQuestionTimeUp}
        />
      </div>

      <QuestionCard
        question={quizData[currentQuestion - 1]}
        options={quizData[currentQuestion - 1].options}
        onAnswer={handleAnswer}
        onSkip={handleSkip}
      />

      <div className="fixed top-4 right-4">
        <Timer totalSeconds={totalTime} onTimeUp={handleTotalTimeUp} />
      </div>
    </div>
  );
};

export default QuizFormsPage;
