import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  /**
   * @desc gh-pages 배포 시 레포지토리명과 동일하게 설정
   */
  base: "/mini-game-left-or-right/",
  plugins: [react()],
})
