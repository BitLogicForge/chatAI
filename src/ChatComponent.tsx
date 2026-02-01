import { Box, Paper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ChatHeader from './components/chat/ChatHeader';
import ChatInputForm from './components/chat/ChatInputForm';
import ChatMessage from './components/chat/ChatMessage';
import EmptyState from './components/chat/EmptyState';
import StreamingPreviewPanel from './components/chat/StreamingPreviewPanel';
import StreamingStatusBar from './components/chat/StreamingStatusBar';
import { useChatStream } from './hooks/useChatStream';

export default function ChatComponent() {
  const [input, setInput] = useState('');
  const [showStreamPreview, setShowStreamPreview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { messages, streamingContent, toolOutputs, isStreaming, sendMessage, stopStreaming } = useChatStream();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    sendMessage(input);
    setInput('');
    // Auto-open thought process panel when sending message
    setShowStreamPreview(true);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          transition: 'all 0.3s ease',
          width: showStreamPreview && (isStreaming || toolOutputs.length > 0) ? 'calc(100% - 400px)' : '100%',
          py: 3,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <ChatHeader
              showStreamPreview={showStreamPreview}
              onToggleStreamPreview={() => setShowStreamPreview(!showStreamPreview)}
              hasStreamingContent={isStreaming || toolOutputs.length > 0}
            />

            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                p: 2,
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                messages.map((msg, idx) => (
                  <ChatMessage
                    key={idx}
                    role={msg.role}
                    content={msg.content}
                    isLastMessage={idx === messages.length - 1}
                    isStreaming={isStreaming}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </Box>

            {isStreaming && <StreamingStatusBar streamingContentLength={streamingContent.length} />}

            <ChatInputForm
              input={input}
              isStreaming={isStreaming}
              onInputChange={setInput}
              onSubmit={handleSubmit}
              onStop={stopStreaming}
            />
          </Paper>
        </Box>
      </Box>

      {(isStreaming || toolOutputs.length > 0) && (
        <StreamingPreviewPanel
          streamingContent={streamingContent}
          toolOutputs={toolOutputs}
          isVisible={showStreamPreview}
          isStreaming={isStreaming}
          onClose={() => setShowStreamPreview(false)}
        />
      )}
    </Box>
  );
}
