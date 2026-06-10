import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Avatar, Box, CircularProgress, Paper, Typography } from '@mui/material';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isLastMessage?: boolean;
  isStreaming?: boolean;
}

export default function ChatMessage({ role, content, isLastMessage, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      <Avatar
        sx={{
          width: 42,
          height: 42,
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          color: 'common.white',
          boxShadow: isUser ? '0 10px 24px rgba(79, 70, 229, 0.24)' : '0 10px 24px rgba(15, 23, 42, 0.16)',
        }}
      >
        {isUser ? <PersonIcon fontSize='small' /> : <SmartToyIcon fontSize='small' />}
      </Avatar>

      <Box
        sx={{
          maxWidth: { xs: '86%', md: '76%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
          gap: 0.75,
        }}
      >
        <Typography variant='caption' sx={{ px: 0.5, color: 'text.secondary', fontWeight: 700, letterSpacing: '0.04em' }}>
          {isUser ? 'YOU' : 'ASSISTANT'}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: isUser ? '24px 24px 8px 24px' : '24px 24px 24px 8px',
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'common.white' : 'text.primary',
            border: isUser ? 'none' : '1px solid',
            borderColor: 'divider',
            boxShadow: isUser ? '0 18px 32px rgba(79, 70, 229, 0.18)' : '0 16px 28px rgba(15, 23, 42, 0.06)',
          }}
        >
          {isStreaming && isLastMessage && !content ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 140 }}>
              <CircularProgress size={18} sx={{ color: 'primary.main' }} />
              <Typography variant='body2' color='text.secondary'>
                Thinking...
              </Typography>
            </Box>
          ) : (
            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.65 }}>
              {content}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
