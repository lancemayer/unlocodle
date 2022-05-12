import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
  },
};
export default config;