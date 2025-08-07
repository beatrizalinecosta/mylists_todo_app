import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://beatrizalinecosta.github.io/mylists_todo_app/",
  plugins: [react()],
})
