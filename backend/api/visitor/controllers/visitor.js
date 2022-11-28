"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async connected_visitors() {
    const { clientsCount } = strapi.services.ioServer.engine;
    return clientsCount;
  },
};
