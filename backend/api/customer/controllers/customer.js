"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const result = await strapi.services["customer"].find(ctx.query, [
      "orders.order_status",
      "orders.order_items.product",
      "orders.order_items.product.image",
      "orders.order_items.product.categories",
      "orders.order_bundles.bundle",
      "orders.order_bundles.bundle.products.image",
      "orders.order_bundles.bundle.products.categories",
    ]);
    return result;
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const result = await strapi.services["customer"].findOne({ id }, [
      "orders.order_status",
      "orders.order_items.product",
      "orders.order_items.product.image",
      "orders.order_items.product.categories",
      "orders.order_bundles.bundle",
      "orders.order_bundles.bundle.products.image",
      "orders.order_bundles.bundle.products.categories",
    ]);

    return result;
  },
  async delete(ctx) {
    const { ids } = ctx.params;

    const delteItems = ids.split(",");

    const result = await Promise.all(
      delteItems.map(
        async (id) => await strapi.services["customer"].delete({ id })
      )
    );

    return result.length;
  },
};
