/// <reference types="vitest" />
/// <reference types="vite/client" />
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['./src/**/*.test.{ts,tsx}'],
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setupTests.ts'],
      globalSetup: ['./src/__tests__/globalSetup.ts'],
      globals: true,
      css: true,
    },
  }),
);
