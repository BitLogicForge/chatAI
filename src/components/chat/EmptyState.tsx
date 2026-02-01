import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Box, Typography } from '@mui/material';

export default function EmptyState() {
  return (
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
  );
}
