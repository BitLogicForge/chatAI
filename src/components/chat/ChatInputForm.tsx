import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import { Box, Button, IconButton, TextField } from '@mui/material';

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
        onChange={e => onInputChange(e.target.value)}
        disabled={isStreaming}
        size='small'
        autoComplete='off'
      />
      {isStreaming ? (
        <IconButton color='error' onClick={onStop} aria-label='stop'>
          <StopIcon />
        </IconButton>
      ) : (
        <Button type='submit' variant='contained' endIcon={<SendIcon />} disabled={!input.trim()}>
          Send
        </Button>
      )}
    </Box>
  );
}
