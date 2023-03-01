import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sp23-oose-project-team-13/", 
  plugins: [react()]
})