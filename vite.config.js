import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#root',
      },
    }),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
})
