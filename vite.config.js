import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows you to use test() and expect() globally
    environment: 'jsdom', // Use jsdom for the 'browser'
    setupFiles: './src/setupTests.js', // Optional: run this file before all tests
  },
})
