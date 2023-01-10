"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async deleteMany(ctx) {
    const { ids } = ctx.params;

    const deleteUsers = ids.split(",");

    const deletedUsers = await Promise.all(
      deleteUsers.map(async (id) => {
        const { orders } = await strapi
          .query("user", "users-permissions")
          .findOne({ id });

        if (orders.length) {
          const ordersId = orders.map(({ id }) => id);
          await strapi.services["order"].deleteMany(ordersId);
        }

        const { id: userID } = await strapi
          .query("user", "users-permissions")
          .delete({ id });

        return userID;
      })
    );
    return ctx.send(deletedUsers.length);
  },
  async blockMany(ctx) {
    const { ids } = ctx.params;
    const { body } = ctx.request;
    const { blocked } = body;

    const blockUsers = ids.split(",");

    const blockedUsers = await Promise.all(
      blockUsers.map(async (id) => {
        const user = await strapi
          .query("user", "users-permissions")
          .update({ id }, { blocked });

        return user;
      })
    );
    return ctx.send(blockedUsers);
  },
};
