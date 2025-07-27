const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Change this to your application's base URL
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
