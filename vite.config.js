import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // Relative asset paths make the built site work both at a user site root and
  // at https://<user>.github.io/<repo>/. Dev keeps the root base.
  base: command === 'build' ? './' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
}));
