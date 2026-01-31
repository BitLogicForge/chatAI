import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StopIcon from '@mui/icons-material/Stop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { streamChatResponse } from './services/chatApi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const [showStreamPreview, setShowStreamPreview] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // React Query mutation for streaming
  const streamMutation = useMutation({
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
      } catch (error) {
        console.error('❌ Stream error:', error);
        throw error;
      } finally {
        setStreamingContent('');
      }
    },
    onError: error => {
      console.error('Streaming error:', error);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || streamMutation.isPending) return;

    streamMutation.mutate(input);
    setInput('');
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    streamMutation.reset();
  };

  return (
    <Container maxWidth='lg' sx={{ height: '100vh', display: 'flex', flexDirection: 'column', py: 3 }}>
      <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon sx={{ fontSize: 32 }} />
            <Typography variant='h5' component='h1'>
              Agent Chat
            </Typography>
          </Box>
          <Tooltip title={showStreamPreview ? 'Hide streaming preview' : 'Show streaming preview'}>
            <IconButton
              color='inherit'
              onClick={() => setShowStreamPreview(!showStreamPreview)}
              size='small'
            >
              {showStreamPreview ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
        </Box>

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 2,
              }}
            >
              <SmartToyIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
              <Typography variant='h6' color='text.secondary'>
                Start a conversation about your banking needs
              </Typography>
            </Box>
          ) : (
            messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
                  }}
                >
                  {msg.role === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: msg.role === 'user' ? 'primary.light' : 'white',
                    color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {msg.content}
                    {streamMutation.isPending && idx === messages.length - 1 && !msg.content && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} />
                        <Typography variant='body2' color='text.secondary'>
                          Thinking...
                        </Typography>
                      </Box>
                    )}
                  </Typography>
                </Paper>
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Status Bar */}
        {streamMutation.isPending && (
          <Box sx={{ px: 2, py: 1, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} />
            <Chip
              label={streamingContent.length > 0
                ? `Receiving response... ${streamingContent.length} characters`
                : 'Waiting for response...'}
              size='small'
              color='primary'
              variant='outlined'
            />
          </Box>
        )}

        {/* Streaming Preview Panel */}
        {showStreamPreview && streamMutation.isPending && streamingContent && (
          <Paper
            elevation={0}
            sx={{
              mx: 2,
              mb: 1,
              p: 2,
              bgcolor: 'info.light',
              border: '2px dashed',
              borderColor: 'info.main',
              maxHeight: '150px',
              overflow: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CircularProgress size={14} />
              <Typography variant='caption' fontWeight='bold' color='info.dark'>
                🔄 Live Streaming Preview
              </Typography>
            </Box>
            <Typography
              variant='body2'
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: 'text.primary'
              }}
            >
              {streamingContent}
              <Box
                component='span'
                sx={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  bgcolor: 'info.main',
                  ml: 0.5,
                  animation: 'blink 1s infinite'
                }}
              />
            </Typography>
          </Paper>
        )}

        {/* Input Area */}
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
            bgcolor: 'background.paper',
          }}
        >
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Ask ...'
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={streamMutation.isPending}
            size='small'
            autoComplete='off'
          />
          {streamMutation.isPending ? (
            <IconButton color='error' onClick={stopStreaming} aria-label='stop'>
              <StopIcon />
            </IconButton>
          ) : (
            <Button type='submit' variant='contained' endIcon={<SendIcon />} disabled={!input.trim()}>
              Send
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
