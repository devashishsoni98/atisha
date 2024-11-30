import React from 'react';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg items-center justify-center">
      <p className="text-red-500 mb-4">{message}</p>
      <button 
        onClick={onRetry} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};