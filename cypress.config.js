const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    GATEWAY: 'https://gateway.solsten.io',
  },
  projectId: 'ap1nhr',
  chromeWebSecurity: false,
  video: false,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
