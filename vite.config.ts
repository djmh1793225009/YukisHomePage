import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig(({ mode }) => {
  // 加载环境变量，包括 Cloudflare 注入的环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.Agnes_api_key': JSON.stringify(env.Agnes_api_key || '')
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});