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
  isDesktop: boolean;
  onClose: () => void;
}

export default function StreamingPreviewPanel({
  streamingContent,
  toolOutputs,
  isVisible,
  isStreaming,
  isDesktop,
  onClose,
}: StreamingPreviewPanelProps) {
  const drawerWidth = 420;
  const hasToolOutputs = toolOutputs.length > 0;

  return (
    <Drawer
      anchor='right'
      open={isVisible}
      onClose={onClose}
      variant={isDesktop ? 'persistent' : 'temporary'}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: isDesktop ? drawerWidth : '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: drawerWidth },
          boxSizing: 'border-box',
          borderLeft: '1px solid',
          borderColor: 'divider',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(238,242,255,0.95) 100%)',
        },
      }}
    >
      <Toolbar
        sx={{
          px: 2.5,
          py: 1.75,
          bgcolor: 'secondary.main',
          color: 'common.white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '14px',
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <PsychologyIcon fontSize='small' />
          </Box>
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 'bold', lineHeight: 1.15 }}>
              Thought Process
            </Typography>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.64)' }}>
              Live model reasoning and tool activity
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            size='small'
            label={isStreaming ? 'Streaming' : 'Idle'}
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'common.white',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          />
          <IconButton color='inherit' onClick={onClose} size='small' sx={{ bgcolor: 'rgba(255,255,255,0.06)' }}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      </Toolbar>

      <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.72)',
            boxShadow: '0 18px 36px rgba(15, 23, 42, 0.05)',
          }}
        >
          <Typography variant='subtitle2' sx={{ mb: 1, color: 'text.secondary' }}>
            Session summary
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 1 }}>
            <Box sx={{ p: 1.25, borderRadius: 3, bgcolor: 'primary.light', color: 'common.white' }}>
              <Typography variant='caption' sx={{ display: 'block', opacity: 0.82 }}>
                Status
              </Typography>
              <Typography variant='subtitle2'>{isStreaming ? 'Live' : 'Done'}</Typography>
            </Box>
            <Box sx={{ p: 1.25, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant='caption' color='text.secondary'>
                Tools
              </Typography>
              <Typography variant='subtitle2'>{toolOutputs.length}</Typography>
            </Box>
            <Box sx={{ p: 1.25, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant='caption' color='text.secondary'>
                Chars
              </Typography>
              <Typography variant='subtitle2'>{streamingContent.length}</Typography>
            </Box>
          </Box>
        </Paper>

        {hasToolOutputs && (
          <>
            <Typography variant='subtitle2' sx={{ mb: 1.25, fontWeight: 'bold', color: 'text.secondary' }}>
              Tool outputs
            </Typography>
            {toolOutputs.map((tool, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 1.5,
                  bgcolor: 'rgba(255,255,255,0.78)',
                  borderRadius: 4,
                  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.05)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '12px',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'success.light',
                      color: 'success.dark',
                    }}
                  >
                    <BuildIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                      {tool.name}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Tool call trace
                    </Typography>
                  </Box>
                  {tool.status === 'success' && <CheckCircleIcon sx={{ fontSize: 18, color: 'success.dark' }} />}
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: 1.6,
                    fontSize: '0.84rem',
                    color: 'text.primary',
                    bgcolor: 'rgba(248, 250, 252, 0.94)',
                    p: 1.5,
                    borderRadius: 3,
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

        <Typography variant='subtitle2' sx={{ mb: 1.25, fontWeight: 'bold', color: 'text.secondary' }}>
          Model stream
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 4,
            bgcolor: 'rgba(224, 242, 254, 0.62)',
            border: '1px solid',
            borderColor: 'rgba(2, 132, 199, 0.14)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <CircularProgress size={16} sx={{ color: 'info.dark' }} />
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold', color: 'info.dark' }}>
              {isStreaming ? 'AI is thinking…' : 'Latest output'}
            </Typography>
          </Box>

          <Typography
            variant='body2'
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.7,
              fontSize: '0.92rem',
              color: 'text.primary',
              minHeight: '120px',
            }}
          >
            {streamingContent || 'Waiting for response...'}
            {streamingContent && isStreaming && (
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

        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 3 }}>
          <Typography variant='caption' sx={{ display: 'block', color: 'text.secondary' }}>
            {isStreaming ? 'Live stream is active.' : 'Stream completed.'}
          </Typography>
          <Typography variant='caption' sx={{ display: 'block', color: 'text.secondary' }}>
            {hasToolOutputs ? `${toolOutputs.length} tool call${toolOutputs.length === 1 ? '' : 's'} captured.` : 'No tool calls in this exchange yet.'}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
