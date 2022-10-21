export default function (ctx) {
  const { user } = ctx.store.state.auth;
  if (user) {
    return "admin";
  }
  return "default";
}
