// import './App.css'
// import { RouterProvider } from 'react-router-dom';
// import Router from './router/Router'
// import '@xyflow/react/dist/style.css';


// function App() {

//   return (
//     <>
//     <div>
//       {/* <Navbar/> */}
      
//       <RouterProvider router={Router}/>
//     </div>
//     </>
//   )
// }

// export default App

// import { useState, useEffect, useRef } from 'react';
// import { RouterProvider } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Router from './router/Router';
// import '@xyflow/react/dist/style.css';
// import './App.css';

// function App() {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const chatRef = useRef(null);

//   const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId');
//   const roleType = useSelector((state) => state.user.roleType) || localStorage.getItem('userType');

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (userId && roleType) {
//       handleWelcomeMessage();
//     }
//   }, [userId, roleType]);

//   const handleWelcomeMessage = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/welcome', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ role: roleType, username: userId }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setMessages([{ type: 'bot', content: data.message }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages([{ type: 'bot', content: 'Welcome to ATISHA! How can I assist you today?' }]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setIsLoading(true);
//     setMessages(prev => [...prev, { type: 'user', content: input }]);
//     setInput('');

//     try {
//       const response = await fetch('http://localhost:8000/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt: input, role: roleType }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, there was an error processing your request.' }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen">
//       <RouterProvider router={Router} />

//       {/* Chatbot Dialog */}
//       <div className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out ${isChatOpen ? 'h-[600px]' : 'h-16'} overflow-hidden z-[9999]`}>
//         {/* Chat Header */}
//         <div
//           className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 cursor-pointer"
//           onClick={() => setIsChatOpen(!isChatOpen)}
//         >
//           <h2 className="text-white font-bold">ATISHA Chatbot</h2>
//         </div>

//         {/* Chat Messages */}
//         {isChatOpen && (
//           <div className="h-[calc(100%-8rem)] overflow-y-auto p-4" ref={chatRef}>
//             {messages.map((message, index) => (
//               <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
//                 <div className={`inline-block p-2 rounded-lg ${message.type === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'}`}>
//                   {message.content}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="text-center">
//                 <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
//                   <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Chat Input */}
//         {isChatOpen && (
//           <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100">
//             <div className="flex">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-r-lg hover:opacity-90 transition-opacity"
//               >
//                 Send
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect, useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Router from './router/Router';
import '@xyflow/react/dist/style.css';
import './App.css';

// Create a separate component for the chat functionality
function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const chatRef = useRef(null);

  const userId = useSelector((state) => state.user.id) || localStorage.getItem('userId');
  const roleType = useSelector((state) => state.user.roleType) || localStorage.getItem('userType');

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (userId && roleType) {
      setUserRole(roleType);
      handleWelcomeMessage(roleType);
    } else {
      handleNotLoggedInMessage();
    }
  }, [userId, roleType]);

  const handleWelcomeMessage = async (role) => {
    try {
      const response = await fetch('http://localhost:8000/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, username: userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages([{ type: 'bot', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([{ type: 'bot', content: `Welcome to ATISHA! How can I assist you as a ${role} today?` }]);
    }
  };

  const handleNotLoggedInMessage = () => {
    setMessages([
      { type: 'bot', content: "Welcome to ATISHA! It looks like you're not logged in. What best describes you?" },
      { type: 'bot', content: "1. Student\n2. Counselor\n3. Mentor\n4. Institute\n5. Other\n\nPlease type the number of your choice." }
    ]);
  };

  const handleRoleSelection = (role) => {
    setUserRole(role);
    setMessages(prev => [...prev, 
      { type: 'bot', content: `Great! You've selected ${role}. Would you like to sign up to access all features? (Yes/No)` }
    ]);
  };

  const handleSignUpPrompt = (response) => {
    if (response.toLowerCase() === 'yes') {
      setMessages(prev => [...prev, { type: 'bot', content: "Great! Please click the Sign Up button in the navigation bar to create your account." }]);
    } else {
      setMessages(prev => [...prev, { type: 'bot', content: "No problem! How can I assist you today?" }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');

    if (!userId) {
      if (!userRole) {
        const roleNumber = parseInt(input);
        if (roleNumber >= 1 && roleNumber <= 5) {
          const roles = ['Student', 'Counselor', 'Mentor', 'Institute', 'Other'];
          handleRoleSelection(roles[roleNumber - 1]);
        } else {
          setMessages(prev => [...prev, { type: 'bot', content: "I'm sorry, that's not a valid option. Please choose a number between 1 and 5." }]);
        }
      } else if (input.toLowerCase() === 'yes' || input.toLowerCase() === 'no') {
        handleSignUpPrompt(input);
      } else {
        try {
          const response = await fetch('http://localhost:8000/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: input, role: userRole }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
        } catch (error) {
          console.error('Error:', error);
          setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, there was an error processing your request.' }]);
        }
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: input, role: roleType }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, there was an error processing your request.' }]);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out ${isChatOpen ? 'h-[600px]' : 'h-16'} overflow-hidden z-[9999]`}>
      {/* Chat Header */}
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 cursor-pointer"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <h2 className="text-white font-bold">ATISHA Chatbot</h2>
      </div>

      {/* Chat Messages */}
      {isChatOpen && (
        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4" ref={chatRef}>
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.type === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'}`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      {isChatOpen && (
        <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-r-lg hover:opacity-90 transition-opacity"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="relative min-h-screen">
      <RouterProvider router={Router} />
      <ChatBot />
    </div>
  );
}

export default App;

