import * as path from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'
import generouted from '@generouted/react-router/plugin'

import markdown from "vite-plugin-react-markdown";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: [/\.tsx$/, /\.md$/], // <-- add .md 
    }),
    viteImagemin(),
    generouted(),
    markdown(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: '@slots', replacement: path.resolve(__dirname, './src/slots') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
    ],
  },
})