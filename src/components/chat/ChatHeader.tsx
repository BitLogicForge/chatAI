import PsychologyIcon from '@mui/icons-material/Psychology';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Badge, Box, IconButton, Tooltip, Typography } from '@mui/material';

interface ChatHeaderProps {
  showStreamPreview: boolean;
  onToggleStreamPreview: () => void;
  hasStreamingContent?: boolean;
}

export default function ChatHeader({ showStreamPreview, onToggleStreamPreview, hasStreamingContent }: ChatHeaderProps) {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SmartToyIcon sx={{ fontSize: 32 }} />
        <Typography variant='h5' component='h1'>
          Agent Chat
        </Typography>
      </Box>
      <Tooltip title={showStreamPreview ? 'Hide thought process' : 'Show thought process'}>
        <IconButton
          color='inherit'
          onClick={onToggleStreamPreview}
          size='medium'
          sx={{
            opacity: hasStreamingContent ? 1 : 0.5,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Badge color='secondary' variant='dot' invisible={!hasStreamingContent}>
            <PsychologyIcon sx={{ color: showStreamPreview ? 'white' : 'rgba(255, 255, 255, 0.6)' }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
