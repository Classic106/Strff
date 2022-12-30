module.exports = {
  async checkEmail(ctx) {
    try {
      const user = await strapi
        .query("user", "users-permissions")
        .find(ctx.query);
      return user.length;
    } catch (e) {
      return ctx.badRequest("Bad request");
    }
  },
};
