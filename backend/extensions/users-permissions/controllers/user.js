"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

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
          return sanitizeEntity(user.toJSON ? user.toJSON() : user, {
            model: strapi.query("user", "users-permissions").model,
          });
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
  async create(ctx) {
    const { body } = ctx.request;
    const { username, email, role, password, blocked, confirmed } = body;

    const users = await strapi
      .query("user", "users-permissions")
      .find({ _or: [{ username }, { email }] });

    if (users.length) {
      return ctx.badRequest(
        null,
        "User with username or email is alredy exist"
      );
    }

    if (!password && role === 3) {
      body.password = "Standard123456";
    }

    if (!body.password) {
      return ctx.badRequest(null, "missing.password");
    }

    if (!email) {
      return ctx.badRequest(null, "missing.email");
    }

    if (!username) {
      return ctx.badRequest(null, "missing.username");
    }

    if (!role) {
      body.role = 2;
    }

    if (!blocked) {
      body.blocked = false;
    }

    if (!confirmed) {
      body.confirmed = false;
    }

    const user = await strapi.query("user", "users-permissions").create(body);

    ctx.send({
      jwt: strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      }),
      user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
        model: strapi.query("user", "users-permissions").model,
      }),
    });
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    const result = await strapi.query("user", "users-permissions").find({ id });

    if (result) {
      const newUser = await strapi
        .query("user", "users-permissions")
        .update({ id }, body);

      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id,
      });

      const user = sanitizeEntity(newUser.toJSON ? newUser.toJSON() : newUser, {
        model: strapi.query("user", "users-permissions").model,
      });

      ctx.send({ jwt, user });
    } else {
      return ctx.badRequest(null, "User isn't found");
    }
  },
};
