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

        if (user) {
          const {
            blocked,
            confirmed,
            created_at,
            email,
            id,
            provider,
            role,
            updated_at,
            username,
            customer,
          } = user;
          return {
            blocked,
            confirmed,
            created_at,
            email,
            id,
            provider,
            role,
            updated_at,
            username,
            customer,
          };
        }
      }
    } catch (e) {
      return ctx.badRequest("Unrecognized user");
    }
  },
};
