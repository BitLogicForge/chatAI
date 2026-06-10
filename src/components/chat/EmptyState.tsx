import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Box, Chip, Paper, Typography } from '@mui/material';

export default function EmptyState() {
  const suggestions = ['Summarize my options', 'Explain transfer fees', 'Help with card issues'];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 560,
          p: { xs: 3, md: 4 },
          borderRadius: 5,
          textAlign: 'center',
          bgcolor: 'rgba(255,255,255,0.78)',
          boxShadow: '0 24px 60px rgba(79, 70, 229, 0.08)',
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            mx: 'auto',
            mb: 2,
            borderRadius: '24px',
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.14), rgba(14, 165, 233, 0.18))',
            color: 'primary.main',
          }}
        >
          <SmartToyIcon sx={{ fontSize: 40 }} />
        </Box>

        <Typography variant='h4' sx={{ mb: 1 }}>
          Start a smarter conversation
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 420, mx: 'auto', mb: 3 }}>
          Ask about your banking needs and get guided, streamed responses with live tool activity when it matters.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          {suggestions.map(suggestion => (
            <Chip key={suggestion} label={suggestion} color='primary' variant='outlined' />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
