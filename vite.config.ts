import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Added this line

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // Added this block (line 8 to 12)
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})