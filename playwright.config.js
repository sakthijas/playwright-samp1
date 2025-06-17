// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
  video: 'on',
  screenshot: 'on',
    },
  reporter: [['html', { open: 'never' }]],
};
module.exports = config;