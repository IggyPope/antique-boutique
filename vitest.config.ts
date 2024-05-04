/// <reference types="vitest" />
/// <reference types="vite/client" />
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.{ts,tsx}'],
      exclude: ['**/node_modules/**', '**/dist/**'],
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setupTests.ts'],
      globals: true,
      css: true,
    },
  }),
);
