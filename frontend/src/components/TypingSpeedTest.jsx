


// import React, { useState } from 'react';

// // Typing Speed Test Component
// const TypingSpeedTest = () => {
//   const sentences = [
//     "The quick brown fox jumps over the lazy dog.",
//     "React is a powerful library for building UIs.",
//     "Typing speed tests are fun and challenging!",
//     "A journey of a thousand miles begins with a single step.",
//     "Programming is both an art and a science."
//   ];

//   const [text, setText] = useState('');
//   const [input, setInput] = useState('');
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [wpm, setWpm] = useState(0);
//   const [accuracy, setAccuracy] = useState(100);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const resetTest = () => {
//     const randomIndex = Math.floor(Math.random() * sentences.length);
//     setText(sentences[randomIndex]);
//     setInput('');
//     setStartTime(null);
//     setEndTime(null);
//     setWpm(0);
//     setAccuracy(100);
//     setCurrentIndex(0);
//     setIsCompleted(false);
//   };

//   React.useEffect(() => {
//     resetTest();
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInput(value);

//     if (!startTime) {
//       setStartTime(Date.now());
//     }

//     // Calculate accuracy
//     const correctChars = value.split('').filter((char, i) => char === text[i]).length;
//     const newAccuracy = Math.round((correctChars / value.length) * 100) || 100;
//     setAccuracy(newAccuracy);

//     // Update current index for highlighting
//     setCurrentIndex(value.length);

//     if (value === text) {
//       setEndTime(Date.now());
//       setIsCompleted(true);
//     }
//   };

//   React.useEffect(() => {
//     if (startTime && endTime) {
//       const timeTaken = (endTime - startTime) / 1000 / 60; // in minutes
//       const wordsTyped = text.split(' ').length;
//       const speed = Math.round(wordsTyped / timeTaken);
//       setWpm(speed);
//     }
//   }, [endTime, startTime, text]);

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Typing Speed Test</h1>
//       <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
//         <p className="text-lg mb-4 leading-relaxed">
//           {text.split('').map((char, index) => (
//             <span
//               key={index}
//               className={
//                 index === currentIndex
//                   ? 'bg-yellow-300'
//                   : index < currentIndex
//                   ? input[index] === char
//                     ? 'text-green-600'
//                     : 'text-red-600'
//                   : ''
//               }
//             >
//               {char}
//             </span>
//           ))}
//         </p>
//         <textarea
//           value={input}
//           onChange={handleInputChange}
//           disabled={isCompleted}
//           placeholder="Start typing here..."
//           className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
//           rows={3}
//         ></textarea>
//       </div>
//       <div className="flex justify-between items-center mb-6">
//         <div className="text-center">
//           <span className="text-2xl text-yellow-500 mb-2">⚡</span>
//           <p className="text-xl font-semibold">{wpm}</p>
//           <p className="text-sm text-gray-600">WPM</p>
//         </div>
//         <div className="text-center">
//           <span className="text-2xl text-green-500 mb-2">✓</span>
//           <p className="text-xl font-semibold">{accuracy}%</p>
//           <p className="text-sm text-gray-600">Accuracy</p>
//         </div>
//       </div>
//       <button
//         onClick={resetTest}
//         className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
//       >
//         <span className="mr-2">🔄</span>
//         Reset Test
//       </button>
//       {isCompleted && (
//         <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
//           <p className="text-lg font-semibold">Great job! You've completed the test.</p>
//           <p>
//             Your typing speed is <span className="font-bold">{wpm} WPM</span> with{' '}
//             <span className="font-bold">{accuracy}%</span> accuracy.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Memory Match Game Component
// const MemoryMatchGame = () => {
//   const [cards, setCards] = useState([]);
//   const [flipped, setFlipped] = useState([]);
//   const [solved, setSolved] = useState([]);
//   const [moves, setMoves] = useState(0);

//   const symbols = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍍', '🥝'];

//   React.useEffect(() => {
//     initializeGame();
//   }, []);

//   const initializeGame = () => {
//     const shuffledCards = [...symbols, ...symbols]
//       .sort(() => Math.random() - 0.5)
//       .map((symbol, index) => ({ id: index, symbol }));
//     setCards(shuffledCards);
//     setFlipped([]);
//     setSolved([]);
//     setMoves(0);
//   };

//   const handleCardClick = (id) => {
//     if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

//     const newFlipped = [...flipped, id];
//     setFlipped(newFlipped);
//     setMoves(moves + 1);

//     if (newFlipped.length === 2) {
//       const [firstId, secondId] = newFlipped;
//       if (cards[firstId].symbol === cards[secondId].symbol) {
//         setSolved([...solved, firstId, secondId]);
//       }
//       setTimeout(() => setFlipped([]), 1000);
//     }
//   };

//   const isCardFlipped = (id) => flipped.includes(id) || solved.includes(id);

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Memory Match</h2>
//       <div className="grid grid-cols-4 gap-2 mb-4">
//         {cards.map((card) => (
//           <button
//             key={card.id}
//             onClick={() => handleCardClick(card.id)}
//             className={`w-16 h-16 text-2xl flex items-center justify-center rounded ${
//               isCardFlipped(card.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {isCardFlipped(card.id) ? card.symbol : '?'}
//           </button>
//         ))}
//       </div>
//       <p className="text-center">Moves: {moves}</p>
//       {solved.length === cards.length && (
//         <p className="text-center mt-4 font-bold text-green-600">
//           Congratulations! You've completed the game!
//         </p>
//       )}
//       <button
//         onClick={initializeGame}
//         className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//       >
//         New Game
//       </button>
//     </div>
//   );
// };

// // Word Scramble Game Component
// const WordScrambleGame = () => {
//   const words = ['react', 'javascript', 'component', 'state', 'props', 'hooks', 'effect', 'render'];
//   const [currentWord, setCurrentWord] = useState('');
//   const [scrambledWord, setScrambledWord] = useState('');
//   const [userGuess, setUserGuess] = useState('');
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('');

//   React.useEffect(() => {
//     newWord();
//   }, []);

//   const scrambleWord = (word) => {
//     return word
//       .split('')
//       .sort(() => Math.random() - 0.5)
//       .join('');
//   };

//   const newWord = () => {
//     const word = words[Math.floor(Math.random() * words.length)];
//     setCurrentWord(word);
//     setScrambledWord(scrambleWord(word));
//     setUserGuess('');
//     setFeedback('');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userGuess.toLowerCase() === currentWord) {
//       setScore(score + 1);
//       setFeedback('Correct! Great job!');
//       setTimeout(newWord, 1500);
//     } else {
//       setFeedback(`Sorry, that's not correct. The word was "${currentWord}".`);
//     }
//   };

//   return (
//     <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Word Scramble</h2>
//       <p className="text-center text-2xl mb-4">{scrambledWord}</p>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           value={userGuess}
//           onChange={(e) => setUserGuess(e.target.value)}
//           className="w-full p-2 mb-2 border rounded"
//           placeholder="Enter your guess"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//       <p className="text-center mb-2">{feedback}</p>
//       <p className="text-center">Score: {score}</p>
//       <button
//         onClick={newWord}
//         className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//       >
//         New Word
//       </button>
//     </div>
//   );
// };

// // Main App Component
// const MultiGameApp = () => {
//   const [activeGame, setActiveGame] = useState('typing');

//   const renderGame = () => {
//     switch (activeGame) {
//       case 'typing':
//         return <TypingSpeedTest />;
//       case 'memory':
//         return <MemoryMatchGame />;
//       case 'scramble':
//         return <WordScrambleGame />;
//       default:
//         return <TypingSpeedTest />;
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-center mb-6">
//         <button 
//           onClick={() => setActiveGame('typing')} 
//           className={`mx-2 px-4 py-2 rounded ${
//             activeGame === 'typing' ? 'bg-blue-600 text-white' : 'bg-blue-200'
//           }`}
//         >
//           Typing Test
//         </button>
//         <button 
//           onClick={() => setActiveGame('memory')} 
//           className={`mx-2 px-4 py-2 rounded ${
//             activeGame === 'memory' ? 'bg-blue-600 text-white' : 'bg-blue-200'
//           }`}
//         >
//           Memory Match
//         </button>
//         <button 
//           onClick={() => setActiveGame('scramble')} 
//           className={`mx-2 px-4 py-2 rounded ${
//             activeGame === 'scramble' ? 'bg-blue-600 text-white' : 'bg-blue-200'
//           }`}
//         >
//           Word Scramble
//         </button>
//       </div>
//       {renderGame()}
//     </div>
//   );
// };

// export default MultiGameApp;

import React, { useState, useEffect } from 'react';

// Typing Speed Test Component
const TypingSpeedTest = () => {
  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "React is a powerful library for building UIs.",
    "Typing speed tests are fun and challenging!",
    "A journey of a thousand miles begins with a single step.",
    "Programming is both an art and a science."
  ];

  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetTest = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setText(sentences[randomIndex]);
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    resetTest();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    const correctChars = value.split('').filter((char, i) => char === text[i]).length;
    const newAccuracy = Math.round((correctChars / value.length) * 100) || 100;
    setAccuracy(newAccuracy);

    setCurrentIndex(value.length);

    if (value === text) {
      setEndTime(Date.now());
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    if (startTime && endTime) {
      const timeTaken = (endTime - startTime) / 1000 / 60; // in minutes
      const wordsTyped = text.split(' ').length;
      const speed = Math.round(wordsTyped / timeTaken);
      setWpm(speed);
    }
  }, [endTime, startTime, text]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Typing Speed Test</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
        <p className="text-lg mb-4 leading-relaxed">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={
                index === currentIndex
                  ? 'bg-yellow-300'
                  : index < currentIndex
                  ? input[index] === char
                    ? 'text-green-600'
                    : 'text-red-600'
                  : ''
              }
            >
              {char}
            </span>
          ))}
        </p>
        <textarea
          value={input}
          onChange={handleInputChange}
          disabled={isCompleted}
          placeholder="Start typing here..."
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          rows={3}
        ></textarea>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <span className="text-2xl text-yellow-500 mb-2">⚡</span>
          <p className="text-xl font-semibold">{wpm}</p>
          <p className="text-sm text-gray-600">WPM</p>
        </div>
        <div className="text-center">
          <span className="text-2xl text-green-500 mb-2">✓</span>
          <p className="text-xl font-semibold">{accuracy}%</p>
          <p className="text-sm text-gray-600">Accuracy</p>
        </div>
      </div>
      <button
        onClick={resetTest}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
      >
        <span className="mr-2">🔄</span>
        Reset Test
      </button>
      {isCompleted && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="text-lg font-semibold">Great job! You've completed the test.</p>
          <p>
            Your typing speed is <span className="font-bold">{wpm} WPM</span> with{' '}
            <span className="font-bold">{accuracy}%</span> accuracy.
          </p>
        </div>
      )}
    </div>
  );
};

// Memory Match Game Component
const MemoryMatchGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  const symbols = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍍', '🥝'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].symbol === cards[secondId].symbol) {
        setSolved([...solved, firstId, secondId]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const isCardFlipped = (id) => flipped.includes(id) || solved.includes(id);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Memory Match</h2>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-16 h-16 text-2xl flex items-center justify-center rounded ${
              isCardFlipped(card.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {isCardFlipped(card.id) ? card.symbol : '?'}
          </button>
        ))}
      </div>
      <p className="text-center">Moves: {moves}</p>
      {solved.length === cards.length && (
        <p className="text-center mt-4 font-bold text-green-600">
          Congratulations! You've completed the game!
        </p>
      )}
      <button
        onClick={initializeGame}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        New Game
      </button>
    </div>
  );
};

// Word Scramble Game Component
const WordScrambleGame = () => {
  const words = ['react', 'javascript', 'component', 'state', 'props', 'hooks', 'effect', 'render'];
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    newWord();
  }, []);

  const scrambleWord = (word) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  const newWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserGuess('');
    setFeedback('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userGuess.toLowerCase() === currentWord) {
      setScore(score + 1);
      setFeedback('Correct! Great job!');
      setTimeout(newWord, 1500);
    } else {
      setFeedback(`Sorry, that's not correct. The word was "${currentWord}".`);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Word Scramble</h2>
      <p className="text-center text-2xl mb-4">{scrambledWord}</p>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Enter your guess"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <p className="text-center mb-2">{feedback}</p>
      <p className="text-center">Score: {score}</p>
      <button
        onClick={newWord}
        className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        New Word
      </button>
    </div>
  );
};

// Main App Component
const MultiGameApp = () => {
  const [activeGame, setActiveGame] = useState('typing');

  const renderGame = () => {
    switch (activeGame) {
      case 'typing':
        return <TypingSpeedTest />;
      case 'memory':
        return <MemoryMatchGame />;
      case 'scramble':
        return <WordScrambleGame />;
      default:
        return <TypingSpeedTest />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Multi-Game App</h1>
      <div className="flex justify-center mb-6">
        <button 
          onClick={() => setActiveGame('typing')} 
          className={`mx-2 px-4 py-2 rounded ${
            activeGame === 'typing' ? 'bg-blue-600 text-white' : 'bg-blue-200'
          }`}
        >
          Typing Test
        </button>
        <button 
          onClick={() => setActiveGame('memory')} 
          className={`mx-2 px-4 py-2 rounded ${
            activeGame === 'memory' ? 'bg-blue-600 text-white' : 'bg-blue-200'
          }`}
        >
          Memory Match
        </button>
        <button 
          onClick={() => setActiveGame('scramble')} 
          className={`mx-2 px-4 py-2 rounded ${
            activeGame === 'scramble' ? 'bg-blue-600 text-white' : 'bg-blue-200'
          }`}
        >
          Word Scramble
        </button>
      </div>
      {renderGame()}
    </div>
  );
};

export default MultiGameApp;

