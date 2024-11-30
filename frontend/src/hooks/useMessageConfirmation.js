import { useCallback } from 'react';

export const useMessageConfirmation = ({ setMessages, pendingMessages, setError }) => {
  const handleMessageConfirmation = useCallback((confirmedMessage) => {
    if (confirmedMessage.tempId) {
      pendingMessages.delete(confirmedMessage.tempId);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === confirmedMessage.tempId ? { ...confirmedMessage, id: confirmedMessage.id } : msg
        )
      );
    }
  }, [pendingMessages, setMessages]);

  const handleMessageError = useCallback((error, tempId) => {
    const failedMessage = pendingMessages.get(tempId);
    if (failedMessage) {
      pendingMessages.delete(tempId);
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      setError(`Failed to send message: ${error}`);
    }
  }, [pendingMessages, setMessages, setError]);

  return {
    handleMessageConfirmation,
    handleMessageError,
  };
};