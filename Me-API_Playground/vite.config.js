import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss()
<<<<<<< HEAD
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://profilecraft-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
=======
  ]
>>>>>>> 7a4a203 (fix CORS and update server configuration)
})
