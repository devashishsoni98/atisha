import { useState, useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { XCircle, Send } from 'lucide-react';
import Router from './router/Router';
import '@xyflow/react/dist/style.css';
import './App.css';
import chatbotIcon from './assets/logo.png';
import loadingGif from './assets/loading.gif';
import botAvatar from './assets/main.gif';
import NotificationProvider from './hooks/useNotifications';
import MarkdownPreview from '@uiw/react-markdown-preview';
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
  const userName = useSelector((state) => state.user.name) || localStorage.getItem('userName');

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
      const response = await fetch('http://localhost:7000/chatbot/welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, username: userName }),
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
          const response = await fetch('http://localhost:7000/chatbot/generate', {
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
        const response = await fetch('http://localhost:7000/chatbot/generate', {
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
    <div className={`fixed bottom-4 right-4 transition-all duration-300 ease-in-out z-[9999]  ${
  isChatOpen 
    ? 'w-[35vw] h-[85vh] rounded-lg' 
    : 'w-20 h-20 rounded-full overflow-hidden'
}`}>
      {/* Chat Header */}
      {isChatOpen ? (
        <div className="bg-blue-500 p-4 cursor-pointer flex justify-between items-center rounded-t-2xl ">
          <div className="flex items-center p-0 overflow-hidden">
            <img src={botAvatar} alt="Chatbot Icon" className="h-12 w-12 mr-2 object-contain " />
            <h2 className="text-white text-xl font-bold">ATISHA Chatbot</h2>
          </div>
          <button
            onClick={() => setIsChatOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <XCircle size={28} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-full h-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center shadow-lg"
        >
          <img src={botAvatar} alt="Open Chat" className="w-full" />
        </button>
      )}

      {/* Chat Messages */}
      {isChatOpen && (
        <>
          <div className="h-[calc(100%-8rem)] bg-gray-100 overflow-y-auto p-4 rounded-b-2xl border " ref={chatRef}>
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && (
                  <div className="w-10 h-10 rounded-full mr-2 self-start mt-4 bg-gray-500 flex items-center justify-center">
                    <img src={chatbotIcon} alt="Bot Avatar" className="w-8 h-8" />
                  </div>
                )}
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-white text-black border border-gray-300' 
                    : 'bg-white text-gray-800 border border-gray-300 preview-container '
                }`}>
                  {/* {message.content} */}
                  <MarkdownPreview source={message.content}  />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="">
                <img src={loadingGif} alt="Loading..." className="h-12 w-12 inline-block mb-6" />
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 rounded-b-2xl border ">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                <Send className="h-5 w-5"/>
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="relative min-h-screen">
      <NotificationProvider>

      <RouterProvider router={Router} />
      </NotificationProvider>
      <ChatBot />
    </div>
  );
}

export default App;

