import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Server configuration
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  
  // Build configuration
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/frontend/components'),
      '@utils': path.resolve(__dirname, './src/frontend/utils'),
      '@backend': path.resolve(__dirname, './src/backend'),
      '@data': path.resolve(__dirname, './src/data'),
    },
    extensions: ['.js', '.json', '.jsx'],
  },
  
  // CSS configuration
  css: {
    preprocessorOptions: {
      // Add any CSS preprocessor options if needed
    },
  },
  
  // Environment variables
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    __VERSION__: JSON.stringify('1.0.0'),
  },
  
  // Optimization
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
