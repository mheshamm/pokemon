// vite.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // enables describe/it globally
    environment: 'jsdom', // needed for @testing-library/react
    setupFiles: './tests/setupTests.ts',
  },
});
