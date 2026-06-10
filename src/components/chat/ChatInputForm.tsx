import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';

interface ChatInputFormProps {
  input: string;
  isStreaming: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStop: () => void;
}

export default function ChatInputForm({ input, isStreaming, onInputChange, onSubmit, onStop }: ChatInputFormProps) {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{
        px: { xs: 1.5, md: 2.5 },
        py: 2,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
        }}
      >
        <TextField
          fullWidth
          variant='outlined'
          placeholder='Ask about accounts, transactions, cards, or support...'
          value={input}
          onChange={e => onInputChange(e.target.value)}
          disabled={isStreaming}
          size='medium'
          autoComplete='off'
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'transparent',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        />
        {isStreaming ? (
          <IconButton
            color='error'
            onClick={onStop}
            aria-label='stop'
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'error.light',
              border: '1px solid',
              borderColor: 'rgba(220, 38, 38, 0.15)',
              '&:hover': {
                bgcolor: 'error.light',
              },
            }}
          >
            <StopIcon />
          </IconButton>
        ) : (
          <Button type='submit' variant='contained' endIcon={<SendIcon />} disabled={!input.trim()} sx={{ minWidth: 116, height: 48 }}>
            Send
          </Button>
        )}
      </Box>

      <Typography variant='caption' sx={{ display: 'block', mt: 1.25, px: 1, color: 'text.secondary' }}>
        {isStreaming ? 'Receiving a live response. You can stop generation at any time.' : 'Compose a message and send it to start a streamed conversation.'}
      </Typography>
    </Box>
  );
}
