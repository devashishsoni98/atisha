import React from 'react';
import { Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

export const ChatMessages = ({
  messages,
  currentUserId,
  isLoading,
  otherUserTyping,
  pendingMessages,
  messagesEndRef
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.message_content}
          isCurrentUser={message.sender_id === currentUserId}
          timestamp={new Date(message.sent_at)}
          isPending={pendingMessages.has(message.id)}
        />
      ))}
      {otherUserTyping && (
        <div className="text-sm text-gray-500 italic">
          Typing...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};