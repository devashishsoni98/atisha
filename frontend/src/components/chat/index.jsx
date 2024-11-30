import React, { useRef, useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useChat } from '../../hooks/useChat';
import { ChatMessages } from './chatMessages';
import { ChatInput } from './ChatInputs';
import { ChatHeader } from './chatHeader';


export const Chat = ({ currentUserId, otherUserId }) => {
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const pendingMessagesRef = useRef(new Map());

  const {
    conversation,
    messages,
    setMessages,
    isLoading,
    error: chatError
  } = useChat({ currentUserId, otherUserId });

  const { socket, error: socketError } = useSocket({
    currentUserId,
    otherUserId,
    conversationId: conversation?.id,
    onMessageReceived: (message) => setMessages(prev => [...prev, message]),
    onTypingStart: () => setOtherUserTyping(true),
    onTypingStop: () => setOtherUserTyping(false),
  });

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
    socket.emit('typing', { sender_id: currentUserId, recipient_id: otherUserId });
  };

  const handleStopTyping = () => {
    if (!socket || !conversation || !isTyping) return;
    setIsTyping(false);
    socket.emit('stop_typing', { sender_id: currentUserId, recipient_id: otherUserId });
  };

  if (chatError || socketError) {
    return (
      <ErrorMessagee
        message={chatError || socketError || 'An error occurred'} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <ChatHeader />
      <ChatMessages
        messages={messages}
        currentUserId={currentUserId}
        isLoading={isLoading}
        otherUserTyping={otherUserTyping}
        pendingMessages={pendingMessagesRef.current}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
      />
    </div>
  );
};