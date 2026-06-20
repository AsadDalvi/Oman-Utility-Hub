import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Below code is for Vite to bundle Tailwind CSS styles automatically in my React Application
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
