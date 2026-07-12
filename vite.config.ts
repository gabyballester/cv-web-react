import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function githubPagesBase() {
  if (process.env.GITHUB_PAGES !== 'true') return '/'
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  return repo ? `/${repo}/` : '/'
}

// https://vite.dev/config/
export default defineConfig({
  base: githubPagesBase(),
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.claude/**'],
    },
  },
})
