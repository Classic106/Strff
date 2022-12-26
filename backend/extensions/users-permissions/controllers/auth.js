const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  resetPassword: async (ctx) => {
    const { body } = ctx.request;
    const { id, username, email, password } = body;

    if (!username || !email) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.email.provide",
          message: "Username or e-mail is undefined",
        })
      );
    }

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id, username, email });

    // const validPassword = await strapi.plugins[
    //   "users-permissions"
    // ].services.user.validatePassword(password, user.password);

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ message: "Identifier or password invalid." }] },
      ]);
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
