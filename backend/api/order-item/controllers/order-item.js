"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { body } = ctx.request;

    const item = await strapi.services["order-item"].create(body);
    const result = await strapi.services["order-item"].findOne(
      { id: item.id },
      ["product.categories", "product.image"]
    );

    return result;
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    body.total = body.quantity * body.product.price;

    const item = await strapi.services["order-item"].update({ id }, body);
    const result = await strapi.services["order-item"].findOne(
      { id: item.id },
      ["product.categories", "product.image"]
    );

    return result;
  },
};
