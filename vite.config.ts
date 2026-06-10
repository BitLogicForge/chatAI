import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [react()],
    server: {
      host: true,
    },
    preview: {
      host: true,
    },
  };

  if (mode === 'production') {
    config.build = {
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              dropConsole: true,
              dropDebugger: true,
              unused: true,
            },
          },
        },
      },
    };
  }

  return config;
});
