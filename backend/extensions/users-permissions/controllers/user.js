"use strict";
const { sanitizeEntity } = require("strapi-utils");

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

  async create(ctx) {
    const { body } = ctx.request;

    try {
      const user = await strapi
        .query("user", "users-permissions")
        .create({ ...body, resetPasswordToken: null });

      const { id } = user;
      // Return new jwt token
      ctx.send({
        jwt: strapi.plugins["users-permissions"].services.jwt.issue({
          id,
        }),
        user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
          model: strapi.query("user", "users-permissions").model,
        }),
      });
    } catch (e) {
      return ctx.badRequest("Bad request");
    }
  },
};
