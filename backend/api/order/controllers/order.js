"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const result = await strapi.services["order"].find(ctx.query, [
      "customer",
      "order_items.product",
      "order_items.product.image",
      "order_items.product.categories",
      "order_bundles.bundle",
      "order_bundles.bundle.products.image",
      "order_bundles.bundle.products.categories",
    ]);
    return result;
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const result = await strapi.services["order"].findOne({ id }, [
      "customer",
      "order_items.product",
      "order_items.product.image",
      "order_items.product.categories",
      "order_bundles.bundle",
      "order_bundles.bundle.products.image",
      "order_bundles.bundle.products.categories",
    ]);

    return result;
  },
  async create(ctx) {
    const { body } = ctx.request;
    const { order_items, order_bundles } = body;

    const newOrderItems = [];
    const newOrderBundles = [];

    if (order_items.length) {
      for (let k = 0; k < order_items.length; k++) {
        const item = await strapi.services["order-item"].create(order_items[k]);
        newOrderItems.push(item.id);
      }
    }

    if (order_bundles.length) {
      for (let k = 0; k < order_bundles.length; k++) {
        const bundle = await strapi.services["order-bundle"].create(
          order_bundles[k]
        );
        newOrderBundles.push(bundle.id);
      }
    }

    body.order_items = newOrderItems;
    body.order_bundles = newOrderBundles;

    const result = await strapi.services.order.create(body);

    return result;
  },
  async deleteMany(ctx) {
    const { ids } = ctx.params;

    const delteItems = ids.split(",");

    const deletedOrders = await Promise.all(
      delteItems.map(async (id) => {
        const order = await strapi.services["order"].findOne({ id });

        if (order) {
          const { order_items, order_bundles } = order;

          if (order_items.length) {
            for (let k = 0; k < order_items.length; k++) {
              await strapi.services["order-item"].delete({
                id: order_items[k].id,
              });
            }
          }

          if (order_bundles.length) {
            for (let k = 0; k < order_bundles.length; k++) {
              await strapi.services["order-bundle"].delete({
                id: order_bundles[k].id,
              });
            }
          }
        }
        return await strapi.services["order"].delete({ id });
      })
    );

    return deletedOrders.length;
  },
};
