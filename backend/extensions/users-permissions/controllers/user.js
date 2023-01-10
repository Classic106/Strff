"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async me(ctx) {
    try {
      if (
        ctx.request &&
        ctx.request.header &&
        ctx.request.header.authorization
      ) {
        const decoded = await strapi.plugins[
          "users-permissions"
        ].services.jwt.getToken(ctx);

        const { id } = decoded;

        const user = await strapi
          .query("user", "users-permissions")
          .findOne({ id });
        if (user.role.name === "Authenticated") {
          const {
            blocked,
            confirmed,
            created_at,
            email,
            first_name,
            id,
            last_name,
            provider,
            role,
            updated_at,
            username,
          } = user;
          return {
            blocked,
            confirmed,
            created_at,
            email,
            first_name,
            id,
            last_name,
            provider,
            role,
            updated_at,
            username,
          };
        }
      }
    } catch (e) {
      return ctx.badRequest("Unauthenticated user");
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const populate = [
      "orders",
      "orders.order_items",
      "orders.order_items.product",
      "orders.order_items.product.image",
      "orders.order_items.product.categories",
      "orders.order_items.size",
      "orders.order_items.purchase_type",
      "orders.order_items.subscription_type",
      "orders.order_bundles",
      "orders.order_bundles.bundle",
      "orders.order_bundles.bundle.products",
      "orders.order_bundles.bundle.products.image",
    ];

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id }, populate);

    return ctx.send(user);
  },
};
