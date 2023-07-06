const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    GATEWAY: 'https://gateway.solsten.io',
    COMPANY_NAME: 'tradelite',
    GAME_NAME: 'Financial Gamers',

  },
  projectId: 'ap1nhr',
  chromeWebSecurity: false,
  video: false,
  sccreenShots: false,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
