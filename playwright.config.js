import { defineConfig, devices } from '@playwright/test';

const reportFolder = process.env.PW_REPORT_FOLDER || 'playwright-report';

export default defineConfig({
  globalSetup: require.resolve('./utils/global-setup'),
  globalTeardown: require.resolve('./utils/global-teardown'),
  reporter: [
    ['list'],
    ['html', { outputFolder: reportFolder, open: 'never' }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storage/auth.json',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
    name: 'Chromium',
    use: { 
      ...devices['Desktop Chromium'],
      browserName: 'chromium' 
      }
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },
    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
  ],
});