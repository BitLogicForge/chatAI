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
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        flexDirection: role === 'user' ? 'row-reverse' : 'row',
      }}
    >
      <Avatar
        sx={{
          bgcolor: role === 'user' ? 'primary.main' : 'secondary.main',
        }}
      >
        {role === 'user' ? <PersonIcon /> : <SmartToyIcon />}
      </Avatar>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          bgcolor: role === 'user' ? 'primary.light' : 'white',
          color: role === 'user' ? 'primary.contrastText' : 'text.primary',
        }}
      >
        <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {content}
          {isStreaming && isLastMessage && !content && (
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
  );
}
