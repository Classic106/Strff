module.exports = async (ctx, next) => {
  //console.log(ctx.request.header.Authorization, 3232);

  //console.log(ctx.request.header.authorization, 15);

  return next();

  //console.log(ctx.request.header);
  /*if (ctx.request && ctx.request.header && !ctx.request.header.authorization) {
    const token = ctx.cookies.get("authorization");
    console.log(token, 5555555)
    if (token) {
      ctx.request.header.authorization = "Bearer " + token;
    }
  }*/
};
