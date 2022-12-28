export default function ({ store, route, redirect }) {
  const { fullPath } = route;
  const isAdmin = fullPath.match(/\/admin/gi);
  const isAdminLogin = fullPath.match(/\/admin\/login/gi);

  if (isAdmin && !isAdminLogin) {
    const { state } = store;
    const { auth } = state;
    const { user } = auth;

    if (!user) {
      return redirect("/admin/login");
    } else {
      const { role } = user;
      const { type } = role;

      if (type !== "authenticated") {
        return redirect("/admin/login");
      }
    }
  }
}
