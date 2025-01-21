import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Set the base path for the application if it's deployed at the root
  build: {
    outDir: 'dist',  // This is the default output directory for Vite's build
    rollupOptions: {
      input: {
        main: './index.html',  // Ensures that Vite knows the entry point for the app
      },
    },
  },
});
