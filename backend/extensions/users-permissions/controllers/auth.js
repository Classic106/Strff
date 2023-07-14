const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  register: async (ctx) => {
    const { body } = ctx.request;
    const { username, email, role, password, blocked, confirmed, admin } = body;
    const provider = ctx.params.provider || "local";

    const users = await strapi
      .query("user", "users-permissions")
      .find({ _or: [{ username }, { email }] });

    if (users.length) {
      return ctx.badRequest("User with username or email is alredy exist");
    }

    if (!password && role === 3) {
      body.password = "Standart123456";
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

    if (admin) {
      body.role = 2;
    }

    if (!blocked) {
      body.blocked = false;
    }

    if (!confirmed) {
      body.confirmed = false;
    }

    const hashPassword = await strapi.plugins[
      "users-permissions"
    ].services.user.hashPassword(body);

    const user = await strapi
      .query("user", "users-permissions")
      .create({ ...body, password: hashPassword, provider });

    ctx.send({
      jwt: strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      }),
      user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
        model: strapi.query("user", "users-permissions").model,
      }),
    });
  },
  resetPassword: async (ctx) => {
    const { body } = ctx.request;
    const { id, username, email, password } = body;

    if (!username || !email) {
      return ctx.badRequest(null, "Username or e-mail is undefined");
    }

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id, username, email });

    if (!user) {
      return ctx.badRequest(null, "Identifier or password invalid.");
    } else {
      // Generate new hash password
      const newPassword = await strapi.plugins[
        "users-permissions"
      ].services.user.hashPassword({ password });
      // Update user password
      await strapi
        .query("user", "users-permissions")
        .update({ id }, { resetPasswordToken: null, password: newPassword });

      // Return new jwt token
      ctx.send({
        jwt: strapi.plugins["users-permissions"].services.jwt.issue({
          id,
        }),
        user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
          model: strapi.query("user", "users-permissions").model,
        }),
      });
    }
  },
};
