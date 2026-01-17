import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#root',
      },
    }),
    // Generate gzip compressed files
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    // Generate brotli compressed files (better compression than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Bundle size analyzer - generates stats.html after build
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    // Optimize minification
    minify: 'esbuild',
    // CSS code splitting for better caching
    cssCodeSplit: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    // Optimize dependencies
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Separate vendor chunks
          vendor: ['preact', 'preact/hooks'],
          'preact-iso': ['preact-iso'],
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Source maps for production debugging (optional, can disable for smaller builds)
    sourcemap: false,
    // Enable CSS minification
    cssMinify: true,
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB as base64
    // Enable build optimizations
    target: 'esnext',
    reportCompressedSize: true,
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['preact', 'preact/hooks', 'preact-iso'],
  },
})
