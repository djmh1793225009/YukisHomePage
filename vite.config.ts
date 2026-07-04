import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/chat': {
          target: 'https://apihub.agnes-ai.com',
          changeOrigin: true,
          rewrite: () => '/v1/chat/completions',
          headers: {
            'Authorization': `Bearer ${env.Agnes_api_key || ''}`
          }
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});