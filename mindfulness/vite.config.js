import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      views: path.resolve(__dirname, 'src/views'),
      components: path.resolve(__dirname, 'src/components'),
      dropdowns: path.resolve(__dirname, 'src/dropdowns')
    }
  }
})
