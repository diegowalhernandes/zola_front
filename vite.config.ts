import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/auth': 'http://127.0.0.1:8000',
      '/professionals': 'http://127.0.0.1:8000',
      '/appointments': 'http://127.0.0.1:8000',
      '/categories': 'http://127.0.0.1:8000',
      '/reviews': 'http://127.0.0.1:8000',
      '/requests': 'http://127.0.0.1:8000',
      '/messages': 'http://127.0.0.1:8000',
      '/uploads': 'http://127.0.0.1:8000',
    },
  },
});
