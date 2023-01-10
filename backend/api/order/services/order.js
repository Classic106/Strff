"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async deleteMany(ids) {
    const deletedOrders = await Promise.all(
      ids.map(async (id) => {
        const order = await strapi.services["order"].findOne({ id });
        if (order) {
          const { order_items, order_bundles, customer } = order;
          let additonal_total_price = 0;

          if (order_items.length) {
            for (let k = 0; k < order_items.length; k++) {
              const item = await strapi.services["order-item"].delete({
                id: order_items[k].id,
              });
              additonal_total_price += item.total;
            }
          }

          if (order_bundles.length) {
            for (let k = 0; k < order_bundles.length; k++) {
              const bundle = await strapi.services["order-bundle"].delete({
                id: order_bundles[k].id,
              });
              additonal_total_price += bundle.bundle.price;
            }
          }

          if (customer) {
            const { orders_count, total_price } =
              await strapi.services.customer.findOne({ id: customer.id });

            await strapi.services.customer.update(
              { id: customer.id },
              {
                orders_count: orders_count - 1,
                total_price: total_price - additonal_total_price,
              }
            );
          }
        }
        return await strapi.services["order"].delete({ id });
      })
    );
    return deletedOrders.length;
  },
};
