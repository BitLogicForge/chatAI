import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { streamChatResponse } from '../services/chatApi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async (query: string) => {
      abortControllerRef.current = new AbortController();

      // Add user message
      const userMsg: Message = { role: 'user', content: query };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);

      // Add placeholder for assistant
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      try {
        const fullResponse = await streamChatResponse({
          messages: updatedMessages,
          signal: abortControllerRef.current.signal,
          onChunk: content => {
            setStreamingContent(content);
            // Update last message in real-time
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: 'assistant',
                content,
              };
              return updated;
            });
          },
        });

        return fullResponse;
      } finally {
        setStreamingContent('');
      }
    },
    onError: () => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, an error occurred.',
        };
        return updated;
      });
    },
  });

  const stopStreaming = () => {
    abortControllerRef.current?.abort();
    mutation.reset();
    setStreamingContent('');
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingContent('');
  };

  return {
    messages,
    streamingContent,
    isStreaming: mutation.isPending,
    sendMessage: mutation.mutate,
    stopStreaming,
    clearChat,
  };
};
