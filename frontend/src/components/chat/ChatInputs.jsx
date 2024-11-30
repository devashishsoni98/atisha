import React, { useState, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';

export const ChatInput = ({
  onSendMessage,
  onTyping,
  onStopTyping,
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      onStopTyping();
    }
  }, [message, disabled, onSendMessage, onStopTyping]);

  const handleTyping = useCallback((e) => {
    setMessage(e.target.value);
    
    // Only trigger typing event if there's actual content
    if (e.target.value.trim()) {
      onTyping();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout for stop typing
    typingTimeoutRef.current = setTimeout(() => {
      if (e.target.value.trim()) {
        onStopTyping();
      }
    }, 2000);
  }, [onTyping, onStopTyping]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={handleTyping}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="rounded-full p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};