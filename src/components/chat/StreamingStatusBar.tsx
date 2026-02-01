import { Box, Chip, CircularProgress } from '@mui/material';

interface StreamingStatusBarProps {
  streamingContentLength: number;
}

export default function StreamingStatusBar({ streamingContentLength }: StreamingStatusBarProps) {
  return (
    <Box sx={{ px: 2, py: 1, bgcolor: 'action.hover', display: 'flex', alignItems: 'center', gap: 1 }}>
      <CircularProgress size={16} />
      <Chip
        label={
          streamingContentLength > 0
            ? `Receiving response... ${streamingContentLength} characters`
            : 'Waiting for response...'
        }
        size='small'
        color='primary'
        variant='outlined'
      />
    </Box>
  );
}
