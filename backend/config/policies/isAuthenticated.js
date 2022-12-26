module.exports = async (ctx, next) => {
  if (ctx.params[0] === "customers") {
    const { cellphone, email } = ctx.query;

    if (cellphone && email) {
      next();
      return;
    }
  }

  if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
    const decoded = await strapi.plugins[
      "users-permissions"
    ].services.jwt.getToken(ctx);

    const { id } = decoded;

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id });
    if (user.role.name === "Authenticated") {
      return next();
    }
  }

  return ctx.badRequest(null, [
    { messages: [{ message: "No authorization header was found" }] },
  ]);
};
