import PsychologyIcon from '@mui/icons-material/Psychology';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Badge, Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';

interface ChatHeaderProps {
  showStreamPreview: boolean;
  onToggleStreamPreview: () => void;
  hasStreamingContent?: boolean;
}

export default function ChatHeader({ showStreamPreview, onToggleStreamPreview, hasStreamingContent }: ChatHeaderProps) {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 2.5 },
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider',
        background:
          'linear-gradient(135deg, rgba(79, 70, 229, 0.98) 0%, rgba(67, 56, 202, 0.94) 48%, rgba(15, 23, 42, 0.96) 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '16px',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.14)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          <SmartToyIcon sx={{ fontSize: 28, color: 'common.white' }} />
        </Box>

        <Box>
          <Typography variant='h5' component='h1' sx={{ color: 'common.white', lineHeight: 1.1 }}>
            Agent Chat
          </Typography>
          <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.74)', mt: 0.25 }}>
            Streamed responses, tool traces, and conversational support in one workspace.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Chip
          size='small'
          label={hasStreamingContent ? 'Live activity' : 'Ready'}
          sx={{
            bgcolor: hasStreamingContent ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.1)',
            color: 'common.white',
            border: '1px solid rgba(255,255,255,0.16)',
          }}
        />

        <Tooltip title={showStreamPreview ? 'Hide thought process' : 'Show thought process'}>
          <IconButton
            color='inherit'
            onClick={onToggleStreamPreview}
            size='medium'
            sx={{
              opacity: hasStreamingContent ? 1 : 0.65,
              bgcolor: showStreamPreview ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.16)',
              },
            }}
          >
            <Badge color='error' variant='dot' invisible={!hasStreamingContent}>
              <PsychologyIcon sx={{ color: showStreamPreview ? 'white' : 'rgba(255, 255, 255, 0.82)' }} />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
