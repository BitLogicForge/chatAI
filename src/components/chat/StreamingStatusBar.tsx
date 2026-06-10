import { Box, Chip, CircularProgress, LinearProgress, Typography } from '@mui/material';

interface StreamingStatusBarProps {
  streamingContentLength: number;
}

export default function StreamingStatusBar({ streamingContentLength }: StreamingStatusBarProps) {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 2.5 },
        py: 1.25,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(79, 70, 229, 0.04)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1 }}>
        <CircularProgress size={16} sx={{ color: 'primary.main' }} />
        <Chip label='Streaming live' size='small' color='primary' />
        <Typography variant='body2' color='text.secondary'>
          {streamingContentLength > 0 ? `${streamingContentLength} characters received` : 'Waiting for the first tokens...'}
        </Typography>
      </Box>
      <LinearProgress
        sx={{
          height: 6,
          borderRadius: 999,
          bgcolor: 'rgba(79, 70, 229, 0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
          },
        }}
      />
    </Box>
  );
}
