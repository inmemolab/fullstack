// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

import { startDevServer } from "@cypress/vite-dev-server";
const plugin: Cypress.PluginConfig = (on, config) => {
  if (config.testingType === "component") {
    const viteConfig = {};
    on("dev-server:start", async (options) => {
      const server = await startDevServer({ options, viteConfig });
      return server as Cypress.ResolvedDevServerConfig;
    });
  }
  return config;
};
module.exports = plugin;
