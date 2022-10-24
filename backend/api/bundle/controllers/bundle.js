"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async delete(ctx) {
    const { ids } = ctx.params;

    const deleteItems = ids.split(",");

    const result = await Promise.all(
      deleteItems.map(
        async (id) => await strapi.services["bundle"].delete({ id })
      )
    );

    return result.length;
  },
};
