"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { body } = ctx.request;

    const item = await strapi.services["order-bundle"].create(body);
    const result = await strapi.services["order-bundle"].findOne(
      { id: item.id },
      ["bundle", "bundle.products.categories", "bundle.products.image"]
    );

    return result;
  },
  async find(ctx) {
    const { id } = ctx.params;

    const result = await strapi.services["order-bundle"].find({ id }, [
      "bundle",
      "bundle.products",
      "bundle.products.product.categories",
      "bundle.products.product.image",
    ]);

    return result;
  },
};
