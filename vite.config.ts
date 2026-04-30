import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@types/three')) {
            return 'threejs'
          }
          if (id.includes('d3') || id.includes('@types/d3')) {
            return 'd3'
          }
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'react-vendors'
          }
        },
      },
    },
  },
})
