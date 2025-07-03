import { defineConfig, devices } from '@playwright/test';

const reportFolder = process.env.PW_REPORT_FOLDER || 'playwright-report';

export default defineConfig({
  globalSetup: require.resolve('./utils/global-setup'),
  globalTeardown: require.resolve('./utils/global-teardown'),
  retries: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000, 
  },  
  reporter: [
    ['list'],
    ['html', { outputFolder: reportFolder, open: 'never' }],
    ['json', { outputFile: `${reportFolder}/report.json` }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storage/auth.json',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
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