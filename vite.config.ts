import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: false,
    watch: {
      // Windows 下编辑器原子写入产生的临时文件会导致 EBUSY，忽略它们
      ignored: ['**/*.tmp', '**/.*.tmpdir/**'],
    },
  },
})
