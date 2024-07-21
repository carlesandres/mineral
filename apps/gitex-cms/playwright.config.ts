import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'e2e-tests',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    baseURL: 'http://localhost:3004',
    navigationTimeout: process.env.CI ? 0 : 120 * 1000,
  },
  webServer: {
    command: 'npm run start-e2e-server',
    port: 3004,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
};

export default config;
