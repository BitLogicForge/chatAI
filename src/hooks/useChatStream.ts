import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { streamChatResponse } from '../services/chatApi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ToolMessage {
  type: 'tool';
  name: string;
  content: string;
  tool_call_id: string;
  status?: string;
}

export const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState('');
  const [toolOutputs, setToolOutputs] = useState<ToolMessage[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async (query: string) => {
      abortControllerRef.current = new AbortController();

      // Clear previous tool outputs when starting new request
      setToolOutputs([]);

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
          onToolOutput: toolMessages => {
            console.log('🔧 Received tool outputs:', toolMessages);
            // Append new tool outputs to existing ones
            setToolOutputs(prev => [...prev, ...toolMessages]);
          },
        });

        return fullResponse;
      } finally {
        setStreamingContent('');
        // Don't clear toolOutputs here - keep them visible
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
    // Keep tool outputs visible even after stopping
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingContent('');
    setToolOutputs([]);
  };

  return {
    messages,
    streamingContent,
    toolOutputs,
    isStreaming: mutation.isPending,
    sendMessage: mutation.mutate,
    stopStreaming,
    clearChat,
  };
};
