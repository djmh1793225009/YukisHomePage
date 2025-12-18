
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Fix: Import process to resolve 'Property cwd does not exist on type Process' error
import process from 'process';

export default defineConfig(({ mode }) => {
  // 加载环境变量，包括 Cloudflare 注入的环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // 允许在代码中直接使用 process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});