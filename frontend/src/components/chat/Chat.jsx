import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { ChatMessage } from './ChatMessage';

import { MessageCircle, Loader2 } from 'lucide-react';
import api from '../../utils/api';
import { ChatInput } from './ChatInputs';

export const Chat = ({ currentUserId, otherUserId }) => {
  const [socket, setSocket] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const pendingMessagesRef = useRef(new Map());

  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      query: { userId: currentUserId },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      newSocket.emit('register_user', currentUserId);
    });

    newSocket.on('connect_error', () => {
      setError('Unable to connect to chat server');
    });

    newSocket.on('receive_message', (message) => {
      if (message.conversation_id === conversation?.id) {
        setMessages(prev => [...prev, message]);
      }
    });

    newSocket.on('message_sent_confirmation', (confirmedMessage) => {
      const tempId = `temp-${confirmedMessage.message_content}-${confirmedMessage.sent_at}`;
      pendingMessagesRef.current.delete(tempId);
      
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? confirmedMessage : msg
      ));
    });

    newSocket.on('message_error', ({ error, tempId }) => {
      const failedMessage = pendingMessagesRef.current.get(tempId);
      if (failedMessage) {
        pendingMessagesRef.current.delete(tempId);
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
        setError(`Failed to send message: ${error}`);
      }
    });

    newSocket.on('typing', ({ sender_id }) => {
      if (sender_id === otherUserId) {
        setOtherUserTyping(true);
      }
    });

    newSocket.on('stop_typing', ({ sender_id }) => {
      if (sender_id === otherUserId) {
        setOtherUserTyping(false);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [currentUserId, otherUserId, conversation?.id]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.post('/conversations', {
          user1_id: currentUserId,
          user2_id: otherUserId
        });
        setConversation(response.data);
      } catch (error) {
        setError('Failed to load conversation');
        console.error('Failed to fetch conversation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [currentUserId, otherUserId]);

  useEffect(() => {
    if (conversation) {
      const fetchMessages = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const response = await api.get(`/messages/${conversation.id}`);
          setMessages(response.data);
        } catch (error) {
          setError('Failed to load messages');
          console.error('Failed to fetch messages:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMessages();
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (messageContent) => {
    if (!socket || !conversation) return;

    const tempId = `temp-${messageContent}-${Date.now()}`;
    const tempMessage = {
      id: tempId,
      conversation_id: conversation.id,
      sender_id: currentUserId,
      message_content: messageContent,
      sent_at: new Date(),
      is_read: false,
    };

    pendingMessagesRef.current.set(tempId, tempMessage);
    setMessages(prev => [...prev, tempMessage]);

    socket.emit('send_message', {
      conversation_id: conversation.id,
      sender_id: currentUserId,
      recipient_id: otherUserId,
      message_content: messageContent,
      tempId
    });
  };

  const handleTyping = () => {
    if (!socket || !conversation || isTyping) return;

    setIsTyping(true);
    socket.emit('typing', {
      sender_id: currentUserId,
      recipient_id: otherUserId
    });
  };
 
  const handleStopTyping = () => {
    if (!socket || !conversation || !isTyping) return;

    setIsTyping(false);
    socket.emit('stop_typing', {
      sender_id: currentUserId,
      recipient_id: otherUserId
    });
  };

  if (error) {
    return (
      <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b flex items-center gap-2">
        <MessageCircle className="text-blue-500" />
        <h2 className="font-semibold text-lg">Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.message_content}
                isCurrentUser={message.sender_id === currentUserId}
                timestamp={new Date(message.sent_at)}
                isPending={pendingMessagesRef.current.has(message.id)}
              />
            ))}
            {otherUserTyping && (
              <div className="text-sm text-gray-500 italic">
                Typing...
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
      />
    </div>
  );
};