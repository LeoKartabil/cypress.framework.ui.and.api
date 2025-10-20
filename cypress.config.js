const { defineConfig } = require("cypress");
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
  e2e: {
    setupNodeEvents(on, config) {
      const configFile = config.env.configFile || 'dev';
      return searchConfigFile(configFile)
    },
  },
});
