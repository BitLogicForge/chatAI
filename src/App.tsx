import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { alpha, createTheme } from '@mui/material/styles';
import ChatComponent from './ChatComponent';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5',
      light: '#818cf8',
      dark: '#3730a3',
    },
    secondary: {
      main: '#0f172a',
      light: '#334155',
      dark: '#020617',
    },
    background: {
      default: '#eef2ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    divider: alpha('#0f172a', 0.08),
    success: {
      main: '#059669',
      light: '#d1fae5',
      dark: '#047857',
    },
    info: {
      main: '#0284c7',
      light: '#e0f2fe',
      dark: '#075985',
    },
    warning: {
      main: '#d97706',
      light: '#fef3c7',
      dark: '#92400e',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shadows: [
    'none',
    '0 10px 30px rgba(15, 23, 42, 0.06)',
    '0 12px 32px rgba(15, 23, 42, 0.07)',
    '0 16px 36px rgba(15, 23, 42, 0.08)',
    '0 18px 40px rgba(15, 23, 42, 0.09)',
    '0 20px 44px rgba(15, 23, 42, 0.10)',
    '0 22px 48px rgba(15, 23, 42, 0.11)',
    '0 24px 52px rgba(15, 23, 42, 0.12)',
    '0 26px 56px rgba(15, 23, 42, 0.13)',
    '0 28px 60px rgba(15, 23, 42, 0.14)',
    '0 30px 64px rgba(15, 23, 42, 0.15)',
    '0 32px 68px rgba(15, 23, 42, 0.16)',
    '0 34px 72px rgba(15, 23, 42, 0.17)',
    '0 36px 76px rgba(15, 23, 42, 0.18)',
    '0 38px 80px rgba(15, 23, 42, 0.19)',
    '0 40px 84px rgba(15, 23, 42, 0.20)',
    '0 42px 88px rgba(15, 23, 42, 0.21)',
    '0 44px 92px rgba(15, 23, 42, 0.22)',
    '0 46px 96px rgba(15, 23, 42, 0.23)',
    '0 48px 100px rgba(15, 23, 42, 0.24)',
    '0 50px 104px rgba(15, 23, 42, 0.25)',
    '0 52px 108px rgba(15, 23, 42, 0.26)',
    '0 54px 112px rgba(15, 23, 42, 0.27)',
    '0 56px 116px rgba(15, 23, 42, 0.28)',
    '0 58px 120px rgba(15, 23, 42, 0.29)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: '320px',
          background:
            'radial-gradient(circle at top, rgba(99, 102, 241, 0.16), transparent 28%), linear-gradient(180deg, #f8fbff 0%, #eef2ff 100%)',
        },
        '#root': {
          minHeight: '100vh',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${alpha('#0f172a', 0.08)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          boxShadow: 'none',
          paddingInline: 18,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 999,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: alpha('#ffffff', 0.94),
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha('#4f46e5', 0.35),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ChatComponent />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
