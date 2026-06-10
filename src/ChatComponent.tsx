import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const previewWidth = 420;

  const { messages, streamingContent, toolOutputs, isStreaming, sendMessage, stopStreaming } = useChatStream();
  const hasStreamingContent = isStreaming || toolOutputs.length > 0;

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
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          transition: 'width 0.35s ease, padding 0.35s ease',
          width: isDesktop && showStreamPreview && hasStreamingContent ? `calc(100% - ${previewWidth}px)` : '100%',
          py: { xs: 2, md: 3 },
          px: { xs: 1.5, sm: 2.5, lg: 3.5 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: hasStreamingContent ? '1360px' : '1160px' }}>
          <Paper
            elevation={4}
            sx={{
              height: '100%',
              minHeight: { xs: 'calc(100vh - 16px)', md: 'calc(100vh - 48px)' },
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: { xs: 2, md: 3 },
              backdropFilter: 'blur(18px)',
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              boxShadow: '0 24px 80px rgba(79, 70, 229, 0.12)',
            }}
          >
            <ChatHeader
              showStreamPreview={showStreamPreview}
              onToggleStreamPreview={() => setShowStreamPreview(!showStreamPreview)}
              hasStreamingContent={hasStreamingContent}
            />

            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                px: { xs: 1.5, md: 3 },
                py: { xs: 2, md: 3 },
                bgcolor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(238, 242, 255, 0.58) 100%)',
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

      {hasStreamingContent && (
        <StreamingPreviewPanel
          streamingContent={streamingContent}
          toolOutputs={toolOutputs}
          isVisible={showStreamPreview}
          isStreaming={isStreaming}
          isDesktop={isDesktop}
          onClose={() => setShowStreamPreview(false)}
        />
      )}
    </Box>
  );
}
