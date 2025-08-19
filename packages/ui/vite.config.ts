/// <reference types="vitest/config" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    include: ['src/components/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '**/*index.{ts,tsx}', '**/*.stories.{ts,tsx}', '.storybook'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/setupTests.ts',
        '**/*index.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        'node_modules/',
      ],
      reportsDirectory: './coverage',
    },
  },
})
