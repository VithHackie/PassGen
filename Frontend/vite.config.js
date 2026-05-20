import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api/user': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/enterin': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/newuser': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/downloadFile' : {
        target : 'http://localhost:5000',
        changeOrigin : true,
        secure : false
      },
      '/uk' : {
        target : 'http://localhost:5000',
        changeOrigin : true,
        secure :false
      },
      '/logout' : {
        target : 'http://localhost:5000',
        changeOrigin : true,
        secure : false
      }
    }
  }
})
