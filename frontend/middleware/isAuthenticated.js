export default function ({ store, route, redirect }) {
  const { fullPath } = route;
  const { state } = store;
  const { auth } = state;
  const { user } = auth;

  const isAdminPage = fullPath.match(/\/admin/gi);
  const isUserProfile = fullPath.match(/\/profile/gi);

  if ((!user && isUserProfile) || (!user && isAdminPage)) {
    return redirect("/login");
  }

  if (user) {
    const { role } = user;
    const { type } = role;

    if (isAdminPage && type !== "authenticated") {
      return redirect("/profile");
    }

    if (isUserProfile && type !== "customer") {
      return redirect("/");
    }
  }
}
