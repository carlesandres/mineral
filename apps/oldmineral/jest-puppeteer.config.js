// jest-puppeteer.config.js
module.exports = {
  // eslint-disable-line import/no-commonjs
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    devtools: false,
    // slowMo: 20,
    // defaultViewport: null, // <= set this to have viewport emulation off
  },
  browser: 'chromium',
  browserContext: 'default',
};
