import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useChat = ({ currentUserId, otherUserId }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return {
    conversation,
    messages,
    setMessages,
    isLoading,
    error
  };
};