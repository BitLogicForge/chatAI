import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Box, Chip, CircularProgress, Divider, Drawer, IconButton, Paper, Toolbar, Typography } from '@mui/material';

interface ToolMessage {
  type: 'tool';
  name: string;
  content: string;
  tool_call_id: string;
  status?: string;
}

interface StreamingPreviewPanelProps {
  streamingContent: string;
  toolOutputs: ToolMessage[];
  isVisible: boolean;
  isStreaming: boolean;
  onClose: () => void;
}

export default function StreamingPreviewPanel({
  streamingContent,
  toolOutputs,
  isVisible,
  isStreaming,
  onClose,
}: StreamingPreviewPanelProps) {
  return (
    <Drawer
      anchor='right'
      open={isVisible}
      onClose={onClose}
      variant='persistent'
      sx={{
        width: 400,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 400,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PsychologyIcon />
          <Typography variant='h6' fontWeight='bold'>
            Thought Process
          </Typography>
        </Box>
        <IconButton color='inherit' onClick={onClose} size='small'>
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <Box sx={{ p: 2, height: '100%', overflow: 'auto', bgcolor: 'background.paper' }}>
        {/* Tool Outputs Section */}
        {toolOutputs.length > 0 && (
          <>
            <Typography variant='subtitle2' fontWeight='bold' color='primary.main' sx={{ mb: 1.5 }}>
              🔧 Tool Outputs
            </Typography>
            {toolOutputs.map((tool, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: 'success.light',
                  border: '2px solid',
                  borderColor: 'success.main',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <BuildIcon sx={{ fontSize: 18, color: 'success.dark' }} />
                  <Chip label={tool.name} size='small' color='success' />
                  {tool.status === 'success' && <CheckCircleIcon sx={{ fontSize: 16, color: 'success.dark' }} />}
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: 1.5,
                    fontSize: '0.85rem',
                    color: 'text.primary',
                    bgcolor: 'white',
                    p: 1.5,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                  }}
                >
                  {tool.content}
                </Typography>
              </Paper>
            ))}
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Streaming Content Section */}
        {isStreaming && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: 'info.light',
              border: '2px solid',
              borderColor: 'info.main',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CircularProgress size={16} sx={{ color: 'info.dark' }} />
              <Typography variant='subtitle2' fontWeight='bold' color='info.dark'>
                🧠 AI is thinking...
              </Typography>
            </Box>

            <Typography
              variant='body2'
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineHeight: 1.6,
                fontSize: '0.9rem',
                color: 'text.primary',
                minHeight: '100px',
              }}
            >
              {streamingContent || 'Waiting for response...'}
              {streamingContent && (
                <Box
                  component='span'
                  sx={{
                    display: 'inline-block',
                    width: '2px',
                    height: '16px',
                    bgcolor: 'primary.main',
                    ml: 0.5,
                    animation: 'blink 1s infinite',
                    '@keyframes blink': {
                      '0%, 49%': { opacity: 1 },
                      '50%, 100%': { opacity: 0 },
                    },
                  }}
                />
              )}
            </Typography>
          </Paper>
        )}

        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 1 }}>
          {isStreaming && (
            <Typography variant='caption' color='text.secondary' display='block'>
              💡 Response: {streamingContent.length} chars
            </Typography>
          )}
          {toolOutputs.length > 0 && (
            <Typography variant='caption' color='text.secondary' display='block'>
              🔧 Tools used: {toolOutputs.length}
            </Typography>
          )}
          <Typography variant='caption' color='text.secondary' display='block'>
            {isStreaming ? '⚡ Live streaming' : '✅ Process complete'}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
