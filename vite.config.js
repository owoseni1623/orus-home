import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This helps ensure proper module resolution
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['date-fns'] // Explicitly include date-fns for pre-bundling
  }
})