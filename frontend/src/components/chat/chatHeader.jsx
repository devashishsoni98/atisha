import React from 'react';
import { MessageCircle } from 'lucide-react';

export const ChatHeader = () => {
  return (
    <div className="p-4 border-b flex items-center gap-2">
      <MessageCircle className="text-blue-500" />
      <h2 className="font-semibold text-lg">Chat</h2>
    </div>
  );
};