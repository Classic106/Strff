module.exports = async (ctx, next) => {
  // if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
  //   return next();
  // }

  // return ctx.badRequest(null, [
  //   { messages: [{ id: "No authorization header was found" }] },
  // ]);
  return next();
};
