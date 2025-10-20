const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const fs = require('fs-extra');
const path = require('path');

function searchConfigFile(file) {
  const configPath = path.resolve('.', 'cypress', 'config', `${file}.json`)
  return fs.readJson(configPath)
}

module.exports = defineConfig({
  video: false,
  viewportWidth: 1280,
  viewportHeight: 875,
  screenshotsFolder: "reports/screenshots",
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Mochawesome Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'reports/mochawesome-report',
    videoOnFailOnly: true,
    saveAllAttempts: true,
    saveJson: false
  },
  e2e: {
    setupNodeEvents(on, config) {
      const configFile = config.env.configFile || 'dev';

       on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      return searchConfigFile(configFile)
    },
  },
});
