import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Separate build target for embedding into WordPress: fixed (non-hashed)
// output filenames so the PHP template that loads them never needs editing
// after a redeploy — only re-upload app.js / app.css.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist-wp',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'app-[name].js',
        assetFileNames: 'app.[ext]',
      },
    },
  },
})
