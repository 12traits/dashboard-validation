const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    gateway: 'https://gateway.solsten.io',
  },

  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
