import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, Clock } from 'lucide-react';

export const ChatMessage = ({ 
  content, 
  isCurrentUser, 
  timestamp,
  isPending = false
}) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isCurrentUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="break-words">{content}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className={`text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </span>
          {isCurrentUser && (
            isPending ? (
              <Clock className="w-3 h-3 text-blue-100" />
            ) : (
              <Check className="w-3 h-3 text-blue-100" />
            )
          )}
        </div>
      </div>
    </div>
  );
};