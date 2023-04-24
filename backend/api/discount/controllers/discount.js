"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async delete(ctx) {
    const { ids } = ctx.params;

    const delteItems = ids.split(",");

    const deletedProducts = await Promise.all(
      delteItems.map(
        async (id) => await strapi.services["discount"].delete({ id })
      )
    );

    return deletedProducts;
  },
};
