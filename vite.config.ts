import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'
import generouted from '@generouted/react-router/plugin'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin(),
    generouted()
  ],
  resolve: {
    alias: [
      { find: '@slots', replacement: path.resolve(__dirname, 'src/slots') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@', replacement: path.resolve(__dirname, 'src/') },
    ],
  },
})